"use client";

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PresentationControls, Environment, ContactShadows } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/3d-model.glb');
  const ref = useRef();

  // Gentle constant auto-rotation when not being dragged
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.25;
    }
  });

  return <primitive ref={ref} object={scene} scale={1} position={[0, -0.5, 0]} />;
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-4 border-amber-500/30 border-t-amber-500 animate-spin" />
        <span className="text-xs text-neutral-400 font-medium tracking-wide">Loading 3D Model…</span>
      </div>
    </div>
  );
}

export default function HeroModel() {
  return (
    <div className="w-full h-full relative">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 1, 5], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <directionalLight position={[-5, 3, -5]} intensity={0.4} color="#f59e0b" />

          <PresentationControls
            global
            polar={[-0.3, 0.3]}
            azimuth={[-0.8, 0.8]}
            config={{ mass: 2, tension: 300 }}
            snap={{ mass: 4, tension: 300 }}
          >
            <Model />
          </PresentationControls>

          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.35}
            scale={6}
            blur={2.5}
            far={4}
          />

          <Environment preset="city" />
        </Canvas>
      </Suspense>
    </div>
  );
}

// Preload so the model starts downloading immediately
useGLTF.preload('/3d-model.glb');
