"use client";
import { useRef } from "react";
import useIsomorphicLayoutEffect from "../lib/custom-hooks/useIsometricLayoutEffect";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { cn } from "../lib/utils";
import ArrowIcon from "./ui/Icons/UnderlineArrowIcon";

function SectionHeading({
  title = "",
  style = "text-black",
}: {
  title: string;
  style?: string;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!titleRef.current || !iconRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({ paused: true })
        .from(titleRef.current, {
          y: 50,
          opacity: 0,
          ease: "power3.out",
          duration: 1,
        })
        .from(
          iconRef.current,
          {
            y: -50,
            opacity: 0,
            ease: "power3.out",
            duration: 1,
          },
          "-=0.75",
        );

      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 90%",
        animation: tl,
        once: true,
      });
    }, titleRef.current);

    return () => ctx.revert();
  }, []);
  return (
    <div className="flex items-center gap-4 w-max">
      <h2 className={cn(style, "text-5xl font-semibold")} ref={titleRef}>
        {title}
      </h2>

      <div ref={iconRef}>
        <ArrowIcon className="w-12 h-12" />
      </div>
    </div>
  );
}

export default SectionHeading;
