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
      id="our-work-section"
    >
      <div className="container gap-4">
        <div className="text-black w-full flex justify-end mb-5">
          <SectionHeading title="Nuestros trabajos" />
        </div>
      </div>
      <div className="2xl:container mx-auto">
        <TrabajosSwiper slice={slice} />
      </div>
    </section>
  );
};

export default MediaGridIntro;
