"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Content, asText } from "@prismicio/client";
import { cn } from "@/app/lib/utils";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import useIsomorphicLayoutEffect from "@/app/lib/custom-hooks/useIsometricLayoutEffect";
import { Scroll } from "@react-three/drei";

interface SolutionsGridClientProps {
  solutionsList: Content.SolucionDocument[];
}

export default function SolutionsGridClient({
  solutionsList,
}: SolutionsGridClientProps) {
  const [activeCard, setActiveCard] = useState<number>(1);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const solutionsRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (cardRefs.current.length === 0 || !solutionsRef.current) return;
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      const tl = gsap.timeline({ paused: true }).from(cards, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.2,
      });
      ScrollTrigger.create({
        trigger: solutionsRef.current,
        start: "top 80%",
        end: "top center",
        animation: tl,
        scrub: true,
      });
    }, cardRefs.current);
    return () => ctx.revert();
  }, [cardRefs]);

  return (
    <div
      className="relative grid grid-cols-12 gap-4"
      onMouseLeave={() => setActiveCard(1)}
      ref={solutionsRef}
    >
      {solutionsList.map((solucion, index) => {
        const isActive = index === activeCard;
        const featureSlice = solucion.data.slices.find(
          (s) => s.slice_type === "feature_highlights_grid",
        ) as Content.FeatureHighlightsGridSlice | undefined;

        return (
          <Link
            href={`/soluciones/${solucion.uid}`}
            key={index}
            onMouseEnter={() => setActiveCard(index)}
            className={cn(
              "relative col-span-12 md:col-span-4 mb-4 p-4 overflow-hidden group transition-colors duration-200",
              "hover:bg-enred-red hover:text-white",
              isActive && "bg-enred-red text-white",
            )}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
          >
            <div className="absolute h-32 w-32 -top-20 -right-32 bg-white group-hover:-rotate-45 pointer-events-none transition-transform origin-bottom-left duration-500" />
            <div className="absolute h-32 w-32 -bottom-32 -left-20 bg-white group-hover:rotate-45 pointer-events-none origin-top-right transition-transform duration-500" />

            <div className="flex flex-col justify-between gap-5 p-4 md:p-10 relative z-20 h-full">
              <div className="flex flex-col gap-5">
                <div className="h-13.5 relative overflow-hidden">
                  <div className="absolute h-full inset-0 group-hover:-translate-y-100 translate-y-0 transition-transform duration-400">
                    <Image
                      src={"/red-shape.svg"}
                      alt="Icono del servicio"
                      width={70}
                      height={50}
                      priority
                    />
                  </div>
                  <div
                    className={cn(
                      "absolute h-full inset-0 translate-y-100 group-hover:translate-y-0 transition-transform duration-400",
                      isActive && "translate-y-0",
                    )}
                  >
                    <Image
                      src={"/white-shape.svg"}
                      alt="Icono del servicio"
                      width={70}
                      height={50}
                      priority
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold underline text-balance z-20 relative">
                  {featureSlice && asText(featureSlice.primary.section_title)}
                </h3>
                {index < 3 && (
                  <p className="text-right">
                    {featureSlice &&
                      asText(featureSlice.primary.section_description)}
                  </p>
                )}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-auto invisible -translate-x-3 group-hover:translate-x-0 transition-transform duration-500 group-hover:visible"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
