"use client";

// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { PrismicRichText } from "@prismicio/react";
import TrabajosImageClipper from "./TrabajosImageClipper";
import { MediaGridIntroSlice } from "@/prismicio-types";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { useRef, useState, useEffect } from "react";
import useIsomorphicLayoutEffect from "../lib/custom-hooks/useIsometricLayoutEffect";
import { MediaGridIntroSliceHeadlineImageGridPrimaryMediaItemsItem } from "@/prismicio-types";

function SwiperNav() {
  const swiper = useSwiper();
  const [isBeginning, setIsBeginning] = useState(swiper.isBeginning);
  const [isEnd, setIsEnd] = useState(swiper.isEnd);

  useEffect(() => {
    const update = () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    };
    swiper.on("slideChange", update);
    return () => {
      swiper.off("slideChange", update);
    };
  }, [swiper]);

  return (
    <div className="flex gap-2">
      <button
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning}
        className="w-10 h-10 bg-enred-red flex items-center justify-center disabled:opacity-40"
        aria-label="Slide anterior"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 3L5 8L10 13"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
        className="w-10 h-10 bg-enred-red flex items-center justify-center disabled:opacity-40"
        aria-label="Slide siguiente"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M6 3L11 8L6 13"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

function TrabajosSlide({
  item,
}: {
  item: MediaGridIntroSliceHeadlineImageGridPrimaryMediaItemsItem;
}) {
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (
      !labelRef.current ||
      !titleRef.current ||
      !textRef.current ||
      !imageRef.current
    )
      return;
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({ paused: true })
        .from(labelRef.current, {
          y: 50,
          opacity: 0,
          ease: "power3.out",
          duration: 1,
        })
        .from(
          imageRef.current,
          {
            y: 50,
            opacity: 0,
            ease: "power3.out",
            duration: 1,
          },
          "<",
        )
        .from(
          titleRef.current,
          {
            y: 50,
            opacity: 0,
            ease: "power3.out",
            duration: 1,
          },
          "<",
        )
        .from(
          textRef.current,
          {
            y: 50,
            opacity: 0,
            ease: "power3.out",
            duration: 1,
          },
          "-=0.75",
        );
      ScrollTrigger.create({
        trigger: labelRef.current,
        start: "top 65%",
        end: "bottom 10%",
        animation: tl,
        scrub: true,
      });
    }, []);

    return () => ctx.revert();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="col-span-1 md:col-span-5 text-enred-black flex flex-col gap-14 py-12">
        <div ref={labelRef}>
          <PrismicRichText field={item.label} />
        </div>
        <div
          ref={titleRef}
          className="text-6xl font-semibold text-[clamp(1rem,5.2vw,55px)]"
        >
          <PrismicRichText field={item.main_title} />
        </div>
        <div
          ref={textRef}
          className="text-balance h-full flex gap-6 justify-between items-start flex-col pb-5"
        >
          <PrismicRichText field={item.description} />
          <SwiperNav />
        </div>
      </div>
      <div className="col-span-1 md:col-span-7" ref={imageRef}>
        <TrabajosImageClipper item={item} />
      </div>
    </div>
  );
}

export default function TrabajosSwiper({
  slice,
}: {
  slice: MediaGridIntroSlice;
}) {
  return (
    <div>
      <Swiper
        spaceBetween={60}
        slidesPerView={1}
        slidesOffsetBefore={60}
        slidesOffsetAfter={60}
        breakpoints={{
          0: {
            spaceBetween: 30,
            slidesOffsetBefore: 30,
            slidesOffsetAfter: 30,
          },
          768: {
            spaceBetween: 60,
            slidesOffsetBefore: 60,
            slidesOffsetAfter: 60,
          },
        }}
      >
        {slice.primary.media_items.map((item, index) => (
          <SwiperSlide key={index}>
            <TrabajosSlide item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
