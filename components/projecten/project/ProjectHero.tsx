// components/ProjectHero.tsx

"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type ProjectHeroProps = {
  title: string;
  imageUrl?: string | null;
  imageAlt?: string;
  tagline?: string | null;
  category?: string | null;
  location?: string | null;
  year?: string | null;
  backHref?: string;
  headerOffset?: number;
};

export default function ProjectHero({
  title,
  imageUrl,
  imageAlt,
  tagline,
  category,
  location,
  year,
  backHref = "/projecten",
  headerOffset = 90,
}: ProjectHeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);

  const titleWords = title?.trim().split(/\s+/) || ["Project"];
  const firstName = titleWords[0] || "";
  const lastName = titleWords.slice(1).join(" ") || "";

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const ctx = gsap.context(() => {
        // GEEN gsap.set op de image - dat veroorzaakt de jump!
        

        
        // Text elements start hidden
        gsap.set(
          [
            ".ph-breadcrumb-inner",
            ".ph-firstname-inner",
            ".ph-lastname-inner",
            ".ph-tagline-inner",
            ".ph-meta-inner",
          ],
          { yPercent: 110 }
        );

        // Main timeline
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        
        // Image reveal - direct fromTo zonder set
        tl.fromTo(
          ".ph-image",
          {
            scale: 1.25,
            filter: "blur(12px)",
          },
          {
            scale: 1.08,
            filter: "blur(0px)",
            duration: 2.2,
            ease: "power3.out",
          },
          0
        )
          // Text reveals - cascade
          .to(".ph-breadcrumb-inner", { yPercent: 0, duration: 0.8 }, "-=1.6")
          .to(".ph-firstname-inner", { yPercent: 0, duration: 1.0, ease: "expo.out" }, "-=0.6")
          .to(".ph-lastname-inner", { yPercent: 0, duration: 1.0, ease: "expo.out" }, "-=0.85")
          .to(".ph-tagline-inner", { yPercent: 0, duration: 0.9, ease: "expo.out" }, "-=0.7")
          .to(".ph-meta-inner", { yPercent: 0, duration: 0.8, ease: "expo.out" }, "-=0.6");

        // Scroll parallax - start vanaf 1.08 (eindstand reveal)
       gsap.set(".ph-image", {
  force3D: true,
  transformOrigin: "center center",
});

gsap.to(".ph-image", {
  scale: 1.18,
  yPercent: 8,
  ease: "none",
  immediateRender: false,
  force3D: true,
  scrollTrigger: {
    trigger: heroRef.current,
    start: "top top",
    end: "bottom top",
    scrub: 1.2,
    invalidateOnRefresh: true,
  },
});

        // Content subtle fade on scroll
        gsap.to(".ph-content", {
          opacity: 0.94,
          yPercent: -3,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      }, heroRef);

      return () => ctx.revert();
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden bg-black text-white"
      style={{
        minHeight: `calc(100vh - ${headerOffset}px)`,
        marginTop: `${headerOffset}px`,
      }}
    >
      {/* IMAGE */}
      <div className="absolute inset-0 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="ph-image h-full w-full object-cover will-change-transform"
            loading="eager"
            fetchPriority="high"
            style={{ scale: "1.08" }}
          />
        ) : (
          <div className="h-full w-full bg-neutral-950" />
        )}

        {/* Premium Overlays - minimal */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="ph-content relative z-10 mx-auto flex min-h-[calc(100vh-96px)] max-w-[1600px] flex-col px-6 pt-8 pb-12 lg:px-12 lg:pt-10 lg:pb-16">
        
        {/* BREADCRUMB */}
        <div className="overflow-hidden">
          <div className="ph-breadcrumb-inner flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.3em] lg:text-[11px]">
            <Link href={backHref} className="text-white/45 transition-colors duration-300 hover:text-white">
              Projecten
            </Link>

            {category && (
              <>
                <span className="text-white/20">/</span>
                <span className="text-white/65 transition-colors duration-300 hover:text-white/90">
                  {category}
                </span>
              </>
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex flex-1 flex-col justify-end pb-20 lg:pb-28">
          <div className="max-w-5xl">
            <div className="space-y-0 lg:space-y-1">
              {/* First name */}
              <div className="overflow-hidden">
                <div className="ph-firstname-inner">
                  <h1 className="text-[clamp(4.5rem,10vw,8rem)] font-black uppercase leading-[1.05] tracking-[-0.04em] text-white">
                    {firstName}
                  </h1>
                </div>
              </div>

              {/* Last name */}
              {lastName && (
                <div className="overflow-hidden">
                  <div className="ph-lastname-inner">
                    <h1 className="text-[clamp(4.5rem,10vw,8rem)] font-black uppercase leading-[1.05] tracking-[-0.04em] text-white">
                      {lastName}
                    </h1>
                  </div>
                </div>
              )}
            </div>

            {/* Tagline */}
            {tagline && (
              <div className="mt-5 max-w-xl overflow-hidden lg:mt-6">
                <div className="ph-tagline-inner">
                  <p className="text-[clamp(1rem,1.2vw,1.15rem)] font-light leading-relaxed text-white/65">
                    {tagline}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* META */}
        {(location || year) && (
          <div className="flex justify-end overflow-hidden">
            <div className="ph-meta-inner flex gap-10 text-right lg:gap-14">
              {location && (
                <div>
                  <p className="text-[7px] font-mono font-bold uppercase tracking-[0.3em] text-white/30 lg:text-[8px]">
                    LOCATIE
                  </p>
                  <p className="mt-1 text-xs font-medium text-white/60 transition-colors duration-300 hover:text-white/80 lg:text-sm">
                    {location}
                  </p>
                </div>
              )}

              {year && (
                <div>
                  <p className="text-[7px] font-mono font-bold uppercase tracking-[0.3em] text-white/30 lg:text-[8px]">
                    JAAR
                  </p>
                  <p className="mt-1 text-xs font-medium text-white/60 transition-colors duration-300 hover:text-white/80 lg:text-sm">
                    {year}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.3)]" />
    </section>
  );
}