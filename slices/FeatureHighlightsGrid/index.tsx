import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

import ImageClipper from "@/app/components/ImageClipper";
import SolutionsGallery from "@/app/components/solutions/Gallery";
import RelatedSolutionCards from "@/app/components/solutions/RelatedCards";
import ArrowIcon from "@/app/components/ui/Icons/ArrowIcon";
import { cms } from "@/prismicio";

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
  const data = (await cms.getAllByType("solucion", {
    orderings: [{ field: "my.solucion.uid", direction: "asc" }],
  })) as Content.SolucionDocument[];

  const currentUid = (context as { uid?: string })?.uid;
  const relatedSolutions = data.filter((s) => s.uid !== currentUid);
  console.log(data);
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white pt-12 px-12 overflow-hidden"
    >
      <div className="max-w-360 mx-auto py-8">
        <div className="grid grid-cols-12 gap-y-10 md:gap-4 items-center">
          <div className="col-span-12 md:col-span-6 py-8 flex flex-col justify-between h-full gap-4 md:gap-24 text-enred-black">
            <div className="flex flex-col gap-18">
              <div className="font-bold text-[clamp(3rem,5vw,calc(95vw-1rem))] leading-none">
                <PrismicRichText field={slice.primary.section_title} />
              </div>
              <div className="text-xl font-semibold underline underline-offset-2">
                <PrismicRichText field={slice.primary.section_subtitle} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-12 md:col-span-1 p-4 flex items-center justify-center text-enred-black">
                <ArrowIcon className="text-black w-12 h-auto" />
              </div>
              <div className="col-span-12 md:col-span-4 md:text-2xl text-pretty">
                <PrismicRichText field={slice.primary.section_description} />
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <ImageClipper slice={slice} />
          </div>
        </div>

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
