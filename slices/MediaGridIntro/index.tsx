import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import "swiper/css";
import TrabajosSwiper from "@/app/components/TrabajosSwiper";
import SectionHeading from "@/app/components/SectionHeading";

/**
 * Props for `MediaGridIntro`.
 */
export type MediaGridIntroProps =
  SliceComponentProps<Content.MediaGridIntroSlice>;

/**
 * Component for "MediaGridIntro" Slices.
 */
const MediaGridIntro: FC<MediaGridIntroProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-enred-gray p-12"
    >
      <div className="max-w-[1440px] m-auto grid grid-cols-12 gap-4">
        <div className="col-span-12 flex gap-5 items-center md:justify-end mb-6 ">
          <SectionHeading title="Nuestros trabajos" style="text-enred-black" />
        </div>
        <div className="col-span-12">
          <TrabajosSwiper slice={slice} />
        </div>
      </div>
    </section>
  );
};

export default MediaGridIntro;
