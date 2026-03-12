"use client";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import Image from "next/image";
import { useHeroRef } from "@/app/components/context/HeroRefContext";
/**
 * Props for `HeroImageOverlay`.
 */
export type HeroImageOverlayProps =
  SliceComponentProps<Content.HeroImageOverlaySlice>;

/**
 * Component for "HeroImageOverlay" Slices.
 */
const HeroImageOverlay: FC<HeroImageOverlayProps> = ({ slice }) => {
  const heroRef = useHeroRef();

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white relative"
      ref={heroRef}
    >
      <div className="relative max-w-[1440px] m-auto min-h-screen items-center flex z-20">
        <div className="grid grid-cols-3 md:grid-cols-12 gap-4 p-6 md:p-12 z-10 ">
          <div className="col-span-3 md:col-span-12 col-start-1 lg:col-start-1 lg:col-span-5 flex flex-col justify-start gap-4 lg:gap-20 pt-12 lg:py-12">
            <h1 className="text-white text-[clamp(2.3rem,7vw,7rem)] mt-4 text-balance leading-[1] font-semibold max-w-full underline decoration-1 md:no-underline underline-offset-4 ">
              Soluciones con <span className="no-underline md:underline underline-offset-8 decoration-3">altura</span>
            </h1>
            <div className="hidden md:grid grid-cols-5 gap-4">
              <div className="col-start-5 col-span-1 flex justify-center items-center">
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
                  className="lucide lucide-arrow-down-to-line-icon lucide-arrow-down-to-line w-8 h-8 text-white"
                >
                  <path d="M12 17V3" />
                  <path d="m6 11 6 6 6-6" />
                  <path d="M19 21H5" />
                </svg>
              </div>
            </div>
          </div>

          <div className="hidden md:block lg:mt-22 col-span-12 col-start-1 lg:col-start-6 lg:col-span-7">
            <Image
              src="/figura-lineas.svg"
              alt="enRed Logo"
              className="w-full h-auto"
              width={600}
              height={600}
            />
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
