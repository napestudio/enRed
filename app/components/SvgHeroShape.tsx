"use client";

import { useRef } from "react";
import { gsap } from "../lib/gsap";
import useIsomorphicLayoutEffect from "../lib/custom-hooks/useIsometricLayoutEffect";

export default function SvgHeroShape() {
  const shapeRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!pathRef.current) return;

      const length = pathRef.current.getTotalLength();

      gsap.set(pathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 5,
        ease: "power4.inOut",
      });
    }, shapeRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      width="793"
      height="497"
      viewBox="0 0 793 497"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      ref={shapeRef}
    >
      <path
        d="M397.75 393.439L506.247 456.174C507.022 456.625 507.979 456.625 508.747 456.174L561.745 425.531C562.521 425.088 563.477 425.088 564.253 425.538L672.742 488.662C673.518 489.113 674.481 489.113 675.257 488.662L783.753 425.531C784.522 425.081 785 424.255 785 423.368V329.976C785 329.081 784.522 328.256 783.746 327.805L730.749 297.162C729.973 296.718 729.501 295.886 729.501 294.992V105.336C729.501 104.442 729.023 103.616 728.248 103.166L564.253 8.33808C563.477 7.88734 562.521 7.88734 561.745 8.33808L508.747 38.9811C507.979 39.4318 507.5 40.257 507.5 41.1515V166.629C507.5 167.524 507.022 168.349 506.247 168.793L397.75 231.535C396.975 231.979 396.019 231.979 395.25 231.535L342.252 200.885C341.476 200.441 340.52 200.441 339.744 200.885L286.753 231.535C285.978 231.979 285.021 231.979 284.246 231.535L120.251 136.707C119.475 136.257 118.519 136.257 117.75 136.707L64.7524 167.35C63.9765 167.794 63.4985 168.626 63.4985 169.521V230.807C63.4985 231.708 63.0205 232.534 62.2515 232.977L9.247 263.627C8.47802 264.071 8 264.896 8 265.791V359.176C8 360.071 8.47802 360.896 9.247 361.347L117.75 424.082C118.519 424.533 118.997 425.358 118.997 426.253V455.453C118.997 456.348 119.475 457.173 120.251 457.624L173.249 488.267C174.024 488.717 174.974 488.717 175.749 488.267L228.705 457.644C229.502 457.187 230.486 457.201 231.269 457.679L255.648 472.644C256.431 473.129 257.414 473.136 258.211 472.678L395.25 393.439C396.019 392.988 396.975 392.988 397.75 393.439Z"
        stroke="white"
        strokeWidth="2"
        ref={pathRef}
      />
    </svg>
  );
}
