import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import SectionHeading from "@/app/components/SectionHeading";
import { cms } from "@/prismicio";
import SolutionsGridClient from "./SolutionsGridClient";

/**
 * Props for `SolutionsGrid`.
 */
export type SolutionsGridProps =
  SliceComponentProps<Content.SolutionsGridSlice>;

/**
 * Component for "SolutionsGrid" Slices.
 */

const SolutionsGrid: FC<SolutionsGridProps> = async ({ slice }) => {
  const solutionsList: Content.SolucionDocument[] = await cms.getAllByType(
    "solucion",
    {
      orderings: [{ field: "my.solucion.uid", direction: "asc" }],
    },
  );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white pt-40 text-enred-black z-90"
    >
      <div className="container m-auto relative py-12">
        <div className="text-enred-black text-balance z-20 flex items-center gap-4 mb-6">
          <SectionHeading title="Soluciones" style="" />
        </div>
        <SolutionsGridClient solutionsList={solutionsList} />
      </div>
    </section>
  );
};

export default SolutionsGrid;
