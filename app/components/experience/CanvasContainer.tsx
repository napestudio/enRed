"use client";

import { Canvas } from "@react-three/fiber";
import { EdificioModel } from "./Edificio";
import { Float } from "@react-three/drei";

export default function CanvasContainer() {
  return (
    <Canvas className="w-full h-full">
      {/*<OrbitControls />*/}
      <ambientLight intensity={2} />
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <EdificioModel position={[0, 0, 0]} />
      </Float>
    </Canvas>
  );
}
