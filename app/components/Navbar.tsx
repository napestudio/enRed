import Image from "next/image";
import Link from "next/link";
import { LINKS } from "../lib/constants";
import { cn } from "../lib/utils";

export default function Navbar() {
  const { navItems, socialItems } = LINKS;

  return (
    <div className="h-16 bg-transparent flex justify-between items-center py-6 px-12 overflow-hidden fixed top-0 left-0 right-0 z-50 border-b">
      <Image src="/logo-en-red.svg" alt="enRed Logo" width={150} height={50} />
      
      <nav className="flex space-x-8">
        <ul className="flex justify-between gap-30">
          {navItems.map((item, index) => (
            <li key={item.href}>
              <Link className={cn("text-white font-light font-sm")} href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
