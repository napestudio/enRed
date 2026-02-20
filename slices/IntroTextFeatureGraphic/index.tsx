import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import Image from "next/image";

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
      className="bg-white text-enred-black"
    >
      <div className="max-w-[1440px] m-auto relative grid grid-cols-12 gap-4 p-12">
        <div className="col-span-12 md:col-span-5 col-start-1 md:col-start-8 text-right text-balance z-20">
          <div className="flex gap-4 justify-end items-center mb-6">
            <h2 className="text-5xl font-semibold">Nosotros</h2>
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
              className="lucide lucide-arrow-down-to-line-icon lucide-arrow-down-to-line w-12 h-12 text-black"
            >
              <path d="M12 17V3" />
              <path d="m6 11 6 6 6-6" />
              <path d="M19 21H5" />
            </svg>
          </div>
          <p className="text-xl">
            Somos una empresa que brinda soluciones integrales en edificios,
            obras de construcción, instalaciones industriales, domicilios
            particulares y otros espacios, con más de 6 años de experiencia en
            el rubro. Trabajamos de manera personalizada garantizando resultados
            rápidos y eficientes en cada espacio.
          </p>
        </div>
        <div className="absolute left-0 px-12 -top-20 z-10">
          <Image
            src="/red-solid.svg"
            alt="Imagen de fondo"
            className="w-full h-auto"
            width={400}
            height={500}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default IntroTextFeatureGraphic;
