import Image from "next/image";
import Link from "next/link";
import { LINKS } from "../lib/constants";

export default function Footer() {
  const { navItems, socialItems } = LINKS;

  return (
    <footer className="bg-enred-red">
      <div className="max-w-[1440px] m-auto grid grid-cols-9 gap-4 p-12 overflow-hidden relative">
        <div className="cols-start-1 col-span-3 z-10 text-enred-black my-20">
          <h2 className="text-6xl text-balance text-enred-black">
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

        <div className="absolute col-start-3 col-span-9 pr-12 z-0">
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
  );
}
