"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "@phosphor-icons/react"

gsap.registerPlugin(ScrollTrigger)

const FONT = "var(--font-sans)"

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

interface CTAData {
  heading?: string
  subtext?: string
  trust?: string[]
  primaryLabel?: string
  primaryLink?: string    // ← TOEGEVOEGD
  secondaryLabel?: string
  secondaryLink?: string  // ← TOEGEVOEGD
}

interface CTASectionProps {
  data?: CTAData | null
  color?: string | null  // ← TOEGEVOEGD voor category kleur
}

const FALLBACK: CTAData = {
  heading:        "Klaar om je merk zichtbaar te maken.",
  subtext:        "Van ontwerp en engineering tot productie en montage — hoogwaardige signing voor bedrijven, retail en architectuur. Volledig in eigen beheer.",
  trust:          ["Vaste prijsafspraken", "Eigen productie", "12 jaar ervaring"],
  primaryLabel:   "Project starten",
  secondaryLabel: "Gratis advies",
}

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

export default function CTASection({ data, color = "#f7f704" }: CTASectionProps) {
  const d = { ...FALLBACK, ...data, trust: data?.trust?.length ? data.trust : FALLBACK.trust }
  const accentColor = color ?? "#f7f704"

  const sectionRef = useRef<HTMLElement>(null)

useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // We halen ScrollTrigger hier weg, of we voegen de juiste scroller toe
      // Om het 100% werkend te krijgen in popups animeren we direct met een subtiele delay:
      gsap.fromTo(".cta-heading",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.2 }
      )
      gsap.fromTo(".cta-border",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1.4, ease: "power3.inOut", delay: 0.4 }
      )
      gsap.fromTo(".cta-bottom",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.5 }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])


  // Split heading voor solid + outline effect
  const words     = (d.heading ?? "").split(" ")
  const midpoint  = Math.ceil(words.length / 2)
  const line1     = words.slice(0, midpoint).join(" ")
  const line2rest = words.slice(midpoint)
  const line2main = line2rest.slice(0, -1).join(" ")
  const line2last = line2rest.slice(-1)[0] ?? ""

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080808] py-40 text-white md:py-0"
    >
      {/* Glow — met category kleur */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: `radial-gradient(circle, ${accentColor}0a, transparent 70%)` }}
      />

      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.032]"
        style={{
          mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">

        {/* HEADING */}
        <div className="cta-heading max-w-5xl">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px w-5" style={{ backgroundColor: accentColor }} aria-hidden />
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/28" style={{ fontFamily: FONT }}>
              Klaar om te starten
            </p>
          </div>

          <h2
            className="text-[clamp(42px,7vw,110px)] font-bold leading-[0.86] tracking-[-0.07em] text-white"
            style={{ fontFamily: FONT }}
          >
            {line1}
            <br />
            <span style={{ WebkitTextStroke: `1.5px ${accentColor}`, color: "transparent", fontFamily: FONT }}>
              {line2main}
            </span>
            {line2main ? " " : ""}
            {line2last.replace(".", "")}
            <span style={{ color: accentColor }}>.</span>
          </h2>
        </div>

        {/* BORDER */}
        <div className="cta-border mt-20 h-px w-full origin-left" style={{ backgroundColor: `${accentColor}12` }} />

        {/* BOTTOM */}
        <div className="cta-bottom mt-12 flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-end">

          {/* Left */}
          <div className="max-w-lg">
            <p className="text-[15px] leading-relaxed text-white/40" style={{ fontFamily: FONT }}>
              {d.subtext}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {(d.trust ?? []).map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="h-px w-4" style={{ backgroundColor: accentColor }} aria-hidden />
                  <span className="text-[10px] uppercase tracking-[0.22em] text-white/35" style={{ fontFamily: FONT }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <Link
  href={data?.primaryLink || "/contact"} // Luistert naar Sanity, anders fallback naar /contact
  className="group inline-flex items-center gap-3 rounded-full px-8 py-[14px] text-[11px] font-bold tracking-[0.04em] text-black transition-all duration-300 hover:scale-[1.03] hover:bg-white"
  style={{ fontFamily: FONT, backgroundColor: accentColor }}
>
  {d.primaryLabel}
  <ArrowUpRight size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
</Link>

<Link
  href={data?.secondaryLink || "/contact?type=advies"} // Luistert naar Sanity, anders fallback
  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-[14px] text-[11px] font-medium text-white/50 transition-all duration-300 hover:border-white/35 hover:text-white"
  style={{ fontFamily: FONT }}
>
  {d.secondaryLabel}
</Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-px w-4" style={{ backgroundColor: `${accentColor}40` }} aria-hidden />
              <p className="text-[9px] uppercase tracking-[0.22em] text-white/22" style={{ fontFamily: FONT }}>
                Reactie binnen 1 werkdag
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}