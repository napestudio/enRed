"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

interface SolutionsGridClientProps {
  solutionsList: any[];
}

export default function SolutionsGridClient({ solutionsList }: SolutionsGridClientProps) {
  const [activeCard, setActiveCard] = useState<number>(1);

  return (
    <div className="relative grid grid-cols-12 gap-4" onMouseLeave={() => setActiveCard(1)}>
      {solutionsList.map((solucion: any, index: number) => {
        const isActive = index === activeCard;
        return (
          <Link
            href={`/soluciones/${solucion.slugs[0] ?? ""}`}
            key={index}
            onMouseEnter={() => setActiveCard(index)}
            className={cn(
              "relative col-span-12 md:col-span-4 mb-4 p-4 overflow-hidden group hover:bg-enred-red hover:text-white transition-colors duration-500",
              isActive && "bg-enred-red text-white",
            )}
          >
            <>
              <div
                className={cn(
                  "absolute h-32 w-32 -top-20 -right-32 bg-white group-hover:-rotate-45 pointer-events-none transition-transform origin-bottom-left duration-500",
                  isActive && "-rotate-45",
                )}
              ></div>
              <div
                className={cn(
                  "absolute h-32 w-32 -bottom-32 -left-20 bg-white group-hover:rotate-45 pointer-events-none origin-top-right transition-transform duration-500",
                  isActive && "rotate-45",
                )}
              ></div>
            </>

            <div className="flex flex-col gap-5 p-4 md:p-10 relative z-20">
              <div className={cn("group-hover:hidden block", isActive && "hidden")}>
                <Image
                  src={"/red-shape.svg"}
                  alt="Icono del servicio"
                  width={70}
                  height={50}
                  priority
                />
              </div>
              <div className={cn("group-hover:block hidden", isActive && "block")}>
                <Image
                  src={"/white-shape.svg"}
                  alt="Icono del servicio"
                  width={70}
                  height={50}
                  priority
                />
              </div>

              <h3 className="text-xl font-semibold underline text-balance z-20 relative">
                {solucion.data.slices[0].primary.section_title[0].text}
              </h3>
              {index < 3 && (
                <p className={cn("text-right")}>
                  {solucion.data.slices[0].primary.section_description[0].text}
                </p>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  "lucide lucide-arrow-right-icon lucide-arrow-right ml-auto",
                  !isActive && "invisible",
                )}
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
