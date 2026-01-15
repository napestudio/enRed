import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Image from "next/image";

/**
 * Props for `Header`.
 */
export type HeaderProps = SliceComponentProps<Content.HeaderSlice>;

/**
 * Component for "Header" Slices.
 */
const Header: FC<HeaderProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-screen bg-white"
    >
      <div className="grid grid-cols-12 gap-4 min-h-screen py-12">
        <div className="col-span-10 col-start-2 lg:col-start-2 lg:col-span-4 flex flex-col justify-between py-12">
          <div>
            <Image
              src="/images/logo-en-red.svg"
              alt="enRed Logo"
              width={400}
              height={100}
            />
            <p className="text-black mt-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo,
              sequi. Alias sunt aliquid, quaerat reprehenderit fuga debitis
              nostrum molestiae quas nesciunt, labore accusamus aspernatur aut
              in suscipit! Earum, voluptates ducimus!
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="/images/instagram-icon.svg"
              alt="enRed Logo"
              className="text-red fill-red"
              width={16}
              height={16}
            />
            <p className="text-black"> @enred.soluciones</p>
          </div>
        </div>
        <div className="relative col-span-10 col-start-2 lg:col-start-6 lg:col-span-6">
          <Image
            src="/images/edificio-header.svg"
            alt="enRed Logo"
            className="w-full h-auto"
            width={600}
            height={600}
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
