"use client";

import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import useIsomorphicLayoutEffect from "../lib/custom-hooks/useIsometricLayoutEffect";
import { gsap, ScrollTrigger } from "../lib/gsap";
import ArrowIcon from "./ui/Icons/ArrowIcon";

export interface Review {
  author: string;
  rating: number;
  time: string;
  text: string;
  photoUrl: string;
  profileUrl: string;
}

interface ReviewsCarouselProps {
  reviews: Review[];
  reviewsUrl?: string;
}

export default function ReviewsCarousel({
  reviews,
  reviewsUrl,
}: ReviewsCarouselProps) {
  const cardsRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);
  const isSmallScreen = useMediaQuery("(max-width: 720px)");
  const isMediumScreen = useMediaQuery("(max-width: 960px)");

  useIsomorphicLayoutEffect(() => {
    if (!cardsRef.current || !linkRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true }).from(cardsRef.current, {
        y: 100,
        opacity: 0,
      });

      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: "top bottom",
        end: "center center",
        animation: tl,
        scrub: true,
      });

      const tl2 = gsap.timeline({ paused: true }).from(linkRef.current, {
        x: -50,
        opacity: 0,
      });

      ScrollTrigger.create({
        trigger: linkRef.current,
        start: "top bottom",
        end: "center center",
        animation: tl2,
        scrub: true,
      });
    }, cardsRef);

    return () => ctx.revert();
  }, [reviews]);

  return (
    <>
      <div ref={cardsRef}>
        <Swiper
          spaceBetween={16}
          slidesPerView={isSmallScreen ? 1.2 : isMediumScreen ? 2.2 : 3.2}
          className="min-h-75 items-stretch!"
          slidesOffsetBefore={48}
          slidesOffsetAfter={48}
        >
          {reviews.map((review: Review, index: number) => (
            <SwiperSlide key={index} className="select-none h-auto! group">
              <Link
                href={review.profileUrl}
                target="_blank"
                className="flex flex-col justify-between gap-10 h-full p-10 bg-enred-gray-light rounded-2xl hover:bg-enred-red hover:text-white transition-all duration-300"
              >
                <div className="flex gap-4 ">
                  <div className="w-15 h-15 rounded-full overflow-hidden aspect-square bg-enred-red group-hover:bg-white">
                    <Image
                      src={review.photoUrl}
                      alt={review.author}
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="pt-1 font-semibold">
                    <h4 className="underline capitalize">{review.author}</h4>
                    <p className="text-sm">{review.time}</p>
                  </div>
                </div>

                <div>
                  <p className="text-pretty">{review.text}</p>
                </div>

                <div className="flex text-enred-red group-hover:text-white transition-colors gap-1 ">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <svg
                      key={index}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                    </svg>
                  ))}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {reviewsUrl && (
        <div
          className="max-w-360 mx-auto mt-12 flex gap-4 items-center justify-end pr-12 w-full overflow-hidden"
          ref={linkRef}
        >
          <Link
            href={reviewsUrl}
            target="_blank"
            className="bg-enred-red text-white text-2xl px-12 py-4 flex justify-center items-center gap-2 group hover:inset-shadow-[inset_0px_0px_0px_5px_rgba(255,255,255,0.1)]"
          >
            <span>Ver todas</span>
            <span className="group-hover:translate-x-2 group-hover:scale-101 transition-transform duration-300 ">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      )}
    </>
  );
}
