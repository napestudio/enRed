"use client";

import { usePathname } from "next/navigation";
import { Canvas, useFrame } from "@react-three/fiber";
import AnimatedCubes from "./AnimatedCubes";
import FooterCubes from "./FooterCubes";
import { getLenis } from "../GSAPProvider";

function LenisSyncer() {
  useFrame(() => {
    getLenis()?.raf(performance.now());
  });
  return null;
}

export default function Experience() {
  const pathname = usePathname();
  return (
    <div className="fixed z-50 h-screen w-full inset-0 pointer-events-none **:pointer-events-none!">
      <Canvas
        className="h-full z-50 w-full pointer-events-none"
        events={undefined}
        orthographic
        camera={{ zoom: 75, position: [8, 8, 8] }}
        dpr={[1, 1.5]}
      >
        <LenisSyncer />
        {pathname === "/" && <AnimatedCubes />}
        <FooterCubes />
      </Canvas>
    </div>
  );
}
