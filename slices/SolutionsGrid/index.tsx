import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import Image from "next/image";
import { cn } from "@/app/lib/utils";
import SectionHeading from "@/app/components/SectionHeading";
import { cms } from "@/prismicio";

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

const SolutionsGrid: FC<SolutionsGridProps> = async ({ slice }) => {

  const solutionsList: any = await cms.getAllByType("solucion", {
    orderings: [{ field: "my.solucion.uid", direction: "asc" }],
  });
  //console.log("🚀 ~ SolutionsGrid ~ solutionsList:", solutionsList[0].data.slices[0].primary.section_description[0].text)
  
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white pt-40 text-enred-black"
    >
      <div className="max-w-[1440px] m-auto relative px-12 py-12">
        <div className="text-enred-black text-balance z-20 flex items-center gap-4 mb-6">
          <SectionHeading title="Soluciones" style="" />
        </div>
        <div className="relative grid grid-cols-12 gap-4">
          {solutionsList.map(
            (solucion: any, index: number) => (
              <div
                key={index}
                className={cn(
                  "relative col-span-12 md:col-span-4 mb-4 p-4",
                  index === 1 ? "bg-enred-red text-white" : "bg-white",
                )}
              >
                <div className="flex flex-col gap-5 p-4 md:p-10">
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
                  <h3 className="text-xl font-semibold underline text-balance">
                    {solucion.data.slices[0].primary.section_title[0].text}
                  </h3>
                  <p className={cn("text-right", index !== 1 ? "hidden" : "")}>
                    {solucion.data.slices[0].primary.section_description[0].text}
                  </p>
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
                    className={cn(
                      "lucide lucide-arrow-right-icon lucide-arrow-right ml-auto",
                      index !== 1 ? "hidden" : "",
                    )}
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
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
