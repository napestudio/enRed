"use client";

import { Canvas } from "@react-three/fiber";
import AnimatedCubes from "./AnimatedCubes";

export default function Experience() {
  return (
    <div className="fixed z-80 h-screen w-full inset-0 pointer-events-none">
      <Canvas
        className="h-full w-full object-contain pointer-events-none"
        orthographic
        camera={{ zoom: 70, position: [8, 8, 8] }}
      >
        <AnimatedCubes />
      </Canvas>
    </div>
  );
}
