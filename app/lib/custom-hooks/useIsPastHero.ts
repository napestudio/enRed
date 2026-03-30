"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useIsPastHero() {
  const [scrollPast, setScrollPast] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/soluciones/")) return;

    const check = () => setScrollPast(window.scrollY >= window.innerHeight - 120);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [pathname]);

  if (pathname.startsWith("/soluciones/")) return false;
  return scrollPast;
}
