"use client";

import { usePathname } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import AnimatedCubes from "./AnimatedCubes";
import FooterCubes from "./FooterCubes";

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
        gl={{ antialias: false }}
      >
        {pathname === "/" && <AnimatedCubes />}
        <FooterCubes />
      </Canvas>
    </div>
  );
}
