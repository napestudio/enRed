"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Cubes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const dummy = new THREE.Object3D();

  // Layout describing the cubes (1 = cube, 0 = empty)
  const layout = [
    [0, 0, 0, 0, 0],
    [1, 0, 1, 1, 0],
    [1, 1, 3, 1, 1],
    [0, 1, 1, 4, 1],
    [0, 0, 1, 2, 0],
  ];

  const positions: { x: number; y: number }[] = [];

  const cubeSize = 1;
  const isoX = 1;
  const isoY = 1;

  layout.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (!cell) return;

      positions.push({
        x: c * isoX,
        y: -r * isoY,
      });
    });
  });

  const count = positions.length;

  useEffect(() => {
    if (!meshRef.current) return;

    positions.forEach((p, i) => {
      dummy.position.set(p.x, p.y, 0);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
      <meshBasicMaterial color="#e14d37" />
    </instancedMesh>
  );
}
