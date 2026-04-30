"use client";
import { useRef } from "react";
import { PrismicRichText } from "@prismicio/react";
import {
  MetricsDocumentDataMainMetricItem,
  MetricsDocumentDataSecondMetricItem,
  MetricsDocumentDataThirdMetricItem,
} from "@/prismicio-types";
import { cn } from "../lib/utils";
import { gsap, ScrollTrigger } from "../lib/gsap";
import useIsomorphicLayoutEffect from "../lib/custom-hooks/useIsometricLayoutEffect";

type MetricItem =
  | MetricsDocumentDataMainMetricItem
  | MetricsDocumentDataSecondMetricItem
  | MetricsDocumentDataThirdMetricItem;

export default function Metrics({
  items,
  variant,
}: {
  items: MetricItem[];
  variant: "big" | "small";
}) {
  const refs = useRef<(HTMLParagraphElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    if (refs.current.length === 0) return;
    const ctx = gsap.context(() => {
      items.forEach((item, i) => {
        if (!refs.current[i] || item.number == null) return;
        const counter = { val: 0 };
        const tl = gsap.timeline({ paused: true }).to(counter, {
          val: item.number,
          ease: "power2.out",
          onUpdate() {
            if (refs.current[i]) {
              refs.current[i]!.textContent =
                "+" + Math.round(counter.val).toLocaleString("es-Ar");
            }
          },
        });
        ScrollTrigger.create({
          trigger: refs.current[i],
          start: "top 80%",
          animation: tl,
        });
      });
    });
    return () => ctx.revert();
  }, [items]);

  return (
    <>
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            variant === "big"
              ? "z-10 flex flex-col items-center md:items-start gap-1"
              : "flex flex-col gap-1 md:max-w-min justify-center items-center md:justify-start md:items-start",
          )}
        >
          <div
            className={cn(
              variant === "big"
                ? "text-[clamp(5.5rem,8vw,140px)]"
                : "text-[clamp(5.5rem,5vw,60px)]",
              "tracking-tight leading-none font-bold",
            )}
          >
            <p
              ref={(el) => {
                refs.current[index] = el;
              }}
            >
              +{item.number?.toLocaleString("es-Ar")}
            </p>
          </div>
          <div
            className={cn(
              variant === "big"
                ? "text-[clamp(1.2rem,2vw,30px)] leading-none"
                : "text-[clamp(1.2rem,2vw,30px)] md:text-xl z-10",
              "leading-none [&_strong]:text-enred-red text-center md:text-left text-pretty",
            )}
          >
            <PrismicRichText field={item.descripcion} />
          </div>
        </div>
      ))}
    </>
  );
}
