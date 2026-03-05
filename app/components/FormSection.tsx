"use client";
import Image from "next/image";
import SectionHeading from "./SectionHeading";

function FormSection() {
  const submit = (data: any) => {
    console.log("🚀 ~ submit ~ data:", data);
  };
  return (
    <section className="bg-enred-gray-light text-enred-black overflow-hidden">
      <div className="max-w-[1440px] m-auto grid grid-cols-4 gap-6 p-12 pt-20 items-center">
        <div className="col-span-4 mb-6 flex gap-4 items-center text-enred-black">
          <SectionHeading title="Hablemos" style="text-black" />
        </div>

        <div className="relative col-span-4 sm:col-span-2 h-full flex flex-col gap-6 justify-center items-center">
          <h2 className="text-[8rem] font-bold tracking-tight leading-[.75] m-0 z-10">
            +80.000
          </h2>
          <p className="text-[2.7rem] leading-none m-0 z-10">
            metros <span className="text-enred-red">en red</span> instalados
          </p>
          <div className="absolute  -left-100 top-0 col-span-12 col-start-1 md:col-span-10 md:col-start-3 z-0 flex items-center">
            <Image
              src="/gray-shape.svg"
              alt="enRed Logo"
              width={150}
              height={50}
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="col-span-4 sm:col-span-2 col-start-3 ">
          <form action={submit} className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div className="col-span-1 flex flex-col gap-3">
              <label className="text-xs">Nombre completo</label>
              <input
                className="bg-white w-full px-2 py-4 border-b-2 text-2xs leading-none"
                name="name"
                type="text"
                value="Nap"
              />
            </div>
            <div className="col-span-1  flex flex-col gap-3">
              <label className="text-xs">E-mail</label>
              <input
                className="bg-white w-full px-2 py-4 border-b-2 text-2xs leading-none"
                name=""
                type="text"
              />
            </div>
            <div className="col-span-1  flex flex-col gap-3">
              <label className="text-xs">Teléfono</label>
              <input
                className="bg-white w-full px-2 py-4 border-b-2 text-2xs leading-none"
                name=""
                type="text"
              />
            </div>
            <div className="col-span-1  flex flex-col gap-3">
              <label className="text-xs">Ubicación red</label>
              <input
                className="bg-white w-full px-2 py-4 border-b-2 text-2xs leading-none"
                name=""
                type="text"
              />
            </div>
            <div className="col-span-1  flex flex-col gap-3">
              <label className="text-xs">Medida</label>
              <input
                className="bg-white w-full px-2 py-4 border-b-2 text-2xs leading-none"
                name=""
                type="text"
              />
            </div>
            <div className="col-span-1  flex flex-col gap-3">
              <label className="text-xs">Tipo de red</label>
              <input
                className="bg-white w-full px-2 py-4 border-b-2 text-2xs leading-none"
                name=""
                type="text"
              />
            </div>
            <div className="col-span-2 flex flex-col">
              <label className="">Mensaje</label>
              <textarea
                name=""
                id=""
                className="bg-white p-2 border-b-2"
              ></textarea>
            </div>
            <div className="col-span-1 col-start-2 bg-enred-red ">
              <p className="text-white py-4 px-6 text-center">Contactanos</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default FormSection;
