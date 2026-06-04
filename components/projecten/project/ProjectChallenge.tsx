// components/projecten/ProjectChallenge.tsx

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type ProjectChallengeProps = {
  title?: string;
  challenge: string;
  challengeNumber?: string;
};

export default function ProjectChallenge({
  title,
  challenge,
  challengeNumber,
}: ProjectChallengeProps) {
  const sectionRef = useRef<HTMLElement>(null);



  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.from(".pc-kicker", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          ".pc-title",
          {
            yPercent: 100,
            duration: 1,
            ease: "expo.out",
          },
          "-=0.2"
        )
        .from(
          ".pc-line",
          {
            scaleY: 0,
            transformOrigin: "top",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.7"
        )
        .from(
          ".pc-text",
          {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-32 lg:py-48"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">

        {/* Kicker */}
        <div className="pc-kicker mb-14 flex items-center gap-3">
          <div className="h-px w-10 bg-[#f7f704]" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#f7f704]">
            Uitdaging
          </span>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[420px_1px_minmax(0,760px)] lg:gap-14">

          {/* Titel */}
          <div className="overflow-hidden">
            <h2 className="pc-title text-[clamp(3rem,5vw,5rem)] font-black uppercase leading-[0.9] tracking-[-0.05em] text-white">
              De uitdaging
            </h2>
          </div>

          {/* Lijn */}
          <div className="pc-line hidden bg-[#f7f704] lg:block" />

          {/* Tekst */}
          <div>
            <p className="pc-text text-[clamp(1.15rem,1.5vw,1.45rem)] font-light leading-[1.8] text-white/70">
              {challenge}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}