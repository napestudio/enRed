import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FormContact`.
 */
export type FormContactProps = SliceComponentProps<Content.FormContactSlice>;

/**
 * Component for "FormContact" Slices.
 */
const FormContact: FC<FormContactProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-enred-red text-enred-black"
    >
      <div className="max-w-[1440px] m-auto grid grid-cols-12 gap-4 p-12 items-center text-white">
        <div className="col-span-3 border-b border-white">
          <p className="p-4">Nombre y Apellido</p>
        </div>
        <div className="col-span-3 border-b border-white">
          <p className="p-4">Email</p>
        </div>
        <div className="col-span-3 border-b border-white">
          <p className="p-4">Consulta</p>
        </div>
        <div className="col-span-3 bg-enred-black ">
          <p className="text-white py-4 px-6">Contactanos</p>
        </div>
      </div>
    </section>
  );
};

export default FormContact;
