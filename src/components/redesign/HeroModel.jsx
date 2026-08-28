"use client";

/**
 * HeroModel — Three.js product viewer (Next.js / React)
 * Model: /models/3d-model-optimized-v4.glb
 *
 * ─── QUICK-TUNE BLOCK ─────────────────────────────────────────────────────
 * All values you may want to dial are here. Don't search the rest of the file.
 */
const EXPOSURE           = 1.1;   // ACESFilmic brightness (try 0.9 – 1.3)
const EMISSIVE_INTENSITY = 1.0;   // LED / screen glow  (0 = off, 2 = strong)
const BLOOM_ENABLED      = true;  // false = emissive colour only, no halo
const BLOOM_STRENGTH     = 0.6;   // bloom brightness  (0.3 subtle – 1.5 intense)
const BLOOM_RADIUS       = 0.5;   // bloom spread      (0 tight – 1 wide)
const BLOOM_THRESHOLD    = 0.55;  // min luminance to bloom (lower = more pixels)
const CAMERA_FOV         = 36;
const CAMERA_POS         = [0, 1.2, 5.5];  // [x, y, z]
const ORBIT_TARGET       = [0, 0.5, 0];
const SHADOW_MAP_SIZE    = 2048;
/** ───────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader }      from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder }  from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { OrbitControls }   from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
// Postprocessing is loaded dynamically inside init() with a try/catch —
// if the import fails for any reason the model still renders, bloom just skips.

const MODEL_PATH = '/models/3d-model-optimized-v4.glb';

// ─── UI overlays ──────────────────────────────────────────────────────────────
function ProgressOverlay({ progress }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none">
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full border-4 border-amber-500/30 border-t-amber-500 animate-spin" />
        <span className="text-xs text-amber-600 font-semibold tracking-wide">
          {progress > 0 ? `${progress}%` : 'Loading 3D Model…'}
        </span>
      </div>
      {progress > 0 && (
        <div className="w-44 h-1 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

function ErrorOverlay({ message }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
        <span className="text-red-500 text-xl font-bold">!</span>
      </div>
      <p className="text-xs text-neutral-500 text-center max-w-[200px] leading-relaxed">
        {message || "Couldn't load the 3D model. Check your connection and refresh."}
      </p>
    </div>
  );
}

function IdlePlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-10 h-10 rounded-full border-4 border-neutral-200 border-t-amber-400/60 animate-spin opacity-60" />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function HeroModel() {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);
  const cleanupRef   = useRef(null);

  const [status,   setStatus]   = useState('idle');
  const [progress, setProgress] = useState(0);
  const [errMsg,   setErrMsg]   = useState('');

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;

    let cancelled = false;

    async function init() {
      setStatus('loading');

      // Log container size — if this shows 0×0, the parent div has no height
      console.info('[HeroModel] Container size:', container.clientWidth, '×', container.clientHeight);

      // ── Meshopt WASM must be ready before the loader is created ───────────
      await MeshoptDecoder.ready;
      if (cancelled) return;

      // ── §2 Renderer ───────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias:       true,
        alpha:           false,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.outputColorSpace    = THREE.SRGBColorSpace;
      renderer.toneMapping         = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = EXPOSURE;
      renderer.shadowMap.enabled   = true;
      renderer.shadowMap.type      = THREE.PCFShadowMap; // PCFSoftShadowMap deprecated in r175+

      // ── Scene ─────────────────────────────────────────────────────────────
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);

      // ── Camera ────────────────────────────────────────────────────────────
      const camera = new THREE.PerspectiveCamera(
        CAMERA_FOV,
        container.clientWidth / container.clientHeight,
        0.1,
        100,
      );
      camera.position.set(...CAMERA_POS);

      // ── §3 Lighting ───────────────────────────────────────────────────────
      const pmrem      = new THREE.PMREMGenerator(renderer);
      pmrem.compileEquirectangularShader();
      const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment          = envTexture;
      scene.environmentIntensity = 0.8;   // ← tune: IBL reflection strength
      pmrem.dispose();

      scene.add(new THREE.AmbientLight(0xffffff, 0.6));

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
      keyLight.position.set(4, 8, 5);
      keyLight.castShadow           = true;
      keyLight.shadow.mapSize.set(SHADOW_MAP_SIZE, SHADOW_MAP_SIZE);
      keyLight.shadow.camera.near   = 0.5;
      keyLight.shadow.camera.far    = 30;
      keyLight.shadow.camera.left   = -6;
      keyLight.shadow.camera.right  =  6;
      keyLight.shadow.camera.top    =  6;
      keyLight.shadow.camera.bottom = -6;
      keyLight.shadow.radius        =  4;
      keyLight.shadow.bias          = -0.0001;
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
      fillLight.position.set(-5, 4, -2);
      scene.add(fillLight);

      // ── Controls ──────────────────────────────────────────────────────────
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping   = true;
      controls.dampingFactor   = 0.05;
      controls.enablePan       = false;
      controls.minDistance     = 2;
      controls.maxDistance     = 10;
      controls.maxPolarAngle   = Math.PI / 1.9;
      controls.autoRotate      = true;
      controls.autoRotateSpeed = 0.8;
      controls.target.set(...ORBIT_TARGET);
      controls.addEventListener('start', () => { controls.autoRotate = false; });
      controls.addEventListener('end',   () => { controls.autoRotate = true;  });

      // ── §4 Bloom — dynamic import so a failure never kills the model ──────
      let composer = null;
      if (BLOOM_ENABLED) {
        try {
          const [
            { EffectComposer },
            { RenderPass },
            { UnrealBloomPass },
          ] = await Promise.all([
            import('three/examples/jsm/postprocessing/EffectComposer.js'),
            import('three/examples/jsm/postprocessing/RenderPass.js'),
            import('three/examples/jsm/postprocessing/UnrealBloomPass.js'),
          ]);
          if (!cancelled) {
            composer = new EffectComposer(renderer);
            composer.addPass(new RenderPass(scene, camera));
            composer.addPass(new UnrealBloomPass(
              new THREE.Vector2(container.clientWidth, container.clientHeight),
              BLOOM_STRENGTH,
              BLOOM_RADIUS,
              BLOOM_THRESHOLD,
            ));
            console.info('[HeroModel] Bloom active');
          }
        } catch (e) {
          console.warn('[HeroModel] Bloom skipped (postprocessing import failed):', e.message);
        }
      }
      if (cancelled) return;

      // ── Load GLB ──────────────────────────────────────────────────────────
      const loader = new GLTFLoader();
      loader.setMeshoptDecoder(MeshoptDecoder);
      // ── DRACOLoader stub ─────────────────────────────────────────────────
      // const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js');
      // const draco = new DRACOLoader();
      // draco.setDecoderPath('/draco/');
      // loader.setDRACOLoader(draco);

      const maxAniso = renderer.capabilities.getMaxAnisotropy();

      loader.load(
        MODEL_PATH,

        (gltf) => {
          if (cancelled) return;

          let emissiveCount = 0, doubleSideCount = 0;

          gltf.scene.traverse((node) => {
            if (!node.isMesh) return;
            node.castShadow    = true;
            node.receiveShadow = true;

            const mat = node.material;
            if (!mat) return;

            // §4 — emissive intensity
            if (mat.emissiveMap || mat.emissive?.r || mat.emissive?.g || mat.emissive?.b) {
              mat.emissiveIntensity = EMISSIVE_INTENSITY;
              emissiveCount++;
            }

            // §2 — colour space: base colour = sRGB; emissive = linear (mask data)
            if (mat.map)         mat.map.colorSpace         = THREE.SRGBColorSpace;
            if (mat.emissiveMap) mat.emissiveMap.colorSpace = THREE.LinearSRGBColorSpace;
            // normal / roughness / metalness / AO → leave linear (do not touch)

            // §7 — anisotropy on colour + emissive textures only
            [mat.map, mat.emissiveMap].forEach((tex) => {
              if (tex) tex.anisotropy = maxAniso;
            });

            // §5 — double-sided audit
            if (mat.side === THREE.DoubleSide) {
              doubleSideCount++;
              console.info(`[HeroModel] DoubleSide: "${node.name}"`);
            }
          });

          // ── Auto-center & auto-scale (correct order of operations) ──────────
          //
          // BUG that was here before:
          //   position.sub(center) was called BEFORE scale was applied.
          //   The translation was computed for scale=1, so after scaling the
          //   model drifted — center no longer at origin → floating fragment.
          //
          // Correct order:
          //   1. Measure bounds at scale=1 (no transforms yet)
          //   2. Apply scale
          //   3. Position = -(center × scale)  ← accounts for the scale
          //   4. Camera distance from bounding SPHERE, not box edge
          //      Formula: radius / sin(fov/2)  ← exact fit to the view cone

          scene.add(gltf.scene);

          // Step 1 — measure in original (un-transformed) space
          const box    = new THREE.Box3().setFromObject(gltf.scene);
          const center = box.getCenter(new THREE.Vector3());
          const size   = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);

          if (maxDim === 0) {
            console.warn('[HeroModel] Bounding box is zero — model may be empty');
            setStatus('ready');
            return;
          }

          // Step 2 — scale so the longest axis = TARGET_SIZE world units
          const TARGET_SIZE = 3.0;             // ← tune: apparent world-unit size
          const s           = TARGET_SIZE / maxDim;
          gltf.scene.scale.setScalar(s);

          // Step 3 — translate to origin.
          // Each child's world position after scale = s × localPos.
          // Original centre's world pos after scale = s × center.
          // So position must be -(s × center) to place centre at origin.
          gltf.scene.position.set(-center.x * s, -center.y * s, -center.z * s);

          // Step 4 — re-measure after transforms to get the final bounding sphere
          const finalSphere = new THREE.Sphere();
          new THREE.Box3().setFromObject(gltf.scene).getBoundingSphere(finalSphere);

          // Step 5 — position camera using the bounding-sphere formula.
          // radius / sin(fov/2) = minimum distance at which the sphere fills
          // exactly the shorter canvas dimension. ZOOM_MARGIN adds breathing room.
          const ZOOM_MARGIN = 1.25;            // ← tune: 1.0 = tight, 1.5 = roomy
          const fovRad      = camera.fov * (Math.PI / 180);
          const camDist     = (finalSphere.radius / Math.sin(fovRad / 2)) * ZOOM_MARGIN;

          camera.position.set(
            finalSphere.center.x,
            finalSphere.center.y + finalSphere.radius * 0.1, // slight upward tilt
            finalSphere.center.z + camDist,
          );
          // Keep near/far relative to the model so nothing clips
          camera.near = camDist * 0.01;
          camera.far  = camDist * 20;
          camera.updateProjectionMatrix();

          // OrbitControls — target the sphere centre; zoom limits match model size
          controls.target.copy(finalSphere.center);
          controls.minDistance = finalSphere.radius * 0.8;  // ← tune: closest zoom
          controls.maxDistance = finalSphere.radius * 6;    // ← tune: furthest zoom
          controls.update();

          // Update shadow frustum to cover the scaled model
          const sr = finalSphere.radius;
          keyLight.shadow.camera.left   = -sr * 1.5;
          keyLight.shadow.camera.right  =  sr * 1.5;
          keyLight.shadow.camera.top    =  sr * 1.5;
          keyLight.shadow.camera.bottom = -sr * 1.5;
          keyLight.shadow.camera.near   = camDist * 0.01;
          keyLight.shadow.camera.far    = camDist * 4;
          keyLight.shadow.camera.updateProjectionMatrix();

          console.info(
            `[HeroModel] Framed`,
            `| original size: ${size.x.toFixed(2)}×${size.y.toFixed(2)}×${size.z.toFixed(2)}`,
            `| scale: ×${s.toFixed(3)}`,
            `| sphere radius: ${finalSphere.radius.toFixed(2)}`,
            `| camera dist: ${camDist.toFixed(2)}`,
            `| emissive: ${emissiveCount}, doubleSided: ${doubleSideCount}`,
          );

          setStatus('ready');
        },

        (xhr) => {
          if (xhr.total > 0) setProgress(Math.round((xhr.loaded / xhr.total) * 100));
        },

        (err) => {
          console.error('[HeroModel] Load failed:', err);
          setErrMsg(`Load error: ${err.message || 'unknown'}`);
          setStatus('error');
        },
      );

      // ── Resize ────────────────────────────────────────────────────────────
      function syncSize() {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        if (composer) composer.setSize(w, h);
      }
      const ro = new ResizeObserver(syncSize);
      ro.observe(container);

      // ── RAF loop ──────────────────────────────────────────────────────────
      let rafId;
      (function animate() {
        rafId = requestAnimationFrame(animate);
        controls.update();
        composer ? composer.render() : renderer.render(scene, camera);
      })();

      // ── Cleanup on unmount ────────────────────────────────────────────────
      cleanupRef.current = () => {
        cancelAnimationFrame(rafId);
        ro.disconnect();
        controls.dispose();
        scene.traverse((node) => {
          if (!node.isMesh) return;
          node.geometry?.dispose();
          const mats = Array.isArray(node.material) ? node.material : [node.material];
          mats.forEach((mat) => {
            if (!mat) return;
            Object.values(mat).forEach((v) => { if (v?.isTexture) v.dispose(); });
            mat.dispose();
          });
        });
        envTexture.dispose();
        composer?.dispose();
        renderer.dispose();
      };
    }

    // Hero section is always above the fold — init immediately, no IO delay
    init().catch((err) => {
      console.error('[HeroModel] Init failed:', err);
      setErrMsg(`Init error: ${err.message || 'unknown'}`);
      setStatus('error');
    });

    return () => {
      cancelled = true;
      cleanupRef.current?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative touch-none select-none overflow-hidden bg-white"
    >
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          status === 'ready' ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {status === 'idle'    && <IdlePlaceholder />}
      {status === 'loading' && <ProgressOverlay progress={progress} />}
      {status === 'error'   && <ErrorOverlay message={errMsg} />}
    </div>
  );
}
