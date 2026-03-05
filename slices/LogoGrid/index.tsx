import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import Image from "next/image";
import SectionHeading from "@/app/components/SectionHeading";
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
      className="bg-enred-black text-enred-black"
    >
      <div className="max-w-[1440px] m-auto grid grid-cols-12 gap-4 p-12 items-center">
        <div className="col-span-5 mb-6 flex gap-4 items-center text-white">          
          <SectionHeading title="Nuestros clientes" style="text-white" />
        </div>
        <div className="col-span-12 grid grid-cols-12">
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
      </div>
    </section>
  );
};

export default LogoGrid;
