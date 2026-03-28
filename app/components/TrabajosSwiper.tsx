"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { PrismicRichText } from "@prismicio/react";
import TrabajosImageClipper from "./TrabajosImageClipper";
import { MediaGridIntroSlice } from "@/prismicio-types";

export default function TrabajosSwiper({ slice }: { slice: MediaGridIntroSlice }) {
  return (
    <Swiper spaceBetween={0} slidesPerView={1}>
      {slice.primary.media_items.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 text-enred-black flex flex-col gap-14 pr-5">
              <PrismicRichText field={item.label} />
              <div className="text-6xl font-semibold text-[clamp(1rem,7vw,3rem)]">
                <PrismicRichText field={item.main_title} />
              </div>
              <div className="text-balance">
                <PrismicRichText field={item.description} />
              </div>
            </div>
            <div className="col-span-8">
              <TrabajosImageClipper item={item} />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
