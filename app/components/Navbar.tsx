import Image from "next/image";
import Link from "next/link";
import React from "react";

const navItems = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Trabajos", href: "/trabajos" },
  { label: "Contacto", href: "/contacto" },
];

const socialItems = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/enred-comunicaciones/",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/enredcomunicaciones/",
  },
  { label: "Facebook", href: "https://www.facebook.com/enredcomunicaciones" },
];

export default function Navbar() {
  return (
    <div className="h-16 bg-gray-400 p-4 flex justify-between items-center">
      <Image src="/next.svg" alt="enRed Logo" width={150} height={50} />
      <nav className="flex space-x-8">
        <ul className="flex justify-between">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <ul className="flex justify-between ml-8">
          {socialItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} target="_blank">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
