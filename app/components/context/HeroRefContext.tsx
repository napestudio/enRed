// app/context/HeroRefContext.tsx
"use client";
import { createContext, useContext, useRef, RefObject } from "react";

const HeroRefContext = createContext<RefObject<HTMLElement> | null>(null);

export function HeroRefProvider({ children }: { children: React.ReactNode }) {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <HeroRefContext.Provider value={heroRef as any}>
      {children}
    </HeroRefContext.Provider>
  );
}

export function useHeroRef() {
  const ctx = useContext(HeroRefContext);
  if (!ctx) throw new Error("useHeroRef must be used inside HeroRefProvider");
  return ctx;
}