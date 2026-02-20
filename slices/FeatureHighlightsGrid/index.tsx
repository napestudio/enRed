import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import Image from "next/image";
import ImageClipper from "@/app/components/ImageClipper";

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
      className="bg-white pt-12 px-12"
    >
      <div className="max-w-[1440px] m-auto">
        <div className="grid grid-cols-12 gap-y-10 md:gap-4 items-center py-24">
          <div className="col-span-12 md:col-span-6 flex flex-col md:gap-4 md:gap-24 text-enred-black">
            <div className="flex flex-col gap-12">
              <div className="text-8xl font-bold text-[clamp(2rem,7vw,7rem)]">
                <PrismicRichText field={slice.primary.section_title} />
              </div>
              <div className="text-xl font-semibold">
                <PrismicRichText field={slice.primary.section_subtitle} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-12 md:col-span-1 p-4 flex items-center justify-center">
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
              <div className="col-span-12 md:col-span-4 text-md md:text-xl text-pretty">
                <PrismicRichText field={slice.primary.section_description} />
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <ImageClipper slice={slice} />
          </div>
        </div>

        <div className="relative grid grid-cols-12 md:gap-4 items-start pb-16">
          {slice.primary.features.map((item, i) => (
            <div key={i} className="col-span-12 md:col-span-4 p-4 md:p-10 flex flex-col gap-5 z-10">
              <PrismicNextImage field={item.icon} width={77} height={62} />
              <div className="text-2xl md:text-3xl text-enred-black font-semibold">
                <PrismicRichText field={item.heading} />
              </div>
            </div>
          ))}
          <Image
            src={"/gray-shape.svg"}
            alt="shape"
            width={944}
            height={544}
            className="absolute inset-0 z-0 w-full md:w-[69%] h-auto"
          />
        </div>

        <div className="relative flex flex-col gap-16 pt-18 pb-24 z-20">
          <div className="grid grid-cols-12 gap-4">
            {slice.primary.imagenes.map((item, index) => (
              <div key={index} className="col-span-12 md:col-span-4">
                <PrismicNextImage field={item.imagen} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 text-enred-black">
            {slice.primary.feature_descriptions.map((item, index) => (
              <div className="col-span-2 md:col-span-1 text-pretty text-xl" key={index}>
                <PrismicRichText field={item.feature_description} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlightsGrid;
