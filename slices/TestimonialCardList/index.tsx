import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/app/components/SectionHeading";

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
      className="text-enred-black bg-white"
    >
      <div className="max-w-[1440px] m-auto grid grid-cols-12 gap-y-10 gap-x-5 p-12 items-center">
        <div className="col-span-12 mb-6 flex gap-4 items-center justify-end">          
          <SectionHeading title="Reseña" style="text-black"/>
        </div>

        {reseñas.map((reseña, index) => (
          <div
            key={index}
            className="col-span-4 p-10 bg-enred-gray-light grid grid-cols-3 gap-2 h-full rounded-2xl"
          >
            <div className="col-span-3 flex gap-4">
              <div className="w-15 h-15 rounded-full overflow-hidden aspect-square bg-enred-red"></div>
              <div className="pt-1 font-semibold ">
                <h4 className="underline">{reseña.name}</h4>
                <p className="text-sm">{reseña.time}</p>
              </div>
            </div>

            <div className="col-span-3 flex flex-col text-enred-black gap-3 justify-center">
              <p className="text-balance">{reseña.review}</p>
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
