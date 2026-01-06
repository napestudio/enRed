import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { cms } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const page = await cms.getSingle("home").catch(() => notFound());
  console.log("🚀 ~ Page ~ page:", page)

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await cms.getSingle("home").catch(() => notFound());
  console.log("🚀 ~ generateMetadata ~ page:", page)
  
  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}