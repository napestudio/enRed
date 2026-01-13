import Image from "next/image";
import Link from "next/link";
import { LINKS } from "../lib/constants";
import { cn } from "../lib/utils";

export default function Navbar() {
  const { navItems, socialItems } = LINKS;

  return (
    <div className="h-16 bg-white p-4 flex justify-between items-center px-24 overflow-hidden">
      <Image src="/logo-en-red.svg" alt="enRed Logo" width={150} height={50} />
      <nav className="flex space-x-8">
        <ul className="flex justify-between gap-4 uppercase ">
          {navItems.map((item, index) => (
            <li key={item.href}>
              <Link className={cn("text-red font-medium text-sm", index === navItems.length - 1 ? "bg-black rounded-full text-white px-4 ml-22" : "")} href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex items-center ml-8">
          {/*socialItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} target="_blank">
                {item.label}
              </Link>
            </li>
          ))*/}
          <li>
            <Link href={'#'} target="_blank">
              <Image
                src="/gram.svg"
                alt="enRed Logo"
                className="text-red fill-red"
                width={16}
                height={16}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
