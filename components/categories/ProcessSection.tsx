"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ChatsCircle,
  PencilSimple,
  Factory,
  Wrench,
} from "@phosphor-icons/react"

gsap.registerPlugin(ScrollTrigger)

const FONT = "var(--font-sans)"

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

interface ProcessStep {
  title: string
  description: string
}

interface ProcessData {
  label?: string
  heading?: string
  intro?: string
  steps?: ProcessStep[]
  ctaTitle?: string
  ctaText?: string
}

interface ProcessSectionProps {
  data?: ProcessData | null
}


// Iconen per stap — volgorde matcht steps array
const ICONS = [ChatsCircle, PencilSimple, Factory, Wrench]

// Fallback data
const FALLBACK: ProcessData = {
  label:    "Onze werkwijze",
  heading:  "Van eerste idee tot volledige realisatie.",
  intro:    "Een helder proces met vaste stappen, duidelijke communicatie en volledige controle over kwaliteit, planning en uitvoering.",
  steps: [
    { title: "Kennismaking",         description: "We analyseren de locatie, doelstellingen en gewenste uitstraling om tot een duidelijke strategie te komen." },
    { title: "Ontwerp & engineering", description: "Van concept en materiaalkeuze tot technische uitwerking en productietekeningen." },
    { title: "Productie",             description: "In onze eigen productieomgeving realiseren we hoogwaardige signing-oplossingen met volledige kwaliteitscontrole." },
    { title: "Montage",               description: "Professionele installatie en afwerking door ervaren monteurs, volledig volgens planning uitgevoerd." },
  ],
  ctaTitle: "Heldere communicatie van begin tot eind.",
  ctaText:  "Je werkt rechtstreeks samen met een team dat ontwerp, productie en montage volledig in eigen beheer uitvoert.",
}

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

export default function ProcessSection({ data }: ProcessSectionProps) {
  const d     = { ...FALLBACK, ...data, steps: data?.steps?.length ? data.steps : FALLBACK.steps }
  const steps = d.steps ?? []

  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {

      gsap.fromTo(".ps-header",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".ps-header", start: "top 88%", toggleActions: "play none none reverse" },
        }
      )

      gsap.utils.toArray<HTMLElement>(".process-item").forEach((item) => {
        const border = item.querySelector(".ps-border")
        if (border) {
          gsap.fromTo(border,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1, duration: 1.2, ease: "power3.inOut",
              scrollTrigger: { trigger: item, start: "top 88%", toggleActions: "play none none reverse" },
            }
          )
        }

        gsap.fromTo(item.querySelector(".ps-content"),
          { opacity: 0, y: 48 },
          {
            opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 84%", toggleActions: "play none none reverse" },
          }
        )

        const number = item.querySelector(".process-number")
        if (number) {
          gsap.set(number, { opacity: 1 })
          gsap.fromTo(number, { y: 60 }, {
            y: -50, ease: "none",
            scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: 1.8 },
          })
        }
      })

      gsap.fromTo(".ps-cta",
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".ps-cta", start: "top 88%", toggleActions: "play none none reverse" },
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080808] pt-0 pb-32 text-white md:pb-52"
      style={{ overflow: "visible" }}
    >
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.03), transparent 70%)" }}
      />

      {/* Noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10" style={{ overflowX: "clip" }}>

        {/* HEADER */}
        <div className="ps-header max-w-4xl">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-5 bg-[#f7f704]" aria-hidden />
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/30" style={{ fontFamily: FONT }}>
              {d.label}
            </p>
          </div>

          <h2
            className="text-[clamp(38px,6vw,80px)] font-bold leading-[0.88] tracking-[-0.06em] text-white"
            style={{ fontFamily: FONT }}
          >
            {d.heading?.split(" ").slice(0, 3).join(" ")}
            <br />
            <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.2)", color: "transparent", fontFamily: FONT }}>
              {d.heading?.split(" ").slice(3, 5).join(" ")}
            </span>{" "}
            {d.heading?.split(" ").slice(5).join(" ")}
          </h2>

          <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-white/40" style={{ fontFamily: FONT }}>
            {d.intro}
          </p>
        </div>

        {/* STEPS */}
        <div className="mt-28 space-y-0">
          {steps.map((step, i) => {
            const Icon = ICONS[i % ICONS.length]
            const num  = String(i + 1).padStart(2, "0")

            return (
              <div key={i} className="process-item relative pb-12 pt-12">

                {/* Border */}
                <div
                  className="ps-border absolute left-0 right-0 top-0 h-px origin-left bg-white/[0.07]"
                  style={{ transformOrigin: "left center" }}
                />

                {/* Ghost number */}
                <div
                  aria-hidden
                  className="process-number pointer-events-none select-none leading-none tracking-[-0.07em]"
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(120px,18vw,260px)",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.055)",
                    position: "absolute",
                    right: "-1vw",
                    top: "0",
                    transform: "translateY(-15%)",
                    lineHeight: 1,
                    overflow: "visible",
                    zIndex: 0,
                  }}
                >
                  {num}
                </div>

                {/* Content */}
                <div className="ps-content relative z-10 grid gap-8 lg:grid-cols-12 lg:gap-6">

                  {/* Left */}
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-5">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-xl"
                        style={{ border: "1px solid rgba(247,247,4,0.2)", background: "rgba(247,247,4,0.04)" }}
                      >
                        <Icon size={22} weight="regular" className="text-[#f7f704]/60" />
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.28em] text-white/25" style={{ fontFamily: FONT }}>Stap</p>
                        <p className="text-[18px] font-semibold tabular-nums tracking-[-0.04em] text-[#f7f704]" style={{ fontFamily: FONT }}>{num}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="max-w-2xl lg:col-span-8">
                    <h3
                      className="text-[clamp(22px,2.8vw,38px)] font-bold leading-none tracking-[-0.05em] text-white"
                      style={{ fontFamily: FONT }}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-5 text-[15px] leading-relaxed text-white/42" style={{ fontFamily: FONT }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}

          <div className="h-px w-full bg-white/[0.07]" />
        </div>

        {/* BOTTOM CTA */}
        <div className="ps-cta mt-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">

            <div className="lg:col-span-7">
              <div className="mb-5 flex items-center gap-4">
                <div className="h-px w-5 bg-[#f7f704]" aria-hidden />
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/28" style={{ fontFamily: FONT }}>
                  Transparante samenwerking
                </p>
              </div>
              <h3
                className="text-[clamp(28px,3.8vw,52px)] font-bold leading-[0.9] tracking-[-0.055em] text-white"
                style={{ fontFamily: FONT }}
              >
                {d.ctaTitle?.split(" ").slice(0, 2).join(" ")}
                <br />
                <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.18)", color: "transparent", fontFamily: FONT }}>
                  {d.ctaTitle?.split(" ").slice(2).join(" ")}
                </span>
              </h3>
            </div>

            <div className="flex flex-col justify-end lg:col-span-5">
              <p className="text-[14px] leading-relaxed text-white/38" style={{ fontFamily: FONT }}>
                {d.ctaText}
              </p>
              <div className="mt-8 flex items-center gap-6">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#f7f704] px-7 py-[13px] text-[11px] font-bold tracking-[0.04em] text-black transition-all duration-300 hover:scale-[1.03] hover:bg-white"
                  style={{ fontFamily: FONT }}
                >
                  Project starten
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </Link>
                <Link
                  href="/diensten"
                  className="text-[10px] uppercase tracking-[0.22em] text-white/25 transition-colors duration-300 hover:text-white"
                  style={{ fontFamily: FONT }}
                >
                  Bekijk diensten ↗
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}