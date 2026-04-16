import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

export default function SloganSection({
  sloganData,
}: {
  sloganData: Content.SloganDocument;
}) {
  const data = sloganData.data as Content.SloganDocumentData;

  return (
    <section className="bg-black py-16 px-6 sm:py-20 sm:px-12">
      <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-10 sm:gap-6">

        {isFilled.richText(data.slogan) && (
          <div className="sm:w-1/3 text-center sm:text-left">
            <div className="text-white [&_strong]:underline [&_strong]:decoration-[3px] [&_strong]:underline-offset-4 text-[clamp(2rem,3vw,3rem)] font-bold leading-tight">
              <PrismicRichText field={data.slogan} />
            </div>
          </div>
        )}


        {isFilled.image(data.logo) && (
          <div className="flex justify-center sm:justify-start sm:w-1/3">
            <PrismicNextImage
              className="w-40 sm:w-44 md:w-52 object-contain"
              field={data.logo}
              width={data.logo.dimensions?.width}
              height={data.logo.dimensions?.height}
            />
          </div>
        )}




        {isFilled.image(data.sello) && (
          <div className="flex justify-center sm:justify-end sm:w-1/3">
            <PrismicNextImage
              className="w-28 sm:w-20 md:w-24 object-contain"
              field={data.sello}
              width={data.sello.dimensions?.width}
              height={data.sello.dimensions?.height}
            />
          </div>
        )}
      </div>
    </section>
  );
}
