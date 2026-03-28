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
      className="text-enred-black bg-white"
    >
      <div className="max-w-360 m-auto grid grid-cols-12 gap-y-10 gap-x-5 p-12 items-center">
        <div className="col-span-12 mb-6 flex gap-4 items-center justify-end">
          <SectionHeading title="Reseñas" style="text-black" />
        </div>

        <div className="col-span-12">
          <ReviewsComponent />
        </div>
      </div>
    </section>
  );
};

export default TestimonialCardList;
