import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import Image from "next/image";
import SectionHeading from "@/app/components/SectionHeading";
import Experience from "@/app/components/experience/Experience";

/**
 * Props for `IntroTextFeatureGraphic`.
 */
export type IntroTextFeatureGraphicProps =
  SliceComponentProps<Content.IntroTextFeatureGraphicSlice>;

/**
 * Component for "IntroTextFeatureGraphic" Slices.
 */
const IntroTextFeatureGraphic: FC<IntroTextFeatureGraphicProps> = ({
  slice,
}) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white text-enred-black relative z-90"
    >
      <div className="grid grid-cols-5 relative">
        <div className="relative col-span-4 row-start-1 col-start-1 h-full">
          <Experience />
        </div>
        <div className="relative row-start-1 col-start-4 col-span-2 gap-4 p-12 z-50">
          <div className="col-span-12 md:col-span-4 col-start-1 md:col-start-9 text-right text-balance z-20">
            <div className="flex gap-4 justify-end items-center mb-6">
              <SectionHeading title="Nosotros" style="" />
            </div>
            <p className="text-xl text-pretty">
              Somos una empresa que brinda soluciones integrales en edificios,
              obras de construcción, instalaciones industriales, domicilios
              particulares y otros espacios, con más de 6 años de experiencia en
              el rubro. Trabajamos de manera personalizada garantizando
              resultados rápidos y eficientes en cada espacio.
            </p>
          </div>
          {/* <div className="absolute left-0 px-12 -top-20 z-10 w-[70%]">
          <Image
            src="/red-solid.svg"
            alt="Imagen de fondo"
            className="w-full h-auto"
            width={400}
            height={500}
            priority
          />
        </div> */}
        </div>
      </div>
    </section>
  );
};

export default IntroTextFeatureGraphic;
