"use client"
import { RefObject, useEffect, useState } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export function useIsPastHero(heroRef: RefObject<HTMLElement>) {
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    if (!heroRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "bottom top",
      onEnter: () => setIsPast(true),
      onLeaveBack: () => setIsPast(false),
    });
    return () => trigger.kill();
  }, [heroRef.current]);

  return isPast;
}