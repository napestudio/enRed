"use client";
import { useState, useRef, useEffect, useCallback } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useMediaQuery } from "@mantine/hooks";

import { LINKS } from "../lib/constants";
import { cn } from "../lib/utils";
import { useIsPastHero } from "../lib/custom-hooks/useIsPastHero";
import { useHeroRef } from "@/app/components/context/HeroRefContext";

export default function Navbar({ soluciones }: { soluciones: any }) {
  const pathname = usePathname();
  const { navItems, socialItems } = LINKS;

  const heroRef = useHeroRef();
  const isPast = useIsPastHero(heroRef);

  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const [open, setOpen] = useState<boolean>(false);
  const toggle = useCallback(() => setOpen(!open), [open, setOpen]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isServicePage = pathname.startsWith("/soluciones/");
  const shouldBeRed = isServicePage || isPast;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isSmallScreen) setOpen(false);
  }, [isSmallScreen, setOpen]);

  const chevronIcon = (
    <svg
      className={cn(
        "w-4 h-4 transition-transform duration-200",
        isDropdownOpen && "rotate-180",
      )}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

  return (
    <div
      className={cn(
        shouldBeRed ? "bg-enred-red" : "bg-transparent border-b",
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-250 ease-in-out shadow",
      )}
    >
      <div className="max-w-[1440px] m-auto h-16 flex justify-between items-center py-6 px-12">
        <Link href="/" className="decoration-none">
          <Image
            src="/logo-en-red.svg"
            alt="enRed Logo"
            width={150}
            height={50}
          />
        </Link>

        {isSmallScreen ? (
          <button
            onClick={toggle}
            className="cursor-pointer relative z-50 transition duration-500 ease-in-out"
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-plus-icon lucide-plus rotate-45"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu-icon lucide-menu text-black rotate-180"
              >
                <path d="M4 12h12" />
                <path d="M4 18h14" />
                <path d="M4 6h16" />
              </svg>
            )}
          </button>
        ) : (
          <nav className="flex gap-20">
            <ul className="flex gap-30">
              {navItems.map((item) => (
                <li key={item.href} className="relative">
                  {item.label === "Soluciones" ? (
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="text-white font-light font-sm flex items-center gap-1 cursor-pointer"
                      >
                        {item.label}
                        {chevronIcon}
                      </button>

                      <div
                        className={cn(
                          "absolute top-full left-0 bg-white shadow min-w-[280px] mt-5",
                          "transition-all duration-300 ease-out origin-top overflow-hidden",
                          isDropdownOpen
                            ? "opacity-100 scale-y-100 visible"
                            : "opacity-0 scale-y-95 invisible",
                        )}
                      >
                        {soluciones?.map((solucion: any) => (
                          <Link
                            key={solucion.id}
                            href={`/soluciones/${solucion.uid}`}
                            className={cn(
                              "block px-4 py-3 text-enred-black hover:bg-gray-300 transition-colors",
                              pathname === `/soluciones/${solucion.uid}` &&
                                "bg-enred-red text-white hover:text-white",
                            )}
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {
                              solucion.data.slices[0].primary.section_title[0]
                                .text
                            }
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      className="text-white font-light font-sm"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <ul className="flex gap-4">
              {socialItems.map((link) => (
                <li key={link.label}>
                  <button
                    className="cursor-pointer"
                    onClick={() => console.log("clicked")}
                  >
                    <Image
                      src={link.src}
                      alt="enRed Logo"
                      width={20}
                      height={20}
                      className="text-white fill-white"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
