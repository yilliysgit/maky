"use client"

import Link from "next/link"
import { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { urlFor } from "@/sanity/lib/image"
import type { HomepageHero } from "@/types/homepage.type"

gsap.registerPlugin(ScrollTrigger)

const FONT    = "var(--font-sans)"
const CYCLE_MS = 3400

// ─────────────────────────────────────────────────────────────
// COUNTER
// ─────────────────────────────────────────────────────────────

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 1800, 1)
      el.textContent = Math.round(p * target) + suffix
      if (p < 1) requestAnimationFrame(step)
    }
    const t = setTimeout(() => requestAnimationFrame(step), 1600)
    return () => clearTimeout(t)
  }, [target, suffix])
  return <span ref={ref}>0</span>
}

// ─────────────────────────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────────────────────────

interface HomeHeroProps {
  data: HomepageHero
}

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

export default function HomeHero({ data }: HomeHeroProps) {
  const { disciplines, stats } = data

  const heroRef       = useRef<HTMLElement>(null)
  const cursorRef     = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const lensRef       = useRef<HTMLDivElement>(null)
  const lensImgRef    = useRef<HTMLImageElement>(null)

  const [activeDisc, setActiveDisc]     = useState(0)
  const [lensExpanded, setLensExpanded] = useState(false)

  const mouse    = useRef({ x: 0, y: 0 })
  const ringPos  = useRef({ x: 0, y: 0 })
  const lensPos  = useRef({ x: 0, y: 0 })
  const rafRef   = useRef<number>(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // ── IMAGE URL helper ───────────────────────────────────────
  const getImageUrl = useCallback((idx: number, width = 1200) => {
    const disc = disciplines[idx]
    if (!disc?.image?.asset?._ref) return ""
    try {
      return urlFor(disc.image)
        .width(width)
        .height(Math.round(width * 0.75))
        .format("webp")
        .quality(85)
        .fit("crop")
        .auto("format")
        .url()
    } catch {
      return ""
    }
  }, [disciplines])

  // ── CYCLE helpers ──────────────────────────────────────────
  const startCycle = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(
      () => setActiveDisc((p) => (p + 1) % disciplines.length),
      CYCLE_MS
    )
  }, [disciplines.length])

  const stopCycle = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  // ── CURSOR + LENS rAF ──────────────────────────────────────
  useEffect(() => {
    const half = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    mouse.current   = { ...half }
    ringPos.current = { ...half }
    lensPos.current = { ...half }

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top  = `${e.clientY}px`
      }
      if (lensImgRef.current) {
        const dx = (e.clientX / window.innerWidth  - 0.5) * 28
        const dy = (e.clientY / window.innerHeight - 0.5) * 28
        lensImgRef.current.style.transform = `translate(${dx}px,${dy}px) scale(1.18)`
      }
    }

    const loop = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.13
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.13
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = `${ringPos.current.x}px`
        cursorRingRef.current.style.top  = `${ringPos.current.y}px`
      }
      lensPos.current.x += (mouse.current.x - lensPos.current.x) * 0.055
      lensPos.current.y += (mouse.current.y - lensPos.current.y) * 0.055
      if (lensRef.current) {
        lensRef.current.style.left = `${lensPos.current.x}px`
        lensRef.current.style.top  = `${lensPos.current.y}px`
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // ── GSAP INTRO + SCROLL ────────────────────────────────────
  useEffect(() => {
    gsap.set([
      ".hw-wij", ".hw-maken", ".hw-merken",
      ".hw-zicht", ".hw-baar", ".hw-period",
    ], { y: "108%" })
    gsap.set([".hw-topbar", ".hw-discvert", ".hw-meta", ".hw-lens"], { opacity: 0 })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

      tl.to(".hw-wij",    { y: 0, duration: 1.05 }, 0.20)
      tl.to(".hw-maken",  { y: 0, duration: 1.10 }, 0.36)
      tl.to(".hw-merken", { y: 0, duration: 1.10 }, 0.52)
      tl.to(".hw-zicht",  { y: 0, duration: 1.10 }, 0.68)
      tl.to(".hw-baar",   { y: 0, duration: 1.10 }, 0.72)
      tl.to(".hw-period", { y: 0, duration: 1.10 }, 0.76)
      tl.to(".hw-topbar",   { opacity: 1, duration: 0.7 }, 1.00)
      tl.to(".hw-discvert", { opacity: 1, duration: 0.7 }, 1.10)
      tl.to(".hw-meta",     { opacity: 1, y: 0, duration: 0.7 }, 1.15)
      tl.fromTo(".hw-lens",
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.4)" },
        1.10
      )

      gsap.to(".hw-lens", {
        y: "16%", ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top", end: "bottom top", scrub: 1.4,
        },
      })

      gsap.to(".hw-content", {
        opacity: 0, y: "-6%", ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "10% top", end: "60% top", scrub: 1.2,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // ── AUTO CYCLE ─────────────────────────────────────────────
  useEffect(() => {
    startCycle()
    return stopCycle
  }, [startCycle, stopCycle])

  // ── SWAP LENS IMAGE ────────────────────────────────────────
  useEffect(() => {
    const img = lensImgRef.current
    if (!img) return
    img.style.opacity = "0"
    const url = getImageUrl(activeDisc)
    const t = setTimeout(() => {
      if (url) img.src = url
      img.style.opacity = "1"
    }, 220)
    return () => clearTimeout(t)
  }, [activeDisc, getImageUrl])

  // ── WORD HOVER ─────────────────────────────────────────────
  const handleWordEnter = useCallback((idx: number) => {
    setLensExpanded(true)
    setActiveDisc(idx % disciplines.length)
    stopCycle()
  }, [disciplines.length, stopCycle])

  const handleWordLeave = useCallback(() => {
    setLensExpanded(false)
    startCycle()
  }, [startCycle])

  const handleDiscClick = useCallback((i: number) => {
    setActiveDisc(i)
    stopCycle()
    setTimeout(startCycle, CYCLE_MS)
  }, [startCycle, stopCycle])

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────

  return (
    <>
      <style jsx global>{`
        .maky-hero         { cursor: none; }
        .maky-hero *       { cursor: none !important; }
        .hw-line           { overflow: hidden; line-height: 0.86; display: block; }
        .hw-wij, .hw-maken, .hw-merken,
        .hw-zicht, .hw-baar, .hw-period { display: block; will-change: transform; }
        #hw-lensimg        { transition: opacity 0.35s ease, transform 0.7s ease; will-change: transform, opacity; }
        @keyframes hw-sd   { 0% { top: -100%; } 55% { top: 0%; } 100% { top: 100%; } }
        .hw-merken:hover   { -webkit-text-stroke: 1.5px #f7f704 !important; transition: -webkit-text-stroke 0.15s ease !important; }
        .hw-baar:hover     { -webkit-text-stroke: 1.5px rgba(247,247,4,0.65) !important; }
      `}</style>

      <section
        ref={heroRef}
        className="maky-hero relative h-screen overflow-hidden bg-[#080808] text-white"
      >
        {/* CURSOR DOT */}
        <div
          ref={cursorRef}
          className="pointer-events-none fixed z-[999] h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f7f704]"
          style={{ mixBlendMode: "difference" }}
        />

        {/* CURSOR RING */}
        <div
          ref={cursorRingRef}
          className="pointer-events-none fixed z-[998] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,border-color] duration-300"
          style={{
            width:       lensExpanded ? "58px"                 : "34px",
            height:      lensExpanded ? "58px"                 : "34px",
            borderColor: lensExpanded ? "rgba(247,247,4,0.85)" : "rgba(247,247,4,0.35)",
          }}
        />

        {/* NOISE */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[3] opacity-[0.042]"
          style={{
            mixBlendMode: "overlay",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />

        {/* LENS */}
        <div
          ref={lensRef}
          className="hw-lens pointer-events-none absolute z-[2] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full"
          style={{
            top: "50%", left: "50%",
            width:  lensExpanded ? "580px" : "460px",
            height: lensExpanded ? "580px" : "460px",
            transition: "width 0.85s cubic-bezier(0.34,1.2,0.64,1), height 0.85s cubic-bezier(0.34,1.2,0.64,1)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={lensImgRef}
            id="hw-lensimg"
            src={getImageUrl(0)}
            alt={disciplines[0]?.label ?? ""}
            className="absolute inset-[-15%] h-[130%] w-[130%] object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 z-[1]"
            style={{ background: "radial-gradient(circle at center, transparent 28%, rgba(8,8,8,0.75) 100%)" }}
          />
        </div>

        {/* TOP BAR */}
        <header className="hw-topbar absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-12 pt-8">
          <div className="flex items-center gap-3">
            <div className="h-px w-5 bg-[#f7f704]" aria-hidden />
            <span className="text-[9px] uppercase tracking-[0.32em] text-white/30" style={{ fontFamily: FONT }}>
              MAKY — Visual Signing
            </span>
          </div>
          <Link href="/contact" className="flex items-center gap-2 transition-colors duration-300 hover:text-white">
            <span className="relative flex h-[5px] w-[5px] flex-shrink-0" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f7f704] opacity-60" />
              <span className="relative inline-flex h-[5px] w-[5px] rounded-full bg-[#f7f704]" />
            </span>
            <span className="text-[9px] uppercase tracking-[0.28em] text-white/30 transition-colors duration-300 hover:text-white" style={{ fontFamily: FONT }}>
              Project starten
            </span>
          </Link>
        </header>

        {/* TYPOGRAPHY */}
        <div className="hw-content absolute inset-0 z-10 flex items-center px-12">
          <div className="w-full select-none">

            <div className="hw-line mb-1">
              <span className="hw-wij text-[clamp(13px,1.6vw,20px)] font-light uppercase tracking-[0.44em] text-white/28" style={{ fontFamily: FONT }}>
                WIJ
              </span>
            </div>

            <div className="hw-line">
              <span
                className="hw-maken text-[clamp(68px,12.5vw,152px)] font-bold leading-none tracking-[-0.055em] text-white transition-colors duration-150 hover:text-[#f7f704]"
                style={{ fontFamily: FONT }}
                onMouseEnter={() => handleWordEnter(0)}
                onMouseLeave={handleWordLeave}
              >
                MAKEN
              </span>
            </div>

            <div className="hw-line flex justify-end">
              <span
                className="hw-merken text-[clamp(68px,12.5vw,152px)] font-bold leading-none tracking-[-0.055em]"
                style={{ fontFamily: FONT, WebkitTextStroke: "1.5px rgba(255,255,255,0.2)", color: "transparent" }}
                onMouseEnter={() => handleWordEnter(1)}
                onMouseLeave={handleWordLeave}
              >
                MERKEN
              </span>
            </div>

            <div className="hw-line flex items-end">
              <span
                className="hw-zicht text-[clamp(68px,12.5vw,152px)] font-bold leading-none tracking-[-0.055em] text-white transition-colors duration-150 hover:text-[#f7f704]"
                style={{ fontFamily: FONT }}
                onMouseEnter={() => handleWordEnter(2)}
                onMouseLeave={handleWordLeave}
              >
                ZICHT
              </span>
              <span
                className="hw-baar text-[clamp(68px,12.5vw,152px)] font-bold leading-none tracking-[-0.055em]"
                style={{ fontFamily: FONT, WebkitTextStroke: "1.5px #f7f704", color: "transparent" }}
                onMouseEnter={() => handleWordEnter(3)}
                onMouseLeave={handleWordLeave}
              >
                BAAR
              </span>
              <span
                className="hw-period text-[clamp(68px,12.5vw,152px)] font-bold leading-none tracking-[-0.055em] text-[#f7f704]"
                style={{ fontFamily: FONT, alignSelf: "flex-end", marginBottom: "0.03em" }}
              >
                .
              </span>
            </div>

          </div>
        </div>

        {/* DISCIPLINE LIST */}
        <nav
          className="hw-discvert absolute right-12 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-[18px] lg:flex"
          aria-label="Disciplines"
        >
          {disciplines.map((d, i) => (
            <button
              key={d.label}
              onClick={() => handleDiscClick(i)}
              aria-pressed={activeDisc === i}
              className={`flex items-center gap-3 text-left transition-all duration-500 ${
                activeDisc === i ? "opacity-100" : "opacity-20 hover:opacity-45"
              }`}
            >
              <span
                className="w-4 text-[9px] font-semibold tabular-nums transition-colors duration-300"
                style={{ fontFamily: FONT, color: activeDisc === i ? "#f7f704" : "rgba(255,255,255,0.3)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div
                className="h-px bg-[#f7f704] transition-[width,opacity] duration-500"
                style={{ width: activeDisc === i ? "16px" : "0px", opacity: activeDisc === i ? 1 : 0 }}
              />
              <span
                className="text-[9px] uppercase tracking-[0.26em] transition-colors duration-300"
                style={{ fontFamily: FONT, color: activeDisc === i ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.22)" }}
              >
                {d.label}
              </span>
            </button>
          ))}
        </nav>

        {/* BOTTOM META */}
        <footer className="hw-meta absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between px-12 pb-9">
          <div className="flex flex-col gap-[6px]">
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/18" style={{ fontFamily: FONT }}>
              Premium Visual Signing
            </span>
            <p className="text-[13px] font-light italic leading-relaxed text-white/35" style={{ fontFamily: FONT }}>
              Van ontwerp en engineering<br />tot productie en montage.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3" aria-hidden>
            <div className="relative h-11 w-px overflow-hidden bg-white/[0.09]">
              <div className="absolute left-0 right-0 h-full bg-[#f7f704]" style={{ animation: "hw-sd 2.4s ease-in-out infinite" }} />
            </div>
            <span className="text-[8px] uppercase tracking-[0.32em] text-white/18" style={{ fontFamily: FONT }}>Scroll</span>
          </div>

          <div className="flex items-end gap-6">
            <div className="text-right">
              <div className="text-[24px] font-semibold leading-none tracking-[-0.05em] text-white" style={{ fontFamily: FONT }}>
                <Counter target={stats?.projects ?? 120} suffix="+" />
              </div>
              <div className="mt-1.5 text-[8px] uppercase tracking-[0.24em] text-white/20" style={{ fontFamily: FONT }}>Projecten</div>
            </div>
            <div className="mb-1 h-5 w-px bg-white/[0.07]" aria-hidden />
            <div className="text-right">
              <div className="text-[24px] font-semibold leading-none tracking-[-0.05em] text-white" style={{ fontFamily: FONT }}>
                <Counter target={stats?.years ?? 12} />
              </div>
              <div className="mt-1.5 text-[8px] uppercase tracking-[0.24em] text-white/20" style={{ fontFamily: FONT }}>Jaar</div>
            </div>
          </div>
        </footer>

      </section>
    </>
  )
}