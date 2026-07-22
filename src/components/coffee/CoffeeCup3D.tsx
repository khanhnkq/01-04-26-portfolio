"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

function CoffeeCupMesh({ cupsCount }: { cupsCount: number }) {
  const cupGroupRef = useRef<THREE.Group>(null);
  const steamRef = useRef<THREE.Group>(null);

  // Subtle rotation animation
  useFrame((state, delta) => {
    if (cupGroupRef.current) {
      cupGroupRef.current.rotation.y += delta * 0.4;
    }
    if (steamRef.current) {
      steamRef.current.rotation.y -= delta * 0.2;
    }
  });

  return (
    <group ref={cupGroupRef} position={[0, -0.5, 0]}>
      {/* ===== COFFEE CUP BODY ===== */}
      {/* Outer Ceramic Cup */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 0.9, 2, 32]} />
        <meshStandardMaterial color="#FFE06B" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Inner Ceramic Lining */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1.12, 0.82, 1.9, 32]} />
        <meshStandardMaterial color="#FFF9EF" roughness={0.3} />
      </mesh>

      {/* Coffee Liquid Surface */}
      <mesh position={[0, 0.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.1, 32]} />
        <meshStandardMaterial color="#4A2511" roughness={0.1} metalness={0.2} />
      </mesh>

      {/* Coffee Heart Foam / Crema pattern */}
      <mesh position={[0, 0.71, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.4, 32]} />
        <meshStandardMaterial color="#F2E8D5" roughness={0.5} />
      </mesh>

      {/* Cup Handle */}
      <mesh position={[1.3, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[0.6, 0.18, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#FFE06B" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Plate / Saucer */}
      <mesh position={[0, -1.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.8, 1.4, 0.15, 32]} />
        <meshStandardMaterial color="#FFF9EF" roughness={0.3} />
      </mesh>

      {/* ===== FLOATING COFFEE BEANS / STARS ===== */}
      <group ref={steamRef} position={[0, 1.2, 0]}>
        <Sparkles
          count={Math.min(cupsCount * 15, 60)}
          scale={2.5}
          size={4}
          speed={0.6}
          color="#FFE06B"
        />
      </group>
    </group>
  );
}

export default function CoffeeCup3D({ cupsCount = 1 }: { cupsCount: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[320px] md:h-[400px] flex items-center justify-center bg-brand-blue/30 rounded-3xl border-2 border-brand-yellow/20">
        <span className="font-script text-brand-yellow text-2xl md:text-3xl animate-pulse">
          Brewing fresh coffee... (づ｡◕‿‿◕｡)づ
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[320px] md:h-[420px] rounded-3xl overflow-hidden bg-gradient-to-b from-brand-blue/40 to-brand-blue/80 border-2 border-brand-yellow/30 shadow-2xl flex flex-col items-center justify-center">
      {/* Badge label with Kaomoji */}
      <motion.div 
        key={cupsCount}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="absolute top-4 left-4 z-10 px-4 py-1.5 rounded-full bg-brand-yellow text-brand-blue font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2"
      >
        <span>(♡ ‿ ♡)</span>
        <span>{cupsCount} {cupsCount === 1 ? "Cup" : "Cups"} Of Coffee</span>
      </motion.div>

      <Canvas
        shadows
        camera={{ position: [0, 1.5, 4.5], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} castShadow />
        <pointLight position={[-4, -2, -2]} intensity={0.5} color="#FFE06B" />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <CoffeeCupMesh cupsCount={cupsCount} />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      <div className="absolute bottom-3 text-center pointer-events-none">
        <span className="font-script text-brand-white/70 text-sm">
          Drag mouse to rotate 3D coffee cup! (^ ᴗ ^)
        </span>
      </div>
    </div>
  );
}
