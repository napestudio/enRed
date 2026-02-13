"use client";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { LINKS } from "../lib/constants";

import { cn } from "../lib/utils";
import { useIsPastHero } from "../lib/custom-hooks/useIsPastHero";
import { useRef } from "react";

import { useHeroRef } from "@/app/components/context/HeroRefContext";

export default function Navbar() {
  const pathname = usePathname();
  const { navItems, socialItems } = LINKS;
  const heroRef = useHeroRef();
  const isPast = useIsPastHero(heroRef);
  const isServicePage = pathname.startsWith("/soluciones/");

  return (
    <div
      className={cn(
        isPast || isServicePage ? "bg-enred-red" : "bg-transparent",
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-250 ease-in-out border-b",
      )}
    >
      <div className="max-w-[1440px] m-auto h-16 flex justify-between items-center py-6 px-12 overflow-hidden ">
        <Image
          src="/logo-en-red.svg"
          alt="enRed Logo"
          width={150}
          height={50}
        />

        <nav className="flex space-x-8">
          <ul className="flex justify-between gap-30">
            {navItems.map((item, index) => (
              <li key={item.href}>
                <Link
                  className={cn("text-white font-light font-sm")}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
