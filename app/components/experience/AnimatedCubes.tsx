"use client";

import useIsomorphicLayoutEffect from "@/app/lib/custom-hooks/useIsometricLayoutEffect";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import { useMediaQuery } from "@mantine/hooks";
import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { INITIAL_POSITIONS } from "./InitialPositions";

// ─── Paste your copied coordinates here ───────────────────────────────────────
const POSITIONS = INITIAL_POSITIONS;
// ──────────────────────────────────────────────────────────────────────────────

const AXES = ["x", "y", "z"] as const;
type Axis = (typeof AXES)[number];
const MAX_OFFSET = 1;

export default function AnimatedCubes() {
  const refs = useRef<(THREE.Group | null)[]>([]);
  const groupRef = useRef<THREE.Group>(null);
  const lastAxes = useRef<(Axis | null)[]>(
    new Array(POSITIONS.length).fill(null),
  );
  const tweenRefs = useRef<(gsap.core.Tween | null)[]>(
    new Array(POSITIONS.length).fill(null),
  );
  const offsets = useRef<Record<Axis, number>[]>(
    POSITIONS.map(() => ({ x: 0, y: 0, z: 0 })),
  );
  const targetPositions = useRef<{ x: number; y: number; z: number }[]>(
    POSITIONS.map((p) => ({ ...p })),
  );
  const isVisible = useRef(false);

  const { viewport } = useThree();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  useIsomorphicLayoutEffect(() => {
    function animateCube(group: THREE.Group, index: number) {
      if (!isVisible.current || !group) return;

      const available = AXES.filter((a) => a !== lastAxes.current[index]);

      type Move = { axis: Axis; direction: 1 | -1 };
      const candidates: Move[] = [];

      for (const axis of available) {
        for (const dir of [1, -1] as const) {
          if (Math.abs(offsets.current[index][axis] + dir) > MAX_OFFSET)
            continue;

          const newPos = {
            ...targetPositions.current[index],
            [axis]: targetPositions.current[index][axis] + dir,
          };
          const connected = targetPositions.current.some((tp, j) => {
            if (j === index) return false;
            return (
              Math.abs(tp.x - newPos.x) +
                Math.abs(tp.y - newPos.y) +
                Math.abs(tp.z - newPos.z) ===
              1
            );
          });
          if (!connected) continue;

          candidates.push({ axis, direction: dir });
        }
      }

      if (candidates.length === 0) {
        gsap.delayedCall(2, () => animateCube(group, index));
        return;
      }

      const { axis, direction } =
        candidates[Math.floor(Math.random() * candidates.length)];

      lastAxes.current[index] = axis;
      offsets.current[index][axis] += direction;
      targetPositions.current[index][axis] += direction;

      tweenRefs.current[index] = gsap.to(group.position, {
        [axis]: group.position[axis] + direction,
        duration: 2,
        ease: "back.out(1.5)",
        delay: 2,
        onComplete: () => animateCube(group, index),
      });
    }

    const ctx = gsap.context(() => {
      refs.current.forEach((group, i) => {
        if (!group) return;

        gsap.from(group.position, {
          y: group.position.y + 2,
          duration: 0.8,
          ease: "back.out(2.5)",
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
        scrub: 0.1,
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          isVisible.current = self.isActive;
          if (self.isActive) {
            refs.current.forEach((group, i) => {
              if (!group) return;
              gsap.delayedCall(i * 0.05 + Math.random() * 0.3, () =>
                animateCube(group, i),
              );
            });
          } else {
            tweenRefs.current.forEach((tween) => tween?.kill());
            refs.current.forEach((group, i) => {
              if (!group) return;
              gsap.set(group.position, POSITIONS[i]);
              lastAxes.current[i] = null;
              offsets.current[i] = { x: 0, y: 0, z: 0 };
              targetPositions.current[i] = { ...POSITIONS[i] };
            });
          }
        },
      });
    }, refs);

    return () => {
      isVisible.current = false;
      tweenRefs.current.forEach((tween) => tween?.kill());
      ctx.revert();
    };
  }, []);

  return (
    <group position={[isSmallScreen ? 2 : 0, isSmallScreen ? 2.5 : 0, 0]}>
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
    </group>
  );
}
