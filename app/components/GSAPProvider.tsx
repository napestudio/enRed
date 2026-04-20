
"use client";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

let lenisInstance: Lenis | null = null;
export function getLenis() {
  return lenisInstance;
}

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenisInstance = lenis;

    // Sincroniza Lenis con ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  useEffect(() => {
    // After navigation the page height changes; refresh ScrollTrigger so all
    // instances (FooterCubes, FormSection, etc.) recalculate their positions.
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    // If we navigated to home with a pending anchor scroll (cross-page nav)
    if (pathname === "/") {
      const scrollTarget = sessionStorage.getItem("scrollTo");
      if (scrollTarget) {
        sessionStorage.removeItem("scrollTo");
        setTimeout(() => {
          lenisInstance?.scrollTo(scrollTarget);
        }, 300);
      }
    }

    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}