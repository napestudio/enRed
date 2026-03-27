"use client";

import { MetricsDocumentData } from "@/prismicio-types";
import { PrismicDocument } from "@prismicio/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LINKS } from "../../lib/constants";
import { cn } from "../../lib/utils";
import FormSection from "../FormSection";

export default function Footer({
  soluciones,
  metrics,
}: {
  soluciones: PrismicDocument<Record<string, any>, string, string>[];
  metrics: MetricsDocumentData[];
}) {
  const pathname = usePathname();
  const { navItems, socialItems } = LINKS;

  const chevronIcon = (
    <svg
      className={cn(
        "w-4 h-4 transition-transform duration-200 group-focus-within:rotate-180",
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
      <FormSection metrics={metrics} />

      <footer className="bg-enred-red md:min-h-screen overflow-hidden">
        <div className="h-screen max-w-360 mx-auto p-12 pt-40 relative flex flex-col">
          <div className="h-full z-40 text-enred-black flex flex-col gap-10 justify-between">
            <div className="">
              <h2 className="text-balance text-enred-black font-bold text-[clamp(2rem,5vw,7rem)] leading-none">
                Soluciones con <span className="underline">altura</span>
              </h2>
              <p className="mt-4 text-lg">
                C. Gálvez 833, S2000 Rosario, Santa Fe
              </p>
              <p className="text-lg">contacto@enred.com.ar</p>
            </div>
            <div className="flex flex-col md:flex-row gap-5 md:gap-10 items-center md:justify-end">
              <ul className="flex flex-col md:flex-row gap-2 md:gap-8 text-xs md:text-sm">
                {navItems.map((item) => (
                  <li key={item.href} className="relative">
                    {item.label === "Soluciones" ? (
                      <div className="relative group">
                        <button className="text-enred-black font-sm flex items-center gap-1 cursor-pointer">
                          {item.label}
                          {chevronIcon}
                        </button>

                        <div
                          className={cn(
                            "group-focus-within:opacity-100 group-focus-within:scale-y-100 group-focus-within:visible opacity-0 scale-y-95 invisible absolute bottom-full left-0 bg-white shadow min-w-[280px] mt-5 z-20",
                            "transition-all duration-300 ease-out origin-top overflow-hidden",
                          )}
                        >
                          {soluciones?.map((solucion) => (
                            <Link
                              key={solucion.id}
                              href={`/soluciones/${solucion.uid}`}
                              className={cn(
                                "block px-4 py-3 text-enred-black hover:bg-gray-300 transition-colors",
                                pathname === `/soluciones/${solucion.uid}` &&
                                  "bg-enred-red text-white hover:text-white ",
                              )}
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
                      <Link className="text-enred-black" href={item.href}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <ul className="flex justify-start gap-6">
                {socialItems.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target="_blank"
                      className="cursor-pointer"
                    >
                      <Image
                        src={link.black}
                        alt="enRed Logo"
                        width={20}
                        height={20}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="absolute inset-0 top-0 z-0 flex items-center px-4 md:px-20">
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
