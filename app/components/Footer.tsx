import Image from "next/image";
import Link from "next/link";
import { LINKS } from "../lib/constants";

export default function Footer() {
  const { navItems, socialItems } = LINKS;

  return (
    <footer className="min-h-[80dvh] bg-red grid grid-cols-9 gap-4 p-12 overflow-hidden relative">
      <div className="cols-start-1 col-span-3 ">
        <h2 className="text-6xl text-balance text-black">
          Soluciones con <span className="underline">altura</span>
        </h2>
      </div>
      
      <div className="absolute col-start-3 col-span-9 pr-12">
        <Image
          src="/footer-shapes.svg"
          alt="enRed Logo"
          width={150}
          height={50}
          className="w-full h-auto"
        />
      </div>
    </footer>
  );
}
