"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import Cubes, { type CubeData } from "./Cubes";
import AnimatedCubes from "./AnimatedCubes";
import { INITIAL_POSITIONS } from "./InitialPositions";

// ─── Paste your copied coordinates here to set the editor's starting layout ───
const initialLayout = INITIAL_POSITIONS;
// ─────────────────────────────────────────────────────────────────────────────

function buildInitialCubes(): CubeData[] {
  return initialLayout.map((pos, i) => ({ id: `init-${i}`, ...pos }));
}

export default function DebugExperience() {
  const [cubes, setCubes] = useState<CubeData[]>(buildInitialCubes);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedCube = cubes.find((c) => c.id === selectedId);

  const copyToClipboard = () => {
    const arr = cubes.map(({ x, y, z }) => ({ x, y, z }));
    navigator.clipboard.writeText(JSON.stringify(arr, null, 2)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const addCube = () => {
    const id = crypto.randomUUID();
    setCubes((prev) => [...prev, { id, x: 0, y: 0, z: 0 }]);
    setSelectedId(id);
  };

  return (
    <div className="relative h-full w-full">
      <Canvas
        className="h-full w-full"
        orthographic
        // True isometric: equal distance on all three axes → 45° horizontal, ~35.26° elevation
        camera={{ zoom: 80, position: [10, 10, 10] }}
        onPointerMissed={() => setSelectedId(null)}
      >
        {/* <OrbitControls makeDefault /> */}
        <Cubes
          cubes={cubes}
          setCubes={setCubes}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          previewMode={previewMode}
        />
        {/* <AnimatedCubes /> */}
      </Canvas>

      <div className="absolute top-4 right-4 flex flex-col gap-2 bg-black/80 text-white p-4 rounded-lg w-56 font-mono text-xs select-none">
        <div className="flex justify-between items-center">
          <span className="font-bold text-sm">Cube Editor</span>
          <button
            onClick={() => setPreviewMode((p) => !p)}
            className="bg-neutral-600 hover:bg-neutral-500 px-2 py-0.5 rounded cursor-pointer"
          >
            {previewMode ? "Edit" : "Preview"}
          </button>
        </div>

        {!previewMode && (
          <div className="text-neutral-400 leading-relaxed border-t border-neutral-700 pt-2">
            <div>Click cube → select</div>
            <div>
              <span style={{ color: "#e05555" }}>■</span> X &nbsp;
              <span style={{ color: "#55cc55" }}>■</span> Y &nbsp;
              <span style={{ color: "#5588e8" }}>■</span> Z arrows → move
            </div>
            <div>← → ↑ ↓ &nbsp;&nbsp; X / Z</div>
            <div>Q / E &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Y (height)</div>
            <div>Del / Esc &nbsp; remove / deselect</div>
          </div>
        )}

        {selectedCube && (
          <div className="bg-neutral-800 rounded p-2 border-t border-neutral-700 pt-2">
            <div className="text-neutral-400 mb-1">Selected</div>
            <div className="text-yellow-300">
              x:{selectedCube.x} &nbsp; y:{selectedCube.y} &nbsp; z:
              {selectedCube.z}
            </div>
          </div>
        )}

        <div className="max-h-48 overflow-y-auto space-y-0.5 border-t border-neutral-700 pt-2">
          {cubes.map((cube) => (
            <div
              key={cube.id}
              onClick={() => setSelectedId(cube.id)}
              className={`px-1 py-0.5 rounded cursor-pointer ${
                cube.id === selectedId
                  ? "bg-neutral-700 text-yellow-300"
                  : "text-neutral-400 hover:bg-neutral-800"
              }`}
            >
              {`{x:${cube.x}, y:${cube.y}, z:${cube.z}}`}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1 border-t border-neutral-700 pt-2">
          {!previewMode && (
            <button
              onClick={addCube}
              className="w-full py-1.5 bg-neutral-600 hover:bg-neutral-500 rounded cursor-pointer"
            >
              + Add Cube
            </button>
          )}
          <button
            onClick={copyToClipboard}
            className="w-full py-1.5 bg-[#e14d37] hover:bg-[#c43c2a] rounded cursor-pointer"
          >
            {copied ? "Copied!" : "Copy Coordinates"}
          </button>
          <button
            onClick={() => {
              setCubes(buildInitialCubes());
              setSelectedId(null);
            }}
            className="w-full py-1.5 bg-neutral-700 hover:bg-neutral-600 rounded cursor-pointer"
          >
            Reset
          </button>
          <div className="text-center text-neutral-500">
            {cubes.length} cubes
          </div>
        </div>
      </div>
    </div>
  );
}
