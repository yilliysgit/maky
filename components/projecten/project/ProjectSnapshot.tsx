// components/projecten/ProjectSnapshot.tsx

"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ProjectSnapshotProps = {
  projectName: string;
  location?: string | null;
  sector?: string | null;
  services?: string[];
  timeline?: string | null;
  client?: string | null;
  year?: string | null;
};

export default function ProjectSnapshot({
  projectName,
  location,
  sector,
  services = [],
  timeline,
  client,
  year,
}: ProjectSnapshotProps) {
  const sectionRef = useRef<HTMLElement>(null);
  
  const words = projectName?.trim().split(/\s+/) || ["Project"];
  const firstName = words[0] || "";
  const lastName = words.slice(1).join(" ") || "";

  // Default services als die niet zijn meegegeven
  const defaultServices = ["Ontwerp", "Productie", "Montage"];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".snapshot-item",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        ".snapshot-title-line",
        {
          width: 0,
        },
        {
          width: 50,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050505] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3">
            <div className="snapshot-title-line h-px bg-[#f7f704]" />
            <span className="text-[9px] font-mono font-medium uppercase tracking-[0.35em] text-white/35">
              01 — Project Snapshot
            </span>
          </div>
        </div>

        {/* Titel */}
        <div className="mb-12 border-b border-white/10 pb-6 lg:mb-16 lg:pb-8">
          <h2 className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-black uppercase leading-[1.05] tracking-[-0.03em] text-white">
            {firstName} {lastName}
          </h2>
        </div>

        {/* 4-Column Grid - Clean & Strak */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-10 md:grid-cols-4 lg:gap-x-16 lg:gap-y-12">
          
          {/* Locatie */}
          <div className="snapshot-item space-y-2">
            <p className="text-[8px] font-mono font-medium uppercase tracking-[0.3em] text-[#f7f704]/50">
              Locatie
            </p>
            <p className="text-base font-normal leading-relaxed text-white/70">
              {location || "Nederland"}
            </p>
          </div>

          {/* Sector */}
          <div className="snapshot-item space-y-2">
            <p className="text-[8px] font-mono font-medium uppercase tracking-[0.3em] text-[#f7f704]/50">
              Sector
            </p>
            <p className="text-base font-normal leading-relaxed text-white/70">
              {sector || "Visual Signing"}
            </p>
          </div>

          {/* Diensten - stacked vertical */}
          <div className="snapshot-item space-y-2">
            <p className="text-[8px] font-mono font-medium uppercase tracking-[0.3em] text-[#f7f704]/50">
              Diensten
            </p>
            <div className="space-y-1">
              {(services.length > 0 ? services : defaultServices).map((service, i) => (
                <p key={i} className="text-base font-normal leading-relaxed text-white/70">
                  {service}
                </p>
              ))}
            </div>
          </div>

          {/* Doorlooptijd */}
          <div className="snapshot-item space-y-2">
            <p className="text-[8px] font-mono font-medium uppercase tracking-[0.3em] text-[#f7f704]/50">
              Doorlooptijd
            </p>
            <p className="text-base font-normal leading-relaxed text-white/70">
              {timeline || "3 weken"}
            </p>
          </div>
        </div>

        {/* Footer extra info - alleen als er data is */}
        {(client || year) && (
          <div className="mt-12 flex flex-wrap gap-8 border-t border-white/5 pt-8 lg:mt-16 lg:gap-12 lg:pt-12">
            {client && (
              <div className="snapshot-item">
                <p className="mb-1.5 text-[8px] font-mono uppercase tracking-[0.3em] text-white/25">
                  Opdrachtgever
                </p>
                <p className="text-sm text-white/40">{client}</p>
              </div>
            )}
            {year && (
              <div className="snapshot-item">
                <p className="mb-1.5 text-[8px] font-mono uppercase tracking-[0.3em] text-white/25">
                  Jaar
                </p>
                <p className="text-sm text-white/40">{year}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}