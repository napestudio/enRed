import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import Image from "next/image";

/**
 * Props for `MediaGridIntro`.
 */
export type MediaGridIntroProps =
  SliceComponentProps<Content.MediaGridIntroSlice>;

/**
 * Component for "MediaGridIntro" Slices.
 */
const MediaGridIntro: FC<MediaGridIntroProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-screen bg-enred-red p-12"
    >
      <div className="grid grid-cols-12 md:grid-rows-8 gap-4">
        <div className="order-2 md:order-1 col-span-12 md:col-span-4 md:row-span-3 bg-enred-black">
          <Image
            src="/header-bg.jpg"
            alt="Imagen de fondo"
            className="w-full h-full object-cover"
            width={400}
            height={500}
            priority
          />
        </div>
        <div className="order-3 md:order-2 col-span-12 md:col-span-4 md:row-span-5 md:col-start-1 md:row-start-4 bg-enred-black">
          <Image
            src="/header-bg.jpg"
            alt="Imagen de fondo"
            className="w-full h-full object-cover"
            width={400}
            height={500}
            priority
          />
        </div>
        <div className="order-4 md:order-3 col-span-12 md:col-span-4 md:row-span-5 md:col-start-5 md:row-start-1 bg-enred-black">
          <Image
            src="/header-bg.jpg"
            alt="Imagen de fondo"
            className="w-full h-full object-cover"
            width={400}
            height={500}
            priority
          />
        </div>
        <div className="order-5 md:order-4 col-span-12 md:col-span-4 md:row-span-3 md:col-start-5 md:row-start-6 bg-enred-black">
          <Image
            src="/header-bg.jpg"
            alt="Imagen de fondo"
            className="w-full h-full object-cover"
            width={400}
            height={500}
            priority
          />
        </div>
        <div className="order-6 md:order-5 col-span-12 md:col-span-4 md:row-span-5 md:col-start-9 md:row-start-4 overflow-hidden">
          <Image
            src="/header-bg.jpg"
            alt="Imagen de fondo"
            className="w-full h-full object-cover"
            width={400}
            height={500}
            priority
          />
        </div>
        <div className="order-1 md:order-6 col-span-12 md:col-span-4 md:row-span-3 md:col-start-9 md:row-start-1 flex items-center md:justify-end md:text-right">
          <h2 className="text-5xl mb-6 text-white">Nuestros Clientes</h2>
        </div>
      </div>
    </section>
  );
};

export default MediaGridIntro;
