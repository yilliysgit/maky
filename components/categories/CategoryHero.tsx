"use client";

import Image from "next/image";
import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type CategoryHeroProps = {
  title: string;
  subtitle?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  color?: string | null;
};

export function CategoryHero({
  title,
  subtitle,
  description,
  imageUrl,
  imageAlt,
}: CategoryHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const finalContentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        gsap.set(finalContentRef.current, { opacity: 1, y: 0 });
        gsap.set(darkOverlayRef.current, { opacity: 0.55 });
        return;
      }

      const mm = gsap.matchMedia();

      // Functie om de live headerhoogte op te halen (veilig voor SSR/Resizes)
      const getHeaderHeight = () => {
        if (typeof document === "undefined") return 96;
        return document.querySelector("header")?.getBoundingClientRect().height ?? 96;
      };

      // DESKTOP & TABLET
      mm.add("(min-width: 768px)", () => {
        // Initialiseer de basiswaarden
        gsap.set(imageWrapRef.current, {
          transformOrigin: "center center",
          clearProps: "all", // Reset eventuele inline styles van eerdere mediaquery switches
        });

        gsap.set(imageInnerRef.current, {
          scale: 1.1, // Subtiele zoom voor parallax start
        });

        gsap.set(finalContentRef.current, {
          opacity: 0,
          y: 60,
        });

        gsap.set(darkOverlayRef.current, {
          opacity: 0,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=2000",
            scrub: 1, // Hogere scrub (1 i.p.v. 0.6) maakt de animatie veel vloeiender
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true, // Cruciaal bij resize/pinning
          },
        });

        // 1. Intro tekst verdwijnt
        tl.to(
          introRef.current,
          {
            opacity: 0,
            y: -100,
            ease: "power2.inOut",
          },
          0
        );

        // 2. De wrapper groeit EXACT naar fullscreen (onder de header) via CSS Layout overschrijving
        tl.to(
          imageWrapRef.current,
          {
            // Dynamische callback: GSAP berekent de top op basis van de actuele headerhoogte
            top: () => getHeaderHeight(),
            left: 0,
            
            // We dwingen de breedte en hoogte naar de volledige viewport
            width: () => window.innerWidth,
            height: () => window.innerHeight - getHeaderHeight(),
            
            borderRadius: 0,
            ease: "power2.inOut",
          },
          0
        );

        // De afbeelding herstelt van de initiële zoom (Parallax effect)
        tl.to(
          imageInnerRef.current,
          {
            scale: 1,
            ease: "power2.inOut",
          },
          0
        );

        // 3. Overlay & Eindtekst
        tl.to(
          darkOverlayRef.current,
          {
            opacity: 0.68,
            ease: "power2.out",
          },
          0.2
        );

        tl.to(
          finalContentRef.current,
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
          },
          0.6
        );

        // Fade-out van de image wrapper aan het einde van de scroll (jouw originele fade)
        tl.to(
          imageWrapRef.current,
          {
            opacity: 0,
            ease: "none",
          },
          0.85
        );

        tl.to(
          darkOverlayRef.current,
          {
            opacity: 1,
            ease: "none",
          },
          0.85
        );

        return () => {
          tl.kill();
        };
      });

      // MOBIEL
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=1800",
            scrub: 1,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        });

        tl.to(introRef.current, { opacity: 0, y: -60, ease: "power2.inOut" }, 0);
        
        tl.to(imageWrapRef.current, {
          top: () => getHeaderHeight(),
          left: 0,
          width: () => window.innerWidth,
          height: () => window.innerHeight - getHeaderHeight(),
          borderRadius: 0,
          ease: "power2.inOut",
        }, 0);

        tl.to(darkOverlayRef.current, { opacity: 0.72, ease: "power2.out" }, 0.2);
        tl.to(finalContentRef.current, { opacity: 1, y: 0, ease: "power3.out" }, 0.5);

        return () => {
          tl.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    {
      scope: sectionRef,
    }
  );

  return (
    // z-0 zorgt ervoor dat je header met een hogere z-index (bv z-50) er ALTIJD bovenop blijft liggen
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white z-0"
    >
      {/* IMAGE */}
      <div
        ref={imageWrapRef}
        className="
          absolute
          overflow-hidden
          will-change-[top,left,width,height,border-radius]

          /* Mobiel beginpositie */
          inset-x-4
          bottom-6
          top-[34vh]
          rounded-[28px]

          /* Desktop beginpositie */
          md:inset-auto
          md:right-8
          md:top-[12vh]
          md:h-[76vh]
          md:w-[55vw]
          md:rounded-[32px]

          lg:right-12
          xl:right-16
        "
      >
        <div ref={imageInnerRef} className="relative h-full w-full">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={imageAlt ?? title}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 60vw"
              className="object-cover"
            />
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent z-[1]" />
      </div>

      {/* DARK OVERLAY */}
      <div
        ref={darkOverlayRef}
        className="pointer-events-none absolute inset-0 z-10 bg-black opacity-0 will-change-opacity"
      />

      {/* INTRO CONTENT */}
      <div
        ref={introRef}
        className="
          absolute
          left-0
          top-0
          z-20
          flex
          h-screen
          w-full
          items-start
          px-6
          pt-20

          md:w-[46vw]
          md:items-center
          md:px-10
          md:pt-0

          lg:px-16
        "
      >
        <div>
          <div className="mb-8 flex items-center gap-4 md:mb-10">
            <span className="h-px w-10 bg-[#f7f704] md:w-12" />
            {subtitle && (
              <span className="text-[10px] uppercase tracking-[0.35em] text-white/45 md:text-[11px]">
                {subtitle}
              </span>
            )}
          </div>

          <h1 className="max-w-[900px] text-[clamp(3.4rem,8vw,10rem)] font-semibold leading-[0.84] tracking-[-0.08em]">
            {title}
          </h1>

          {description && (
            <p className="mt-8 max-w-md text-base leading-relaxed text-white/60 md:mt-10 md:text-lg">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* FINAL CONTENT */}
      <div
        ref={finalContentRef}
        className="
          absolute
          inset-0
          z-30
          flex
          items-end
          px-6
          pb-14
          opacity-0
          will-change-[transform,opacity]

          md:px-10
          md:pb-20

          lg:px-16
          lg:pb-24
        "
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <div className="mb-4 text-[10px] uppercase tracking-[0.35em] text-white/50 md:text-xs">
              {subtitle ?? "Exterieur Signing"}
            </div>

            <h2 className="text-[clamp(2.5rem,5vw,5.75rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
              Gevelreclame die meer doet dan opvallen
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Goede gevelreclame communiceert direct wie je bent. Wij ontwerpen
              en realiseren gevelsigning die past bij het merk én het gebouw.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}