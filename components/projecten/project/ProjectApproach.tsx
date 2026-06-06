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
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      // 1. PINNING EFFECT (Alleen op desktop)
      let mm = gsap.matchMedia();
      
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: triggerRef.current,
          start: "top 15%",
          end: "bottom bottom",
          pin: ".approach-sticky-left",
          pinSpacing: false,
        });
      });

      // 2. REVEAL & DYNAMISCH GEEL KLEUREN BIJ SCROLL
      const stepsElements = gsap.utils.toArray<HTMLElement>(".approach-step");
      
      stepsElements.forEach((step) => {
        const line = step.querySelector(".step-line");
        const numberInner = step.querySelector(".step-number-inner");
        const content = step.querySelector(".step-content");

        // Tijdlijn voor de initiële reveal (inkomen van de content)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(line, 
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 1, ease: "power4.inOut" }
        )
        .fromTo([numberInner, content],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          "-=0.6"
        );

        // Aparte ScrollTrigger die specifiek het nummer GEEL maakt als de stap écht actief in het midden/bovenkant van het scherm staat
        gsap.to(numberInner, {
          color: "#f7f704",
          scrollTrigger: {
            trigger: step,
            start: "top 60%", // Kleurt geel zodra de stap over de helft van het scherm is
            end: "bottom 40%", // Wordt weer grijs als de stap het actieve gebied verlaat
            toggleActions: "play reverse play reverse",
            // De onderstaande toggleActions zorgen ervoor dat hij ook weer netjes terugkleurt bij terugscrollen
          }
        });
      });
    },
    { scope: triggerRef }
  );

  return (
    <section ref={triggerRef} className="relative bg-[#050505] py-24 lg:py-40">
      <div ref={containerRef} className="mx-auto max-w-[1600px] px-6 lg:px-12">
        
        {/* HET GRID: Links plakt vast, rechts scrolt voorbij */}
        <div className="grid grid-cols-12 gap-y-16 lg:gap-x-12 xl:gap-x-20">
          
          {/* LINKERKANT: De Brute Titel (Sticky op desktop) */}
          <div className="approach-sticky-left col-span-12 lg:col-span-5 self-start">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#f7f704]">
                // HET PROCES
              </span>
            </div>
            <h2 className="text-[clamp(3.5rem,7vw,6.5rem)] font-black uppercase tracking-[-0.04em] leading-[0.9] text-white">
              DE <span className="text-white/20 block lg:inline">AANPAK</span>
            </h2>
          </div>

          {/* RECHTERKANT: De Asymmetrische Stappen */}
          <div className="col-span-12 lg:col-span-7 space-y-32 lg:space-y-48 lg:pt-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="approach-step relative flex flex-col pt-8 will-change-transform"
              >
                {/* Technische lijn */}
                <div className="step-line absolute top-0 left-0 w-full h-[1px] bg-white/10" />

                {/* Rij layout binnen de stap */}
                <div className="grid grid-cols-12 gap-4 items-start">
                  
                  {/* Nummering links - De overgangskleur wordt nu volledig via GSAP geregeld */}
                  <div className="step-number col-span-3">
                    <span className="step-number-inner select-none text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-none text-white/10 block transition-colors duration-300">
                      {step.number}
                    </span>
                  </div>

                  {/* Content rechts */}
                  <div className="step-content col-span-9 max-w-xl">
                    <div className="mb-2 font-mono text-[9px] text-white/20 tracking-widest uppercase">
                      [ PHASE_{step.number} ]
                    </div>
                    <h3 className="mb-4 text-xl font-black uppercase tracking-[-0.02em] text-white lg:text-2xl">
                      {step.title}
                    </h3>
                    <p className="text-sm font-light leading-relaxed text-white/50">
                      {step.description}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}