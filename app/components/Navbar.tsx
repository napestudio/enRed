"use client";
import { useState, useRef, useEffect, useCallback, FC } from "react";

import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import { useMediaQuery } from "@mantine/hooks";

import { LINKS } from "../lib/constants";
import { cn } from "../lib/utils";
import { useIsPastHero } from "../lib/custom-hooks/useIsPastHero";
import { useHeroRef } from "@/app/components/context/HeroRefContext";

import gsap from "gsap";

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
    <>
      <div
        className={cn(
          shouldBeRed ? "bg-enred-red" : "bg-transparent",
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-250 ease-in-out ",
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
              className="cursor-pointer relative z-50 transition-all duration-500 ease-in-out "
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
                  className="lucide lucide-plus-icon lucide-plus rotate-45 text-enred-white"
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
                  className="lucide lucide-menu-icon lucide-menu rotate-180 text-enred-white"
                >
                  <path d="M4 12h12" />
                  <path d="M4 18h14" />
                  <path d="M4 6h16" />
                </svg>
              )}
            </button>
          ) : (
            <nav className="flex gap-20">
              <ul className="flex gap-4 lg:gap-[10vw]">
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
                    <Link
                      href={link.href}
                      target="_blank"
                      className="cursor-pointer"
                    >
                      <Image
                        src={link.src}
                        alt="enRed Logo"
                        width={20}
                        height={20}
                        className="text-white fill-white"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
      <Menu open={open} items={navItems} />
    </>
  );
}

type MenuProps = {
  open?: boolean;
  items: any[];
};

export const Menu: FC<MenuProps> = ({ open = false, items = []}) => {
  const { socialItems } = LINKS;
  const ref = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const childs = gsap.utils.toArray(container.childNodes);

    let tl: gsap.core.Timeline;

    if (open) {
      tl = gsap
        .timeline()
        .to(container, {
          yPercent: 0,
          duration: 1.2,
          ease: "expo",
          overwrite: true,
          onStart: () => {
            gsap.set(container, { visibility: "visible" });
          },
        })
        .to(childs, { autoAlpha: 1, stagger: 0.1 }, "<25%")
        .from(childs, { y: -20, stagger: 0.1 }, "<");
    } else {
      tl = gsap
        .timeline()
        .to(childs, { autoAlpha: 0 })
        .to(
          container,
          {
            yPercent: -100,
            duration: 0.75,
            ease: "expo",
            overwrite: true,
            onComplete: () => {
              gsap.set(container, { visibility: "hidden" });
            },
          },
          "<",
        );
    }

    return () => {
      tl.kill();
    };
  }, [open]);

  return (
    <nav
      className={` w-full bg-enred-red font-light flex flex-col z-30 justify-center fixed top-0 left-0 h-screen invisible`}
      ref={ref}
    >
      <div className="px-10 order-2 flex flex-col justify-center items-start gap-4 col-span-12 md:col-span-6 text-5xl font-light pb-4">
        <div className="flex flex-col gap-10">
          {items.map((item: any, _) => (
            <NavItem
              key={_}
              href={`/${item.href === "home" ? "" : item.href}`}
              className="flex flex-row gap-2 text-enred-white font-bold "
            >
              <span className="">{item.label}</span>
            </NavItem>
          ))}
        </div>
        <ul className="flex gap-4">
          {socialItems.map((link: any) => (
            <li key={link.label}>
              <Link href={link.href} target="_blank" className="cursor-pointer">
                <Image
                  src={link.src}
                  alt="enRed Logo"
                  width={20}
                  height={20}
                  className="text-white fill-white"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

type ItemProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
} & LinkProps;

export function NavItem({ children, className, href, ...rest }: ItemProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        className,
        pathname === href &&
          "underline underline-offset-8 decoration-3 decoration-[#ed2866]",
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
