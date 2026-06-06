"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type NavProject = {
  projectName: string;
  slug: string;
  category?: string;
  featuredImage?: any;
};

type ProjectNavigationProps = {
  previousProject?: NavProject | null;
  nextProject?: NavProject | null;
};

export default function ProjectNavigation({
  previousProject,
  nextProject,
}: ProjectNavigationProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!previousProject && !nextProject) return null;

  const navItems = [
    { id: 0, project: nextProject, label: "VOLGENDE CASE", type: "next" },
    { id: 1, project: previousProject, label: "VORIGE CASE", type: "prev" },
  ];

  return (
    <section className="w-full bg-[#050505] border-t border-white/5 py-16 lg:py-24 select-none">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        
        {/* DESIGN INTRO */}
        <div className="font-mono text-[9px] tracking-[0.35em] text-white/20 uppercase mb-8">
          // NEXT_STEPS_NAVIGATION
        </div>

        {/* BRUTE RIJEN */}
        <div className="flex flex-col border-b border-white/5">
          {navItems.map((item) => {
            const currentProject = item.project;
            const isHovered = hoveredIndex === item.id;

            // Fallback voor eerste of laatste project (Strak geïntegreerd)
            if (!currentProject) {
              return (
                <div 
                  key={item.id} 
                  className="border-t border-white/5 py-14 flex items-center justify-between opacity-10 cursor-not-allowed"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase block">
                      {item.label}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                      {item.type === "next" ? "EINDE PORTFOLIO" : "EERSTE PROJECT"}
                    </h3>
                  </div>
                  <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                    [ {item.type === "next" ? "END_OF_LINE" : "START_OF_LINE"} ]
                  </span>
                </div>
              );
            }

            return (
              <Link
                key={item.id}
                href={`/projecten/${currentProject.slug}`}
                onMouseEnter={() => setHoveredIndex(item.id)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative border-t border-white/5 py-14 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-500 overflow-hidden"
              >
                
                {/* 1. DE FOTO ALS ACHTERGROND VAN DE RIJ (Opent over de volle breedte) */}
                {currentProject.featuredImage && (
                  <div 
                    className="absolute inset-0 pointer-events-none transform-gpu z-0"
                    style={{
                      clipPath: isHovered 
                        ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" 
                        : "polygon(0 0, 0 0, 0 100%, 0 100%)",
                      transition: "clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                  >
                    <Image
                      src={urlFor(currentProject.featuredImage).width(1400).quality(85).url()}
                      alt={currentProject.projectName}
                      fill
                      className="object-cover object-center grayscale contrast-[1.15] brightness-[0.4] opacity-25 transition-transform duration-1000 group-hover:scale-102"
                    />
                    {/* Radiaal verloop: houdt het midden donkerder zodat tekst gegarandeerd leesbaar is */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]/80" />
                  </div>
                )}

                {/* 2. TEXT CONTENT (Shift subtiel naar rechts op hover) */}
                <div className="relative z-10 space-y-2 pointer-events-none transform transition-transform duration-500 ease-out group-hover:translate-x-4">
                  <span className={`font-mono text-[9px] tracking-[0.25em] block transition-colors duration-300 ${isHovered ? "text-[#f7f704]" : "text-white/30"}`}>
                    {item.type === "next" ? "➔ " : "↩ "} {item.label}
                  </span>
                  
                  <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.03em] leading-none text-white">
                    {currentProject.projectName.split(" ")[0]}{" "}
                    <span className="text-white/20 group-hover:text-white/50 transition-colors duration-300">
                      {currentProject.projectName.split(" ").slice(1).join(" ")}
                    </span>
                  </h3>
                </div>

                {/* 3. CATEGORIE LABELS */}
                {currentProject.category && (
                  <span className="relative z-10 font-mono text-[10px] text-white/20 tracking-widest md:text-right group-hover:text-white/40 transition-all duration-500 pointer-events-none md:group-hover:-translate-x-4 transform block">
                    [{currentProject.category}]
                  </span>
                )}

              </Link>
            );
          })}
        </div>

        {/* BOTTOM UTILITY */}
        <div className="mt-12 flex justify-between items-center font-mono text-[9px] text-white/20">
          <Link 
            href="/projecten" 
            className="inline-block tracking-widest text-white/40 hover:text-[#f7f704] transition-colors duration-300"
          >
            [ BEKIJK_ALLE_PROJECTEN ]
          </Link>
          <span>MAKY // ARCHITECTURE & VISUALS</span>
        </div>

      </div>
    </section>
  );
}