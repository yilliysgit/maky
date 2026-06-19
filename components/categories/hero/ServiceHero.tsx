// @/app/components/categories/hero/ServiceHero.tsx

"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const FONT = "var(--font-sans)";

type ServiceHeroProps = {
  title: string;
  subtitle?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  color?: string | null;
  // Custom stats specifiek voor MAKY diensten
  stats?: {
    value: string;
    label: string;
  }[];
};

export function ServiceHero({
  title,
  subtitle = "Expertise",
  description,
  imageUrl,
  imageAlt,
  color,
  stats = [
    { value: "120+", label: "gevelreclames gerealiseerd" },
    { value: "12 jaar", label: "ervaring in-house" },
    { value: "Eigen", label: "productie & montage" }
  ]
}: ServiceHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const accentColor = color ?? "#f7f704";

  const words = title.split(" ");
  const firstLine = words.slice(0, Math.ceil(words.length / 2)).join(" ");
  const secondLine = words.slice(Math.ceil(words.length / 2)).join(" ");

  useGSAP(
    () => {
      // Directe text reveals via y-axis masking
      gsap.fromTo(".hero-meta", { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" });
      gsap.fromTo(".hero-word", { y: 110, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.1 });
      gsap.fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.4 });
      gsap.fromTo(".hero-stat-item", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power2.out", delay: 0.6 });

      // Strakke clip-path reveal voor de brede 60% projectfoto
      if (imageContainerRef.current) {
        gsap.set(imageContainerRef.current, { clipPath: "inset(0 0 0 100%)" });
        gsap.to(imageContainerRef.current, { clipPath: "inset(0 0 0 0%)", duration: 1.4, ease: "power4.out", delay: 0.2 });
      }

      if (imageInnerRef.current) {
        gsap.fromTo(imageInnerRef.current, { scale: 1.05 }, { scale: 1, duration: 1.6, ease: "power3.out", delay: 0.2 });
        // Scroll parallax op de grote projectfoto
        gsap.to(imageInnerRef.current, {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative min-h-[85vh] overflow-hidden bg-[#080808] text-white flex items-center">
      {/* Texture & Noise */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pt-32 pb-12 md:px-12 md:pt-36 lg:px-20">
        
        {/* Meta Context */}
        <div className="hero-meta mb-6 flex items-center gap-4 opacity-0">
          <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/40" style={{ fontFamily: FONT }}>
            {subtitle}
          </span>
          <div className="h-px w-10" style={{ backgroundColor: accentColor }} />
        </div>

        {/* 40% Tekst / 60% Beeld Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          
          {/* LINKS: Typografie + Keiharde Bewijslast (40%) */}
          <div ref={textRef} className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <h1 className="text-[clamp(48px,5.5vw,95px)] font-black leading-[0.84] tracking-[-0.06em] uppercase">
                <div className="overflow-hidden block">
                  <span className="hero-word block text-white">{firstLine}</span>
                </div>
                {secondLine && (
                  <div className="overflow-hidden block">
                    <span className="hero-word block text-transparent" style={{ WebkitTextStroke: `1.5px ${accentColor}` }}>
                      {secondLine}
                      <span style={{ color: accentColor, WebkitTextStroke: "0px" }}>.</span>
                    </span>
                  </div>
                )}
              </h1>

              {description && (
                <p className="hero-desc mt-6 max-w-sm text-sm leading-relaxed text-white/40" style={{ fontFamily: FONT }}>
                  {description}
                </p>
              )}
            </div>

            {/* Direct Bewijs Grid (Geïntegreerde USP's) */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
              {stats.map((stat, i) => (
                <div key={i} className="hero-stat-item opacity-0 flex flex-col gap-1">
                  <span className="font-mono text-lg font-bold tracking-tight md:text-xl" style={{ color: accentColor }}>
                    {stat.value}
                  </span>
                  <span className="text-[11px] font-light leading-tight text-white/30">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RECHTS: Enorme, dominante Projectfoto (60%) */}
          <div className="lg:col-span-7 w-full lg:h-[520px]">
            <div
              ref={imageContainerRef}
              className="relative h-full aspect-[16/10] lg:aspect-auto w-full overflow-hidden rounded-[20px] bg-white/[0.01]"
            >
              <div ref={imageInnerRef} className="relative h-full w-full will-change-transform">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={imageAlt ?? title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center"
                  />
                ) : (
                  <div
                    className="h-full w-full"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${accentColor}10, transparent 70%), #121212`,
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-black/10" />
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-[20px] border border-white/[0.04]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}