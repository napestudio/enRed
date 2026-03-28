"use client";

import { Text } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useEffect } from "react";

export type CubeData = { id: string; x: number; y: number; z: number };

// Rotation that points the default +Y axis toward each direction.
// ConeGeometry tip is at +Y by default.
const ARROWS = [
  {
    axis: "x" as const,
    dir: 1 as const,
    rot: [0, 0, -Math.PI / 2] as [number, number, number],
    color: "#e05555",
  },
  {
    axis: "x" as const,
    dir: -1 as const,
    rot: [0, 0, Math.PI / 2] as [number, number, number],
    color: "#e05555",
  },
  {
    axis: "y" as const,
    dir: 1 as const,
    rot: [0, 0, 0] as [number, number, number],
    color: "#55cc55",
  },
  {
    axis: "y" as const,
    dir: -1 as const,
    rot: [Math.PI, 0, 0] as [number, number, number],
    color: "#55cc55",
  },
  {
    axis: "z" as const,
    dir: 1 as const,
    rot: [Math.PI / 2, 0, 0] as [number, number, number],
    color: "#5588e8",
  },
  {
    axis: "z" as const,
    dir: -1 as const,
    rot: [-Math.PI / 2, 0, 0] as [number, number, number],
    color: "#5588e8",
  },
];

type CubesProps = {
  cubes: CubeData[];
  setCubes: React.Dispatch<React.SetStateAction<CubeData[]>>;
  selectedId: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
  previewMode: boolean;
};

export default function Cubes({
  cubes,
  setCubes,
  selectedId,
  setSelectedId,
  previewMode,
}: CubesProps) {
  const moveCube = (id: string, dx: number, dy: number, dz: number) => {
    setCubes((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, x: c.x + dx, y: c.y + dy, z: c.z + dz } : c,
      ),
    );
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!selectedId) return;
      const map: Record<string, [number, number, number]> = {
        ArrowRight: [1, 0, 0],
        ArrowLeft: [-1, 0, 0],
        ArrowDown: [0, 0, 1],
        ArrowUp: [0, 0, -1],
        e: [0, 1, 0],
        E: [0, 1, 0],
        q: [0, -1, 0],
        Q: [0, -1, 0],
      };
      if (map[e.key]) {
        e.preventDefault();
        const [dx, dy, dz] = map[e.key];
        setCubes((prev) =>
          prev.map((c) =>
            c.id === selectedId
              ? { ...c, x: c.x + dx, y: c.y + dy, z: c.z + dz }
              : c,
          ),
        );
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        setCubes((prev) => prev.filter((c) => c.id !== selectedId));
        setSelectedId(null);
      }
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, setCubes, setSelectedId]);

  return (
    <>
      {!previewMode && (
        <gridHelper
          args={[20, 20, "#444444", "#333333"]}
          position={[0, -0.5, 0]}
        />
      )}

      {cubes.map((cube) => {
        const isSelected = cube.id === selectedId;
        return (
          <group key={cube.id} position={[cube.x, cube.y, cube.z]}>
            {/* Cube body */}
            <mesh
              onClick={(e: ThreeEvent<MouseEvent>) => {
                e.stopPropagation();
                if (!previewMode)
                  setSelectedId((prev) => (prev === cube.id ? null : cube.id));
              }}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color={isSelected ? "#ffcc00" : "#e14d37"} />
            </mesh>

            {/* Coordinate label on top face */}
            {!previewMode && (
              <Text
                position={[0, 0.502, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                fontSize={0.18}
                color={isSelected ? "#333" : "white"}
                anchorX="center"
                anchorY="middle"
              >
                {`${cube.x},${cube.y},${cube.z}`}
              </Text>
            )}

            {/* Blender-style axis arrows (only on selected cube) */}
            {isSelected &&
              !previewMode &&
              ARROWS.map((arrow, i) => {
                const dx = arrow.axis === "x" ? arrow.dir : 0;
                const dy = arrow.axis === "y" ? arrow.dir : 0;
                const dz = arrow.axis === "z" ? arrow.dir : 0;
                const handleClick = (e: ThreeEvent<MouseEvent>) => {
                  e.stopPropagation();
                  moveCube(cube.id, dx, dy, dz);
                };
                return (
                  // Rotate the whole arrow so +Y becomes the target axis direction
                  <group key={i} rotation={arrow.rot}>
                    {/* Shaft: from cube face (0.5) to 1.0 — center at 0.75 */}
                    <mesh position={[0, 0.75, 0]} onClick={handleClick}>
                      <cylinderGeometry args={[0.025, 0.025, 0.5, 8]} />
                      <meshBasicMaterial color={arrow.color} />
                    </mesh>
                    {/* Arrowhead cone — base at 1.0, tip at 1.2 */}
                    <mesh position={[0, 1.1, 0]} onClick={handleClick}>
                      <coneGeometry args={[0.1, 0.2, 8]} />
                      <meshBasicMaterial color={arrow.color} />
                    </mesh>
                  </group>
                );
              })}
          </group>
        );
      })}
    </>
  );
}
