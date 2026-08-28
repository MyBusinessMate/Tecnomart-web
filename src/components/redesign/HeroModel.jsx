"use client";

/**
 * HeroModel — Three.js product viewer  (Next.js / React)
 * Model : /models/3d-model-optimized-v4.glb
 *         ~11 MB · EXT_meshopt_compression · WebP textures
 *         · doubleSided material · emissive map (fan-ring LEDs + screen highlight)
 *
 * ─── QUICK-TUNE BLOCK ────────────────────────────────────────────────────────
 * All values you'll want to dial live here. Don't search the rest of the file.
 */
const EXPOSURE            = 1.1;   // ACESFilmic brightness  (try 0.9–1.3)

const EMISSIVE_INTENSITY  = 1.0;   // Glow strength on LEDs/screen (0 = off, 2 = strong)
//   ↑ §4 — start here. Too dim → raise. Too blown-out → lower. Patchy → regen mask.

const BLOOM_ENABLED       = true;  // false = emissive colour only; true = adds halo
const BLOOM_STRENGTH      = 0.6;   // Overall bloom brightness   (0.3 = subtle, 1.5 = intense)
const BLOOM_RADIUS        = 0.5;   // Bloom spread in pixels      (0 = tight, 1 = wide)
const BLOOM_THRESHOLD     = 0.55;  // Min luminance to bloom      (lower = more pixels glow)
//   ↑ §4 — if bloom halos are too large: raise RADIUS. Too faint: lower THRESHOLD.

