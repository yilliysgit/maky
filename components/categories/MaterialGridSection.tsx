"use client";

import React, { useState } from "react";
import Image from "next/image";

interface MaterialItem {
  _key: string;
  title: string;
  description?: string;
  properties?: string[]; // Bijv: ["RVS 316", "Weerbestendig", "Mat geborsteld"]
  image?: { url: string; alt?: string | null } | null;
}

type Props = {
  label?: string | null;
  title: string;
  intro?: string | null;
  items?: MaterialItem[] | null;
  color?: string | null;
};

export function MaterialGridSection({
  label,
  title,
  intro,
  items,
  color,
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!items || items.length === 0) return null;

  return (
    <section className="bg-[#050505] text-white py-20 md:py-28 border-t border-white/[0.03]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          {label && (
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8" style={{ backgroundColor: color ?? '#f7f704' }} />
              <span className="text-xs uppercase tracking-[0.3em] text-white/40 font-medium">
                {label}
              </span>
            </div>
          )}
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-[0.96]">
            {title}
          </h2>
          {intro && (
            <p className="mt-6 text-lg text-neutral-400 font-light leading-relaxed">
              {intro}
            </p>
          )}
        </div>

        {/* INTERACTIEF LAB GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Linkerkant: De Tactiele Materiaalkaarten (8 kolommen) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {items.map((item, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={item._key}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`group relative aspect-square rounded-xl overflow-hidden bg-neutral-900 border transition-all duration-300 text-left outline-none ${
                    isSelected 
                      ? "border-[#f7f704] scale-[0.98] ring-1 ring-[#f7f704]/30" 
                      : "border-white/5 hover:border-white/20"
                  }`}
                  style={{ '--accent-color': color ?? '#f7f704' } as React.CSSProperties}
                >
                  {/* Materiaal Foto */}
                  {item.image?.url ? (
                    <Image
                      src={item.image.url}
                      alt={item.image.alt ?? item.title}
                      fill
                      className={`object-cover transition-transform duration-700 ${
                        isSelected ? "scale-110 brightness-[0.85]" : "scale-100 group-hover:scale-105 brightness-75"
                      }`}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950" />
                  )}

                  {/* Subtiele metallic glans overlay bij hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

                  {/* Label onderin de kaart */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-12">
                    <span className="text-[10px] font-mono text-white/30 block mb-1">
                      SPEC // 0{idx + 1}
                    </span>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white group-hover:text-[#f7f704] transition-colors">
                      {item.title}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Rechterkant: Het 'Technical Spec Sheet' (5 kolommen) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 bg-neutral-950/60 border border-white/5 rounded-2xl p-8 backdrop-blur-md min-h-[360px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <span className="text-xs font-mono tracking-widest text-[#f7f704]">
                  MATERIAL_LAB_DATA
                </span>
                <span className="text-xs font-mono text-white/20">
                  REV_2026
                </span>
              </div>

              {/* Dynamische Content op basis van actieve selectie */}
              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4">
                {items[activeIndex].title}
              </h3>
              
              {items[activeIndex].description && (
                <p className="text-neutral-400 text-sm font-light leading-relaxed mb-8">
                  {items[activeIndex].description}
                </p>
              )}

              {/* Technische eigenschappen */}
              {items[activeIndex].properties && (
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-white/30 block mb-2">
                    Kenmerken:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {items[activeIndex].properties.map((prop, pIdx) => (
                      <span 
                        key={pIdx}
                        className="text-xs px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/5 text-neutral-300 font-mono"
                      >
                        {prop}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Decoratief technisch element onderin */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/20">
              <span>MAKY STUDIO // PREMIUM QUALITY</span>
              <span className="animate-pulse">● READY</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}