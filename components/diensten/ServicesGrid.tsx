"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

const FONT = "var(--font-sans)";

type Category = {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  tagline: string;
  color: string;
  image?: {
    asset: any;
    alt?: string;
    hotspot?: any;
  };
};

export default function ServicesShowcase({
  categories,
}: {
  categories: Category[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full overflow-hidden bg-[#080808] pb-32 md:pb-48 clear-both block select-none text-white">
      
      {/* Ragfijne scheidingslijn die direct aansluit op de padding van de intro */}
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="h-px w-full bg-white/[0.06]" aria-hidden />
      </div>

      {/* Padding top is er hier volledig uit (pt-0) voor een strakke aansluiting */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 pt-0">
        
        {/* Introductie Header van de Grid met items-start voor top-uitlijning */}
        <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-4 bg-[#f7f704]" aria-hidden />
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/35 font-medium" style={{ fontFamily: FONT }}>
                Diensten
              </span>
            </div>

            {/* Linkertitel: Tikje kleiner (max 80px), leading op 1.1 gezet tegen het in elkaar drukken */}
            <h2 
              className="text-[clamp(40px,5.5vw,80px)] font-black uppercase leading-[1.1] tracking-[-0.02em] text-white"
              style={{ fontFamily: FONT }}
            >
              Wat we <span className="text-[#f7f704]">zichtbaar maken.</span>
            </h2>
          </div>

          {/* Rechtertekst: pt-11 zorgt voor een snaarstrakke, gelijke lijn met "Wat we" links */}
          <div className="lg:col-span-4 lg:pt-11">
            <p 
              className="max-w-sm text-[16px] md:text-[18px] font-light leading-relaxed text-neutral-400" 
              style={{ fontFamily: FONT }}
            >
              Van gevel tot interieur, van voertuig tot beursvloer. Eén strakke lijn, één superieure uitstraling.
            </p>
          </div>
        </div>

        {/* De Interactieve Service Accordion */}
        <div
          className="relative border-t border-white/[0.06]"
          onMouseLeave={() => setActiveIndex(0)}
        >
          {categories.map((cat, idx) => {
            const isActive = idx === activeIndex;
            const number = String(idx + 1).padStart(2, "0");
            const imageUrl = cat.image
              ? urlFor(cat.image).width(800).quality(90).auto("format").url()
              : null;

            const categoryAccent = cat.color || "#f7f704";

            return (
              <Link
                key={cat._id}
                href={`/diensten/${cat.slug.current}`}
                onMouseEnter={() => setActiveIndex(idx)}
                className={[
                  "group relative grid overflow-hidden border-b border-white/[0.06] transition-all duration-500 ease-out",
                  "grid-cols-[40px_1fr] gap-4 py-8 md:grid-cols-[80px_1.3fr_0.7fr] md:gap-12 md:py-10",
                  isActive ? "md:py-14 opacity-100" : "opacity-40 hover:opacity-100",
                ].join(" ")}
              >
                {/* Nummering */}
                <div
                  className="text-[11px] font-bold tabular-nums tracking-[0.2em] pt-4 transition-colors duration-300"
                  style={{ 
                    fontFamily: FONT,
                    color: isActive ? categoryAccent : "rgba(255,255,255,0.2)" 
                  }}
                >
                  {number}
                </div>

                {/* Content Blok */}
                <div className="relative z-10">
                  {/* Item Titels: Opgeschonken naar max 104px (actief) en 76px (inactief) */}
                  <h3
                    className={[
                      "font-black uppercase tracking-[-0.04em] transition-all duration-500 ease-out",
                      isActive
                        ? "text-[clamp(42px,6vw,104px)] leading-[0.95]"
                        : "text-[clamp(32px,4.5vw,76px)] leading-[1.1] text-white",
                    ].join(" ")}
                    style={{ 
                      fontFamily: FONT,
                      color: isActive ? categoryAccent : undefined
                    }}
                  >
                    {cat.title}
                  </h3>

                  {/* Uitklapbaar detailgedeelte */}
                  <div
                    className={[
                      "grid transition-all duration-500 ease-out",
                      isActive
                        ? "mt-6 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0 pointer-events-none",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl text-[15px] leading-relaxed text-neutral-400 font-light" style={{ fontFamily: FONT }}>
                        {cat.shortDescription}
                      </p>

                      <div className="mt-6 inline-flex items-center gap-3">
                        <span
                          className="text-[10px] uppercase tracking-[0.26em] font-medium transition-colors duration-300"
                          style={{ color: categoryAccent, fontFamily: FONT }}
                        >
                          Bekijk deze discipline
                        </span>
                        <div
                          className="h-px transition-all duration-500 ease-out w-6 group-hover:w-12"
                          style={{ backgroundColor: categoryAccent }}
                        />
                        <span className="text-[14px] font-light" style={{ color: categoryAccent }}>→</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Zwevende Afbeelding */}
                <div className="relative hidden md:block">
                  {imageUrl && (
                    <div
                      className={[
                        "absolute right-0 top-1/2 aspect-[4/3] w-[340px] -translate-y-1/2 overflow-hidden bg-neutral-900 transition-all duration-700 ease-out",
                        isActive
                          ? "opacity-100 translate-x-0 scale-100"
                          : "translate-x-12 scale-95 opacity-0 pointer-events-none",
                      ].join(" ")}
                    >
                      <Image
                        src={imageUrl}
                        alt={cat.image?.alt || cat.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="340px"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Afsluitende Grid-CTA */}
        <div className="mt-20 flex flex-col gap-8 border-t border-white/[0.06] pt-12 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-[13px] leading-relaxed text-neutral-500 font-light" style={{ fontFamily: FONT }}>
            Elk project kent een eigen complexiteit. Wij leveren de engineering, de productie én de feilloze montage op locatie.
          </p>

          <Link
            href="/contact"
            className="group inline-flex w-fit items-center gap-4 rounded-full bg-[#f7f704] px-8 py-4 text-[13px] uppercase tracking-[0.15em] font-black text-black transition-all duration-300 hover:bg-white"
            style={{ fontFamily: FONT }}
          >
            Samenwerken
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}