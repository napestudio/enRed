"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MathUtils } from "three";
import Cubes from "./Cubes";

export default function Experience() {
  return (
    <Canvas
      className="h-full w-full"
      orthographic
      camera={{
        zoom: 80,
        position: [10, 10, 10],
        rotation: [MathUtils.degToRad(-35.264), MathUtils.degToRad(45), 0],
      }}
    >
      <Cubes />
    </Canvas>
  );
}
