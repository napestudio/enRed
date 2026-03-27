import type { Metadata } from "next";

import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import { cn } from "./lib/utils";

import { GSAPProvider } from "@/app/components/GSAPProvider";
import { cms } from "@/prismicio";
import { MetricsDocument, MetricsDocumentData } from "@/prismicio-types";

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
  const data = await cms.getAllByType("solucion", {
    orderings: [{ field: "my.solucion.uid", direction: "asc" }],
  });

  const metrics = await cms.getByType("metrics");

  console.log("data  aaaa", data);

  return (
    <html lang="es" className={cn(spaceGrotesk.variable, "bg-white")}>
      <body className="font-grotesk antialiased">
        <GSAPProvider>
          <Navbar soluciones={data} />
          {children}
          <Footer
            soluciones={data}
            metrics={metrics.results[0].data as MetricsDocumentData[]}
          />
        </GSAPProvider>
      </body>
    </html>
  );
}
