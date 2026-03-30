import { FeatureHighlightsGridSlice } from "@/prismicio-types";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";
interface RelatedSolutionCardsProps {
  slice: FeatureHighlightsGridSlice;
}

export default function RelatedSolutionCards({
  slice,
}: RelatedSolutionCardsProps) {
  return (
    <div className="flex flex-col gap-16 pt-18 z-20 ">
      <div className="relative grid grid-cols-12 md:gap-4 items-start pb-16">
        {slice.primary.features.map((item, i) => (
          <div
            key={i}
            className="col-span-12 md:col-span-4 p-4 md:p-10 flex flex-col gap-5 z-10"
          >
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
          className="absolute z-0 -right-14 top-14 w-full md:w-[69%] h-auto"
        />
      </div>
    </div>
  );
}
