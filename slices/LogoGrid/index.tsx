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
      className="bg-enred-black text-enred-black"
    >
      <div className="max-w-[1440px] m-auto grid grid-cols-12 gap-4 p-12 items-center">
        <div className="col-span-5 mb-6 flex gap-4 items-center text-white">
          <h2 className="text-5xl font-semibold">Nuestros clientes</h2>
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
            className="lucide lucide-arrow-down-to-line-icon lucide-arrow-down-to-line w-12 h-12 "
          >
            <path d="M12 17V3" />
            <path d="m6 11 6 6 6-6" />
            <path d="M19 21H5" />
          </svg>
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
