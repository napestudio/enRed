import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

function ImageClipper({
  slice,
}: {
  slice: Content.FeatureHighlightsGridSlice;
}) {
  const image = slice.primary.imagen_principal;
  if (!image) {
    return null;
  }
  return (
    <div className="relative w-full aspect-[373/352]">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="miFormaGeometrica" clipPathUnits="objectBoundingBox">
            <path
              transform="scale(0.00268, 0.00284)"
              d="M204.534 0.378967L269.409 37.8543C270.285 38.3635 270.825 39.297 270.825 40.3076V75.3334C270.825 76.4212 272.005 77.104 272.947 76.5601L303.262 59.0472C304.138 58.5419 305.218 58.5419 306.094 59.0472L370.969 96.5263C371.844 97.0317 372.384 97.9651 372.384 98.9758V291.271C372.384 292.285 371.844 293.219 370.969 293.724L272.241 350.757C271.365 351.262 270.285 351.262 269.409 350.757L203.825 312.872C203.389 312.618 202.849 312.618 202.409 312.872L136.828 350.757C135.952 351.262 134.872 351.262 133.997 350.757L1.41562 274.166C0.539974 273.661 -6.10352e-05 272.728 -6.10352e-05 271.717V118.533C-6.10352e-05 117.523 0.539974 116.589 1.41562 116.08L201.703 0.378967C202.579 -0.126361 203.659 -0.126361 204.534 0.378967Z"
            />
          </clipPath>
        </defs>
      </svg>

      <PrismicNextImage
        style={{
          clipPath: "url(#miFormaGeometrica)",
        }}
        className="w-full h-full object-cover"
        field={image}
        width={image.dimensions?.width}
        height={image.dimensions?.height}
      />
    </div>
  );
}

export default ImageClipper;
