import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import Image from "next/image";
/**
 * Props for `LogoGrid`.
 */
export type LogoGridProps = SliceComponentProps<Content.LogoGridSlice>;

/**
 * Component for "LogoGrid" Slices.
 */
const LogoGrid: FC<LogoGridProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mb-12"
    >
      <div className="grid grid-cols-12 gap-4 p-12 items-center">
        <div className="col-span-3">
          <h2 className="text-5xl mb-6">Nuestros Clientes</h2>
        </div>
        <div className="col-span-3">
          <Image
            src="/cliente.svg"
            alt="Imagen de fondo"
            className="w-full h-auto"
            width={400}
            height={500}
            priority
          />
        </div>
        <div className="col-span-3">
          <Image
            src="/cliente.svg"
            alt="Imagen de fondo"
            className="w-full h-auto"
            width={400}
            height={500}
            priority
          />
        </div>
        <div className="col-span-3">
          <Image
            src="/cliente.svg"
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

export default LogoGrid;
