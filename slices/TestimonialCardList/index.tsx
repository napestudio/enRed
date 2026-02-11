import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import Image from "next/image";

/**
 * Props for `TestimonialCardList`.
 */
export type TestimonialCardListProps =
  SliceComponentProps<Content.TestimonialCardListSlice>;

/**
 * Component for "TestimonialCardList" Slices.
 */
const TestimonialCardList: FC<TestimonialCardListProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid grid-cols-12 gap-4 p-12 items-center">
        <div className="col-span-6 p-4 bg-enred-red grid grid-cols-3 gap-4">
          <div className="col-span-1 p-4">
            <div className="rounded-full overflow-hidden aspect-square bg-white"></div>
          </div>
          <div className="col-span-2 flex flex-col text-white gap-3 justify-center">
            <Image
              src="/hearts.svg"
              alt="enRed Logo"
              className=""
              width={80}
              height={40}
            />
            <h4>John Doe</h4>
            <p>
              Garantizamos la mejor protección en edificios, obras en
              construcción, domicilios particulares, estructuras y otros
              espacios.
            </p>
          </div>
        </div>
        <div className="col-span-6 p-4 bg-enred-red grid grid-cols-3 gap-4">
          <div className="col-span-1 p-4">
            <div className="rounded-full overflow-hidden aspect-square bg-white"></div>
          </div>
          <div className="col-span-2 flex flex-col text-white gap-3 justify-center">
            <Image
              src="/hearts.svg"
              alt="enRed Logo"
              className=""
              width={80}
              height={40}
            />
            <h4>John Doe</h4>
            <p>
              Garantizamos la mejor protección en edificios, obras en
              construcción, domicilios particulares, estructuras y otros
              espacios.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCardList;
