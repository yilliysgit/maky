// components/projecten/ProjectResult.tsx

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type ProjectResultProps = {
  resultText: string;
  imageUrl?: string | null;
  imageAlt?: string;
  quote?: string;
};

export default function ProjectResult({
  resultText,
  imageUrl,
  imageAlt = "Project resultaat",
  quote,
}: ProjectResultProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".result-header", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      tl.from(
        ".result-text",
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3"
      );

      tl.from(
        ".result-image",
        {
          scale: 1.05,
          filter: "blur(8px)",
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.4"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050505] py-28 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        
        {/* Header - zelfde stijl als Onze aanpak */}
        <div className="result-header mb-12 lg:mb-16">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black uppercase leading-[1.1] tracking-[-0.03em] text-white">
            Resultaat
          </h2>
        </div>

        {/* Resultaat tekst */}
        <div className="result-text max-w-3xl mb-16 lg:mb-20">
          <p className="text-[clamp(1.2rem,1.8vw,1.8rem)] font-light leading-[1.5] text-white/70">
            {resultText}
          </p>
          
          {quote && (
            <div className="mt-6">
              <div className="h-px w-12 bg-white/15 mb-6" />
              <p className="text-sm font-light italic text-white/40">
                "{quote}"
              </p>
            </div>
          )}
        </div>

        {/* Gigantische foto - payoff */}
        <div className="result-image overflow-hidden rounded-3xl lg:rounded-4xl">
          <div className="relative aspect-[21/10] lg:h-[85vh] lg:aspect-auto">
           {imageUrl && (
  <img
    src={imageUrl}
    alt={imageAlt}
    className="h-full w-full object-cover"
    loading="lazy"
  />
)}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>
      </div>
    </section>
  );
}