import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import Image from "next/image";

/**
 * Props for `HeroImageOverlay`.
 */
export type HeroImageOverlayProps =
  SliceComponentProps<Content.HeroImageOverlaySlice>;

/**
 * Component for "HeroImageOverlay" Slices.
 */
const HeroImageOverlay: FC<HeroImageOverlayProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-screen relative"
    >
      <div className="grid grid-cols-12 gap-4 min-h-screen px-12 py-12 z-10 absolute w-full">
        <div className="col-span-12 col-start-1 lg:col-start-1 lg:col-span-5 flex flex-col justify-start gap-4 md:gap-20 pt-12 md:py-12">
          <h1 className="text-white text-[clamp(2rem,7vw,7rem)] mt-4 text-balance leading-tight max-w-full">
            Soluciones con <span className="underline">altura</span>
          </h1>
          <div className="grid grid-cols-5 gap-4">
            <div className="col-start-5 col-span-1">
              <Image
                src="/down-arrow.svg"
                alt="enRed Logo"
                className="w-full"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
        <div className="md:mt-22 col-span-10 col-start-2 lg:col-start-6 lg:col-span-7">
          <Image
            src="/figura-lineas.svg"
            alt="enRed Logo"
            className="w-full h-auto"
            width={600}
            height={600}
          />
        </div>
      </div>
      <Image
        src="/header-bg.jpg"
        alt="Imagen de fondo"
        fill
        className="object-cover"
        priority
      />
    </section>
  );
};

export default HeroImageOverlay;
