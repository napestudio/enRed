"use client";

import { Canvas } from "@react-three/fiber";
import NotFoundCubes from "./NotFoundCubes";

export default function NotFoundExperience() {
  return (
    <div className="fixed z-50 h-screen w-full inset-0 pointer-events-none **:pointer-events-none!">
      <Canvas
        className="h-full z-50 w-full pointer-events-none"
        events={undefined}
        orthographic
        camera={{ zoom: 75, position: [6, 6, 6] }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 0]} intensity={1} />
        <NotFoundCubes />
      </Canvas>
    </div>
  );
}
