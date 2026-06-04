"use client"

import Link from "next/link"
import { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { urlFor } from "@/sanity/lib/image"
import type { HomepageHero } from "@/types/homepage.type"

gsap.registerPlugin(ScrollTrigger)

const FONT     = "var(--font-sans)"
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

interface HomeHeroProps {
  data: HomepageHero
}

export default function HomeHero({ data }: HomeHeroProps) {
  const { disciplines, stats } = data

  const heroRef        = useRef<HTMLElement>(null)
  const cursorRef      = useRef<HTMLDivElement>(null)
  const cursorRingRef  = useRef<HTMLDivElement>(null)
  const lensImgRef     = useRef<HTMLImageElement>(null)
  const fullscreenRef  = useRef<HTMLDivElement>(null)

  const [activeDisc, setActiveDisc]       = useState(0)
  const [lensExpanded, setLensExpanded]   = useState(false)
  const [fullscreen, setFullscreen]       = useState(false)

  const mouse           = useRef({ x: 0, y: 0 })
  const clickPos        = useRef({ x: 0, y: 0 })
  const ringPos         = useRef({ x: 0, y: 0 })
  const lensPos         = useRef({ x: 0, y: 0 })
  const rafRef          = useRef<number>(0)
  const timerRef        = useRef<ReturnType<typeof setInterval> | null>(null)
  const lensExpandedRef = useRef(false)
  const fullscreenRef2  = useRef(false)

  // ── IMAGE URL ──────────────────────────────────────────────
  const getImageUrl = useCallback((idx: number) => {
    const disc = disciplines[idx]
    if (!disc?.image?.asset?._ref) return null
    try {
      return urlFor(disc.image).width(1920).quality(90).auto("format").url()
    } catch { return null }
  }, [disciplines])

  // ── CYCLE ──────────────────────────────────────────────────
  const startCycle = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(
      () => setActiveDisc((p) => (p + 1) % disciplines.length),
      CYCLE_MS
    )
  }, [disciplines.length])

  const stopCycle = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }, [])

  // ── FULLSCREEN OPEN ────────────────────────────────────────
  const openFullscreen = useCallback(() => {
    if (fullscreenRef2.current) return
    fullscreenRef2.current = true
    setFullscreen(true)
    stopCycle()

    const el = fullscreenRef.current
    if (!el) return

    // Animeer vanuit klikpositie naar fullscreen
    gsap.fromTo(el,
      { clipPath: `circle(0px at ${clickPos.current.x}px ${clickPos.current.y}px)`, opacity: 1 },
      {
        clipPath: `circle(200% at ${clickPos.current.x}px ${clickPos.current.y}px)`,
        duration: 0.9,
        ease: "expo.inOut",
      }
    )
  }, [stopCycle])

  // ── FULLSCREEN CLOSE ───────────────────────────────────────
  const closeFullscreen = useCallback(() => {
    const el = fullscreenRef.current
    if (!el) return

    gsap.to(el, {
      clipPath: `circle(0px at ${clickPos.current.x}px ${clickPos.current.y}px)`,
      duration: 0.7,
      ease: "expo.inOut",
      onComplete: () => {
        fullscreenRef2.current = false
        setFullscreen(false)
        startCycle()
      },
    })
  }, [startCycle])

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

      if (lensImgRef.current && !fullscreenRef2.current) {
        const r = lensExpandedRef.current ? 220 : 170
        const mask = `radial-gradient(circle ${r}px at ${lensPos.current.x}px ${lensPos.current.y}px, black 55%, transparent 100%)`
        lensImgRef.current.style.webkitMaskImage = mask
        lensImgRef.current.style.maskImage = mask
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

  // ── ESCAPE KEY ─────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && fullscreenRef2.current) closeFullscreen()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [closeFullscreen])

  // ── GSAP INTRO ─────────────────────────────────────────────
  useEffect(() => {
    gsap.set([".hw-wij",".hw-maken",".hw-merken",".hw-zicht",".hw-baar",".hw-period"], { y: "108%" })
    gsap.set([".hw-topbar",".hw-discvert",".hw-meta"], { opacity: 0 })

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
  useEffect(() => { startCycle(); return stopCycle }, [startCycle, stopCycle])

  // ── SWAP IMAGE ─────────────────────────────────────────────
  useEffect(() => {
    const img = lensImgRef.current
    if (!img) return
    const url = getImageUrl(activeDisc)
    if (!url) return
    img.style.opacity = "0"
    const t = setTimeout(() => { img.src = url; img.style.opacity = "1" }, 220)
    return () => clearTimeout(t)
  }, [activeDisc, getImageUrl])

  // ── WORD HOVER ─────────────────────────────────────────────
  const handleWordEnter = useCallback((idx: number) => {
    lensExpandedRef.current = true
    setLensExpanded(true)
    setActiveDisc(idx % disciplines.length)
    stopCycle()
  }, [disciplines.length, stopCycle])

  const handleWordLeave = useCallback(() => {
    lensExpandedRef.current = false
    setLensExpanded(false)
    startCycle()
  }, [startCycle])

  const handleDiscClick = useCallback((i: number) => {
    setActiveDisc(i)
    stopCycle()
    setTimeout(startCycle, CYCLE_MS)
  }, [startCycle, stopCycle])

  // ── LENS CLICK ─────────────────────────────────────────────
  const handleLensClick = useCallback(() => {
    clickPos.current = { x: lensPos.current.x, y: lensPos.current.y }
    openFullscreen()
  }, [openFullscreen])

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────

  return (
    <>
      <style jsx global>{`
        .maky-hero { cursor: none; }
        .hw-line         { overflow: hidden; line-height: 0.86; display: block; }
        .hw-wij, .hw-maken, .hw-merken,
        .hw-zicht, .hw-baar, .hw-period { display: block; will-change: transform; }
        #hw-lensimg      { transition: opacity 0.35s ease; will-change: transform, opacity; }
        @keyframes hw-sd { 0% { top: -100%; } 55% { top: 0%; } 100% { top: 100%; } }
        .hw-merken:hover { -webkit-text-stroke: 1.5px #f7f704 !important; }
        .hw-baar:hover   { -webkit-text-stroke: 1.5px rgba(247,247,4,0.65) !important; }
        .hw-close:hover  { background: rgba(255,255,255,0.15) !important; }
      `}</style>

      <section
        ref={heroRef}
        className="maky-hero relative h-screen overflow-hidden bg-[#080808] text-white"
        onClick={(e) => {
          if (!fullscreenRef2.current) {
            clickPos.current = { x: e.clientX, y: e.clientY }
            openFullscreen()
          }
        }}
      >

        {/* CURSOR DOT — alleen op non-touch */}
        <div
          ref={cursorRef}
          className="pointer-events-none fixed z-[999] h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f7f704] hidden [@media(hover:hover)_and_(pointer:fine)]:block"
          style={{ mixBlendMode: "difference" }}
        />

        {/* CURSOR RING — alleen op non-touch */}
        <div
          ref={cursorRingRef}
          className="pointer-events-none fixed z-[998] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,border-color] duration-300 hidden [@media(hover:hover)_and_(pointer:fine)]:block"
          style={{
            width:       lensExpanded ? "58px" : "34px",
            height:      lensExpanded ? "58px" : "34px",
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

        {/* LENS IMAGE — volgt muis via mask-image (beter dan clip-path voor GPU) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={lensImgRef}
          id="hw-lensimg"
          src={getImageUrl(0) ?? undefined}
          alt={disciplines[0]?.label ?? "MAKY Signing"}
          className="absolute inset-0 z-[2] h-full w-full object-cover"
          style={{
            WebkitMaskImage: "radial-gradient(circle 0px at 50% 50%, black 60%, transparent 100%)",
            maskImage: "radial-gradient(circle 0px at 50% 50%, black 60%, transparent 100%)",
            transition: "opacity 0.35s ease",
          }}
        />

        {/* FULLSCREEN OVERLAY — clip-path reveal on click */}
        <div
          ref={fullscreenRef}
          className="absolute inset-0 z-[50]"
          style={{ clipPath: "circle(0px at 50% 50%)", pointerEvents: fullscreen ? "auto" : "none" }}
        >
          {/* Fullscreen image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getImageUrl(activeDisc) ?? undefined}
            alt={disciplines[activeDisc]?.label ?? ""}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Discipline label */}
          <div className="absolute bottom-12 left-12 z-10">
            <p
              className="text-[10px] uppercase tracking-[0.28em] text-white/50"
              style={{ fontFamily: FONT }}
            >
              {String(activeDisc + 1).padStart(2, "0")} / {disciplines[activeDisc]?.label}
            </p>
            {disciplines[activeDisc]?.sub && (
              <p
                className="mt-1 text-[13px] font-light italic text-white/70"
                style={{ fontFamily: FONT }}
              >
                {disciplines[activeDisc].sub}
              </p>
            )}
          </div>

          {/* Close button */}
          <button
            className="hw-close absolute right-8 top-8 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-all duration-200"
            style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", cursor: "none" }}
            onClick={closeFullscreen}
            aria-label="Sluiten"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* ESC hint */}
          <p
            className="absolute bottom-12 right-12 text-[9px] uppercase tracking-[0.22em] text-white/25"
            style={{ fontFamily: FONT }}
          >
            ESC om te sluiten
          </p>
        </div>

        {/* TOP BAR */}
        <header className="hw-topbar absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-12 pt-8">
          <div className="flex items-center gap-3">
            <div className="h-px w-5 bg-[#f7f704]" aria-hidden />
            <span className="text-[9px] uppercase tracking-[0.32em] text-white/30" style={{ fontFamily: FONT }}>
              MAKY — Visual Signing
            </span>
          </div>
          <Link href="/contact" className="flex items-center gap-2">
            <span className="relative flex h-[5px] w-[5px] flex-shrink-0" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f7f704] opacity-60" />
              <span className="relative inline-flex h-[5px] w-[5px] rounded-full bg-[#f7f704]" />
            </span>
            <span className="text-[9px] uppercase tracking-[0.28em] text-white/30 transition-colors hover:text-white" style={{ fontFamily: FONT }}>
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
              >MAKEN</span>
            </div>

            <div className="hw-line flex justify-end">
              <span
                className="hw-merken text-[clamp(68px,12.5vw,152px)] font-bold leading-none tracking-[-0.055em]"
                style={{ fontFamily: FONT, WebkitTextStroke: "1.5px rgba(255,255,255,0.2)", color: "transparent" }}
                onMouseEnter={() => handleWordEnter(1)}
                onMouseLeave={handleWordLeave}
              >MERKEN</span>
            </div>

            <div className="hw-line flex items-end">
              <span
                className="hw-zicht text-[clamp(68px,12.5vw,152px)] font-bold leading-none tracking-[-0.055em] text-white transition-colors duration-150 hover:text-[#f7f704]"
                style={{ fontFamily: FONT }}
                onMouseEnter={() => handleWordEnter(2)}
                onMouseLeave={handleWordLeave}
              >ZICHT</span>
              <span
                className="hw-baar text-[clamp(68px,12.5vw,152px)] font-bold leading-none tracking-[-0.055em]"
                style={{ fontFamily: FONT, WebkitTextStroke: "1.5px #f7f704", color: "transparent" }}
                onMouseEnter={() => handleWordEnter(3)}
                onMouseLeave={handleWordLeave}
              >BAAR</span>
              <span
                className="hw-period text-[clamp(68px,12.5vw,152px)] font-bold leading-none tracking-[-0.055em] text-[#f7f704]"
                style={{ fontFamily: FONT, alignSelf: "flex-end", marginBottom: "0.03em" }}
              >.</span>
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
              <div className="flex flex-col gap-0.5">
                <span
                  className="text-[9px] uppercase tracking-[0.26em] transition-colors duration-300"
                  style={{ fontFamily: FONT, color: activeDisc === i ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.22)" }}
                >
                  {d.label}
                </span>
                {d.sub && activeDisc === i && (
                  <span className="text-[8px] tracking-[0.12em]" style={{ fontFamily: FONT, color: "rgba(255,255,255,0.3)" }}>
                    {d.sub}
                  </span>
                )}
              </div>
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