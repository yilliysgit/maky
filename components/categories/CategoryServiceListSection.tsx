"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const FONT = "var(--font-sans)";

type Service = {
  _id: string;
  _type: string;
  order?: number | null;
  title: string;
  slug: {
    current: string;
  };
  tagline?: string | null;
  shortDescription?: string | null;
  image?: {
    alt?: string | null;
    asset?: {
      url: string;
    };
  };
};

type Props = {
  services: Service[];
  title?: string | null;
  intro?: string | null;
  color?: string | null;  // ← category kleur
  categorySlug: string;
  subcategorySlug?: string | null;
};

export function CategoryServiceListSection({
  services,
  title,
  intro,
  color = "#f7f704",  // ← fallback
  categorySlug,
  subcategorySlug,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const accentColor = color ?? "#f7f704";

  if (!services?.length) return null;

  const sortedServices = [...services].sort(
    (a, b) => (a.order ?? 999) - (b.order ?? 999)
  );

  const serviceItems = sortedServices.map((service, index) => ({
    id: String(index + 1).padStart(2, "0"),
    title: service.title,
    sub: service.tagline ?? service.shortDescription ?? "",
    href:
      service._type === "service" && subcategorySlug
        ? `/diensten/${categorySlug}/${subcategorySlug}/${service.slug.current}`
        : `/diensten/${categorySlug}/${service.slug.current}`,
    description: service.shortDescription,
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.to(".csl-w1, .csl-w2", {
        y: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.1,
      });

      gsap.fromTo(
        ".csl-meta",
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", delay: 0.2 }
      );

      // Rows animation
      gsap.utils.toArray<HTMLElement>(".csl-row").forEach((row, idx) => {
        const ghost = row.querySelector(".csl-ghost") as HTMLElement;
        const border = row.querySelector(".csl-border") as HTMLElement;

        if (border && idx === 0) {
          gsap.fromTo(
            border,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 1.2,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (ghost) {
          gsap.fromTo(
            ghost,
            { y: 40 },
            {
              y: -40,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#080808] text-white overflow-hidden"
    >
      {/* Achtergrondgloed — met category kleur */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div
          className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full blur-[150px] transition-all duration-1000"
          style={{ backgroundColor: `${accentColor}10` }}
        />
      </div>

      {/* Noise texture */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[5] opacity-[0.032] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* HEADING */}
        <div className="pt-32 pb-20 lg:pt-44 lg:pb-24">
          <div className="csl-meta mb-8 flex items-center gap-4 opacity-0">
            <div
              className="h-px w-5"
              style={{ backgroundColor: accentColor }}
              aria-hidden
            />
            <p
              className="text-[10px] uppercase tracking-[0.28em] text-white/30"
              style={{ fontFamily: FONT }}
            >
              Onze oplossingen
            </p>
          </div>

          {title && (
            <h1
              className="text-[clamp(56px,10vw,148px)] font-bold leading-[0.86] tracking-[-0.07em]"
              style={{ fontFamily: FONT }}
            >
              <div style={{ overflow: "hidden", display: "block" }}>
                <span
                  className="csl-w1 block"
                  style={{ transform: "translateY(108%)" }}
                >
                  {title.split(" ")[0] || title}
                </span>
              </div>
              {title.split(" ").slice(1).length > 0 && (
                <div style={{ overflow: "hidden", display: "block" }}>
                  <span
                    className="csl-w2 block"
                    style={{
                      transform: "translateY(108%)",
                      WebkitTextStroke: `1.5px ${accentColor}`,
                      color: "transparent",
                    }}
                  >
                    {title.split(" ").slice(1).join(" ")}
                    <span style={{ color: accentColor }}>.</span>
                  </span>
                </div>
              )}
            </h1>
          )}

          {intro && (
            <p
              className="mt-8 max-w-2xl text-lg leading-relaxed text-white/50"
              style={{ fontFamily: FONT }}
            >
              {intro}
            </p>
          )}
        </div>

        {/* SERVICE ROWS — met dynamische hover kleur */}
        <div ref={containerRef}>
          {serviceItems.map((service, idx) => (
            <Link
              key={service.id}
              href={service.href}
              className={`csl-row group relative block overflow-hidden`}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Border top */}
              <div className="csl-border absolute left-0 right-0 top-0 h-px origin-left bg-white/[0.06]" />

              {/* Ghost number */}
              <div
                aria-hidden
                className="csl-ghost pointer-events-none absolute right-0 top-0 select-none leading-none tracking-[-0.07em] transition-all duration-700 group-hover:-translate-y-4"
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(80px,12vw,180px)",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.03)",
                  lineHeight: 1,
                  zIndex: 0,
                }}
              >
                {service.id}
              </div>

              {/* Content */}
              <div className="relative z-[2] flex items-center justify-between py-10 lg:py-12">
                <div className="flex items-center gap-6 lg:gap-10">
                  {/* Nummer — wordt category kleur bij hover */}
                  <span
                    className="w-8 text-[10px] tabular-nums tracking-[0.2em] text-white/40 transition-all duration-500"
                    style={{ 
                      fontFamily: FONT,
                      color: activeIndex === idx ? accentColor : "rgba(255,255,255,0.4)"
                    }}
                  >
                    {service.id}
                  </span>

                  <div>
                    {/* Titel — wordt category kleur bij hover */}
                    <h2
                      className="text-[clamp(32px,5vw,72px)] font-bold leading-none tracking-[-0.055em] transition-all duration-500"
                      style={{ 
                        fontFamily: FONT,
                        color: activeIndex === idx ? accentColor : "white"
                      }}
                    >
                      {service.title}
                    </h2>
                    {service.sub && (
                      <p
                        className="mt-2 text-[12px] uppercase tracking-[0.2em] text-white/35 transition-all duration-500"
                        style={{ 
                          color: activeIndex === idx ? `${accentColor}cc` : "rgba(255,255,255,0.35)"
                        }}
                      >
                        {service.sub}
                      </p>
                    )}
                    {service.description && (
                      <p
                        className="mt-3 max-w-md text-sm leading-relaxed transition-all duration-500"
                        style={{ 
                          color: activeIndex === idx ? `${accentColor}99` : "rgba(255,255,255,0.4)"
                        }}
                      >
                        {service.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Arrow — wordt category kleur */}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-black opacity-0 transition-all duration-500 group-hover:opacity-100"
                  style={{ 
                    backgroundColor: accentColor,
                    transform: "translateX(-8px)"
                  }}
                >
                  <ArrowUpRight size={16} weight="bold" />
                </div>
              </div>

              {/* Bottom border */}
              {idx === serviceItems.length - 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// useState toevoegen bovenaan
import { useState } from "react";