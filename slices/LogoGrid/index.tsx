"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import SectionHeading from "@/app/components/SectionHeading";
import { PrismicNextImage } from "@prismicio/next";
import "swiper/css";
/**
 * Props for `LogoGrid`.
 */
export type LogoGridProps = SliceComponentProps<Content.LogoGridSlice>;

/**
 * Component for "LogoGrid" Slices.
 */
const LogoGrid: FC<LogoGridProps> = ({ slice }) => {
  //console.log("🚀 ~ LogoGrid ~ slice:", slice);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-enred-black text-enred-black"
    >
      <div className="max-w-360 m-auto grid grid-cols-12 gap-4 p-12 items-center">
        <div className="col-span-5 mb-6 flex gap-4 items-center text-white">
          <SectionHeading title="Nuestros clientes" style="text-white" />
        </div>
        <div className="col-span-12 ">
          <Swiper
            spaceBetween={0}
            slidesPerView={4.2}
            style={{ alignItems: "stretch" }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            className="items-stretch!"
          >
            {slice.primary.logos.map((foto, index) => (
              <SwiperSlide
                key={index}
                style={{ height: "auto" }}
                className="h-auto!"
              >
                <div className="h-full p-4">
                  <PrismicNextImage
                    className="w-full h-auto aspect-video object-contain"
                    field={foto.logo_image}
                    width={foto.logo_image.dimensions?.width}
                    height={foto.logo_image.dimensions?.height}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default LogoGrid;
