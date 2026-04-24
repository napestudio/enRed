"use client";
import { useState, useRef, useEffect, useCallback, FC } from "react";

import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useMediaQuery } from "@mantine/hooks";

import { LINKS } from "../lib/constants";
import { cn } from "../lib/utils";
import { useIsPastHero } from "../lib/custom-hooks/useIsPastHero";

import gsap from "gsap";
import { Content, asText } from "@prismicio/client";
import useIsomorphicLayoutEffect from "../lib/custom-hooks/useIsometricLayoutEffect";
import { getLenis } from "./GSAPProvider";
import PinIcon from "./ui/Icons/PinIcon";

const SCROLL_OFFSET = -20;

export default function Navbar({
  soluciones,
}: {
  soluciones: Content.SolucionDocument[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { navItems, socialItems } = LINKS;

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      if (href.startsWith("#")) {
        e.preventDefault();
        getLenis()?.scrollTo(href, { offset: SCROLL_OFFSET });
      } else if (href.startsWith("/#")) {
        e.preventDefault();
        const anchor = href.slice(1);
        if (pathname === "/") {
          getLenis()?.scrollTo(anchor, { offset: SCROLL_OFFSET });
        } else {
          sessionStorage.setItem("scrollTo", anchor);
          router.push("/");
        }
      }
    },
    [pathname, router],
  );
  const navRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);

  const isPast = useIsPastHero();

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
  }, [pathname]);

  useIsomorphicLayoutEffect(() => {
    if (isServicePage) {
      gsap.set(navRef.current, { clearProps: "transform" });
      return;
    }
    const delay = isFirstMount.current ? 3 : 0;
    isFirstMount.current = false;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true }).to(navRef.current, {
        y: 0,
        ease: "power2.out",
        duration: 1.5,
        delay,
      });

      tl.play();
    }, [navRef, isServicePage]);
    return () => ctx.revert();
  }, [pathname]);

  const isMenuOpen = isSmallScreen ? open : false;

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
        "fixed top-0 left-0 right-0 z-9999",
        !isServicePage ? "-translate-y-100" : "translate-y-0",
      )}
      ref={navRef}
    >
      <div
        className={cn(
          shouldBeRed
            ? "bg-enred-red border-enred-red py-2"
            : "bg-linear-to-b from-black/50 to-black/10 py-5 border-white/60",
          " transition-all duration-400 ease-in-out border-b",
        )}
      >
        <div className="container flex justify-between items-center">
          <Link href="/" className="z-50">
            <Image
              src="/logo-en-red.svg"
              alt="enRed Logo"
              width={150}
              height={50}
              className={cn(
                shouldBeRed && "scale-[0.75]",
                "transition-transform duration-300",
              )}
            />
          </Link>

          {isSmallScreen ? (
            <button
              onClick={toggle}
              className="cursor-pointer relative z-50 transition-all duration-500 ease-in-out "
            >
              {isMenuOpen ? (
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
            <nav className="flex gap-20 items-center flex-1">
              <ul className="flex gap-4 lg:gap-12 mx-auto">
                {navItems.map((item) => (
                  <li
                    key={item.href}
                    className="relative text-white transition-colors group"
                  >
                    <div className="absolute w-full h-px bg-white bottom-0 origin-left transition-transform duration-400 scale-x-0 group-hover:scale-x-100"></div>
                    {item.label === "Soluciones" ? (
                      <div className="relative" ref={dropdownRef}>
                        <button
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="text-xl flex items-center gap-1 cursor-pointer"
                        >
                          {item.label}
                          {chevronIcon}
                        </button>

                        <div
                          className={cn(
                            "absolute top-full left-0 bg-white shadow min-w-70 mt-5",
                            "transition-all duration-300 ease-out origin-top overflow-hidden",
                            isDropdownOpen
                              ? "opacity-100 scale-y-100 visible"
                              : "opacity-0 scale-y-95 invisible",
                          )}
                        >
                          {soluciones.map((solucion) => {
                            const featureSlice = solucion.data.slices.find(
                              (s) => s.slice_type === "feature_highlights_grid",
                            ) as Content.FeatureHighlightsGridSlice | undefined;
                            return (
                              <Link
                                key={solucion.id}
                                href={`/soluciones/${solucion.uid}`}
                                className={cn(
                                  "block px-4 py-3 text-enred-black hover:bg-gray-300 transition-colors",
                                  pathname === `/soluciones/${solucion.uid}` &&
                                    "bg-enred-red text-white",
                                )}
                                onClick={() => setIsDropdownOpen(false)}
                              >
                                {featureSlice &&
                                  asText(featureSlice.primary.section_title)}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <Link
                        className="text-xl"
                        href={item.href}
                        onClick={(e) => handleAnchorClick(e, item.href)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <ul className="flex gap-4">
                <li>
                  <Link
                    href="https://maps.app.goo.gl/NZpKhYxgND4G4k3h7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    <span className="text-white">
                      <PinIcon />
                    </span>
                  </Link>
                </li>
                {socialItems.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={link.src}
                        alt=""
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
      <MobileMenu
        open={isMenuOpen}
        items={navItems}
        onAnchorClick={handleAnchorClick}
        soluciones={soluciones}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

type MobileMenuProps = {
  open?: boolean;
  items: typeof LINKS.navItems;
  onAnchorClick?: (e: React.MouseEvent, href: string) => void;
  soluciones?: Content.SolucionDocument[];
  onClose?: () => void;
};

export const MobileMenu: FC<MobileMenuProps> = ({
  open = false,
  items = [],
  onAnchorClick,
  soluciones = [],
  onClose,
}) => {
  const { socialItems } = LINKS;
  const ref = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

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
        <div className="flex flex-col gap-4 md:gap-10">
          {items.map((item, idx) =>
            item.label === "Soluciones" ? (
              <div key={idx}>
                <button
                  className="flex flex-row gap-2 text-enred-white font-bold items-center cursor-pointer"
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                >
                  <span>{item.label}</span>
                  <svg
                    className={cn(
                      "w-6 h-6 transition-transform duration-300",
                      open && mobileDropdownOpen && "rotate-180",
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
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    open && mobileDropdownOpen
                      ? "max-h-96 opacity-100 mt-4"
                      : "max-h-0 opacity-0",
                  )}
                >
                  <div className="flex flex-col gap-3 pl-4 border-l-2 border-white/40">
                    {soluciones.map((solucion) => {
                      const featureSlice = solucion.data.slices.find(
                        (s) => s.slice_type === "feature_highlights_grid",
                      ) as Content.FeatureHighlightsGridSlice | undefined;
                      return (
                        <Link
                          key={solucion.id}
                          href={`/soluciones/${solucion.uid}`}
                          className={cn(
                            "text-xl text-enred-white/80 hover:text-enred-white transition-colors",
                            pathname === `/soluciones/${solucion.uid}` &&
                              "text-enred-white underline",
                          )}
                          onClick={() => onClose?.()}
                        >
                          {featureSlice &&
                            asText(featureSlice.primary.section_title)}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <NavItem
                key={idx}
                href={item.href}
                className="flex flex-row gap-2 text-enred-white font-bold"
                onClick={(e) => onAnchorClick?.(e, item.href)}
              >
                <span>{item.label}</span>
              </NavItem>
            ),
          )}
        </div>
        <ul className="flex gap-4">
          <li>
            <Link
              href="https://maps.app.goo.gl/NZpKhYxgND4G4k3h7"
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              <span className="text-white">
                <PinIcon />
              </span>
            </Link>
          </li>
          {socialItems.map((link) => (
            <li key={link.label}>
              <Link href={link.href} target="_blank" className="cursor-pointer">
                <Image
                  src={link.src}
                  alt=""
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
