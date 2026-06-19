"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const FONT = "var(--font-sans)";

type CategoryHeroProps = {
  title: string;
  subtitle?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  color?: string | null;  // ← komt uit Sanity
};

export function CategoryHero({
  title,
  subtitle,
  description,
  imageUrl,
  imageAlt,
  color,  // ← geen fallback meer, gewoon de Sanity waarde
}: CategoryHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Sanity kleur of fallback naar #f7f704 als die er niet is
  const accentColor = color ?? "#f7f704";

  const words = title.split(" ");
  const firstLine = words.slice(0, Math.ceil(words.length / 2)).join(" ");
  const secondLine = words.slice(Math.ceil(words.length / 2)).join(" ");

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-meta",
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-word",
        { y: 110, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
          delay: 0.15,
        }
      );

      gsap.fromTo(
        ".hero-desc",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.5 }
      );

      if (imageContainerRef.current) {
        gsap.set(imageContainerRef.current, { clipPath: "inset(0 0 0 100%)" });
        gsap.to(imageContainerRef.current, {
          clipPath: "inset(0 0 0 0%)",
          duration: 1.6,
          ease: "power4.out",
          delay: 0.3,
        });
      }

      if (imageInnerRef.current) {
        gsap.fromTo(
          imageInnerRef.current,
          { scale: 1.06 },
          { scale: 1, duration: 1.8, ease: "power3.out", delay: 0.3 }
        );
      }

      if (imageInnerRef.current) {
        gsap.to(imageInnerRef.current, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      gsap.to(textRef.current, {
        opacity: 0,
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "30% top",
          end: "60% top",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#080808] text-white"
    >
      {/* Noise */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Subtiele glow — met category kleur */}
      <div
        className="pointer-events-none absolute right-[-12%] top-[10%] h-[620px] w-[620px] rounded-full blur-[140px]"
        style={{ backgroundColor: `${accentColor}08` }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 lg:px-10">
        {/* Meta — met category kleur */}
        <div className="hero-meta mb-8 flex items-center gap-4 opacity-0">
          <div className="h-px w-8" style={{ backgroundColor: accentColor }} />
          <span
            className="text-[10px] uppercase tracking-[0.32em] text-white/40"
            style={{ fontFamily: FONT }}
          >
            {subtitle ?? "Dienst"}
          </span>
          <div className="h-px w-12 opacity-30" style={{ backgroundColor: accentColor }} />
        </div>

        {/* Titel + Beeld */}
        {/* Titel + Beeld Grid */}
<div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 items-center">
  
  {/* Linkerkant: Tekst (35% breedte -> 4 van de 12 kolommen) */}
  <div ref={textRef} className="lg:col-span-4 flex flex-col justify-center z-10">
    <h1 className="text-[clamp(40px,6vw,85px)] font-bold leading-[0.9] tracking-[-0.05em] uppercase break-words">
      <div className="overflow-hidden block">
        <span className="hero-word block">{firstLine}</span>
      </div>
      {secondLine && (
        <div className="overflow-hidden block">
          <span
            className="hero-word block"
            style={{
              WebkitTextStroke: `1.5px ${accentColor}`,
              color: "transparent",
            }}
          >
            {secondLine}
            <span style={{ color: accentColor }}>.</span>
          </span>
        </div>
      )}
    </h1>

    {description && (
      <p
        className="hero-desc mt-6 max-w-sm text-sm leading-relaxed text-white/50"
        style={{ fontFamily: FONT }}
      >
        {description}
      </p>
    )}
  </div>

  {/* Rechterkant: Beeld (65% breedte -> 8 van de 12 kolommen) */}
  <div className="lg:col-span-8 w-full">
    <div
      ref={imageContainerRef}
      // aspect-[16/10] of [16/11] werkt vaak mooier als hij heel breed wordt dan een staande [4/5]
      className="relative aspect-[16/11] w-full overflow-hidden rounded-[28px] bg-white/[0.02]"
      style={{ clipPath: "inset(0 0 0 100%)" }}
    >
      <div ref={imageInnerRef} className="relative h-full w-full will-change-transform">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt ?? title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 65vw"
            className="object-cover"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background: `radial-gradient(circle at 30% 20%, ${accentColor}15, transparent 60%), #101010`,
            }}
          />
        )}

        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/[0.05]" />
    </div>
  </div>

</div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.05]" />
    </section>
  );
}