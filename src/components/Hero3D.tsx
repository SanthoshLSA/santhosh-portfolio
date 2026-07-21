"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Wireframe } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

function Icosahedron() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { resolvedTheme } = useTheme();

  const isLight = resolvedTheme === "light";
  const glowColor = isLight ? "#a855f7" : "#d8b4fe";
  const emissiveIntensity = isLight ? 0.5 : 2;

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Base rotation
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
      
      // Speed up rotation based on scroll position
      const scrollY = window.scrollY;
      meshRef.current.rotation.y += scrollY * 0.00005;
    }
  });

  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={0.5} // XYZ rotation intensity
      floatIntensity={1.5} // Up/down float intensity
    >
      <mesh ref={meshRef} scale={1.5}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={glowColor}
          emissive={glowColor}
          emissiveIntensity={emissiveIntensity}
          wireframe
          transparent
          opacity={isLight ? 0.4 : 0.8}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none flex items-center justify-center">
      <div className="w-[600px] h-[600px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Icosahedron />
        </Canvas>
      </div>
    </div>
  );
}
