"use client";
import { useRef } from "react";
import EnRedIso from "./ui/Icons/EnRedIso";
import useIsomorphicLayoutEffect from "../lib/custom-hooks/useIsometricLayoutEffect";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { getLenis } from "./GSAPProvider";
export default function FixedButton() {
  const fixedRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!fixedRef.current || !buttonRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true }).from(buttonRef.current, {
        x: 150,
        opacity: 0,
        ease: "power2.out",
        duration: 0.6,
      });
      ScrollTrigger.create({
        start: 200,
        animation: tl,
        once: true,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      className="z-90 fixed top-0 bottom-0 right-0 h-full pointer-events-none"
      ref={fixedRef}
    >
      <div
        className="relative rotate-90 top-[75svh] md:top-[55svh] right-4 md:right-5 origin-right py-2 px-2 md:px-6 h-max bg-black text-white flex items-center gap-2 text-xl pointer-events-auto cursor-pointer"
        ref={buttonRef}
        onClick={() => getLenis()?.scrollTo("#footer")}
      >
        <span>
          <EnRedIso />
        </span>
        <span className="md:block hidden">Hablemos</span>
      </div>
    </div>
  );
}
