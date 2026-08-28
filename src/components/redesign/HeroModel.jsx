"use client";

/**
 * HeroModel — raw Three.js GLB viewer for Next.js (no @react-three/fiber).
 *
 * Features
 * ─────────
 * • GLTFLoader + MeshoptDecoder  (EXT_meshopt_compression support)
 * • DRACOLoader stub              (one comment to activate)
 * • OrbitControls with damping   (user rotate / zoom; auto-rotation pauses on drag)
 * • ACESFilmic tone mapping       (soft, cinematic PBR rendering)
 * • 3-point studio lighting       (ambient + key + fill + rim)
 * • Animated progress bar         (GLTFLoader onProgress → React state)
 * • Idle / Loading / Error overlays
 * • IntersectionObserver           (lazy-init: Three.js only starts when the
 *                                   canvas scrolls into view)
 * • Full disposal on unmount       (renderer, geometries, materials, textures)
 * • Pixel-ratio cap                (Math.min(dpr, 2) — protects mobile GPUs)
 * • ResizeObserver                 (canvas stays crisp when the container resizes)
 *
 * Customise
 * ─────────
 * Search for "← adjust" comments to tweak camera, lights, and controls.
 */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader }       from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder }   from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { OrbitControls }    from 'three/examples/jsm/controls/OrbitControls.js';
// import { DRACOLoader }   from 'three/examples/jsm/loaders/DRACOLoader.js';

