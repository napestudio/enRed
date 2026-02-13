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
          <h2 className="text-5xl mb-6">Nosotros</h2>
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
