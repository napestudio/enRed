"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { FC, useRef } from "react";

import useIsometricLayoutEffect from "@/app/lib/custom-hooks/useIsometricLayoutEffect";
import { gsap } from "@/app/lib/gsap";
import { useMediaQuery } from "@mantine/hooks";
import { PrismicNextImage } from "@prismicio/next";

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

  const speedRef = useRef(0.05);

  useIsometricLayoutEffect(() => {
    speedRef.current = isSmallScreen ? 0.02 : 0.05;
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
      className="bg-enred-black text-enred-black py-18"
    >
      <div className="container mx-auto flex items-center">
        <div className="flex items-center text-white pr-4">
          <h3 className="text-3xl md:text-5xl w-max font-semibold text-white text-pretty">
            Confían en <br /> nosotros:
          </h3>
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute w-full inset-0 bg-linear-to-r from-enred-black from-10% to-30% to-transparent z-10"></div>
          <div
            className="overflow-hidden relative"
            onMouseEnter={() => {
              isPausedRef.current = true;
            }}
            onMouseLeave={() => {
              isPausedRef.current = false;
            }}
          >
            <div ref={trackRef} className="flex">
              <div className="flex shrink-0 items-center gap-8 md:gap-12 px-4 md:px-6">
                {logos.map((foto, index) => (
                  <div key={`a-${index}`} className="w-24 md:w-36">
                    <PrismicNextImage
                      className="w-full h-auto max-h-12 md:max-h-16 object-contain"
                      field={foto.logo_image}
                      width={foto.logo_image.dimensions?.width}
                      height={foto.logo_image.dimensions?.height}
                    />
                  </div>
                ))}
              </div>
              <div className="flex shrink-0 items-center gap-8 md:gap-12 px-4 md:px-6">
                {logos.map((foto, index) => (
                  <div key={`b-${index}`} className="w-24 md:w-36">
                    <PrismicNextImage
                      className="w-full h-auto max-h-12 md:max-h-16 object-contain"
                      field={foto.logo_image}
                      width={foto.logo_image.dimensions?.width}
                      height={foto.logo_image.dimensions?.height}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoGrid;
