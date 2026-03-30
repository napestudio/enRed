import { PrismicNextImage } from "@prismicio/next";
import { MediaGridIntroSliceHeadlineImageGridPrimaryMediaItemsItem } from "@/prismicio-types";

function TrabajosImageClipper({
  item,
}: {
  item: MediaGridIntroSliceHeadlineImageGridPrimaryMediaItemsItem;
}) {
  //const image = item.primary.image;
  if (!item) {
    return null;
  }
  return (
    <div className="relative w-full aspect-615/420">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <clipPath id="miFormaGeometrica2" clipPathUnits="objectBoundingBox">
          <path
            transform="scale(0.001628, 0.002387)"
            d="M612.813 176.005L424.132 67.0081C423.099 66.4102 421.822 66.4102 420.784 67.0081L346.485 109.93C345.968 110.227 345.328 110.227 344.811 109.93L155.298 0.451324C154.26 -0.150421 152.983 -0.150421 151.946 0.451324L78.484 42.8873C77.4502 43.4852 76.8099 44.5923 76.8099 45.7881V176.005C76.8099 176.603 76.4897 177.154 75.9728 177.455L1.67416 220.377C0.636504 220.975 0 222.082 0 223.278V373.387C0 374.583 0.636504 375.69 1.67416 376.288L75.1357 418.728C76.1734 419.326 77.4502 419.326 78.484 418.728L210.39 342.528C210.911 342.227 211.547 342.227 212.068 342.528L267.164 374.356C268.198 374.953 269.475 374.953 270.513 374.356L325.609 342.528C326.126 342.227 326.766 342.227 327.283 342.528L459.189 418.728C460.227 419.326 461.503 419.326 462.541 418.728L536.003 376.288C537.036 375.69 537.677 374.583 537.677 373.387V354.1C537.677 353.502 537.993 352.95 538.514 352.653L612.813 309.731C613.846 309.133 614.487 308.026 614.487 306.831V178.905C614.487 177.71 613.846 176.603 612.813 176.005Z"
            fill="#151515"
          />
        </clipPath>
      </svg>

      <PrismicNextImage
        style={{
          clipPath: "url(#miFormaGeometrica2)",
        }}
        className="w-full h-full object-cover"
        field={item.image}
        width={item.image.dimensions?.width}
        height={item.image.dimensions?.height}
      />
    </div>
  );
}

export default TrabajosImageClipper;
