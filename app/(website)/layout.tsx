import type { Metadata } from "next";

import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar";
import "../globals.css";

import { cms } from "@/prismicio";
import { FooterDocumentData, MetricsDocumentData } from "@/prismicio-types";
import FixedButton from "../components/FixedButton";
import Experience from "../components/experience/Experience";
import { GSAPProvider } from "../components/GSAPProvider";

export const metadata: Metadata = {
  title: "EnRed - Soluciones con altura",
  description: "Redes de protección",
};

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = (await cms.getAllByType("solucion", {
    orderings: [{ field: "my.solucion.uid", direction: "asc" }],
  })) as import("@prismicio/client").Content.SolucionDocument[];

  const metrics = await cms.getByType("metrics");
  const footerInfo = await cms.getByType("footer");

  return (
    <GSAPProvider>
      <Navbar soluciones={data} />
      <FixedButton />
      <Experience />
      {children}
      <Footer
        soluciones={data}
        metrics={metrics.results[0].data as MetricsDocumentData}
        footerInfo={footerInfo.results[0].data as FooterDocumentData}
      />
    </GSAPProvider>
  );
}
