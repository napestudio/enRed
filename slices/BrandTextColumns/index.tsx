import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicImage,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import { asText } from "@prismicio/client/richtext";

/**
 * Props for `BrandTextColumns`.
 */
export type BrandTextColumnsProps =
  SliceComponentProps<Content.BrandTextColumnsSlice>;

/**
 * Component for "BrandTextColumns" Slices.
 */
const BrandTextColumns: FC<BrandTextColumnsProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 px-12"
    >
      <div className="max-w-[1440px] m-auto grid grid-cols-12 md:gap-8  items-center">
        <div className="col-span-12 md:col-span-4 mb-12 md:mb-0">
          <PrismicImage
            className="w-full"
            field={slice.primary.logo}
            width={slice.primary.logo.dimensions?.width}
            height={slice.primary.logo.dimensions?.height}
          />
        </div>
        <div className="col-span-12 md:col-span-8 flex flex-col md:flex-row gap-4">
          {slice.primary.text_columns &&
            slice.primary.text_columns.map((column, index) => (
              <div key={index}>
                <p className="text-pretty">{asText(column.text)}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default BrandTextColumns;
