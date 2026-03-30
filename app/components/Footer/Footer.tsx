"use client";

import { asText } from "@prismicio/client";
import {
  MetricsDocumentData,
  SolucionDocument,
  FeatureHighlightsGridSlice,
  FooterDocumentData,
} from "@/prismicio-types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LINKS } from "../../lib/constants";
import { cn } from "../../lib/utils";
import FormSection from "../FormSection";
import { PrismicRichText } from "@prismicio/react";

export default function Footer({
  soluciones,
  metrics,
  footerInfo,
}: {
  soluciones: SolucionDocument[];
  metrics: MetricsDocumentData;
  footerInfo: FooterDocumentData;
}) {
  const pathname = usePathname();
  const { navItems, socialItems } = LINKS;
  const { slogan, direccion, correo } = footerInfo;

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
    <div className="overflow-hidden" id="footer">
      <FormSection metrics={metrics} />

      <footer
        data-section="footer"
        className="bg-enred-red min-h-screen overflow-hidden flex justify-between"
      >
        <div className="min-h-full container py-6 md:py-12 pt-40 relative flex flex-col flex-1">
          <div className="h-full z-50 text-enred-black flex flex-col gap-10 justify-between">
            <div className="">
              <div className="text-balance text-enred-black font-bold [&_strong]:underline [&_strong]:decoration-3 [&_strong]:underline-offset-4 text-[clamp(3rem,5vw,7rem)] leading-none">
                <PrismicRichText field={slogan} />
              </div>
              <div className="mt-4 text-lg">
                <PrismicRichText field={direccion} />
              </div>
              <div className="text-lg">
                <PrismicRichText field={correo} />
              </div>
            </div>
            <div className="flex gap-5 md:gap-10 items-center justify-between md:justify-end">
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
                            "group-focus-within:opacity-100 group-focus-within:scale-y-100 group-focus-within:visible opacity-0 scale-y-95 invisible absolute bottom-full left-0 bg-white shadow min-w-70 mt-5 z-20",
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
                              {asText(
                                (
                                  solucion.data
                                    .slices[0] as FeatureHighlightsGridSlice
                                ).primary.section_title,
                              )}
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
                      <Image src={link.black} alt="" width={20} height={20} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
