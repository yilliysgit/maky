// components/projecten/ProjectApproach.tsx

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type ApproachStep = {
  number: string;
  title: string;
  description: string;
};

type ProjectApproachProps = {
  steps: ApproachStep[];
};

export default function ProjectApproach({ steps }: ProjectApproachProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".approach-header", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      tl.from(
        ".approach-step",
        {
          y: 50,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.2"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050505] py-28 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">

        {/* Header */}
        <div className="approach-header mb-20">
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-[#f7f704]" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#f7f704]">
              Onze aanpak
            </span>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-20 lg:space-y-28">
          {steps.map((step, index) => (
            <div
              key={index}
              className="approach-step group"
            >
              <div className="grid gap-6 lg:grid-cols-[180px_1fr] lg:gap-12">

                {/* Nummer */}
                <div className="relative">
                  <span className="select-none text-[clamp(4rem,8vw,7rem)] font-black leading-none text-[#f7f704]/15 transition-all duration-500 group-hover:text-[#f7f704]/25">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="max-w-3xl">

                  <div className="mb-6 h-[2px] w-12 bg-[#f7f704] transition-all duration-500 group-hover:w-20" />

                  <h3 className="mb-5 text-[clamp(1.8rem,2.5vw,2.8rem)] font-black uppercase tracking-[-0.04em] text-white">
                    {step.title}
                  </h3>

                  <p className="text-base font-light leading-relaxed text-white/70 lg:text-lg">
                    {step.description}
                  </p>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}