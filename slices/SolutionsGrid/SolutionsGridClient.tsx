"use client";

import useIsomorphicLayoutEffect from "@/app/lib/custom-hooks/useIsometricLayoutEffect";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import { cn } from "@/app/lib/utils";
import { asText, Content } from "@prismicio/client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

interface SolutionsGridClientProps {
  solutionsList: Content.SolucionDocument[];
}

export default function SolutionsGridClient({
  solutionsList,
}: SolutionsGridClientProps) {
  const [activeCard, setActiveCard] = useState<number>(1);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const decoTopRefs = useRef<(HTMLDivElement | null)[]>([]);
  const decoBottomRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRedRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconWhiteRefs = useRef<(HTMLDivElement | null)[]>([]);
  const arrowRefs = useRef<(SVGSVGElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    if (cardRefs.current.length === 0 || !solutionsRef.current) return;
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLAnchorElement[];

      // Entrance animation (all breakpoints)
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

      // Mobile-only active state ScrollTrigger
      const mm = gsap.matchMedia();
      mm.add("(max-width: 767px)", () => {
        const cleanups: (() => void)[] = [];

        cards.forEach((card, index) => {
          const decoTop = decoTopRefs.current[index];
          const decoBottom = decoBottomRefs.current[index];
          const iconRed = iconRedRefs.current[index];
          const iconWhite = iconWhiteRefs.current[index];
          const arrow = arrowRefs.current[index];

          // Tailwind v4 uses standalone CSS `translate` / `rotate` properties
          // which are independent of GSAP's `transform`. Clear them with inline
          // styles so GSAP has full control, and restore on cleanup.
          if (decoTop) decoTop.style.rotate = "none";
          if (decoBottom) decoBottom.style.rotate = "none";
          if (iconRed) iconRed.style.translate = "none";
          if (iconWhite) iconWhite.style.translate = "none";
          if (arrow) arrow.style.translate = "none";

          cleanups.push(() => {
            if (decoTop) decoTop.style.rotate = "";
            if (decoBottom) decoBottom.style.rotate = "";
            if (iconRed) iconRed.style.translate = "";
            if (iconWhite) iconWhite.style.translate = "";
            if (arrow) arrow.style.translate = "";
          });

          // Set initial inactive state
          gsap.set(card, { backgroundColor: "transparent", color: "#111111" });
          gsap.set(decoTop, { rotation: 0 });
          gsap.set(decoBottom, { rotation: 0 });
          gsap.set(iconRed, { yPercent: 0 });
          gsap.set(iconWhite, { yPercent: 100 });
          gsap.set(arrow, { autoAlpha: 0, x: -12 });

          const cardTl = gsap.timeline({ paused: true });
          cardTl
            .to(
              card,
              { backgroundColor: "#f03c32", color: "white", duration: 0.3 },
              0,
            )
            .to(decoTop, { rotation: -45, duration: 0.5 }, 0)
            .to(decoBottom, { rotation: 45, duration: 0.5 }, 0)
            .to(iconRed, { yPercent: -100, duration: 0.4 }, 0)
            .to(iconWhite, { yPercent: 0, duration: 0.4 }, 0)
            .to(arrow, { autoAlpha: 1, x: 0, duration: 0.5 }, 0);

          if (index === 0) {
            // First card starts active immediately on mobile
            cardTl.progress(1);
          } else {
            ScrollTrigger.create({
              trigger: card,
              start: "top 75%",
              end: "top 30%",
              animation: cardTl,
              scrub: true,
            });
          }
        });

        return () => cleanups.forEach((fn) => fn());
      });
    }, solutionsRef);
    return () => ctx.revert();
  }, []);

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
              "relative col-span-12 md:col-span-4 mb-4 p-4 overflow-hidden group md:transition-colors md:duration-200",
              "hover:bg-enred-red hover:text-white",
              isActive && "bg-enred-red text-white",
            )}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
          >
            <div
              ref={(el) => {
                decoTopRefs.current[index] = el;
              }}
              className={cn(
                "absolute h-32 w-32 -top-20 -right-32 bg-white group-hover:-rotate-45 pointer-events-none md:transition-transform origin-bottom-left md:duration-500",
                isActive && "-rotate-45",
              )}
            />
            <div
              ref={(el) => {
                decoBottomRefs.current[index] = el;
              }}
              className={cn(
                "absolute h-32 w-32 -bottom-32 -left-20 bg-white group-hover:rotate-45 pointer-events-none origin-top-right md:transition-transform md:duration-500",
                isActive && "rotate-45",
              )}
            />

            <div className="flex flex-col justify-between gap-5 p-4 md:p-10 relative z-20 h-full">
              <div className="flex flex-col gap-5">
                <div className="h-13.5 relative overflow-hidden">
                  <div
                    ref={(el) => {
                      iconRedRefs.current[index] = el;
                    }}
                    className="absolute h-full inset-0 group-hover:-translate-y-100 translate-y-0 md:transition-transform md:duration-400"
                  >
                    <Image
                      src={"/red-shape.svg"}
                      alt="Icono del servicio"
                      width={57}
                      height={46}
                      priority
                    />
                  </div>
                  <div
                    ref={(el) => {
                      iconWhiteRefs.current[index] = el;
                    }}
                    className={cn(
                      "absolute h-full inset-0 translate-y-100 group-hover:translate-y-0 md:transition-transform md:duration-400",
                      isActive && "translate-y-0",
                    )}
                  >
                    <Image
                      src={"/white-shape.svg"}
                      alt="Icono del servicio"
                      width={57}
                      height={46}
                      priority
                    />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold underline text-balance z-20 relative">
                  {featureSlice && asText(featureSlice.primary.section_title)}
                </h3>

                <p className="text-left text-balance  md:text-xl">
                  {featureSlice &&
                    asText(featureSlice.primary.section_description)}
                </p>
              </div>

              <svg
                width="28"
                height="30"
                viewBox="0 0 28 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                ref={(el) => {
                  arrowRefs.current[index] = el;
                }}
                className="ml-auto invisible -translate-x-3 group-hover:translate-x-0 group-hover:visible md:transition-transform md:duration-500"
              >
                <path
                  d="M2 14.8284H26M26 14.8284L14 2.82837M26 14.8284L14 26.8284"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
