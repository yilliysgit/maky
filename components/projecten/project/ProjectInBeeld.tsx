"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { urlFor } from "@/sanity/lib/image";

gsap.registerPlugin(ScrollTrigger);

type ProjectImage = {
  asset: any;
  alt?: string;
  caption?: string;
  subtitle?: string;
  layout?: "full" | "half" | "detail";
};

type ProjectInBeeldProps = {
  images: ProjectImage[];
};

export default function ProjectInBeeld({ images }: ProjectInBeeldProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      gsap.fromTo(
        ".beeld-item",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  if (!images?.length) return null;

  const fullImages = images.filter((img) => img.layout === "full");
  const halfImages = images.filter((img) => img.layout === "half");
  const detailImages = images.filter((img) => img.layout === "detail");

  return (
    <section ref={sectionRef} className="bg-[#050505] py-32 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black uppercase tracking-[-0.03em] text-white">
            Project in beeld
          </h2>
        </div>

        <div className="space-y-8 lg:space-y-10">
          
          {/* FULL WIDTH IMAGES */}
          {fullImages.map((image, index) => (
            <div
              key={`full-${index}`}
              className="beeld-item overflow-hidden rounded-3xl bg-white/[0.02]"
            >
              <img
                src={urlFor(image.asset).width(1600).quality(95).auto("format").url()}
                alt={image.alt || ""}
                className="w-full object-cover transition duration-700 hover:scale-[1.03]"
              />
              
              {(image.caption || image.subtitle) && (
                <div className="border-t border-white/10 p-5">
                  {image.caption && (
                    <h3 className="font-semibold text-white">{image.caption}</h3>
                  )}
                  {image.subtitle && (
                    <p className="mt-2 text-sm text-white/60">{image.subtitle}</p>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* HALF + HALF IMAGES */}
          {halfImages.length >= 2 && (
            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
              {halfImages.slice(0, 2).map((image, index) => (
                <div
                  key={`half-${index}`}
                  className="beeld-item overflow-hidden rounded-3xl"
                >
                  <img
                    src={urlFor(image.asset).width(1600).quality(95).auto("format").url()}
                    alt={image.alt || ""}
                    className="w-full object-cover transition duration-700 hover:scale-[1.03]"
                  />
                  
                  {(image.caption || image.subtitle) && (
                    <div className="mt-3 p-4">
                      {image.caption && (
                        <h3 className="font-semibold text-white">{image.caption}</h3>
                      )}
                      {image.subtitle && (
                        <p className="mt-1 text-sm text-white/60">{image.subtitle}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* DETAIL IMAGES */}
          {detailImages.map((image, index) => (
            <div
              key={`detail-${index}`}
              className="beeld-item overflow-hidden rounded-3xl"
            >
              <img
                src={urlFor(image.asset).width(2400).quality(95).auto("format").url()}
                alt={image.alt || ""}
                className="w-full object-cover transition duration-700 hover:scale-[1.03]"
              />
              
              {(image.caption || image.subtitle) && (
                <div className="mt-4 p-5">
                  {image.caption && (
                    <h3 className="font-semibold text-white">{image.caption}</h3>
                  )}
                  {image.subtitle && (
                    <p className="mt-1 text-sm text-white/60">{image.subtitle}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}