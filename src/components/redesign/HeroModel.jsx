"use client";

import { Suspense, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, PresentationControls, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

// Apply ACES tone mapping once the renderer is ready — gives soft, cinematic output
function RendererSetup() {
  const { gl } = useThree();
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 0.88;
  }, [gl]);
  return null;
}

// Outer <group> handles auto-rotation via useFrame.
// Float sits inside so it floats/wobbles independently.
// Keeping them separate means PresentationControls spring physics
// don't reset the accumulated Y-rotation when drag ends.
function RotatingModel({ scale, position }) {
  const { scene } = useGLTF('/3d-model.glb');
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.22;
  });

  return (
    <group ref={groupRef}>
      <Float
        speed={1.4}
        rotationIntensity={0.08}
        floatIntensity={0.28}
        floatingRange={[-0.03, 0.03]}
      >
        <primitive object={scene} scale={scale} position={position} />
      </Float>
    </group>
  );
}

// Reads the canvas size inside the WebGL context (avoids a CSS resize observer race).
function Scene() {
  const { size } = useThree();

  const { scale, position, shadowY } = useMemo(() => {
    const w = size.width;
    if (w < 480)  return { scale: 2.4, position: [0,  0.05, 0], shadowY: -0.50 };
    if (w < 768)  return { scale: 2.8, position: [0,  0.00, 0], shadowY: -0.60 };
    if (w < 1024) return { scale: 3.1, position: [0, -0.05, 0], shadowY: -0.70 };
    return              { scale: 3.5, position: [0, -0.10, 0], shadowY: -0.80 };
  }, [size.width]);

  return (
    <>
      <RendererSetup />

      {/* Soft 3-point studio lighting with warm brand accent */}
      <ambientLight intensity={0.75} />
      <directionalLight position={[ 4,  6,  4]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-4,  3, -2]} intensity={0.6} color="#fbbf24" />
      <pointLight       position={[ 0,  2,  2]} intensity={0.7} color="#f59e0b" decay={2} />

      {/* Interactive drag controls wrap ONLY the model */}
      <PresentationControls
        global={false}
        polar={[-0.25,  0.25]}
        azimuth={[-0.70, 0.70]}
        config={{ mass: 1.5, tension: 280 }}
        snap={{ mass: 2.5, tension: 220 }}
        cursor
      >
        <RotatingModel scale={scale} position={position} />
      </PresentationControls>

      {/* Shadow lives OUTSIDE PresentationControls — stays flat on the ground
          and does not rotate when the user drags the model */}
      <ContactShadows
        position={[0, shadowY, 0]}
        opacity={0.38}
        scale={6}
        blur={3}
        far={3}
        resolution={256}
        color="#1a1a2e"
      />

      {/* Studio preset: even, diffuse, no harsh specular spikes */}
      <Environment preset="studio" environmentIntensity={0.7} />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-4 border-amber-500/30 border-t-amber-500 animate-spin" />
        <span className="text-xs text-amber-600 font-medium tracking-wide">Loading 3D Model…</span>
      </div>
    </div>
  );
}

export default function HeroModel() {
  return (
    <div className="w-full h-full relative touch-none select-none">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          camera={{ position: [0, 0.05, 4.3], fov: 38 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: false,
          }}
          style={{ background: 'transparent' }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}

useGLTF.preload('/3d-model.glb');
