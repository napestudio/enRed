"use client";

import useIsomorphicLayoutEffect from "@/app/lib/custom-hooks/useIsometricLayoutEffect";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

// ─── Paste your copied coordinates here ───────────────────────────────────────
const POSITIONS = [
  {
    x: -1,
    y: 3,
    z: 1,
  },
  {
    x: -1,
    y: 3,
    z: 4,
  },
  {
    x: 0,
    y: 3,
    z: 1,
  },
  {
    x: 2,
    y: 3,
    z: 1,
  },
  {
    x: 1,
    y: 3,
    z: 1,
  },
  {
    x: -2,
    y: 3,
    z: 2,
  },
  {
    x: -1,
    y: 2,
    z: 4,
  },
  {
    x: 2,
    y: 3,
    z: 0,
  },
  {
    x: -3,
    y: 0,
    z: 6,
  },
  {
    x: -2,
    y: 3,
    z: 1,
  },
  {
    x: 0,
    y: 1,
    z: 5,
  },
  {
    x: 3,
    y: 3,
    z: 0,
  },
  {
    x: -3,
    y: 1,
    z: 6,
  },
  {
    x: -1,
    y: 3,
    z: 3,
  },
  {
    x: -1,
    y: 0,
    z: 5,
  },
  {
    x: -2,
    y: 1,
    z: 6,
  },
  {
    x: -1,
    y: 1,
    z: 5,
  },
  {
    x: 0,
    y: 0,
    z: 5,
  },
  {
    x: -2,
    y: 0,
    z: 6,
  },
  {
    x: 3,
    y: 2,
    z: 0,
  },
  {
    x: 3,
    y: 2,
    z: 1,
  },
  {
    x: 3,
    y: 2,
    z: 2,
  },
  {
    x: 3,
    y: 2,
    z: 3,
  },
  {
    x: 2,
    y: 2,
    z: 3,
  },
  {
    x: 2,
    y: 2,
    z: 4,
  },
  {
    x: 2,
    y: 2,
    z: 5,
  },
  {
    x: 2,
    y: 2,
    z: 6,
  },
  {
    x: -2,
    y: 3,
    z: 3,
  },
];
// ──────────────────────────────────────────────────────────────────────────────

export default function AnimatedCubes() {
  const refs = useRef<(THREE.Group | null)[]>([]);
  const groupRef = useRef<THREE.Group>(null);

  const { viewport } = useThree();

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      refs.current.forEach((group, i) => {
        if (!group) return;

        gsap.from(group.position, {
          y: group.position.y + 2,
          duration: 0.8,
          ease: "back.out(1.4)",
        });
      });

      if (!groupRef.current) return;

      const section = document.querySelector(
        '[data-slice-type="intro_text_feature_graphic"]',
      ) as HTMLElement | null;
      if (!section) return;

      const tl = gsap
        .timeline({ paused: true })
        .fromTo(
          groupRef.current.position,
          { y: -viewport.height },
          { y: viewport.height, ease: "none" },
        );

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        animation: tl,
        scrub: true,
      });
    }, refs);

    return () => ctx.revert();
  }, []);

  return (
    <group position={[0, 0, 0]} ref={groupRef}>
      {POSITIONS.map((pos, i) => (
        <group
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={[pos.x, pos.y, pos.z]}
        >
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#f03c32" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