const MODEL_PATH = '/models/3d-model-optimized.glb';

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
        <div className="w-40 h-1 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-300 ease-out"
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
      <p className="text-xs text-neutral-500 text-center max-w-[160px] leading-relaxed">
        Couldn't load 3D model.<br />Check your connection and refresh.
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
  const cleanupRef   = useRef(null); // holds the dispose function

  // 'idle' → waiting for IntersectionObserver
  // 'loading' → Three.js initialised, model downloading
  // 'ready' → model in scene, canvas visible
  // 'error' → load or init failed
  const [status,   setStatus]   = useState('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;

    async function init() {
      setStatus('loading');

      // ── Wait for Meshopt WASM decoder before creating the loader ─────────
      // (MeshoptDecoder.ready is a Promise that resolves once the WASM binary
      //  is compiled and ready — required before calling setMeshoptDecoder)
      await MeshoptDecoder.ready;

      // ── Renderer ─────────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias:       true,
        alpha:           true,          // transparent background
        powerPreference: 'high-performance',
      });
      // Cap pixel ratio at 2 — above that the visual gain is negligible but
      // GPU cost doubles or quadruples on high-DPI devices.
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);

      // ACESFilmic: compresses highlights into a natural roll-off, making PBR
      // materials with metallicRoughness look soft and cinematic.
      renderer.toneMapping         = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.88; // ← adjust overall brightness here
      renderer.outputColorSpace    = THREE.SRGBColorSpace;

      // ── Scene ─────────────────────────────────────────────────────────────
      const scene = new THREE.Scene();

      // ── Camera ────────────────────────────────────────────────────────────
      const camera = new THREE.PerspectiveCamera(
        38,                                           // ← field of view (degrees)
        container.clientWidth / container.clientHeight,
        0.1,
        100,
      );
      camera.position.set(0, 0.5, 4.5);              // ← starting camera position [x, y, z]

      // ── Lighting (3-point studio rig) ────────────────────────────────────
      //
      // Ambient — raises the shadow floor so no face is fully black
      scene.add(new THREE.AmbientLight(0xffffff, 0.75));

      // Key light — primary source, top-right-front
      const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
      keyLight.position.set(4, 6, 4);                // ← key light direction [x, y, z]
      scene.add(keyLight);

      // Fill light — warm amber (matches TecnoMart brand), left-back
      const fillLight = new THREE.DirectionalLight(0xfbbf24, 0.6);
      fillLight.position.set(-4, 3, -2);             // ← fill light direction [x, y, z]
      scene.add(fillLight);

      // Rim light — cool back-light separates model from background
      const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
      rimLight.position.set(0, -3, -4);              // ← rim light direction [x, y, z]
      scene.add(rimLight);

      // ── OrbitControls ─────────────────────────────────────────────────────
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping    = true;               // smooth inertia on release
      controls.dampingFactor    = 0.05;               // ← higher = snappier stop
      controls.enablePan        = false;              // product viewer: no panning
      controls.minDistance      = 2;                  // ← closest zoom
      controls.maxDistance      = 8;                  // ← furthest zoom
      controls.maxPolarAngle    = Math.PI / 1.8;      // prevent flipping under model
      controls.autoRotate       = true;
      controls.autoRotateSpeed  = 1.2;                // ← degrees per second

      // Pause auto-rotate while the user is dragging; resume on release
      controls.addEventListener('start', () => { controls.autoRotate = false; });
      controls.addEventListener('end',   () => { controls.autoRotate = true;  });

      // ── GLTFLoader with MeshoptDecoder ────────────────────────────────────
      const loader = new GLTFLoader();
      loader.setMeshoptDecoder(MeshoptDecoder);

      // ── DRACOLoader (optional — uncomment to support Draco models) ────────
      //
      // const draco = new DRACOLoader();
      // draco.setDecoderPath('/draco/');         // copy decoder WASM to /public/draco/
      // draco.setDecoderConfig({ type: 'wasm' });
      // loader.setDRACOLoader(draco);
      //
      // ─────────────────────────────────────────────────────────────────────

      loader.load(
        MODEL_PATH,

        // onLoad ─────────────────────────────────────────────────────────────
        (gltf) => {
          scene.add(gltf.scene);
          setStatus('ready');
        },

        // onProgress ─────────────────────────────────────────────────────────
        (xhr) => {
          // xhr.total can be 0 if the server doesn't send Content-Length;
          // guard against division-by-zero.
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

      // ── ResizeObserver — keeps the canvas pixel-perfect on container changes
      function syncSize() {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
      const resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(container);

      // ── Render loop ───────────────────────────────────────────────────────
      let rafId;
      function animate() {
        rafId = requestAnimationFrame(animate);
        controls.update(); // required when enableDamping or autoRotate is true
        renderer.render(scene, camera);
      }
      animate();

      // ── Disposal ─────────────────────────────────────────────────────────
      // Called by the useEffect cleanup when the component unmounts.
      cleanupRef.current = () => {
        cancelAnimationFrame(rafId);
        resizeObserver.disconnect();
        controls.dispose();

        // Traverse the scene and release every GPU resource
        scene.traverse((obj) => {
          if (!obj.isMesh) return;

          obj.geometry?.dispose();

          const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
          materials.forEach((mat) => {
            if (!mat) return;
            // Dispose every texture slot on the material
            Object.values(mat).forEach((value) => {
              if (value?.isTexture) value.dispose();
            });
            mat.dispose();
          });
        });

        renderer.dispose();
      };
    }

    // ── IntersectionObserver — lazy init ───────────────────────────────────
    // Three.js only starts when the hero section scrolls into view.
    // On a fast connection the model is ready before the user scrolls far;
    // on slow connections the progress bar has time to appear naturally.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect(); // only init once
        init().catch((err) => {
          console.error('[HeroModel] Init failed:', err);
          setStatus('error');
        });
      },
      { threshold: 0.1 }, // trigger when 10% of the container is visible
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
      className="w-full h-full relative touch-none select-none overflow-hidden"
    >
      {/* Canvas — always in the DOM so Three.js has a target from the start.
          Fades in (opacity transition) once the model finishes loading. */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          status === 'ready' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Status overlays — sit on top of the (invisible) canvas */}
      {status === 'idle'    && <IdlePlaceholder />}
      {status === 'loading' && <ProgressOverlay progress={progress} />}
      {status === 'error'   && <ErrorOverlay />}
    </div>
  );
}
