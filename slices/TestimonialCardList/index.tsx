import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import Link from "next/link";
import SectionHeading from "@/app/components/SectionHeading";
import ReviewsComponent from "@/app/components/ReviewsComponent";

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

const TestimonialCardList: FC<TestimonialCardListProps> = async ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="text-enred-black bg-white"
    >
      <div className="max-w-360 m-auto grid grid-cols-12 gap-y-10 gap-x-5 p-12 items-center">
        <div className="col-span-12 mb-6 flex gap-4 items-center justify-end">
          <SectionHeading title="Reseña" style="text-black" />
        </div>

        <div className="col-span-12">
          <ReviewsComponent />
        </div>
      </div>
    </section>
  );
};

export default TestimonialCardList;
