// components/diensten/ServicesGrid.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

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

export default function ServicesGrid({
  categories,
}: {
  categories: Category[];
}) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activeCategory = activeSlug
    ? categories.find((c) => c.slug.current === activeSlug)
    : null;

  return (
    <section className="relative bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white py-20 md:py-28">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#f7f704]/5 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-10 bg-[#f7f704]" />
            <span className="text-sm uppercase tracking-[0.25em] text-white/60">
              Onze diensten
            </span>
            <span className="h-px w-10 bg-[#f7f704]" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Visual Signing
            <span className="block mt-2 text-[#f7f704]">Diensten</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
            Elke dienst met een eigen kleuridentiteit.
            <span className="text-[#f7f704]"> Geel</span> blijft onze primaire
            huisstijlkleur.
          </p>
        </header>

        {/* Grid wrapper */}
        <div
          className="relative overflow-hidden rounded-2xl"
          onMouseLeave={() => setActiveSlug(null)}
        >
          {/* Shared background */}
          <div
            aria-hidden
            className="absolute inset-0 z-0 transition-all duration-500"
            style={{
              opacity: activeCategory?.image ? 1 : 0,
              transform: activeCategory ? "scale(1.03)" : "scale(1)",
            }}
          >
            {activeCategory?.image && (
              <>
                <Image
                  src={urlFor(activeCategory.image).width(2000).url()}
                  alt={
                    activeCategory.image.alt || activeCategory.title
                  }
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/85 to-black/70" />
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    background: `linear-gradient(135deg, ${activeCategory.color}25, transparent 60%)`,
                  }}
                />
              </>
            )}
          </div>

          {/* 2x2 Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2">
            {categories.map((cat) => {
              const isActive = activeSlug === cat.slug.current;
              const isDimmed =
                activeSlug !== null && !isActive;

              return (
                <Link
                  key={cat._id}
                  href={`/diensten/${cat.slug.current}`}
                  onMouseEnter={() =>
                    setActiveSlug(cat.slug.current)
                  }
                  className={[
                    "relative group overflow-hidden",
                    "min-h-[360px] md:min-h-[380px] lg:min-h-[420px]",
                    "p-10 flex flex-col justify-between",
                    "transition-all duration-300",
                    isDimmed ? "opacity-40" : "opacity-100",
                  ].join(" ")}
                  style={{
                    boxShadow: isActive
                      ? `inset 0 0 0 1px ${cat.color}80, inset 0 0 24px ${cat.color}25`
                      : "inset 0 0 0 1px rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Tile image */}
                  {cat.image && (
                    <div
                      className="absolute inset-0 z-0 transition-opacity duration-500"
                      style={{
                        opacity: activeCategory ? 0 : 1,
                      }}
                    >
                      <Image
                        src={urlFor(cat.image).width(1200).url()}
                        alt={cat.image.alt || cat.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/70 to-black/55" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                      {cat.title}
                    </h2>
                    <p className="text-lg text-white/70 max-w-md">
                      {cat.tagline}
                    </p>
                      <p>{cat.shortDescription}</p>


                    {isActive && (
                      <div className="mt-5 flex items-center gap-3">
                        <span
                          className="h-1 w-8 rounded-full"
                          style={{
                            backgroundColor: cat.color,
                          }}
                        />
                        <span
                          className="text-xs uppercase tracking-wider"
                          style={{ color: cat.color }}
                        >
                          Geselecteerd
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="relative z-10 flex items-center gap-3">
                    <span
                      className="text-sm font-medium transition-colors"
                      style={{
                        color: isActive
                          ? cat.color
                          : "rgba(255,255,255,0.5)",
                      }}
                    >
                      Meer info
                    </span>
                    <span
                      className="h-px w-6 transition-all"
                      style={{
                        backgroundColor: isActive
                          ? cat.color
                          : "rgba(255,255,255,0.3)",
                      }}
                    />
                    <span
                      className="transition-transform"
                      style={{
                        color: isActive
                          ? cat.color
                          : "#f7f704",
                        transform: isActive
                          ? "translateX(4px)"
                          : "none",
                      }}
                    >
                      →
                    </span>
                  </div>

                  {/* Accent bar */}
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1"
                      style={{
                        background: `linear-gradient(to right, ${cat.color}, ${cat.color}80, transparent)`,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-white/50 max-w-2xl mx-auto mb-8">
            Ontdek alle{" "}
            <span className="text-[#f7f704] font-medium">
              visual signing
            </span>{" "}
            mogelijkheden. Elk project begint met een{" "}
            <span className="text-[#f7f704] font-medium">
              vrijblijvend adviesgesprek
            </span>
            .
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#f7f704] text-black font-bold rounded-lg hover:bg-[#f7f704]/90 transition"
          >
            Offerte aanvragen
            <span>→</span>
          </Link>

          <p className="mt-4 text-white/30 text-sm">
            Of bel direct{" "}
            <span className="text-[#f7f704]">
              +31 6 20 656 787
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}