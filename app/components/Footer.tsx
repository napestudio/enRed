"use client";

import Image from "next/image";
import Link from "next/link";
import { LINKS } from "../lib/constants";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import FormSection from "./FormSection";

export default function Footer({ soluciones }: { soluciones: any }) {
  const pathname = usePathname();
  const { navItems, socialItems } = LINKS;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isServicePage = pathname.startsWith("/soluciones/");

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
    <>
      <FormSection />
      <footer className="bg-enred-red py-10 md:pt-0 md:min-h-screen flex items-center overflow-hidden">
        <div className="max-w-[1440px] m-auto p-12 relative grid grid-cols-12">
          <div className="col-span-12 z-20 text-enred-black">
            <div className="grid grid-cols-12 gap-4 items-center md:items-end">
              <div className="col-span-12 md:col-span-5">
                <h2 className="text-balance text-enred-black font-bold text-[clamp(2rem,5vw,7rem)] leading-none">
                  Soluciones con <span className="underline">altura</span>
                </h2>
              </div>
              <div className="col-span-6 md:col-span-2">
                <ul className="flex flex-col gap-2 ">
                  {navItems.map((item) => (
                    <li key={item.href} className="relative">
                      {item.label === "Soluciones" ? (
                        <div className="relative" ref={dropdownRef}>
                          <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="text-enred-black font-sm flex items-center gap-1 cursor-pointer"
                          >
                            {item.label}
                            {chevronIcon}
                          </button>

                          <div
                            className={cn(
                              "absolute top-full left-0 bg-white shadow min-w-[280px] mt-5 z-20",
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
                                    "bg-enred-red text-white hover:text-white ",
                                )}
                                onClick={() => setIsDropdownOpen(false)}
                              >
                                {
                                  solucion.data.slices[0].primary
                                    .section_title[0].text
                                }
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          className="text-enred-black font-sm"
                          href={item.href}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-6 md:col-span-5 flex flex-col gap-4">
                <p className="mt-4 text-lg">
                  C. Gálvez 833, S2000 Rosario, Santa Fe
                </p>
                <p className="text-lg">contacto@enred.com.ar</p>
                <ul className="flex gap-6">
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
              </div>
            </div>
          </div>

          <div className="absolute inset-0 top-0 col-span-12 col-start-1 md:col-span-10 md:col-start-3 z-0 flex items-center">
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
