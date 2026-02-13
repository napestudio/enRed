import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { div } from "three/tsl";

/**
 * Props for `FeatureHighlightsGrid`.
 */
export type FeatureHighlightsGridProps =
  SliceComponentProps<Content.FeatureHighlightsGridSlice>;

/**
 * Component for "FeatureHighlightsGrid" Slices.
 */
const FeatureHighlightsGrid: FC<FeatureHighlightsGridProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-screen bg-white px-12"
    >
      <div className="grid grid-cols-12 gap-4 items-center  py-24">
        <div className="col-span-6 flex flex-col gap-24 text-enred-black">
          <div className="flex flex-col gap-12">
            <PrismicRichText field={slice.primary.section_title} />
            <div className="text-2xl">
              <PrismicRichText field={slice.primary.section_subtitle} />
            </div>
          </div>
          <div className="text-2xl grid grid-cols-6 gap-4">
            <div className="col-span-1 p-4 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right-icon lucide-arrow-right w-9 h-9"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
            <div className="col-span-4">
              <PrismicRichText field={slice.primary.section_description} />
            </div>
          </div>
        </div>
        <div className="col-span-6">
          <PrismicNextImage
            field={slice.primary.imagen_principal}
            width={slice.primary.imagen_principal.dimensions?.width}
            height={slice.primary.imagen_principal.dimensions?.height}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 items-center pb-12">
        {slice.primary.features.map((item, i) => (
          <div key={i} className="col-span-4 p-10 flex flex-col gap-5">
            <PrismicNextImage field={item.icon} width={77} height={62} />
            <div className="text-3xl text-enred-black font-semibold">
              <PrismicRichText field={item.heading} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureHighlightsGrid;
