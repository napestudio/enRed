"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function BasicCube() {
  const cubeRef = useRef<THREE.Mesh>(null);
  const cube2Ref = useRef<THREE.Mesh>(null);
  const cube3Ref = useRef<THREE.Mesh>(null);
  const cube4Ref = useRef<THREE.Mesh>(null);
  const cube5Ref = useRef<THREE.Mesh>(null);
  const cube6Ref = useRef<THREE.Mesh>(null);
  const cube7Ref = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (
      !cubeRef.current ||
      !cube2Ref.current ||
      !cube3Ref.current ||
      !cube4Ref.current ||
      !cube5Ref.current ||
      !cube6Ref.current ||
      !cube7Ref.current
    )
      return;
    console.log(cubeRef.current);
    const tween = gsap
      .timeline({ paused: true })
      .to(
        [
          cubeRef.current.rotation,
          cube2Ref.current.rotation,
          cube3Ref.current.rotation,
          cube4Ref.current.rotation,
          cube5Ref.current.rotation,
          cube6Ref.current.rotation,
          cube7Ref.current.rotation,
        ],
        {
          x: Math.PI / 2,
          duration: 2,
          ease: "power2.inOut",
        },
      )
      .to([cubeRef.current.position, cube2Ref.current.position], {
        x: -1,
        duration: 2,
        ease: "power2.inOut",
      })
      .to(
        [cube3Ref.current.position, cube4Ref.current.position],
        {
          y: -1,
          duration: 2,
          ease: "power2.inOut",
        },
        "<",
      )
      .to(
        [cube5Ref.current.position, cube6Ref.current.position],
        {
          z: -1,
          duration: 2,
          ease: "power2.inOut",
        },
        "<",
      )
      .to(cube2Ref.current.position, {
        y: 1,
        duration: 2,
        ease: "power2.inOut",
      })
      .to(
        cube4Ref.current.position,
        {
          z: 1,
          duration: 2,
          ease: "power2.inOut",
        },
        "<",
      )
      .to(
        cube6Ref.current.position,
        {
          x: 1,
          duration: 2,
          ease: "power2.inOut",
        },
        "<",
      );

    tween.play();
    return () => {
      tween.kill();
    };
  }, []);
  return (
    <>
      <mesh ref={cubeRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh ref={cube2Ref}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh ref={cube3Ref}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh ref={cube4Ref}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh ref={cube5Ref}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh ref={cube6Ref}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh ref={cube7Ref}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
}
