import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import Image from "next/image";
import Link from "next/link";

/**
 * Props for `TestimonialCardList`.
 */
export type TestimonialCardListProps =
  SliceComponentProps<Content.TestimonialCardListSlice>;

/**
 * Component for "TestimonialCardList" Slices.
 */

const reseñas = [
  {
    name: "John Doe",
    time: "1 year",
    review:
      "Garantizamos la mejor protección en edificios, obras en construcción, domicilios particulares, estructuras y otros espacios.",
  },
  {
    name: "Jane Smith",
    time: "6 months",
    review:
      "Excelente servicio y atención al cliente. Recomiendo enRed para cualquier necesidad de protección.",
  },
  {
    name: "Alice Johnson",
    time: "2 years",
    review:
      "EnRed ha sido una solución confiable para proteger mis proyectos de construcción. ¡Muy satisfecho!",
  },
];

const TestimonialCardList: FC<TestimonialCardListProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="text-enred-black bg-[#E8E8E8]"
    >
      <div className="max-w-[1440px] m-auto grid grid-cols-12 gap-y-10 gap-x-5 p-12 items-center">
        <div className="col-span-12 mb-6 flex gap-4 items-center justify-end">
          <h2 className="text-5xl font-semibold">Reseñas</h2>
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

        {reseñas.map((reseña, index) => (
          <div
            key={index}
            className="col-span-4 p-10 bg-white grid grid-cols-3 gap-5 h-full"
          >
            <div className="col-span-3 flex gap-4">
              <div className="w-15 h-15 rounded-full overflow-hidden aspect-square bg-enred-red"></div>
              <div className="pt-1 font-semibold ">
                <h4 className="underline">{reseña.name}</h4>
                <p className="text-sm">{reseña.time}</p>
              </div>
            </div>

            <div className="col-span-3 flex flex-col text-enred-black gap-3 justify-center">
              <p className="text-pretty">{reseña.review}</p>
            </div>
            <div className="col-span-3 flex flex-col text-enred-black gap-3 justify-center">
              <Image
                src="/hearts.svg"
                alt="enRed Logo"
                width={80}
                height={40}
              />
            </div>
          </div>
        ))}
        <div className="col-span-12 mb-6 flex gap-4 items-center justify-end">
          <Link
            href="/"
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
      </div>
    </section>
  );
};

export default TestimonialCardList;
