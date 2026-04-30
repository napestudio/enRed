import { cn } from "@/app/lib/utils";
import { FeatureHighlightsGridSlice } from "@/prismicio-types";
import { PrismicNextImage } from "@prismicio/next";

interface SolutionsGalleryProps {
  slice: FeatureHighlightsGridSlice;
}

const gridClasses = [
  "aspect-video md:col-span-2 lg:aspect-auto lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:row-span-4",
  "aspect-video lg:aspect-auto lg:col-start-2 lg:row-start-1 lg:row-span-2",
  "aspect-video lg:aspect-auto lg:col-start-2 lg:row-start-3 lg:row-span-2",
  "aspect-video lg:aspect-auto lg:col-start-3 lg:row-start-1 lg:row-span-2",
  "aspect-video lg:aspect-auto lg:col-start-3 lg:row-start-3 lg:row-span-2",
];

export default function SolutionsGallery({ slice }: SolutionsGalleryProps) {
  return (
    <div className="relative pt-16 pb-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-4 lg:h-[80svh]">
        {slice.primary.imagenes.map((item, index) => (
          <div
            key={index}
            className={cn("rounded-2xl overflow-hidden", gridClasses[index])}
          >
            <PrismicNextImage
              field={item.imagen}
              className="w-full h-full object-cover object-center"
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}
