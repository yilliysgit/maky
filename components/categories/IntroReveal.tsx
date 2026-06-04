"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"
import type { HomepageIntro } from "@/types/homepage.type"

gsap.registerPlugin(ScrollTrigger)

const FONT = "var(--font-sans)"

const FALLBACK: HomepageIntro = {
  heading:    "De sterkste merken herken je direct.",
  subtitle:   "MAKY — Visual Signing",
  title:      "MAKY: specialist in visual signing voor binnen en buiten",
  paragraph1: "MAKY is gespecialiseerd in hoogwaardige visual signing voor bedrijven, architecten en organisaties. Wij ontwerpen, produceren en monteren signing-oplossingen voor gevels, interieurs en openbare ruimtes.",
  paragraph2: "Van architecturale gevelreclame en wayfinding tot complete interieurbranding: MAKY begeleidt projecten van concept en engineering tot productie en montage. Dankzij eigen productie behouden wij controle over kwaliteit, planning en uitvoering.",
}

interface IntroRevealProps {
  data?: HomepageIntro
}

export default function IntroReveal({ data }: IntroRevealProps) {
  const d = { ...FALLBACK, ...data }

  const sectionRef  = useRef<HTMLElement>(null)
  const headingRef  = useRef<HTMLHeadingElement>(null)
  const titleRef    = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const p0Ref       = useRef<HTMLParagraphElement>(null)
  const p1Ref       = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {

      // ── 1. GROTE HEADING — word scrub ────────────────────────
      if (headingRef.current) {
        const split = new SplitType(headingRef.current, {
          types: "words",
          tagName: "span",
        })
        if (split.words?.length) {
          gsap.fromTo(
            split.words,
            { color: "rgba(255,255,255,0.08)" },
            {
              color: "rgba(255,255,255,1)",
              ease: "none",
              stagger: { each: 0.18, from: "start" },
              scrollTrigger: {
                id: "intro-heading",
                trigger: headingRef.current,
                start: "top 80%",
                end: "bottom 30%",
                scrub: 1.4,
              },
            }
          )
        }
      }

      // ── 2. BORDER LIJNEN ─────────────────────────────────────
      gsap.fromTo(
        ".intro-border-line",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            id: "intro-border",
            trigger: ".intro-border-line",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // ── 3. SUBTITLE ──────────────────────────────────────────
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, x: -24, filter: "blur(4px)" },
          {
            opacity: 1, x: 0, filter: "blur(0px)",
            duration: 0.9, ease: "power3.out",
            scrollTrigger: {
              id: "intro-subtitle",
              trigger: subtitleRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // ── 4. RECHTER TITEL ─────────────────────────────────────
      if (titleRef.current) {
        const titleSplit = new SplitType(titleRef.current, {
          types: "lines",
          tagName: "span",
        })
        if (titleSplit.lines?.length) {
          gsap.fromTo(
            titleSplit.lines,
            { opacity: 0, y: 36, filter: "blur(3px)" },
            {
              opacity: 1, y: 0, filter: "blur(0px)",
              duration: 0.9, ease: "power3.out", stagger: 0.12,
              scrollTrigger: {
                id: "intro-title",
                trigger: titleRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          )
        }
      }

      // ── 5. PARAGRAFEN ────────────────────────────────────────
      ;[p0Ref, p1Ref].forEach((ref, idx) => {
        if (!ref.current) return
        const pSplit = new SplitType(ref.current, { types: "words", tagName: "span" })
        if (!pSplit.words?.length) return
        gsap.fromTo(
          pSplit.words,
          { opacity: 0.12, y: 12 },
          {
            opacity: 1, y: 0, ease: "power2.out",
            stagger: { each: 0.025, from: "start" },
            scrollTrigger: {
              id: `intro-p-${idx}`,
              trigger: ref.current,
              start: "top 88%", end: "bottom 55%",
              scrub: 0.9,
            },
          }
        )
      })

      // ── 6. GRID ──────────────────────────────────────────────
      gsap.fromTo(
        ".intro-grid",
        { opacity: 0 },
        {
          opacity: 1, duration: 1.2,
          scrollTrigger: {
            id: "intro-grid",
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative z-30 overflow-hidden bg-[#080808] py-40 md:py-56"
    >
      {/* Overgang vanuit hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-40"
        style={{ background: "linear-gradient(to bottom, #080808 0%, transparent 100%)" }}
      />

      {/* Grid */}
      <div
        aria-hidden
        className="intro-grid pointer-events-none absolute inset-0 opacity-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Orbs */}
      <div aria-hidden className="pointer-events-none absolute -right-64 -top-64 h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.035), transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute -bottom-64 -left-64 h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.025), transparent 70%)" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">

        {/* Grote heading */}
        <div className="max-w-5xl">
          <h2
            ref={headingRef}
            className="text-4xl font-semibold leading-[1.08] tracking-[-0.05em] md:text-6xl lg:text-7xl"
            style={{ fontFamily: FONT, color: "rgba(255,255,255,0.08)" }}
          >
            {d.heading}
          </h2>
        </div>

        {/* Grid content */}
        <div className="mt-28 grid gap-16 lg:grid-cols-12 lg:gap-8">

          {/* Links */}
          <div className="lg:col-span-4">
            <div className="intro-border-line h-px w-full origin-left bg-white/[0.08]" />
            <p
              ref={subtitleRef}
              className="mt-10 text-[11px] uppercase tracking-[0.26em] text-white/35"
              style={{ fontFamily: FONT }}
            >
              {d.subtitle}
            </p>
          </div>

          {/* Rechts */}
          <div className="lg:col-span-8">
            <div className="intro-border-line h-px w-full origin-left bg-white/[0.08]" />
            <div className="mt-10">
              <h3
                ref={titleRef}
                className="text-2xl font-semibold leading-snug tracking-[-0.04em] text-white md:text-3xl"
                style={{ fontFamily: FONT }}
              >
                {d.title}
              </h3>

              <div className="mt-10 space-y-7 text-[17px] leading-[1.75] text-white/48">
                {d.paragraph1 && (
                  <p ref={p0Ref} style={{ fontFamily: FONT }}>{d.paragraph1}</p>
                )}
                {d.paragraph2 && (
                  <p ref={p1Ref} style={{ fontFamily: FONT }}>{d.paragraph2}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}