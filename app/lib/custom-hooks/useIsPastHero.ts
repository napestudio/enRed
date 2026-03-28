"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useIsPastHero() {
  const [isPast, setIsPast] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/soluciones/")) {
      setIsPast(false);
      return;
    }

    const check = () => setIsPast(window.scrollY >= window.innerHeight);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [pathname]);

  return isPast;
}
