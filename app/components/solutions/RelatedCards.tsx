import { asText, Content } from "@prismicio/client";
import { FeatureHighlightsGridSlice } from "@/prismicio-types";
import Image from "next/image";
import Link from "next/link";

interface RelatedSolutionCardsProps {
  slice: FeatureHighlightsGridSlice;
  relatedSolutions: Content.SolucionDocument[];
}

export default function RelatedSolutionCards({
  relatedSolutions,
}: RelatedSolutionCardsProps) {
  return (
    <div className="flex flex-col gap-16 pt-18 z-20 ">
      <div className="relative grid grid-cols-12 md:gap-4 items-start pb-16">
        {relatedSolutions.map((solucion, i) => {
          const featureSlice = solucion.data.slices.find(
            (s) => s.slice_type === "feature_highlights_grid",
          ) as Content.FeatureHighlightsGridSlice | undefined;

          return (
            <Link
              key={i}
              href={`/soluciones/${solucion.uid}`}
              className="col-span-12 md:col-span-4 p-4 md:p-10 flex flex-col gap-5 z-10"
            >
              <Image src="/shape1.svg" alt="" width={77} height={62} />
              <div className="text-2xl md:text-3xl text-enred-black font-semibold underline underline-offset-2">
                {featureSlice && asText(featureSlice.primary.section_title)}
              </div>
            </Link>
          );
        })}
        <Image
          src={"/gray-shape.svg"}
          alt="shape"
          width={944}
          height={544}
          className="absolute z-0 -right-14 top-60 md:top-14 w-full scale-200 md:scale-100 md:w-[60%] h-auto"
        />
      </div>
    </div>
  );
}
