import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

import SectionHeading from "@/app/components/SectionHeading";
import TrabajosSwiper from "@/app/components/TrabajosSwiper";
import "swiper/css";

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
      className="bg-enred-gray py-24"
    >
      <div className="max-w-360 mx-auto gap-4 px-12">
        <div className="text-black w-full flex justify-end mb-5">
          <SectionHeading title="Nuestros trabajos" />
        </div>
      </div>
      <div className="2xl:max-w-360 mx-auto">
        <TrabajosSwiper slice={slice} />
      </div>
    </section>
  );
};

export default MediaGridIntro;
