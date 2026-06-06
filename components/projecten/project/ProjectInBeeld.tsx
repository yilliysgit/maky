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
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const items = gsap.utils.toArray<HTMLElement>(".beeld-item");

      items.forEach((item) => {
        const wrapper = item.querySelector(".img-wrapper");
        const img = item.querySelector("img");

        // 1. Reveal animatie bij het inscrollen (Vloeiende schaal + opbouw)
        gsap.fromTo(
          wrapper,
          { clipPath: "polygon(0 15%, 100% 15%, 100% 100%, 0 100%)", opacity: 0, y: 60 },
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // 2. Subtiele Parallax op de afbeelding zelf tijdens het scrollen
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });
    },
    { scope: sectionRef }
  );

  if (!images?.length) return null;

  // Helper functie om de Tailwind grid-classes dynamisch te bepalen op basis van de Sanity input
  const getLayoutClass = (layout?: string) => {
    switch (layout) {
      case "half":
        return "col-span-12 md:col-span-6";
      case "detail":
        return "col-span-12 md:col-span-4";
      case "full":
    default:
        return "col-span-12";
    }
  };

  return (
    <section ref={sectionRef} className="bg-[#050505] py-24 sm:py-32 lg:py-48 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        
        {/* Header met een brute, industriële look */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 block mb-3">
              // Portfolio Showcase
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-[-0.04em] leading-[0.9] text-white">
              Project <span className="text-white/20">in beeld</span>
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-xs font-mono text-white/30">
              {images.length.toString().padStart(2, '0')} AFBEELDINGEN
            </span>
          </div>
        </div>

        {/* Dynamisch Grid: Alles loopt soepel door in één CSS Grid */}
        <div className="grid grid-cols-12 gap-y-16 gap-x-6 lg:gap-x-10 items-start">
          {images.map((image, index) => {
            const isHalfOrDetail = image.layout === "half" || image.layout === "detail";
            
            return (
              <div
                key={`project-img-${index}`}
                className={`${getLayoutClass(image.layout)} beeld-item group flex flex-col`}
              >
                {/* Image Wrapper die de animaties opvangt */}
                <div className="img-wrapper relative w-full aspect-[3/2] md:aspect-auto md:h-[65vh] lg:h-[75vh] group-[.col-span-12]:h-[50vh] group-[.col-span-12]:md:h-[80vh] overflow-hidden rounded-[2rem] bg-white/[0.01] will-change-transform">
                  <img
                    src={urlFor(image.asset)
                      .width(image.layout === "full" ? 2000 : 1200)
                      .quality(95)
                      .auto("format")
                      .url()}
                    alt={image.alt || `Project image ${index + 1}`}
                    className="w-full h-[120%] object-cover absolute top-0 left-0 scale-[1.05] will-change-transform transition-scale duration-700 ease-out group-hover:scale-[1.1]"
                  />
                  
                  {/* Premium donkere overlay die oplicht bij hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-20" />
                </div>
                
                {/* Minimalistische Typografie onder de afbeelding */}
                {(image.caption || image.subtitle) && (
                  <div className="mt-6 px-2 flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      {image.caption && (
                        <h3 className="text-lg font-bold tracking-tight text-white uppercase group-hover:text-yellow-400 transition-colors duration-300">
                          {image.caption}
                        </h3>
                      )}
                      {image.subtitle && (
                        <p className="text-sm font-medium text-white/50">
                          {image.subtitle}
                        </p>
                      )}
                    </div>
                    
                    {/* Technische indexnummering (blijft dik voor een sign bedrijf) */}
                    <span className="text-[10px] font-mono text-white/20 pt-1">
                      [{(index + 1).toString().padStart(2, '0')}]
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}