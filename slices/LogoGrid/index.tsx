"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { FC, useRef } from "react";

import SectionHeading from "@/app/components/SectionHeading";
import { PrismicNextImage } from "@prismicio/next";
import { gsap } from "@/app/lib/gsap";
import useIsometricLayoutEffect from "@/app/lib/custom-hooks/useIsometricLayoutEffect";
import { useMediaQuery } from "@mantine/hooks";

/**
 * Props for `LogoGrid`.
 */
export type LogoGridProps = SliceComponentProps<Content.LogoGridSlice>;

/**
 * Component for "LogoGrid" Slices.
 */
const LogoGrid: FC<LogoGridProps> = ({ slice }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);

  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const speedRef = useRef(0.08);

  useIsometricLayoutEffect(() => {
    speedRef.current = isSmallScreen ? 0.02 : 0.08;
  }, [isSmallScreen]);

  useIsometricLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const singleSetWidth = track.scrollWidth / 2;
    let xPos = 0;

    const tick = (_time: number, deltaTime: number) => {
      if (isPausedRef.current) return;
      xPos -= speedRef.current * deltaTime;
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
          <div className="flex shrink-0 w-screen justify-around items-center">
            {logos.map((foto, index) => (
              <div key={`a-${index}`} className="w-120 md:w-80">
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
              <div key={`b-${index}`} className="w-120 md:w-80">
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
