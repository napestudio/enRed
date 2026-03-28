"use client";
import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import Image from "next/image";
import useIsomorphicLayoutEffect from "@/app/lib/custom-hooks/useIsometricLayoutEffect";
import { gsap, SplitText } from "../../app/lib/gsap";
import ArrowIcon from "@/app/components/ui/Icons/ArrowIcon";
import SvgHeroShape from "@/app/components/SvgHeroShape";
export type HeroImageOverlayProps =
  SliceComponentProps<Content.HeroImageOverlaySlice>;

/**
 * Component for "HeroImageOverlay" Slices.
 */
const HeroImageOverlay: FC<HeroImageOverlayProps> = ({ slice }) => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (
        !heroRef.current ||
        !titleRef.current ||
        !underlineRef.current ||
        !arrowRef.current
      )
        return;
      const words = new SplitText(titleRef.current, { type: "words" });
      const tl = gsap
        .timeline({ paused: true })
        // .to(heroRef.current, { opacity: 1 })
        .from(words.words, {
          y: 300,
          opacity: 0,
          stagger: 0.25,
        })
        .from(underlineRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
          ease: "elastic.out(1, 0.85)",
          duration: 1.5,
        })
        .from(arrowRef.current, {
          opacity: 0,
        })
        .to(arrowRef.current, {
          y: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          duration: 1,
          delay: 1.5,
        });

      tl.play();
    }, heroRef);

    return () => ctx.revert();
  }, [heroRef, titleRef, underlineRef, arrowRef]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white relative"
      ref={heroRef}
    >
      <div className="relative max-w-360 m-auto min-h-screen items-center flex z-20">
        <div className="grid grid-cols-3 md:grid-cols-12 gap-4 p-6 md:p-12 z-10 ">
          <div className="col-span-3 md:col-span-12 col-start-1 lg:col-start-1 lg:col-span-5 flex flex-col justify-start gap-4 lg:gap-20 pt-12 lg:py-12">
            <h1
              className="text-white text-[clamp(2.3rem,7vw,7rem)] mt-4 text-balance leading-none font-semibold max-w-full underline decoration-1 md:no-underline underline-offset-4"
              ref={titleRef}
            >
              Soluciones con{" "}
              <span className="relative">
                altura
                <span
                  className="absolute h-0.75 bg-white w-full bottom-4 left-0"
                  ref={underlineRef}
                ></span>
              </span>
            </h1>
            <div className="hidden md:grid grid-cols-5 gap-4" ref={arrowRef}>
              <div className="col-start-5 col-span-1 flex justify-center items-center">
                <ArrowIcon className="text-white" />
              </div>
            </div>
          </div>

          <div className="hidden md:block lg:mt-22 col-span-12 col-start-1 lg:col-start-6 lg:col-span-7">
            <div className="w-full h-auto">
              <SvgHeroShape />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-enred-black opacity-44 z-10"></div>
      <Image
        src="/header-bg.jpg"
        alt="Imagen de fondo"
        fill
        className="w-full h-full object-cover z-0"
        priority
      />
    </section>
  );
};

export default HeroImageOverlay;
