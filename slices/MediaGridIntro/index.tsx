import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import "swiper/css";
import TrabajosSwiper from "@/app/components/TrabajosSwiper";

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
      className="bg-[#E8E8E8] p-12"
    >
      <div className="max-w-[1440px] m-auto grid grid-cols-12 gap-4">
        <div className="col-span-12 flex gap-5 items-center md:justify-end mb-6 ">
          <h2 className="text-5xl text-enred-black font-semibold">
            Nuestros trabajos
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-down-to-line-icon lucide-arrow-down-to-line w-12 h-12 text-black"
          >
            <path d="M12 17V3" />
            <path d="m6 11 6 6 6-6" />
            <path d="M19 21H5" />
          </svg>
        </div>
        <div className="col-span-12">
          <TrabajosSwiper slice={slice} />
        </div>
      </div>
    </section>
  );
};

export default MediaGridIntro;
