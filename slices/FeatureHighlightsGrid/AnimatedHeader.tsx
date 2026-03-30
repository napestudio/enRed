"use client";
import { gsap, ScrollTrigger, SplitText } from "@/app/lib/gsap";
import { Content, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { FC, useRef } from "react";
import useIsomorphicLayoutEffect from "@/app/lib/custom-hooks/useIsometricLayoutEffect";
import ArrowIcon from "@/app/components/ui/Icons/ArrowIcon";
import ImageClipper from "@/app/components/ImageClipper";

type AnimatedHeaderProps = {
  slice: Content.FeatureHighlightsGridSlice;
  title: RichTextField;
  subtitle: RichTextField;
  sectionDescription?: RichTextField;
};

const AnimatedHeader: FC<AnimatedHeaderProps> = ({
  slice,
  title,
  subtitle,
  sectionDescription,
}) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (
      !titleRef.current ||
      !subtitleRef.current ||
      !sectionRef.current ||
      !descriptionRef.current ||
      !arrowRef.current ||
      !imageRef.current
    )
      return;

    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({ paused: true })
        .from(titleRef.current, { y: 50, opacity: 0.1, stagger: 0.15 })
        .from(subtitleRef.current, { opacity: 0, y: 10 }, "<0.3")
        .from(descriptionRef.current, { opacity: 0, y: 10 }, "<0.3")
        .from(arrowRef.current, { opacity: 0, x: -10 }, "<0.3")
        .from(imageRef.current, { opacity: 0, y: 20 }, "<0.3");

      tl.play();

      return () => tl.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-y-10 md:gap-4 items-center">
      <div className="col-span-12 md:col-span-6 py-8 flex flex-col justify-between h-full gap-4 md:gap-24 text-enred-black">
        <div ref={sectionRef} className="flex flex-col gap-18">
          <div
            ref={titleRef}
            className="font-bold text-[clamp(3rem,5vw,calc(95vw-1rem))] leading-none"
          >
            <PrismicRichText field={title} />
          </div>
          <div className="text-xl font-semibold underline underline-offset-2">
            <div ref={subtitleRef}>
              <PrismicRichText field={subtitle} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4">
          <div
            className="col-span-6 md:col-span-1 p-4 flex items-center justify-center text-enred-black"
            ref={arrowRef}
          >
            <ArrowIcon className="text-black w-12 h-auto md:rotate-0 rotate-90" />
          </div>
          <div className="col-span-6 mx-auto block md:hidden" ref={imageRef}>
            <ImageClipper slice={slice} />
          </div>
          <div
            className="col-span-6 md:col-span-4 md:text-2xl text-pretty"
            ref={descriptionRef}
          >
            <PrismicRichText field={sectionDescription} />
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 hidden md:block" ref={imageRef}>
        <ImageClipper slice={slice} />
      </div>
    </div>
  );
};

export default AnimatedHeader;
