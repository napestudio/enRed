import type { Metadata } from "next";

import localFont from "next/font/local";
import "./globals.css";
import { cn } from "./lib/utils";

import { GSAPProvider } from "@/app/components/GSAPProvider";

const spaceGrotesk = localFont({
  src: [
    {
      path: "./fonts/SpaceGrotesk-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/SpaceGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SpaceGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/SpaceGrotesk-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/SpaceGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EnRed - Soluciones con altura",
  description: "Redes de protección",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn(spaceGrotesk.variable, "bg-white")}>
      <body className="font-grotesk antialiased">{children}</body>
    </html>
  );
}
