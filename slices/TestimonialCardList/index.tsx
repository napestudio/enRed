import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

import ReviewsComponent from "@/app/components/ReviewsComponent";
import SectionHeading from "@/app/components/SectionHeading";

/**
 * Props for `TestimonialCardList`.
 */
export type TestimonialCardListProps =
  SliceComponentProps<Content.TestimonialCardListSlice>;

const TestimonialCardList: FC<TestimonialCardListProps> = async ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="text-enred-black bg-white py-12"
    >
      <div className="container flex items-center">
        <div className="mb-12 flex gap-4 w-full items-center justify-end">
          <SectionHeading title="Reseñas" style="text-black" />
        </div>
      </div>
      <div>
        <ReviewsComponent />
      </div>
    </section>
  );
};

export default TestimonialCardList;
