"use client";

import { Suspense, useRef } from "react";
import { Center, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useReducedMotion,
  useScroll,
  type MotionValue,
} from "framer-motion";
import { MathUtils, type Group } from "three";

const MODEL_PATH = "/models/low-poly-coffee-cup.glb";

interface RotatingCoffeeCupProps {
  reduceMotion: boolean;
  scrollProgress: MotionValue<number>;
}

function RotatingCoffeeCup({
  reduceMotion,
  scrollProgress,
}: RotatingCoffeeCupProps) {
  const groupRef = useRef<Group>(null);
  const easedProgressRef = useRef(0);
  const idleRotationRef = useRef(0);
  const { scene } = useGLTF(MODEL_PATH);
  const { viewport } = useThree();
  const isCompact = viewport.width < 4.5;

  useFrame((_state, delta) => {
    if (!groupRef.current) {
      return;
    }

    const targetProgress = scrollProgress.get();
    easedProgressRef.current = reduceMotion
      ? targetProgress
      : MathUtils.damp(easedProgressRef.current, targetProgress, 3.5, delta);

    const progress = easedProgressRef.current;
    const horizontalRange = viewport.width * (isCompact ? 0.28 : 0.36);

    groupRef.current.position.x = MathUtils.lerp(
      horizontalRange,
      -horizontalRange,
      progress,
    );
    groupRef.current.rotation.z = MathUtils.lerp(0.1, -0.1, progress);

    if (reduceMotion) {
      groupRef.current.rotation.y = -0.55;
      return;
    }

    idleRotationRef.current += delta * 0.12;
    groupRef.current.rotation.y =
      -0.55 + idleRotationRef.current + progress * Math.PI * 2;
  });

  return (
    <group
      ref={groupRef}
      position={[
        isCompact ? viewport.width * 0.3 : viewport.width * 0.36,
        isCompact ? viewport.height * 0.28 : viewport.height * 0.08,
        0,
      ]}
      rotation={[0.16, -0.55, 0.1]}
      scale={isCompact ? 1.25 : 1.75}
    >
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

export default function CoffeeCupBackground() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 opacity-45 md:opacity-55"
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 8], zoom: 105 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[4, 6, 8]} intensity={3.2} />
        <directionalLight position={[-5, -2, 4]} intensity={1.2} color="#FFE06B" />
        <Suspense fallback={null}>
          <RotatingCoffeeCup
            reduceMotion={shouldReduceMotion}
            scrollProgress={scrollYProgress}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
