// components/projecten/ProjectInBeeld.tsx

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type ProjectImage = {
  url: string;
  alt?: string;
  caption?: string;
  subtitle?: string;
  type: "full" | "half" | "detail";
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
        ".beeld-header",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".beeld-image",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050505] py-28 lg:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        
        {/* Header */}
        <div className="beeld-header mb-16 lg:mb-20">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black uppercase leading-[1.1] tracking-[-0.03em] text-white">
            Project in beeld
          </h2>
        </div>

        {/* Grid layout - dynamisch op basis van image type */}
        <div className="space-y-8 lg:space-y-10">
          {images.map((image, index) => {
            // Full width image
            if (image.type === "full") {
              return (
                <div
                  key={index}
                  className="beeld-image group relative overflow-hidden rounded-3xl"
                >
                  <div className="relative aspect-[21/10] lg:aspect-[21/9]">
                    <img
                      src={image.url}
                      alt={image.alt || "Project visual"}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    
                    {/* Caption overlay - bottom left */}
                    {(image.caption || image.subtitle) && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 lg:p-8">
                        {image.caption && (
                          <h3 className="text-xl font-bold text-white lg:text-2xl">
                            {image.caption}
                          </h3>
                        )}
                        {image.subtitle && (
                          <p className="mt-1 text-sm text-white/60">
                            {image.subtitle}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            }
            
            // Two column layout for half images
            if (image.type === "half" && images[index + 1]?.type === "half") {
              const nextImage = images[index + 1];
              return (
                <div key={index} className="beeld-image grid gap-6 md:grid-cols-2 lg:gap-8">
                  {/* First half image */}
                  <div className="group relative overflow-hidden rounded-2xl">
                    <div className="relative aspect-[4/3]">
                      <img
                        src={image.url}
                        alt={image.alt || "Project detail"}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      
                      {(image.caption || image.subtitle) && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5">
                          {image.caption && (
                            <h3 className="text-lg font-bold text-white">
                              {image.caption}
                            </h3>
                          )}
                          {image.subtitle && (
                            <p className="mt-0.5 text-xs text-white/60">
                              {image.subtitle}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Second half image */}
                  <div className="group relative overflow-hidden rounded-2xl">
                    <div className="relative aspect-[4/3]">
                      <img
                        src={nextImage.url}
                        alt={nextImage.alt || "Project detail"}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      
                      {(nextImage.caption || nextImage.subtitle) && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5">
                          {nextImage.caption && (
                            <h3 className="text-lg font-bold text-white">
                              {nextImage.caption}
                            </h3>
                          )}
                          {nextImage.subtitle && (
                            <p className="mt-0.5 text-xs text-white/60">
                              {nextImage.subtitle}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
            
            // Detail / close-up image (full width, different aspect)
            if (image.type === "detail") {
              return (
                <div
                  key={index}
                  className="beeld-image group relative overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-[16/9] lg:aspect-[21/8]">
                    <img
                      src={image.url}
                      alt={image.alt || "Project detail"}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    
                    {(image.caption || image.subtitle) && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 lg:p-8">
                        {image.caption && (
                          <h3 className="text-xl font-bold text-white lg:text-2xl">
                            {image.caption}
                          </h3>
                        )}
                        {image.subtitle && (
                          <p className="mt-1 text-sm text-white/60">
                            {image.subtitle}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            }
            
            return null;
          })}
        </div>
      </div>
    </section>
  );
}