const SHADOW_MAP_SIZE     = 2048;  // Shadow resolution (halve to 1024 to save GPU)
const CAMERA_FOV          = 36;    // Field of view, degrees
const CAMERA_POS          = [0, 1.2, 5.5];  // [x, y, z] — adjust to frame the podium
const ORBIT_TARGET        = [0, 0.5, 0];    // Orbit pivot — raise y if model floats too high
/** ─────────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader }      from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder }  from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { OrbitControls }   from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer }  from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass }      from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
// import { DRACOLoader }  from 'three/examples/jsm/loaders/DRACOLoader.js';

const MODEL_PATH = '/models/3d-model-optimized-v4.glb';

// ─── Shadow approach note ─────────────────────────────────────────────────────
// Using real-time PCFSoft shadow mapping (not a baked gradient plane) because
// OrbitControls lets users rotate — the shadow must follow the model.
// Cost: one extra GPU shadow pass per frame (~0.5–2 ms on mid-range hardware).
// To switch to baked: set renderer.shadowMap.enabled = false, add a gradient
// circle plane under the podium, skip all castShadow/receiveShadow calls.
// ─────────────────────────────────────────────────────────────────────────────

// ─── UI overlays ─────────────────────────────────────────────────────────────
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

function ErrorOverlay() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
        <span className="text-red-500 text-xl font-bold">!</span>
      </div>
      <p className="text-xs text-neutral-500 text-center max-w-[180px] leading-relaxed">
        Couldn't load the 3D model.<br />Check your connection and refresh.
      </p>
    </div>
  );
}

function IdlePlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white pointer-events-none">
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

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;

    // ── §1  LOADER FACTORY ──────────────────────────────────────────────────
    // Isolated so DRACOLoader can be dropped in later without touching init().
    function buildLoader() {
      const loader = new GLTFLoader();
      loader.setMeshoptDecoder(MeshoptDecoder); // EXT_meshopt_compression

      // ── DRACOLoader stub — uncomment when using Draco-compressed files ────
      // const draco = new DRACOLoader();
      // draco.setDecoderPath('/draco/');        // copy WASM files to /public/draco/
      // draco.setDecoderConfig({ type: 'wasm' });
      // loader.setDRACOLoader(draco);
      // ────────────────────────────────────────────────────────────────────

      return loader;
    }

    async function init() {
      setStatus('loading');

      // Meshopt WASM must compile before the loader is used; skip the await and
      // the extension silently fails, producing an empty or broken scene.
      await MeshoptDecoder.ready;

      // ── §2  RENDERER & COLOR MANAGEMENT ────────────────────────────────────
      //
      // Verification ①: background must be pure white, no cream/yellow tint.
      //   If tinted → lower EXPOSURE in the quick-tune block above,
      //              or confirm scene.background is 0xffffff (not an env texture).
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias:       true,
        alpha:           false,      // opaque white — better perf than alpha:true
        powerPreference: 'high-performance',
      });

      // Cap pixel ratio — above 2× the visual gain is invisible but GPU cost doubles.
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      // setSize() writes canvas width/height attrs = CSS px × devicePixelRatio.
      // No CSS stretching: attrs always equal the number of rendered pixels.

      renderer.outputColorSpace    = THREE.SRGBColorSpace;
      renderer.toneMapping         = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = EXPOSURE;

      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type    = THREE.PCFSoftShadowMap;

      // ── Scene ───────────────────────────────────────────────────────────────
      const scene = new THREE.Scene();
      // Pure white background. scene.environment (set below) provides IBL
      // reflections independently — the background stays white, not the env cube.
      scene.background = new THREE.Color(0xffffff);

      // ── Camera ──────────────────────────────────────────────────────────────
      const camera = new THREE.PerspectiveCamera(
        CAMERA_FOV,
        container.clientWidth / container.clientHeight,
        0.1,
        100,
      );
      camera.position.set(...CAMERA_POS);

      // ── §3  LIGHTING & REFLECTIONS ──────────────────────────────────────────
      //
      // Verification ②: curved edges (phone corners, laptop lid, PC bevels)
      //   must look smooth. Faceting here is a model export issue, not code.
      //   This file never calls computeVertexNormals() or sets flatShading —
      //   the shipped smooth normals are used exactly as exported.
      //
      // Verification ③: glossy/chrome surfaces must show soft shifting
      //   reflections as you orbit.
      //   Too flat → raise environmentIntensity below.
      //   Blown out → lower EXPOSURE.

      const pmrem      = new THREE.PMREMGenerator(renderer);
      pmrem.compileEquirectangularShader();
      const roomEnv    = new RoomEnvironment();
      const envTexture = pmrem.fromScene(roomEnv, 0.04).texture;
      scene.environment            = envTexture;       // IBL reflections only
      scene.environmentIntensity   = 0.8;              // ← tune: 0 = no IBL, 2 = very bright
      pmrem.dispose();
      roomEnv.dispose();

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
      keyLight.position.set(4, 8, 5);
      keyLight.castShadow              = true;
      keyLight.shadow.mapSize.set(SHADOW_MAP_SIZE, SHADOW_MAP_SIZE);
      keyLight.shadow.camera.near      = 0.5;
      keyLight.shadow.camera.far       = 30;
      keyLight.shadow.camera.left      = -6;
      keyLight.shadow.camera.right     =  6;
      keyLight.shadow.camera.top       =  6;
      keyLight.shadow.camera.bottom    = -6;
      keyLight.shadow.radius           =  4;     // PCFSoft penumbra spread
      keyLight.shadow.bias             = -0.0001; // prevents shadow acne on flat surfaces
      scene.add(keyLight);

      // Fill light — keeps dark PC case edges readable (not a silhouette).
      const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
      fillLight.position.set(-5, 4, -2);
      scene.add(fillLight);

      // ── Controls ─────────────────────────────────────────────────────────────
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

      // ── §4 + §5  BLOOM PASS (optional) ────────────────────────────────────
      //
      // BLOOM_ENABLED = true  → EffectComposer renders: RenderPass → UnrealBloomPass
      // BLOOM_ENABLED = false → renderer.render() directly (cheaper)
      //
      // Toggle BLOOM_ENABLED in the quick-tune block at the top to compare.
      let composer = null;
      if (BLOOM_ENABLED) {
        composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));

        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(container.clientWidth, container.clientHeight),
          BLOOM_STRENGTH,    // overall brightness of the bloom halo
          BLOOM_RADIUS,      // spread / softness of the halo
          BLOOM_THRESHOLD,   // luminance threshold — pixels below this don't bloom
        );
        composer.addPass(bloomPass);
      }

      // ── §1 + §2 + §7  LOAD MODEL ─────────────────────────────────────────
      const maxAniso = renderer.capabilities.getMaxAnisotropy();
      const loader   = buildLoader();

      loader.load(
        MODEL_PATH,

        // onLoad ─────────────────────────────────────────────────────────────
        (gltf) => {
          let emissiveMeshCount  = 0;
          let doubleSidedCount   = 0;

          gltf.scene.traverse((node) => {
            if (!node.isMesh) return;

            // Shadows
            node.castShadow    = true;
            node.receiveShadow = true;

            const mat = node.material;
            if (!mat) return;

            // ── §4  EMISSIVE INTENSITY ──────────────────────────────────────
            // emissiveIntensity multiplies the emissive colour/texture uniformly.
            // Start at EMISSIVE_INTENSITY = 1.0, then:
            //   Too dim       → raise (try 1.5, 2.0)
            //   Too blown-out → lower (try 0.5)
            //   Patchy/wrong  → the mask PNG needs regeneration with a different
            //                   threshold; that's a model-side fix, not a code fix.
            if (mat.emissiveMap || mat.emissive?.r || mat.emissive?.g || mat.emissive?.b) {
              mat.emissiveIntensity = EMISSIVE_INTENSITY;
              emissiveMeshCount++;
            }

            // ── §2  COLOR SPACE per texture ────────────────────────────────
            // Base colour only → sRGB (perceptual encoding).
            if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace;

            // Emissive texture stays LINEAR (user's mask is encoded as linear
            // intensity data, not a perceptual colour). GLTFLoader might set it
            // to sRGB automatically when outputColorSpace = SRGBColorSpace, so
            // we explicitly override it back to linear here.
            if (mat.emissiveMap) {
              mat.emissiveMap.colorSpace = THREE.LinearSRGBColorSpace;
            }

            // Normal / roughness / metalness / AO → LINEAR — don't touch.

            // ── §7  ANISOTROPY ─────────────────────────────────────────────
            // Applied to base colour and emissive; sharpens oblique-angle views
            // (e.g. the podium top surface). minFilter/magFilter left at their
            // Linear/Mipmap defaults — only anisotropy is raised.
            [mat.map, mat.emissiveMap].forEach((tex) => {
              if (tex) tex.anisotropy = maxAniso;
            });

            // ── §5  DOUBLE-SIDED CHECK ─────────────────────────────────────
            // doubleSided was added as a preventive fix for thin/open geometry.
            // Log which meshes use it so you can assess after orbiting.
            if (mat.side === THREE.DoubleSide) {
              doubleSidedCount++;
              console.info(
                `[HeroModel] DoubleSide on mesh "${node.name || node.uuid}" —`,
                'orbit past 180° and check this face for z-fighting or unwanted back faces.'
              );
            }
          });

          // Summary to help you assess §4 and §5 without code changes
          console.info(`[HeroModel] Loaded — emissive meshes: ${emissiveMeshCount}, doubleSided meshes: ${doubleSidedCount}`);
          if (emissiveMeshCount === 0) {
            console.warn('[HeroModel] No emissive material found — check that the GLB emissive texture exported correctly.');
          }
          if (doubleSidedCount === 0) {
            console.info('[HeroModel] No DoubleSide material found — the doubleSided flag may not have exported. Open the GLB in Blender and confirm "Backface Culling" is unchecked for the relevant materials.');
          }

          scene.add(gltf.scene);
          setStatus('ready');
        },

        // onProgress ─────────────────────────────────────────────────────────
        (xhr) => {
          if (xhr.total > 0) {
            setProgress(Math.round((xhr.loaded / xhr.total) * 100));
          }
        },

        // onError ─────────────────────────────────────────────────────────────
        (err) => {
          console.error('[HeroModel] Failed to load GLB:', err);
          setStatus('error');
        },
      );

      // ── §8  RESIZE ────────────────────────────────────────────────────────
      function syncSize() {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        if (composer) composer.setSize(w, h);
      }
      const resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(container);

      // ── RAF LOOP ─────────────────────────────────────────────────────────
      let rafId;
      (function animate() {
        rafId = requestAnimationFrame(animate);
        controls.update();
        if (composer) {
          composer.render(); // bloom path: RenderPass → UnrealBloomPass → canvas
        } else {
          renderer.render(scene, camera); // direct path (BLOOM_ENABLED = false)
        }
      })();

      // ── §8  DISPOSAL ───────────────────────────────────────────────────────
      cleanupRef.current = () => {
        cancelAnimationFrame(rafId);
        resizeObserver.disconnect();
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

    // ── §8  LAZY INIT via IntersectionObserver ────────────────────────────────
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        init().catch((err) => {
          console.error('[HeroModel] Init error:', err);
          setStatus('error');
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
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
      {status === 'error'   && <ErrorOverlay />}
    </div>
  );
}
