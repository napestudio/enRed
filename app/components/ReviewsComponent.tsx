"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { useMediaQuery } from "@mantine/hooks";

// Import Swiper styles
import "swiper/css";

interface Review {
  author: string;
  rating: number;
  time: string;
  text: string;
  photoUrl: string;
  profileUrl: string;
}

function ReviewsComponent() {
  const isSmallScreen = useMediaQuery("(max-width: 720px)");
  const isMediumScreen = useMediaQuery("(max-width: 960px)");

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewUrl, setReviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await fetch("/api/reviews").then((r) => r.json());
        console.log("🚀 ~ fetchReviews ~ data:", data);
        setReviews(data.reviews ?? []);
        setReviewUrl(data.reviewsUrl);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) return <p>Cargando reseñas...</p>;

  return (
    <>
      <Swiper
        spaceBetween={16}
        slidesPerView={isSmallScreen ? 1 : isMediumScreen ? 2 : 3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="min-h-[300px]"
      >
        {reviews.map((review: Review, index: number) => (
          <SwiperSlide
            key={index}
            className="select-none p-10 bg-enred-gray-light h-full rounded-2xl"
          >
            <Link
              href={review.profileUrl}
              target="_blank"
              className="flex flex-col justify-between gap-10 h-full"
            >
              <div className="flex gap-4 ">
                <div className="w-15 h-15 rounded-full overflow-hidden aspect-square bg-enred-red">
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

              <div className="text-enred-black">
                <p className="text-pretty text-md">{review.text}</p>
              </div>

              <div className="flex flex text-enred-black gap-1 ">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <svg
                    key={index}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star-icon lucide-star h-4 w-4 text-enred-red"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                ))}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="my-6 flex gap-4 items-center justify-end">
        <Link
          href={reviewUrl}
          target="_blank"
          className="bg-enred-red text-white text-md px-12 py-4 flex justify-center items-center gap-2"
        >
          <span>Ver todas</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-right-icon lucide-arrow-right w-5 h-5 text-white"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </>
  );
}

export default ReviewsComponent;
