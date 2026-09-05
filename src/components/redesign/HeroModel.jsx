"use client";

/**
 * HeroModel — Three.js product viewer  (Next.js / React)
 * Model : /models/3d-model-optimized-v3.glb
 *         ~10 MB · EXT_meshopt_compression · WebP textures
 *
 * Stack: Next.js 16 + React 19  (no @react-three/fiber — raw Three.js)
 *
 * ─── QUICK-TUNE BLOCK ────────────────────────────────────────────────────────
 * Every value you might want to adjust lives here.
 */
const EXPOSURE      = 1.15;   // §2  ACESFilmic brightness
const ENV_INTENSITY = 0.9;    // §3  IBL reflection strength
const KEY_INTENSITY = 2.2;    // §3  Key-light intensity
const FILL_INTENSITY= 0.65;   // §3  Fill-light intensity
const SHADOW_SIZE   = 2048;   // §4  Shadow map resolution
const TARGET_SIZE   = 11.5;   // §6  World-unit size after auto-scale  (raise = bigger)
const ZOOM_MARGIN   = 0.75;   // §6  Breathing room around model  (1.0 = tight, 1.5 = roomy)
const CAMERA_FOV    = 36;     // §6  Perspective FOV in degrees
/** ─────────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader }      from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder }  from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { OrbitControls }   from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
// Postprocessing is imported dynamically so a bundler failure only disables
// bloom — it never crashes the model render.

const MODEL_PATH = '/models/3d-model-optimized-v3.glb';

// ─── §1  Loader factory ───────────────────────────────────────────────────────
// Isolated so DRACOLoader can be dropped in later without touching init():
//
//   import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
//   const draco = new DRACOLoader();
//   draco.setDecoderPath('/draco/');          // copy WASM to /public/draco/
//   draco.setDecoderConfig({ type: 'wasm' });
//   loader.setDRACOLoader(draco);
//
function buildLoader() {
  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder); // EXT_meshopt_compression
  return loader;
}

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

  // idle → loading → ready | error
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
      console.info('[HeroModel] Container:', container.clientWidth, '×', container.clientHeight);

      // §1  Meshopt WASM must compile before any loader is created.
      //     Skipping this await makes EXT_meshopt_compression fail silently.
      await MeshoptDecoder.ready;
      if (cancelled) return;

      // ── §2  Renderer & colour management ──────────────────────────────────
      //
      // Verification ①  background must be pure white, no cream/yellow tint.
      //   If tinted  → lower EXPOSURE, confirm scene.background = 0xffffff.
      //   If washed  → raise EXPOSURE or lower ENV_INTENSITY.
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias:       true,
        alpha:           true,        // transparent background — no box container
        powerPreference: 'high-performance',
      });

      // Cap pixel ratio — above 2× visual gain is negligible, GPU cost doubles.
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      // setSize() writes canvas width/height attributes = CSS pixels × dpr.
      // No CSS stretching: attributes match rendered pixels exactly.
      renderer.setSize(container.clientWidth, container.clientHeight);

      renderer.outputColorSpace    = THREE.SRGBColorSpace;   // correct gamma for WebP
      renderer.toneMapping         = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = EXPOSURE;

      // §4  Real-time shadow mapping (PCFShadowMap — soft, PCFSoft deprecated r175+)
      // Tradeoff vs baked gradient plane: real-time shadows are correct at any
      // orbit angle; baked shadows are zero GPU cost but always a static circle.
      // Chosen real-time because OrbitControls lets users rotate the view.
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type    = THREE.PCFShadowMap;

      // ── Scene ─────────────────────────────────────────────────────────────
      const scene = new THREE.Scene();

      // ── Camera ────────────────────────────────────────────────────────────
      const camera = new THREE.PerspectiveCamera(
        CAMERA_FOV,
        container.clientWidth / container.clientHeight,
        0.1,   // near — overridden per-model after load
        1000,  // far  — overridden per-model after load
      );

      // ── §3  Lighting & reflections ────────────────────────────────────────
      //
      // Verification ②  curved edges must look smooth (phone corners, laptop
      //   lid, PC bevels). Faceting = model export issue, not code. This file
      //   never calls computeVertexNormals() or sets flatShading — the shipped
      //   smooth normals are used exactly as exported.
      //
      // Verification ③  glossy/chrome surfaces must show soft shifting
      //   reflections as you orbit.
      //   Too flat  → raise ENV_INTENSITY.
      //   Blown out → lower ENV_INTENSITY or EXPOSURE.

      // RoomEnvironment: neutral studio box — adds soft IBL reflections on
      // metallic/glossy surfaces; background stays pure white (not the env cube).
      const pmrem      = new THREE.PMREMGenerator(renderer);
      pmrem.compileEquirectangularShader();
      const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment          = envTexture;
      scene.environmentIntensity = ENV_INTENSITY;
      pmrem.dispose();

      // Ambient — lifts shadow floors so undersides aren't pure black
      scene.add(new THREE.AmbientLight(0xffffff, 0.6));

      // Key light — main directional source, casts shadows
      const keyLight = new THREE.DirectionalLight(0xffffff, KEY_INTENSITY);
      keyLight.position.set(4, 8, 5);   // ← tune: direction [x, y, z]
      keyLight.castShadow            = true;
      keyLight.shadow.mapSize.set(SHADOW_SIZE, SHADOW_SIZE);
      keyLight.shadow.radius         = 2;      // penumbra softness
      keyLight.shadow.bias           = -0.0001; // prevents shadow acne
      // Shadow frustum is resized after load to match the actual model bounds
      scene.add(keyLight);

      // Fill light — keeps dark PC-case edges readable, not a flat silhouette
      const fillLight = new THREE.DirectionalLight(0xffffff, FILL_INTENSITY);
      fillLight.position.set(-5, 4, -2); // ← tune: direction [x, y, z]
      scene.add(fillLight);

      // ── OrbitControls ─────────────────────────────────────────────────────
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping     = true;
      controls.dampingFactor     = 0.05;
      controls.enablePan         = false;    // product viewer — no panning
      controls.enableZoom        = false;    // DISABLE ZOOM IN / OUT COMPLETELY
      controls.minPolarAngle     = Math.PI / 2.6; // keep front perspective
      controls.maxPolarAngle     = Math.PI / 1.95; // prevent flipping under model
      controls.minAzimuthAngle   = -(Math.PI * 7 / 18); // -70° (140° total front view arc)
      controls.maxAzimuthAngle   =  (Math.PI * 7 / 18); // +70° (140° total front view arc)
      controls.autoRotate        = false;    // Custom 140° back-and-forth oscillation handled in RAF loop

      // On mobile devices, allow touch gestures to scroll the page smoothly (pan-y)
      // We configure touch pointer behavior so vertical swipe passes to native page scrolling
      if (isTouchDevice) {
        // OrbitControls supports ONE: ROTATE, TWO: DO_NOTHING
        // By allowing pan-y on CSS touch-action and checking touch delta, users can scroll effortlessly
        controls.touches = {
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DO_NOTHING,
        };
      }

      let isUserInteracting = false;
      let oscillateDirection = 1; // 1 = right, -1 = left
      const OSCILLATE_SPEED = 0.0035; // smooth rotation speed
      const MIN_AZIMUTH = -(Math.PI * 7 / 18) * 0.95; // ~ -66.5° bounce point
      const MAX_AZIMUTH =  (Math.PI * 7 / 18) * 0.95; // ~ +66.5° bounce point

      controls.addEventListener('start', () => { isUserInteracting = true; });
      controls.addEventListener('end',   () => { 
        isUserInteracting = false; 
        oscillateDirection = controls.getAzimuthalAngle() < 0 ? 1 : -1;
      });

      // ── §6  Load GLB ──────────────────────────────────────────────────────
      const maxAniso = renderer.capabilities.getMaxAnisotropy();
      const loader   = buildLoader();

      loader.load(
        MODEL_PATH,

        // ── onLoad ──────────────────────────────────────────────────────────
        (gltf) => {
          if (cancelled) return;

          gltf.scene.traverse((node) => {
            if (!node.isMesh) return;

            // §4  Every mesh casts and receives shadows
            node.castShadow    = true;
            node.receiveShadow = true;

            const mat = node.material;
            if (!mat) return;

            // §2  Colour-space correction.
            //     base colour (map) → sRGB  (perceptual encoding).
            //     roughness / metalness / normal / AO → linear (don't touch).
            if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace;

            // §5  Anisotropic filtering — sharpens oblique-angle views.
            //     minFilter / magFilter left at Linear/Mipmap defaults.
            [mat.map, mat.normalMap, mat.roughnessMap, mat.metalnessMap, mat.aoMap]
              .forEach((tex) => { if (tex) tex.anisotropy = maxAniso; });
          });

          // ── §6  Auto-center & auto-scale (correct order of operations) ────
          //
          // Step 1 — measure at original scale (no transforms yet)
          scene.add(gltf.scene);
          const box    = new THREE.Box3().setFromObject(gltf.scene);
          const center = box.getCenter(new THREE.Vector3());
          const size   = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);

          if (maxDim === 0) {
            console.warn('[HeroModel] Bounding box is zero — model may be empty');
            setStatus('ready');
            return;
          }

          // Step 2 — scale so longest axis = TARGET_SIZE world units
          const s = TARGET_SIZE / maxDim;
          gltf.scene.scale.setScalar(s);

          // Step 3 — centre at origin & offset vertically upside.
          gltf.scene.position.set(-center.x * s, -center.y * s + (maxDim * s * 0.12), -center.z * s);

          // Step 4 — bounding sphere AFTER transforms → camera distance
          const sphere = new THREE.Sphere();
          new THREE.Box3().setFromObject(gltf.scene).getBoundingSphere(sphere);

          // Step 5 — camera: radius / sin(fov/2) = exact fit; ×ZOOM_MARGIN = breathing room
          const fovRad  = CAMERA_FOV * (Math.PI / 180);
          const camDist = (sphere.radius / Math.sin(fovRad / 2)) * ZOOM_MARGIN;

          camera.position.set(
            sphere.center.x,
            sphere.center.y + sphere.radius * 0.1, // slight upward tilt
            sphere.center.z + camDist,
          );
          camera.near = camDist * 0.01;
          camera.far  = camDist * 20;
          camera.updateProjectionMatrix();

          controls.target.copy(sphere.center);
          controls.minDistance = sphere.radius * 0.8;
          controls.maxDistance = sphere.radius * 6;
          controls.update();

          // Resize shadow frustum to cover the actual model
          const r = sphere.radius;
          keyLight.shadow.camera.left   = -r * 1.5;
          keyLight.shadow.camera.right  =  r * 1.5;
          keyLight.shadow.camera.top    =  r * 1.5;
          keyLight.shadow.camera.bottom = -r * 1.5;
          keyLight.shadow.camera.near   = camDist * 0.01;
          keyLight.shadow.camera.far    = camDist * 4;
          keyLight.shadow.camera.updateProjectionMatrix();

          console.info(
            '[HeroModel] Ready',
            `| original: ${size.x.toFixed(2)}×${size.y.toFixed(2)}×${size.z.toFixed(2)}`,
            `| scale: ×${s.toFixed(3)}`,
            `| sphere r: ${r.toFixed(2)}`,
            `| camDist: ${camDist.toFixed(2)}`,
          );

          setStatus('ready');
        },

        // ── onProgress ──────────────────────────────────────────────────────
        (xhr) => {
          if (xhr.total > 0) setProgress(Math.round((xhr.loaded / xhr.total) * 100));
        },

        // ── onError ─────────────────────────────────────────────────────────
        (err) => {
          console.error('[HeroModel] Load failed:', err);
          setErrMsg(`Load error: ${err.message || 'unknown'}`);
          setStatus('error');
        },
      );

      // ── §6  ResizeObserver — keeps canvas crisp on container changes ──────
      // renderer.setSize() sets canvas width/height attrs = CSS px × dpr,
      // so attributes always equal the number of rendered pixels (no stretching).
      function syncSize() {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
      const ro = new ResizeObserver(syncSize);
      ro.observe(container);

      // ── RAF loop ──────────────────────────────────────────────────────────
      let rafId;
      (function animate() {
        rafId = requestAnimationFrame(animate);

        if (!isUserInteracting) {
          const currentAzimuth = controls.getAzimuthalAngle();
          if (currentAzimuth >= MAX_AZIMUTH) {
            oscillateDirection = -1;
          } else if (currentAzimuth <= MIN_AZIMUTH) {
            oscillateDirection = 1;
          }

          const polar = controls.getPolarAngle();
          const radius = camera.position.distanceTo(controls.target);
          const newAzimuth = currentAzimuth + oscillateDirection * OSCILLATE_SPEED;

          camera.position.x = controls.target.x + radius * Math.sin(polar) * Math.sin(newAzimuth);
          camera.position.z = controls.target.z + radius * Math.sin(polar) * Math.cos(newAzimuth);
        }

        controls.update();
        renderer.render(scene, camera);
      })();

      // ── §6  Full GPU disposal on unmount ──────────────────────────────────
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
        renderer.dispose();
      };
    }

    // Hero is always above the fold — init immediately (no IO delay needed)
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
      className="w-full h-full relative select-none overflow-hidden bg-transparent"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Canvas — always in DOM so Three.js has a target from mount.
          Opacity-0 until ready; fades in over 700 ms on model load. */}
      <canvas
        ref={canvasRef}
        style={{ touchAction: 'pan-y' }}
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
