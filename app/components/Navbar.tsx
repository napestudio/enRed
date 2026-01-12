import Image from "next/image";
import Link from "next/link";
import { LINKS } from "../lib/constants";

export default function Navbar() {
  const { navItems, socialItems } = LINKS;

  return (
    <div className="h-16 bg-gray-200 p-4 flex justify-between items-center px-24">
      <Image src="/logo-en-red.svg" alt="enRed Logo" width={150} height={50} />
      <nav className="flex space-x-8">
        <ul className="flex justify-between gap-4 uppercase">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link className="text-red font-light text-sm" href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <ul className="flex justify-between ml-8">
          {socialItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} target="_blank">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
