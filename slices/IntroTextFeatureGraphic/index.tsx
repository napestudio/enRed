"use client";
import { gsap, ScrollTrigger, SplitText } from "@/app/lib/gsap";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FC, useRef } from "react";

import SectionHeading from "@/app/components/SectionHeading";
import useIsomorphicLayoutEffect from "@/app/lib/custom-hooks/useIsometricLayoutEffect";

export type IntroTextFeatureGraphicProps =
  SliceComponentProps<Content.IntroTextFeatureGraphicSlice>;

const IntroTextFeatureGraphic: FC<IntroTextFeatureGraphicProps> = ({
  slice,
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  useIsomorphicLayoutEffect(() => {
    if (!textRef.current || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const words = new SplitText(textRef.current, { type: "words" });

      const tl = gsap.timeline({ paused: true }).from(words.words, {
        opacity: 0.5,
        stagger: 0.15,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "center center",
        animation: tl,
        scrub: true,
      });

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white text-enred-black relative"
      ref={sectionRef}
    >
      <div className="container relative">
        <div className="relative row-start-1 col-start-4 col-span-2 gap-4 py-8 md:py-12 z-50">
          <div className="col-span-12 md:col-span-4 col-start-1 md:col-start-9 text-right text-balance z-20">
            <div className="flex gap-4 justify-end items-center mb-6">
              <SectionHeading title="Nosotros" />
            </div>
            <div className="text-xl text-pretty" ref={textRef}>
              <PrismicRichText field={slice.primary.description} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroTextFeatureGraphic;
