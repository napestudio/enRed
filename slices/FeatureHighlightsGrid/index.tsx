import { Content, filter } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

import SolutionsGallery from "@/app/components/solutions/Gallery";
import RelatedSolutionCards from "@/app/components/solutions/RelatedCards";
import { cms } from "@/prismicio";
import AnimatedHeader from "./AnimatedHeader";
import SloganSection from "@/app/components/SloganSection";

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
  const currentUid = (context as { uid?: string })?.uid;
  const { results: data } = await cms.getByType<Content.SolucionDocument>(
    "solucion",
    {
      filters: [filter.not("my.solucion.uid", currentUid!)],
      orderings: [{ field: "my.solucion.uid", direction: "asc" }],
      pageSize: 6,
    },
  );

  const { results: sloganData } =
    await cms.getByType<Content.SloganDocument>("slogan");

  const relatedSolutions = data
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item).slice(0, 3);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white pt-12 overflow-hidden"
    >
      <div className="container py-8 md:px-12 overflow-hidden">
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
              className="col-span-2 md:col-span-1 text-pretty md:text-xl"
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
      {slice.primary.mostrar_garantia && sloganData[0] && (
        <SloganSection sloganData={sloganData[0]} />
      )}
    </section>
  );
};

export default FeatureHighlightsGrid;
