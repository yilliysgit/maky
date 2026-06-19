"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FONT = "var(--font-sans)";

export default function ExplodingSign() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  
  const frontRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !triggerRef.current || 
      !frontRef.current || 
      !profileRef.current || 
      !baseRef.current ||
      !glowRef.current
    ) return;

    const ctx = gsap.context(() => {
      // MASTER TIMELINE: Gekoppeld aan de scroll van de pagina
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // 1. De initiële geëxplodeerde 3D-staat instellen
      gsap.set(frontRef.current, { transformPerspective: 1200, rotateX: 45, rotateZ: -25, z: 180, y: -60, opacity: 0.85 });
      gsap.set(profileRef.current, { transformPerspective: 1200, rotateX: 45, rotateZ: -25, z: 0, y: 0, opacity: 0.7 });
      gsap.set(baseRef.current, { transformPerspective: 1200, rotateX: 45, rotateZ: -25, z: -180, y: 60, opacity: 0.5 });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.8 });

      // 2. De scroll-animatie: alles schuift strak naar 0 (valt in elkaar)
      tl.to([frontRef.current, profileRef.current, baseRef.current], {
        z: 0,
        y: 0,
        opacity: 1,
        ease: "none",
      }, 0)
      // Tegelijkertijd draaien we de letter heel subtiel recht naar de bezoeker toe
      .to([frontRef.current, profileRef.current, baseRef.current], {
        rotateX: 0,
        rotateZ: 0,
        ease: "power1.inOut",
      }, 0)
      // 3. De ontknoping: De LED-verlichting flitst aan!
      .to(glowRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "bounce.out",
      }, ">-0.2");

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="relative w-full h-[200vh] bg-[#080808]">
      {/* STICKY VIEWPORT CONTAINER */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Achtergrond grid om de technische 3D-vibe te versterken */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />

        {/* 3D STAGE CONTAINER */}
        <div ref={containerRef} className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center select-none">
          
          {/* LAAG 0: DE LED GLOW (Licht op aan het einde) */}
          <div 
            ref={glowRef}
            className="absolute inset-0 bg-[#f7f704]/20 blur-[60px] rounded-full pointer-events-none transition-all"
            aria-hidden="true"
          />

          {/* LAAG 1: DE BODEMPLAAT (Aluminium back) */}
          <div 
            ref={baseRef} 
            className="absolute font-black uppercase tracking-tighter text-neutral-800 pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            style={{ fontFamily: FONT, fontSize: "clamp(120px, 18vw, 240px)", lineHeight: 0.8 }}
          >
            M
          </div>

          {/* LAAG 2: HET ZIJKANTPRAFIEL (The Return / Het 3D-Blik) */}
          <div 
            ref={profileRef} 
            className="absolute font-black uppercase tracking-tighter pointer-events-none text-transparent"
            style={{ 
              fontFamily: FONT, 
              fontSize: "clamp(120px, 18vw, 240px)", 
              lineHeight: 0.8,
              WebkitTextStroke: "4px rgba(247, 247, 4, 0.6)" // Geeft het holle 'doos' effect weer
            }}
          >
            M
          </div>

          {/* LAAG 3: DE ACRYL VOORZIJDE (Front face) */}
          <div 
            ref={frontRef} 
            className="absolute font-black uppercase tracking-tighter text-[#f7f704] mix-blend-screen drop-shadow-[0_0_15px_rgba(247,247,4,0.4)]"
            style={{ fontFamily: FONT, fontSize: "clamp(120px, 18vw, 240px)", lineHeight: 0.8 }}
          >
            M
          </div>

        </div>

        {/* Subtiele instructietekst aan de zijkant */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-[10px] uppercase tracking-[0.2em]">
          <span>Scroll om de techniek te assembleren</span>
          <div className="w-px h-8 bg-white/20 animate-bounce mt-1" />
        </div>

      </div>
    </div>
  );
}