import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

import SolutionsGallery from "@/app/components/solutions/Gallery";
import RelatedSolutionCards from "@/app/components/solutions/RelatedCards";
import { cms } from "@/prismicio";
import AnimatedHeader from "./AnimatedHeader";

/**
 * Props for `FeatureHighlightsGrid`.
 */
export type FeatureHighlightsGridProps =
  SliceComponentProps<Content.FeatureHighlightsGridSlice>;

/**
 * Component for "FeatureHighlightsGrid" Slices.
 */
const FeatureHighlightsGrid: FC<FeatureHighlightsGridProps> = async ({
  slice,
  context,
}) => {
  const { results: data } = await cms.getByType<Content.SolucionDocument>(
    "solucion",
    {
      orderings: [{ field: "my.solucion.uid", direction: "asc" }],
      pageSize: 4,
    },
  );

  const currentUid = (context as { uid?: string })?.uid;
  const relatedSolutions = data.filter((s) => s.uid !== currentUid);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white pt-12 px-12 overflow-hidden"
    >
      <div className="max-w-360 mx-auto py-8">
        <AnimatedHeader
          title={slice.primary.section_title}
          subtitle={slice.primary.section_subtitle}
          sectionDescription={slice.primary.section_description}
          slice={slice}
        />

        <SolutionsGallery slice={slice} />
        <div className="grid md:grid-cols-2 gap-4 text-enred-black">
          {slice.primary.feature_descriptions.map((item, index) => (
            <div
              className="col-span-2 md:col-span-1 text-pretty text-xl"
              key={index}
            >
              <PrismicRichText field={item.feature_description} />
            </div>
          ))}
        </div>

        <RelatedSolutionCards
          slice={slice}
          relatedSolutions={relatedSolutions}
        />
      </div>
    </section>
  );
};

export default FeatureHighlightsGrid;
