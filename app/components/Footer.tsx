import Image from "next/image";
import Link from "next/link";
import { LINKS } from "../lib/constants";

export default function Footer() {
  const { navItems, socialItems } = LINKS;

  return (
    <>
      <section className="bg-enred-gray-light text-enred-black">
        <div className="max-w-[1440px] m-auto grid grid-cols-4 gap-6 p-12 items-center">
          <div className="col-span-4 mb-6 flex gap-4 items-center text-enred-black">
            <h2 className="text-5xl font-semibold">Hablemos</h2>
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
              className="lucide lucide-arrow-down-to-line-icon lucide-arrow-down-to-line w-12 h-12 "
            >
              <path d="M12 17V3" />
              <path d="m6 11 6 6 6-6" />
              <path d="M19 21H5" />
            </svg>
          </div>
          <div className="col-span-4 sm:col-span-2 h-full flex flex-col gap-6 justify-center items-center">
            <h2 className="text-[8rem] font-bold tracking-tight leading-[.75] m-0">
              +80.000
            </h2>
            <p className="text-[2.7rem] leading-none m-0">
              metros <span className="text-enred-red">en red</span> instalados
            </p>
          </div>
          <div className="col-span-4 sm:col-span-2 col-start-3 ">
            <form action="" className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="col-span-1 flex flex-col gap-3">
                <label  className="text-xs">Nombre completo</label>
                <input className="bg-white w-full px-2 py-4 border-b-2 text-2xs leading-none" name="name" type="text" value="Nap"/>
              </div>
              <div className="col-span-1  flex flex-col gap-3">
                <label className="text-xs">E-mail</label>
                <input className="bg-white w-full px-2 py-4 border-b-2 text-2xs leading-none" name="" type="text" />
              </div>
              <div className="col-span-1  flex flex-col gap-3">
                <label className="text-xs">Teléfono</label>
                <input className="bg-white w-full px-2 py-4 border-b-2 text-2xs leading-none" name="" type="text" />
              </div>
              <div className="col-span-1  flex flex-col gap-3">
                <label className="text-xs">Ubicación red</label>
                <input className="bg-white w-full px-2 py-4 border-b-2 text-2xs leading-none" name="" type="text" />
              </div>
              <div className="col-span-1  flex flex-col gap-3">
                <label className="text-xs">Medida</label>
                <input className="bg-white w-full px-2 py-4 border-b-2 text-2xs leading-none" name="" type="text" />
              </div>
              <div className="col-span-1  flex flex-col gap-3">
                <label className="text-xs">Tipo de red</label>
                <input className="bg-white w-full px-2 py-4 border-b-2 text-2xs leading-none" name="" type="text" />
              </div>
              <div className="col-span-2 flex flex-col">
                <label className="">Mensaje</label>
                <textarea name="" id="" className="bg-white p-2 border-b-2"></textarea>
              </div>
              <div className="col-span-1 col-start-2 bg-enred-red ">
                <p className="text-white py-4 px-6 text-center">Contactanos</p>
              </div>
            </form>
          </div>
        </div>
      </section>
      <footer className="bg-enred-red">
        <div className="max-w-[1440px] m-auto grid grid-cols-12 gap-0 p-12 overflow-hidden relative">
          <div className="col-span-12 md:col-span-6 z-10 text-enred-black my-20">
            <h2 className="text-6xl text-balance text-enred-black font-semibold text-[clamp(2rem,7vw,7rem)]">
              Soluciones con <span className="underline">altura</span>
            </h2>
            <p className="mt-4 text-2xl">Galvez 833</p>
            <p className="text-2xl">S2000 Rosario (SF)</p>
            <div className="mt-2 z-0">
              <Image
                src="/gram.svg"
                alt="enRed Logo"
                width={40}
                height={40}
                className=""
              />
            </div>
          </div>

          <div className="absolute bottom-24 md:col-start-3 md:col-span-10 z-0">
            <Image
              src="/footer-shapes.svg"
              alt="enRed Logo"
              width={150}
              height={50}
              className="w-full h-auto"
            />
          </div>
        </div>
      </footer>
    </>
  );
}
