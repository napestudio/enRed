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
    <section className="bg-black py-12 ">
      <div className="container mx-auto flex md:flex-row flex-col items-center justify-center gap-10 sm:gap-12">
        {isFilled.image(data.logo) && (
          <div className="flex justify-center sm:justify-start">
            <PrismicNextImage
              className="w-40 sm:w-44 md:w-44 object-contain"
              field={data.logo}
              width={data.logo.dimensions?.width}
              height={data.logo.dimensions?.height}
              alt=""
            />
          </div>
        )}
        {isFilled.richText(data.slogan) && (
          <div className="text-center sm:text-left">
            <div className="text-white [&_strong]:underline [&_strong]:decoration-[3px] [&_strong]:underline-offset-4 text-[clamp(2rem,3.25vw,4rem)] font-medium leading-none">
              <PrismicRichText field={data.slogan} />
            </div>
          </div>
        )}

        {isFilled.image(data.sello) && (
          <div className="flex justify-center sm:justify-end">
            <PrismicNextImage
              className="w-28 sm:w-20 md:w-24 object-contain"
              field={data.sello}
              width={data.sello.dimensions?.width}
              height={data.sello.dimensions?.height}
              alt=""
            />
          </div>
        )}
      </div>
    </section>
  );
}
