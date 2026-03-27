"use client";

import { Canvas, useThree } from "@react-three/fiber";
import AnimatedCubes from "./AnimatedCubes";
import { Scroll, ScrollControls } from "@react-three/drei";

// ─── Paste your copied coordinates here to set the editor's starting layout ───

// ─────────────────────────────────────────────────────────────────────────────

export default function Experience() {
  return (
    <div className="fixed z-90 h-full w-full inset-0">
      <Canvas
        className="h-full w-full object-contain bg-red-400"
        orthographic
        // True isometric: equal distance on all three axes → 45° horizontal, ~35.26° elevation
        camera={{ zoom: 70, position: [8, 8, 8] }}
      >
        <AnimatedCubes />
      </Canvas>
    </div>
  );
}
