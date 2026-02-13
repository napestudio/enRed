import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import Image from "next/image";
import { cn } from "@/app/lib/utils";

/**
 * Props for `SolutionsGrid`.
 */
export type SolutionsGridProps =
  SliceComponentProps<Content.SolutionsGridSlice>;

/**
 * Component for "SolutionsGrid" Slices.
 */

const solucionesData = [
  {
    title: "Redes de protección",
    desc: "Garantizamos la mejor protección en edificios, obras en construcción, domicilios  particulares, estructuras y otros espacios.",
  },
  {
    title: "Instalaciones en altura",
    desc: "Garantizamos la mejor protección en edificios, obras en construcción, domicilios  particulares, estructuras y otros espacios.",
  },
  {
    title: "Impermeabilización y pintura",
    desc: "Garantizamos la mejor protección en edificios, obras en construcción, domicilios  particulares, estructuras y otros espacios.",
  },
  {
    title: "Hidrolavado de muros",
    desc: "Garantizamos la mejor protección en edificios, obras en construcción, domicilios  particulares, estructuras y otros espacios.",
  },
  {
    title: "Cercos para piletas",
    desc: "Garantizamos la mejor protección en edificios, obras en construcción, domicilios  particulares, estructuras y otros espacios.",
  },
  {
    title: "Kit de autoinstalación",
    desc: "Garantizamos la mejor protección en edificios, obras en construcción, domicilios  particulares, estructuras y otros espacios.",
  },
];

const SolutionsGrid: FC<SolutionsGridProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white pt-40 text-enred-black"
    >
      <div className="max-w-[1440px] m-auto relative px-12 py-12">
        <div className="col-span-5 col-start-1 text-enred-black text-balance z-20">
          <h2 className="text-5xl mb-6">Soluciones</h2>
        </div>
        <div className="relative grid grid-cols-12 gap-4 p-12">
          {solucionesData.map(
            (solucion: { title: string; desc: string }, index: number) => (
              <div
                key={index}
                className={cn(
                  "relative col-span-12 md:col-span-4 mb-4 p-10",
                  index === 1 ? "bg-enred-red text-white" : "bg-white",
                )}
              >
                <div className="flex flex-col gap-5">
                  {index === 1 ? (
                    <Image
                      src="/white-shape.svg"
                      alt="Imagen de fondo"
                      width={70}
                      height={50}
                      priority
                    />
                  ) : (
                    <Image
                      src="/red-shape.svg"
                      alt="Imagen de fondo"
                      width={70}
                      height={50}
                      priority
                    />
                  )}
                  <h3 className="text-xl font-semibold underline text-balance pr-24">
                    {solucion.title}
                  </h3>
                  <p className={cn("text-right", index !== 1 ? "hidden" : "")}>
                    {solucion.desc}
                  </p>
                  <Image
                    src="/right-arrow.svg"
                    alt="enRed Logo"
                    className="ml-auto"
                    width={30}
                    height={30}
                  />
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default SolutionsGrid;
