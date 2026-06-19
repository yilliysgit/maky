// @/components/categories/hero/SubCategoryHero.tsx
"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Breadcrumbs from "@/components/ui/Breadcrumbs";

gsap.registerPlugin(ScrollTrigger);

const FONT = "var(--font-sans)";

type SubCategoryHeroProps = {
  title: string;              
  tagline?: string | null;    
  description?: string | null; // ✅ Gelijkgetrokken met page.tsx
  imageUrl?: string | null;
  imageAlt?: string | null;
  color?: string | null;       
  stats?: {
    value: string;
    label: string;
  }[];
};

export function SubCategoryHero({
  title,
  tagline,
  description, // ✅ Gelijkgetrokken met page.tsx
  imageUrl,
  imageAlt,
  color,
  stats = [], // ✅ Lege array als default zodat we altijd de Sanity stats pakken
}: SubCategoryHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const accentColor = color ?? "#f7f704";

  // 1. Altijd een veilige string pakken om te splitsen, mocht Sanity traag zijn
  const safeTitle = title || "Gevelreclame";
  const words = safeTitle.split(" ");
  const firstWord = words[0];
  const secondLine = words.slice(1).join(" ");

  // 2. Fallback statistieken voor het geval dat de array in Sanity écht helemaal leeg is
  const displayStats = stats && stats.length > 0 ? stats : [
    { value: "120+", label: "gerealiseerd" },
    { value: "12 jr", label: "ervaring" },
    { value: "Eigen", label: "productie" },
  ];

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-word",
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "power4.out" }
      );

      gsap.fromTo(
        [".hero-tagline", ".hero-description", ".hero-stat-item"],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08, delay: 0.3 }
      );

      if (imageContainerRef.current) {
        gsap.set(imageContainerRef.current, { clipPath: "inset(0 0 0 100%)" });
        gsap.to(imageContainerRef.current, {
          clipPath: "inset(0 0 0 0%)",
          duration: 1.3,
          ease: "power4.out",
          delay: 0.2,
        });
      }

      if (imageInnerRef.current) {
        gsap.to(imageInnerRef.current, {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] overflow-hidden bg-[#080808] text-white flex items-center"
    >
      {/* Noise */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* Glow in category kleur */}
      <div
        className="pointer-events-none absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full blur-[120px]"
        style={{ backgroundColor: `${accentColor}06` }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] items-center px-6 lg:px-20 py-24">
        
        
        <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-[35%_65%] lg:gap-16 items-center">
          
          {/* LINKS: 35% */}
          <div ref={textRef} className="z-10 min-w-0 w-full">
             <Breadcrumbs
    items={[
      {
        label: "Diensten",
        href: "/diensten",
      },
      {
        label: "Exterieur",
        href: "/diensten/exterieur",
      },
      {
        label: "Gevelreclame",
      },
    ]}
  />

            <h1
              className="text-[clamp(45px,6vw,85px)] font-black leading-[0.85] tracking-[-0.05em] uppercase text-white break-keep select-none"
              style={{ fontFamily: FONT }}
            >
              <div className="overflow-hidden block">
                <span className="hero-word block">{firstWord}</span>
              </div>
              {secondLine && (
                <div className="overflow-hidden block">
                  <span 
                    className="hero-word block"
                    style={{ color: accentColor }}
                  >
                    {secondLine}
                    <span style={{ color: accentColor }}>.</span>
                  </span>
                </div>
              )}
            </h1>

            {/* TAGLINE */}
            {tagline && (
              <p
                className="hero-tagline mt-6 text-base leading-relaxed md:text-lg"
                style={{ fontFamily: FONT, color: `${accentColor}cc` }}
              >
                {tagline}
              </p>
            )}

            {/* DESCRIPTION — Nu volledig werkend met Sanity data */}
            {description && (
              <p
                className="hero-description mt-3 text-sm leading-relaxed"
                style={{ fontFamily: FONT, color: `${accentColor}80` }}
              >
                {description}
              </p>
            )}

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/[0.06] pt-8">
              {displayStats.map((stat, idx) => (
                <div key={idx} className="hero-stat-item flex flex-col gap-1">
                  <div 
                    className="text-xl font-black tracking-tight md:text-2xl"
                    style={{ color: accentColor }}
                  >
                    {stat.value}
                  </div>
                  <div 
                    className="text-[9px] uppercase tracking-[0.2em] leading-tight"
                    style={{ color: `${accentColor}60` }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RECHTS: 65% — Grote foto */}
          <div className="w-full min-w-0">
            <div
              ref={imageContainerRef}
              className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white/[0.01]"
              style={{ clipPath: "inset(0 0 0 100%)" }}
            >
              <div ref={imageInnerRef} className="relative h-full w-full will-change-transform">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={imageAlt ?? safeTitle}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className="object-cover object-center"
                  />
                ) : (
                  <div
                    className="h-full w-full"
                    style={{
                      background: `radial-gradient(circle at 30% 20%, ${accentColor}10, transparent 60%), #101010`,
                    }}
                  />
                )}

                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/[0.04]" />
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.04]" />
    </section>
  );
}