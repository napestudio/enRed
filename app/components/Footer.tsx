import Image from "next/image";
import Link from "next/link";
import { LINKS } from "../lib/constants";

export default function Footer() {
  const { navItems, socialItems } = LINKS;

  return (
    <footer className="min-h-[80dvh] bg-red grid grid-cols-9 gap-4 pt-24 overflow-hidden">
      <div className="cols-start-1 col-span-4 px-24 ">
        <h2 className="text-5xl text-balance ">
          Líderes en cerramientos de seguridad
        </h2>
      </div>

      <nav className="col-start-6 col-span-3 flex space-x-8">
        <ul className="flex justify-between gap-4 uppercase">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link className="text-white font-light text-sm" href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="hidden flex justify-between ml-8">
          {socialItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} target="_blank">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="col-start-1 col-span-9 mt-8">
        <Image
          src="/logo-footer.svg"
          alt="enRed Logo"
          width={150}
          height={50}
          className="w-full h-auto"
        />
      </div>
    </footer>
  );
}
