"use client";

import useIsomorphicLayoutEffect from "@/app/lib/custom-hooks/useIsometricLayoutEffect";
import { gsap } from "@/app/lib/gsap";
import { useRef } from "react";
import * as THREE from "three";
import { NOT_FOUND_CUBES } from "./NotFoundPositions";

const POSITIONS = NOT_FOUND_CUBES;

const AXES = ["x", "y", "z"] as const;
type Axis = (typeof AXES)[number];
const MAX_OFFSET = 1;

export default function NotFoundCubes() {
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
  const stepCounts = useRef<number[]>(new Array(POSITIONS.length).fill(0));
  const doneCount = useRef(0);
  const isResetting = useRef(false);

  useIsomorphicLayoutEffect(() => {
    function markDone() {
      doneCount.current++;
      if (doneCount.current >= POSITIONS.length && !isResetting.current) {
        isResetting.current = true;
        resetAllCubes();
      }
    }

    function startCycle() {
      isResetting.current = false;
      doneCount.current = 0;
      refs.current.forEach((group, i) => {
        if (!group) return;
        gsap.delayedCall(i * 0.05 + Math.random() * 0.3, () =>
          animateCube(group, i),
        );
      });
    }

    function resetAllCubes() {
      let resetCompleted = 0;
      const total = refs.current.filter(Boolean).length;

      refs.current.forEach((group, i) => {
        if (!group) return;

        tweenRefs.current[i] = gsap.to(group.position, {
          x: POSITIONS[i].x,
          y: POSITIONS[i].y,
          z: POSITIONS[i].z,
          duration: 2,
          ease: "back.out(1.5)",
          delay: 1,
          onComplete: () => {
            gsap.set(group.position, {
              x: POSITIONS[i].x,
              y: POSITIONS[i].y,
              z: POSITIONS[i].z,
            });
            stepCounts.current[i] = 0;
            lastAxes.current[i] = null;
            offsets.current[i] = { x: 0, y: 0, z: 0 };
            targetPositions.current[i] = { ...POSITIONS[i] };

            resetCompleted++;
            if (resetCompleted >= total) {
              startCycle();
            }
          },
        });
      });
    }

    function animateCube(group: THREE.Group, index: number) {
      if (!isVisible.current || !group || isResetting.current) return;

      if (stepCounts.current[index] >= 3) {
        markDone();
        return;
      }

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
        markDone();
        return;
      }

      const { axis, direction } =
        candidates[Math.floor(Math.random() * candidates.length)];

      lastAxes.current[index] = axis;
      offsets.current[index][axis] += direction;
      targetPositions.current[index][axis] += direction;
      stepCounts.current[index] += 1;

      tweenRefs.current[index] = gsap.to(group.position, {
        [axis]: group.position[axis] + direction,
        duration: 2,
        ease: "back.out(1.5)",
        delay: 2,
        onComplete: () => animateCube(group, index),
      });
    }

    const ctx = gsap.context(() => {
      refs.current.forEach((group) => {
        if (!group) return;

        gsap.from(group.position, {
          y: group.position.y + 2,
          duration: 0.8,
          ease: "back.out(2.5)",
        });
      });

      isVisible.current = true;
      gsap.delayedCall(2, () => startCycle());
    }, refs);

    return () => {
      isVisible.current = false;
      tweenRefs.current.forEach((tween) => tween?.kill());
      ctx.revert();
    };
  }, []);

  return (
    <group position={[3, 0, 0]} rotation={[0, -0.2, 0]} ref={groupRef}>
      {POSITIONS.map((pos, i) => (
        <group
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={[pos.x, pos.y, pos.z]}
        >
          <mesh receiveShadow castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#fff" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
