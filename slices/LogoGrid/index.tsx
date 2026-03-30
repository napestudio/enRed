"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { FC, useRef } from "react";

import SectionHeading from "@/app/components/SectionHeading";
import { PrismicNextImage } from "@prismicio/next";
import { gsap } from "@/app/lib/gsap";
import useIsometricLayoutEffect from "@/app/lib/custom-hooks/useIsometricLayoutEffect";

/**
 * Props for `LogoGrid`.
 */
export type LogoGridProps = SliceComponentProps<Content.LogoGridSlice>;

const SPEED = 0.08; // px per ms ≈ 80px/s

/**
 * Component for "LogoGrid" Slices.
 */
const LogoGrid: FC<LogoGridProps> = ({ slice }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);

  useIsometricLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Each set wrapper is w-screen (100vw), so the total track is 200vw.
    // One set = exactly the viewport width — wrap is always seamless.
    const singleSetWidth = track.scrollWidth / 2;
    let xPos = 0;

    const tick = (_time: number, deltaTime: number) => {
      if (isPausedRef.current) return;
      xPos -= SPEED * deltaTime;
      if (xPos < -singleSetWidth) xPos += singleSetWidth;
      gsap.set(track, { x: xPos });
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  const logos = slice.primary.logos;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-enred-black text-enred-black py-12"
    >
      <div className="container grid grid-cols-12 gap-4 items-center">
        <div className="md:col-span-5 flex gap-4 items-center text-white mb-12">
          <SectionHeading title="Nuestros clientes" style="text-white" />
        </div>
      </div>
      <div
        className="overflow-hidden"
        onMouseEnter={() => {
          isPausedRef.current = true;
        }}
        onMouseLeave={() => {
          isPausedRef.current = false;
        }}
      >
        <div ref={trackRef} className="flex">
          {/* Each set is exactly w-screen so track = 200vw regardless of logo count */}
          <div className="flex shrink-0 w-screen justify-around items-center">
            {logos.map((foto, index) => (
              <div key={`a-${index}`} className="w-80 p-4">
                <PrismicNextImage
                  className="w-full h-auto aspect-video object-contain"
                  field={foto.logo_image}
                  width={foto.logo_image.dimensions?.width}
                  height={foto.logo_image.dimensions?.height}
                />
              </div>
            ))}
          </div>
          <div className="flex shrink-0 w-screen justify-around items-center">
            {logos.map((foto, index) => (
              <div key={`b-${index}`} className="w-80 p-4">
                <PrismicNextImage
                  className="w-full h-auto aspect-video object-contain"
                  field={foto.logo_image}
                  width={foto.logo_image.dimensions?.width}
                  height={foto.logo_image.dimensions?.height}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoGrid;
