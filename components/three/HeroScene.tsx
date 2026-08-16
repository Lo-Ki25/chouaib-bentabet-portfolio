"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

type HeroSceneProps = {
  /** Coupe la boucle de rendu (onglet masqué) sans démonter le Canvas. */
  paused?: boolean;
  /** Appelé une fois le contexte WebGL prêt — sert au fondu d'apparition dans Hero.tsx. */
  onReady?: () => void;
};

function AbstractShape({ paused }: { paused?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (paused || !meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.12;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      state.pointer.y * 0.25,
      0.04
    );
  });

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={1.5}>
        <torusKnotGeometry args={[1, 0.32, 200, 32]} />
        <MeshDistortMaterial
          color="#3B6BFF"
          emissive="#8B5CF6"
          emissiveIntensity={0.2}
          distort={0.35}
          speed={1.3}
          roughness={0.15}
          metalness={0.65}
        />
      </mesh>
    </Float>
  );
}

/**
 * Scène 3D abstraite du Hero — chargée uniquement via next/dynamic({ssr:false})
 * depuis Hero.tsx, et seulement quand mounted + !prefersReducedMotion +
 * pointeur fin. hero-network.png reste toujours le fallback rendu en dessous.
 */
export default function HeroScene({ paused, onReady }: HeroSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={() => onReady?.()}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 3, 5]} intensity={1.4} color="#22D3EE" />
      <pointLight position={[-4, -2, -3]} intensity={0.9} color="#8B5CF6" />
      <Suspense fallback={null}>
        <AbstractShape paused={paused} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
