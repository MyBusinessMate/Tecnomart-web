"use client";

/**
 * HeroModel — Three.js product viewer (Next.js / React)
 * Model: /models/3d-model-optimized-v3.glb
 *        (~10 MB, EXT_meshopt_compression + WebP textures)
 *
 * Verification checkpoints (check in this order):
 *  ① Background   — pure white, no cream/yellow tint
 *  ② Normals      — curved edges smooth, no visible facets
 *  ③ Reflections  — glossy surfaces show soft room reflections, not flat color
 *  ④ Shadow       — soft shadow grounds the podium
 *  ⑤ Performance  — no jank on resize, progress bar visible on first load
 *
 * Search "← tune" to find every value you may want to adjust.
 */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader }      from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder }  from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { OrbitControls }   from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
// import { DRACOLoader }  from 'three/examples/jsm/loaders/DRACOLoader.js';

const MODEL_PATH = '/models/3d-model-optimized-v3.glb';

// ─── Shadow approach: real-time PCFSoft shadow mapping ────────────────────────
//
// TRADEOFF vs baked contact shadow plane:
//   Real-time  → correct at any angle, responds to OrbitControls rotation,
//                adds one extra GPU shadow render pass per frame (~0.5–2 ms
//                on mid-range hardware for a 2048² map).
//   Baked plane → zero render cost, always identical circle, doesn't react
//                to model position. Better for a fully static hero display.
//
// Chosen: real-time, because OrbitControls lets users rotate and the shadow
// must stay accurate. Flip to baked by disabling shadowMap below and
// replacing keyLight.castShadow with a gradient circle plane.
// ─────────────────────────────────────────────────────────────────────────────

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

  const [status,   setStatus]   = useState('idle');   // idle | loading | ready | error
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 1 — LOADER SETUP
    // ─────────────────────────────────────────────────────────────────────────
    function buildLoader(renderer) {
      const loader = new GLTFLoader();

      // Meshopt decoder — must be awaited before this point (see init())
      loader.setMeshoptDecoder(MeshoptDecoder);

      // ── DRACOLoader stub (activate when you have Draco-compressed files) ──
      //
      // const draco = new DRACOLoader();
      // draco.setDecoderPath('/draco/');           // copy WASM to /public/draco/
      // draco.setDecoderConfig({ type: 'wasm' });
      // loader.setDRACOLoader(draco);
      //
      // ─────────────────────────────────────────────────────────────────────

      return loader;
    }

    async function init() {
      setStatus('loading');

      // Wait for the Meshopt WASM binary to compile before creating any loader.
      // Skipping this await causes the extension to silently fail on the first load.
      await MeshoptDecoder.ready;

      // ───────────────────────────────────────────────────────────────────────
      // SECTION 2 — RENDERER & COLOR MANAGEMENT
      //
      // Verification checkpoint ①: background must read as pure white.
      // If it looks cream/yellow:
      //   a) Check scene.background below (must be 0xffffff, not a texture)
      //   b) Lower toneMappingExposure (try 1.0 → 0.9)
      //   c) Confirm outputColorSpace = SRGBColorSpace (not LinearSRGBColorSpace)
      // ───────────────────────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,               // smooth sub-pixel edges
        alpha:     false,              // opaque — white background drawn by Three.js
        powerPreference: 'high-performance',
      });

      // Cap at 2× — above that the visual gain is invisible but GPU cost doubles.
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      // setSize() sets canvas width/height attributes = CSS pixels × devicePixelRatio
      // (no CSS stretching; canvas attributes exactly match rendered pixel count).

      renderer.outputColorSpace    = THREE.SRGBColorSpace;     // correct gamma for WebP textures
      renderer.toneMapping         = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;                      // ← tune: raise if scene looks dark

      // Shadow mapping — PCFSoft gives smooth penumbra without extra samples.
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type    = THREE.PCFSoftShadowMap;

      // ───────────────────────────────────────────────────────────────────────
      // SCENE
      // ───────────────────────────────────────────────────────────────────────
      const scene = new THREE.Scene();
      // Pure white background — NOT an env texture so the background stays white
      // while scene.environment (set below) still provides IBL reflections.
      scene.background = new THREE.Color(0xffffff);            // ← tune: 0xf5f5f5 for off-white

      // ───────────────────────────────────────────────────────────────────────
      // CAMERA
      // ───────────────────────────────────────────────────────────────────────
      const camera = new THREE.PerspectiveCamera(
        36,                                                    // ← tune: FOV in degrees
        container.clientWidth / container.clientHeight,
        0.1,
        100,
      );
      camera.position.set(0, 1.2, 5.5);                       // ← tune: camera position [x, y, z]

      // ───────────────────────────────────────────────────────────────────────
      // SECTION 3 — LIGHTING & REFLECTIONS
      //
      // Verification checkpoints ② and ③:
      //  ② Normals: curved edges must look smooth. If you see faceting,
      //     the issue is NOT this code — it means flatShading was set somewhere
      //     OR the model's vertex normals were accidentally recomputed.
      //     Check: no node.material.flatShading = true anywhere in this file.
      //             computeVertexNormals() is NOT called anywhere here.
      //  ③ Reflections: glossy/chrome surfaces should show soft room reflections.
      //     If they look flat: check environmentIntensity (raise slightly),
      //     or check that scene.environment is set (not null after pmrem step).
      //     If they look overblown: lower environmentIntensity or exposure.
      // ───────────────────────────────────────────────────────────────────────

      // RoomEnvironment → PMREMGenerator → IBL reflections
      // The RoomEnvironment is a simple neutral studio box — adds soft
      // reflections on glossy/metallic surfaces without affecting the background.
      const pmrem      = new THREE.PMREMGenerator(renderer);
      pmrem.compileEquirectangularShader();
      const roomEnv    = new RoomEnvironment();
      const envTexture = pmrem.fromScene(roomEnv, 0.04).texture; // 0.04 = blur/roughness
      scene.environment = envTexture;                            // IBL only, NOT background
      pmrem.dispose();
      roomEnv.dispose();

      // Ambient — raises shadow floors, prevents pure-black undersides
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);  // ← tune: intensity
      scene.add(ambientLight);

      // Key light — primary directional, top-right-front, casts shadows
      const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);  // ← tune: intensity
      keyLight.position.set(4, 8, 5);                              // ← tune: direction [x,y,z]
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(2048, 2048);
      keyLight.shadow.camera.near   = 0.5;
      keyLight.shadow.camera.far    = 30;
      keyLight.shadow.camera.left   = -6;                          // ← tune: shadow frustum
      keyLight.shadow.camera.right  =  6;
      keyLight.shadow.camera.top    =  6;
      keyLight.shadow.camera.bottom = -6;
      keyLight.shadow.radius        = 4;    // PCFSoft penumbra spread
      keyLight.shadow.bias          = -0.0001; // reduces shadow acne on flat surfaces
      scene.add(keyLight);

      // Fill light — lower intensity, left side, keeps the dark PC case readable
      // without washing out the shadows that define its shape.
      const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);  // ← tune: intensity
      fillLight.position.set(-5, 4, -2);                            // ← tune: direction [x,y,z]
      scene.add(fillLight);

      // ───────────────────────────────────────────────────────────────────────
      // CONTROLS
      // ───────────────────────────────────────────────────────────────────────
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping   = true;
      controls.dampingFactor   = 0.05;
      controls.enablePan       = false;
      controls.minDistance     = 2;                                  // ← tune: closest zoom
      controls.maxDistance     = 10;                                 // ← tune: furthest zoom
      controls.maxPolarAngle   = Math.PI / 1.9;
      controls.autoRotate      = true;
      controls.autoRotateSpeed = 0.8;                                // ← tune: rotation speed
      controls.target.set(0, 0.5, 0);                               // ← tune: orbit pivot point
      controls.addEventListener('start', () => { controls.autoRotate = false; });
      controls.addEventListener('end',   () => { controls.autoRotate = true;  });

      // ───────────────────────────────────────────────────────────────────────
      // SECTION 1 (cont.) + SECTION 2 (cont.) + SECTION 5
      // LOAD MODEL — color space, anisotropy, shadows applied on load
      // ───────────────────────────────────────────────────────────────────────
      const loader = buildLoader(renderer);
      const maxAniso = renderer.capabilities.getMaxAnisotropy();

      loader.load(
        MODEL_PATH,

        // ── onLoad ─────────────────────────────────────────────────────────
        (gltf) => {
          gltf.scene.traverse((node) => {
            if (!node.isMesh) return;

            // Shadows — every mesh casts; every mesh receives (podium included)
            node.castShadow    = true;
            node.receiveShadow = true;

            const mat = node.material;
            if (!mat) return;

            // ── DO NOT set flatShading = true here (would break smooth normals)
            // ── DO NOT call node.geometry.computeVertexNormals() here
            //    (the file ships correct smooth normals — recomputing overrides them)

            // ── Section 5: anisotropic filtering ─────────────────────────
            // Sharpens textures viewed at oblique angles (e.g. the podium top
            // surface). Left at Linear/Mipmap — only anisotropy is raised.
            [
              mat.map,            // base color  (sRGB)
              mat.normalMap,      // normal map  (linear — no colorSpace change)
              mat.roughnessMap,   // roughness   (linear — no colorSpace change)
              mat.metalnessMap,   // metalness   (linear — no colorSpace change)
              mat.emissiveMap,    // emissive    (sRGB)
              mat.aoMap,          // AO          (linear — no colorSpace change)
            ].forEach((tex) => {
              if (!tex) return;
              tex.anisotropy = maxAniso;
              // minFilter / magFilter left at Three.js defaults (LinearMipmap / Linear)
            });

            // ── Section 2: explicit color space on sRGB textures ──────────
            // GLTFLoader in Three.js r152+ sets these automatically when
            // outputColorSpace = SRGBColorSpace, but we set them explicitly
            // here for clarity and safety across library versions.
            if (mat.map)         mat.map.colorSpace         = THREE.SRGBColorSpace;
            if (mat.emissiveMap) mat.emissiveMap.colorSpace = THREE.SRGBColorSpace;
            // Normal / roughness / metalness / AO maps must stay LINEAR —
            // do NOT set colorSpace on them.
          });

          scene.add(gltf.scene);
          setStatus('ready');
        },

        // ── onProgress ─────────────────────────────────────────────────────
        (xhr) => {
          if (xhr.total > 0) {
            setProgress(Math.round((xhr.loaded / xhr.total) * 100));
          }
        },

        // ── onError ────────────────────────────────────────────────────────
        (err) => {
          console.error('[HeroModel] Failed to load GLB:', err);
          setStatus('error');
        },
      );

      // ───────────────────────────────────────────────────────────────────────
      // SECTION 6 — RESIZE (canvas attributes match rendered pixels × dpr)
      // ───────────────────────────────────────────────────────────────────────
      function syncSize() {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        // setSize() updates both canvas width/height attrs AND CSS dimensions,
        // so there is no CSS stretching — attrs always equal rendered pixels × dpr.
        renderer.setSize(w, h);
      }
      const resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(container);

      // ── RAF loop ───────────────────────────────────────────────────────────
      let rafId;
      (function animate() {
        rafId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      })();

      // ── Full GPU disposal on unmount ───────────────────────────────────────
      cleanupRef.current = () => {
        cancelAnimationFrame(rafId);
        resizeObserver.disconnect();
        controls.dispose();

        scene.traverse((node) => {
          if (!node.isMesh) return;
          node.geometry?.dispose();
          const materials = Array.isArray(node.material) ? node.material : [node.material];
          materials.forEach((mat) => {
            if (!mat) return;
            Object.values(mat).forEach((v) => { if (v?.isTexture) v.dispose(); });
            mat.dispose();
          });
        });

        envTexture.dispose();
        renderer.dispose();
      };
    }

    // ───────────────────────────────────────────────────────────────────────
    // SECTION 6 — LAZY INIT via IntersectionObserver
    // ───────────────────────────────────────────────────────────────────────
    // Three.js and the GLB fetch only start when ≥10% of the container is
    // visible. On fast connections the model is ready before the user scrolls
    // far; on slow connections the progress bar appears naturally.
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
      // White background so the placeholder matches the final rendered background.
      className="w-full h-full relative touch-none select-none overflow-hidden bg-white"
    >
      {/* Canvas — always in the DOM so Three.js has a target from the start.
          Opacity-0 until 'ready'; then fades in over 700 ms. */}
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
