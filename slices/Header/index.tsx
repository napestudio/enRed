import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import CanvasContainer from "@/app/components/experience/CanvasContainer";

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
      className="min-h-screen bg-slate-400"
    >
      <div className="h-dvh w-dvw">
        <CanvasContainer />
      </div>
    </section>
  );
};

export default Header;
