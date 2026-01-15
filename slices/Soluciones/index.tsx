"use client";
import { FC, useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Flip from "gsap/Flip";

gsap.registerPlugin(ScrollTrigger, Flip);

/**
 * Props for `Soluciones`.
 */
export type SolucionesProps = SliceComponentProps<Content.SolucionesSlice>;

const Soluciones: FC<SolucionesProps> = ({ slice }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const imageTl = gsap
        .timeline({ paused: true })
        .from(mainImageRef.current, {
          y: 400,
        });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "center center",
        scrub: true,
        pin: true,
        animation: imageTl,

        onEnter: () => {
          if (!gridRef.current) return;

          const items = Array.from(gridRef.current.children);
          const state = Flip.getState(items);

          /* CONTENEDOR → ORBITAL */
          gridRef.current.classList.remove("grid", "grid-cols-6", "gap-2");
          gridRef.current.classList.add(
            "absolute",
            "inset-0",
            "block",
            "pointer-events-none"
          );

          /* ITEMS → POSICIONES */
          items.forEach((el, i) => {
            el.className = "absolute w-36 h-36 bg-neutral-400 rounded-xl";

            if (i === 0) el.classList.add("top-[5%]", "left-[15%]");
            if (i === 1) el.classList.add("top-[10%]", "right-[15%]");
            if (i === 2) el.classList.add("top-[45%]", "left-[5%]");
            if (i === 3) el.classList.add("top-[45%]", "right-[5%]");
            if (i === 4) el.classList.add("bottom-[10%]", "left-[15%]");
            if (i === 5) el.classList.add("bottom-[10%]", "right-[15%]");
          });

          Flip.from(state, {
            duration: 1,
            ease: "power3.inOut",
            // stagger: 0.08,
            absolute: true,
          });
        },

        onLeaveBack: () => {
          if (!gridRef.current) return;

          const items = Array.from(gridRef.current.children);
          const state = Flip.getState(items);

          /* CONTENEDOR → GRID */
          gridRef.current.classList.remove(
            "absolute",
            "inset-0",
            "block",
            "pointer-events-none"
          );
          gridRef.current.classList.add("grid", "grid-cols-6", "gap-2");

          /* ITEMS → NORMALES */
          items.forEach((el) => {
            el.className = "h-64 w-full bg-neutral-400 rounded-md";
          });

          Flip.from(state, {
            duration: 1,
            ease: "power3.inOut",
            // stagger: 0.06,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 overflow-hidden">
      <div className="container mx-auto text-neutral-900 text-center space-y-7 relative">
        <div className="text-4xl font-semibold">
          <PrismicRichText field={slice.primary.title} />
        </div>

        <div className="text-balance max-w-xl mx-auto">
          <PrismicRichText field={slice.primary.paragraph} />
        </div>

        <div className="relative min-h-150">
          <div ref={gridRef} className="grid grid-cols-6 gap-2 min-h-150">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-64 w-full bg-neutral-400 rounded-md"
              />
            ))}
          </div>

          <div ref={mainImageRef} className="relative z-10 max-w-xl mx-auto">
            <Image
              src="/images/edificio-transparente.png"
              alt="Foto de Edificio blanco de departamentos"
              className="w-full h-auto"
              width={582}
              height={734}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Soluciones;
