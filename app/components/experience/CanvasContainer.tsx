"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MathUtils } from "three";
import Cube from "./Cube";

export default function CanvasContainer() {
  return (
    <Canvas
      className="w-full h-full"
      orthographic
      camera={{
        zoom: 60,
        position: [2, 2, 2],
        rotation: [MathUtils.degToRad(-35.264), MathUtils.degToRad(45), 0],
      }}
    >
      {/* Lock rotation for true isometric */}
      <OrbitControls enableRotate={false} enablePan={false} />

      <ambientLight intensity={2} />

      <Cube />
      {/* <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh> */}
    </Canvas>
  );
}
