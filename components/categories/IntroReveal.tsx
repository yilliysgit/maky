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
  paragraph1: "MAKY is gespecialiseerd in hoogwaardige visual signing voor bedrijven, architecten en organisaties. Wij ontwerpen, produceen en monteren signing-oplossingen voor gevels, interieurs en openbare ruimtes.",
  paragraph2: "Van architecturale gevelreclame networks en wayfinding tot complete interieurbranding: MAKY begeleidt projecten van concept en engineering tot productie en montage. Dankzij eigen productie behouden wij controle over kwaliteit, planning en uitvoering.",
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
            { color: "rgba(255, 255, 255, 0.06)" },
            {
              color: "rgba(255, 255, 255, 1)",
              ease: "none",
              stagger: { each: 0.18, from: "start" },
              scrollTrigger: {
                id: "intro-heading",
                trigger: headingRef.current,
                start: "top 78%",
                end: "bottom 35%",
                scrub: 1.2,
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
          { opacity: 0, x: -20, filter: "blur(3px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
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
            { opacity: 0, y: 32, filter: "blur(3px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.12,
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
          { opacity: 0.10, y: 10 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            stagger: { each: 0.02, from: "start" },
            scrollTrigger: {
              id: `intro-p-${idx}`,
              trigger: ref.current,
              start: "top 88%",
              end: "bottom 58%",
              scrub: 0.8,
            },
          }
        )
      })

      // ── 6. GRID ──────────────────────────────────────────────
      gsap.fromTo(
        ".intro-grid",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.4,
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

  // We knippen de eventuele harde punt van de Sanity heading af om hem handmatig te stylen
// We zorgen dat heading altijd een string is (fallback naar lege string als het undefined is)
  const headingText = d.heading ?? ""
  const cleanHeading = headingText.endsWith(".") ? headingText.slice(0, -1) : headingText
  
  return (
    <section
      ref={sectionRef}
      className="relative z-30 w-full overflow-hidden bg-[#080808] py-32 md:py-48 clear-both block select-none"
    >
      {/* Overgang vanuit de Hero component */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-32"
        style={{ background: "linear-gradient(to bottom, #080808 0%, transparent 100%)" }}
      />

      {/* Technisch Achtergrond Grid */}
      <div
        aria-hidden
        className="intro-grid pointer-events-none absolute inset-0 opacity-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Subtiele Orbs voor diepte */}
      <div aria-hidden className="pointer-events-none absolute -right-64 -top-64 h-[600px] w-[600px] rounded-full opacity-[0.4]" style={{ background: "radial-gradient(circle, rgba(247,247,4,0.015), transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute -bottom-64 -left-64 h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.015), transparent 70%)" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">

        {/* Grote architectonische heading */}
        <div className="max-w-5xl">
          <h2
            ref={headingRef}
            className="text-[clamp(38px,6vw,84px)] font-black leading-[0.88] tracking-[-0.05em] uppercase text-white"
            style={{ fontFamily: FONT }}
          >
            {cleanHeading}
            <span className="text-[#f7f704] font-black">.</span>
          </h2>
        </div>

        {/* Twee-koloms Grid content */}
        <div className="mt-24 md:mt-32 grid gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Linkerkolom: Subtitle Indicator */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <div className="intro-border-line h-px w-full origin-left bg-white/[0.06]" />
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px w-4 bg-[#f7f704]" aria-hidden />
              <p
                ref={subtitleRef}
                className="text-[10px] uppercase tracking-[0.28em] text-white/35 font-medium"
                style={{ fontFamily: FONT }}
              >
                {d.subtitle}
              </p>
            </div>
          </div>

          {/* Rechterkolom: Inhoud & Paragrafen */}
          <div className="lg:col-span-8 flex flex-col justify-start">
            <div className="intro-border-line h-px w-full origin-left bg-white/[0.06]" />
            <div className="mt-8">
              <h3
                ref={titleRef}
                className="text-xl md:text-2xl font-bold leading-tight tracking-[-0.04em] uppercase text-white max-w-2xl"
                style={{ fontFamily: FONT }}
              >
                {d.title}
              </h3>

              {/* Paragrafen ademen perfect met leading-relaxed */}
              <div className="mt-8 space-y-6 text-[15px] md:text-[16px] font-light leading-relaxed text-neutral-400 max-w-2xl">
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