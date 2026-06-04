"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

const disciplines = [
  {
    id: "gevelreclame",
    num: "01",
    label: "Gevelreclame",
    image: "/assets/images/hero/hero-gevelreclame.webp",
  },
  {
    id: "interieur",
    num: "02",
    label: "Interieur",
    image: "/assets/images/hero/hero-interieur.webp",
  },
  {
    id: "wayfinding",
    num: "03",
    label: "Wayfinding",
    image: "/assets/images/hero/hero-wayfinding.webp",
  },
  {
    id: "voertuigen",
    num: "04",
    label: "Voertuigen",
    image: "/assets/images/hero/hero-voertuigen.webp",
  },
  {
    id: "events",
    num: "05",
    label: "Events",
    image: "/assets/images/hero/hero-events.webp",
  },
]

// ─────────────────────────────────────────────────────────────
// COUNTER SUB-COMPONENT
// ─────────────────────────────────────────────────────────────

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let start: number | null = null
    const dur = 1800

    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / dur, 1)
      el.textContent = Math.round(p * target) + suffix
      if (p < 1) requestAnimationFrame(step)
    }

    const delay = setTimeout(() => requestAnimationFrame(step), 1600)
    return () => clearTimeout(delay)
  }, [target, suffix])

  return <span ref={ref}>0</span>
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function HomeHero() {
  const heroRef       = useRef<HTMLElement>(null)
  const cursorRef     = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const lensRef       = useRef<HTMLDivElement>(null)
  const lensImgRef    = useRef<HTMLImageElement>(null)

  const [activeDisc, setActiveDisc]     = useState(0)
  const [lensExpanded, setLensExpanded] = useState(false)

  const mouse   = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const lensPos = useRef({ x: 0, y: 0 })
  const rafRef  = useRef<number>(0)
  const discTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // ── CURSOR + LENS FOLLOW ──────────────────────────────────────
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

      // subtle parallax inside the lens image
      if (lensImgRef.current) {
        const dx = (e.clientX / window.innerWidth  - 0.5) * 28
        const dy = (e.clientY / window.innerHeight - 0.5) * 28
        lensImgRef.current.style.transform = `translate(${dx}px,${dy}px) scale(1.18)`
      }
    }

    const animate = () => {
      // ring — medium lag
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.13
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.13
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = `${ringPos.current.x}px`
        cursorRingRef.current.style.top  = `${ringPos.current.y}px`
      }

      // lens — heavy lag (the magic)
      lensPos.current.x += (mouse.current.x - lensPos.current.x) * 0.055
      lensPos.current.y += (mouse.current.y - lensPos.current.y) * 0.055
      if (lensRef.current) {
        lensRef.current.style.left = `${lensPos.current.x}px`
        lensRef.current.style.top  = `${lensPos.current.y}px`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", onMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // ── INTRO GSAP ────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

      tl.to(".hw-wij",    { y: 0, duration: 1.0 }, 0.20)
      tl.to(".hw-maken",  { y: 0, duration: 1.1 }, 0.36)
      tl.to(".hw-merken", { y: 0, duration: 1.1 }, 0.52)
      tl.to(".hw-zicht",  { y: 0, duration: 1.1 }, 0.68)
      tl.to(".hw-baar",   { y: 0, duration: 1.1 }, 0.72)
      tl.to(".hw-period", { y: 0, duration: 1.1 }, 0.76)

      tl.fromTo(".hw-topbar",   { opacity: 0 },         { opacity: 1, duration: 0.8 }, 1.0)
      tl.fromTo(".hw-discvert", { opacity: 0 },         { opacity: 1, duration: 0.8 }, 1.1)
      tl.fromTo(".hw-meta",     { opacity: 0, y: 16 },  { opacity: 1, y: 0, duration: 0.8 }, 1.2)
      tl.fromTo(".hw-lens",     { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.4)" }, 1.1)

      // scroll — lens drifts down
      gsap.to(".hw-lens", {
        y: "14%",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      })

      // scroll — content fades
      gsap.to(".hw-content", {
        opacity: 0.08,
        y: "-5%",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "15% top",
          end: "65% top",
          scrub: 1,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // ── DISCIPLINE AUTO-CYCLE ─────────────────────────────────────
  useEffect(() => {
    discTimerRef.current = setInterval(() => {
      setActiveDisc((prev) => (prev + 1) % disciplines.length)
    }, 3400)
    return () => { if (discTimerRef.current) clearInterval(discTimerRef.current) }
  }, [])

  // swap lens image
  useEffect(() => {
    const img = lensImgRef.current
    if (!img) return
    img.style.opacity = "0"
    const t = setTimeout(() => {
      img.src = disciplines[activeDisc].image
      img.style.opacity = "1"
    }, 220)
    return () => clearTimeout(t)
  }, [activeDisc])

  // ── WORD HOVER ────────────────────────────────────────────────
  const handleWordEnter = (idx: number) => {
    setLensExpanded(true)
    setActiveDisc(idx)
    if (discTimerRef.current) clearInterval(discTimerRef.current)
  }

  const handleWordLeave = () => {
    setLensExpanded(false)
    discTimerRef.current = setInterval(() => {
      setActiveDisc((prev) => (prev + 1) % disciplines.length)
    }, 3400)
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────

  return (
    <>
      <style jsx global>{`
        .maky-hero { cursor: none; }
        .maky-hero * { cursor: none !important; }

        /* Words clip + start below */
        .hw-line { overflow: hidden; line-height: 0.86; display: block; }
        .hw-wij, .hw-maken, .hw-merken,
        .hw-zicht, .hw-baar, .hw-period {
          display: block;
          transform: translateY(108%);
          will-change: transform;
        }

        /* Lens image swap */
        #hw-lensimg {
          transition: opacity 0.35s ease, transform 0.7s ease;
        }

        /* Scroll dot animation */
        @keyframes hw-scrolldown {
          0%   { top: -100%; }
          50%  { top: 0%;    }
          100% { top: 100%;  }
        }

        /* Outline word hover */
        .hw-merken:hover {
          -webkit-text-stroke: 1.5px #f7f704 !important;
        }
        .hw-baar:hover {
          -webkit-text-stroke: 1.5px rgba(247,247,4,0.7) !important;
        }
      `}</style>

      <section
        ref={heroRef}
        className="maky-hero relative h-screen overflow-hidden bg-[#080808] text-white"
      >

        {/* ── CURSOR DOT ── */}
        <div
          ref={cursorRef}
          className="pointer-events-none fixed z-[999] h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f7f704]"
          style={{ mixBlendMode: "difference" }}
        />

        {/* ── CURSOR RING ── */}
        <div
          ref={cursorRingRef}
          className="pointer-events-none fixed z-[998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f7f704]/40 transition-[width,height,border-color] duration-300"
          style={{
            width:  lensExpanded ? "56px" : "34px",
            height: lensExpanded ? "56px" : "34px",
            borderColor: lensExpanded ? "rgba(247,247,4,0.8)" : "rgba(247,247,4,0.35)",
          }}
        />

        {/* ── NOISE ── */}
        <div
          className="pointer-events-none absolute inset-0 z-[3] opacity-[0.045]"
          style={{
            mixBlendMode: "overlay",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />

        {/* ── IMAGE LENS ── */}
        <div
          ref={lensRef}
          className="hw-lens pointer-events-none absolute z-[2] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full opacity-0"
          style={{
            top: "50%",
            left: "50%",
            width:  lensExpanded ? "580px" : "460px",
            height: lensExpanded ? "580px" : "460px",
            transition: "width 0.8s cubic-bezier(0.34,1.2,0.64,1), height 0.8s cubic-bezier(0.34,1.2,0.64,1)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={lensImgRef}
            id="hw-lensimg"
            src={disciplines[0].image}
            alt=""
            className="absolute inset-[-15%] h-[130%] w-[130%] object-cover"
          />
          {/* Vignette rim */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background: "radial-gradient(circle at center, transparent 30%, rgba(8,8,8,0.72) 100%)",
            }}
          />
        </div>

        {/* ── TOP BAR ── */}
        <div className="hw-topbar pointer-events-none absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-12 pt-8 opacity-0">
          <div className="flex items-center gap-3">
            <div className="h-px w-5 bg-[#f7f704]" />
            <span
              className="text-[9px] uppercase tracking-[0.32em] text-white/30"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              MAKY — Visual Signing
            </span>
          </div>

          <Link
            href="/contact"
            className="pointer-events-auto flex items-center gap-2 transition-colors duration-300 hover:text-white"
          >
            <span className="relative flex h-[5px] w-[5px] flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f7f704] opacity-60" />
              <span className="relative inline-flex h-[5px] w-[5px] rounded-full bg-[#f7f704]" />
            </span>
            <span
              className="text-[9px] uppercase tracking-[0.28em] text-white/30"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Project starten
            </span>
          </Link>
        </div>

        {/* ── MAIN TYPOGRAPHY ── */}
        <div className="hw-content absolute inset-0 z-10 flex items-center px-12">
          <div className="w-full select-none">

            {/* WIJ — licht, klein, luchtig */}
            <div className="hw-line mb-1">
              <span
                className="hw-wij text-[clamp(13px,1.6vw,20px)] font-light uppercase tracking-[0.42em] text-white/28"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                WIJ
              </span>
            </div>

            {/* MAKEN — massief solid */}
            <div className="hw-line">
              <span
                className="hw-maken text-[clamp(68px,12.5vw,152px)] font-bold leading-none tracking-[-0.055em] text-white transition-colors duration-200 hover:text-[#f7f704]"
                style={{ fontFamily: "var(--font-sans)" }}
                onMouseEnter={() => handleWordEnter(0)}
                onMouseLeave={handleWordLeave}
              >
                MAKEN
              </span>
            </div>

            {/* MERKEN — outline, rechts uitgelijnd */}
            <div className="hw-line flex justify-end">
              <span
                className="hw-merken text-[clamp(68px,12.5vw,152px)] font-bold leading-none tracking-[-0.055em] transition-all duration-200"
                style={{
                  fontFamily: "var(--font-sans)",
                  WebkitTextStroke: "1.5px rgba(255,255,255,0.2)",
                  color: "transparent",
                }}
                onMouseEnter={() => handleWordEnter(1)}
                onMouseLeave={handleWordLeave}
              >
                MERKEN
              </span>
            </div>

            {/* ZICHTBAAR. — ZICHT solid + BAAR gele outline + punt */}
            <div className="hw-line flex items-end">
              <span
                className="hw-zicht text-[clamp(68px,12.5vw,152px)] font-bold leading-none tracking-[-0.055em] text-white transition-colors duration-200 hover:text-[#f7f704]"
                style={{ fontFamily: "var(--font-sans)" }}
                onMouseEnter={() => handleWordEnter(2)}
                onMouseLeave={handleWordLeave}
              >
                ZICHT
              </span>
              <span
                className="hw-baar text-[clamp(68px,12.5vw,152px)] font-bold leading-none tracking-[-0.055em] transition-all duration-200"
                style={{
                  fontFamily: "var(--font-sans)",
                  WebkitTextStroke: "1.5px #f7f704",
                  color: "transparent",
                }}
                onMouseEnter={() => handleWordEnter(3)}
                onMouseLeave={handleWordLeave}
              >
                BAAR
              </span>
              <span
                className="hw-period text-[clamp(68px,12.5vw,152px)] font-bold leading-none tracking-[-0.055em] text-[#f7f704]"
                style={{ fontFamily: "var(--font-sans)", alignSelf: "flex-end", marginBottom: "0.03em" }}
              >
                .
              </span>
            </div>

          </div>
        </div>

        {/* ── DISCIPLINE LIST ── */}
        <div className="hw-discvert absolute right-12 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-[18px] opacity-0 lg:flex">
          {disciplines.map((d, i) => (
            <button
              key={d.id}
              onClick={() => {
                setActiveDisc(i)
                if (discTimerRef.current) clearInterval(discTimerRef.current)
              }}
              className={`group flex items-center gap-3 text-left transition-all duration-500 ${
                activeDisc === i ? "opacity-100" : "opacity-20 hover:opacity-45"
              }`}
            >
              <span
                className="w-4 text-[9px] font-semibold tabular-nums transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: activeDisc === i ? "#f7f704" : "rgba(255,255,255,0.3)",
                }}
              >
                {d.num}
              </span>

              <div
                className="h-px bg-[#f7f704] transition-all duration-500"
                style={{
                  width:   activeDisc === i ? "16px" : "0px",
                  opacity: activeDisc === i ? 1 : 0,
                }}
              />

              <span
                className="text-[9px] uppercase tracking-[0.26em] transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: activeDisc === i ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.22)",
                }}
              >
                {d.label}
              </span>
            </button>
          ))}
        </div>

        {/* ── BOTTOM META ── */}
        <div className="hw-meta absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between px-12 pb-9 opacity-0">

          {/* Tagline */}
          <div className="flex flex-col gap-[6px]">
            <span
              className="text-[9px] uppercase tracking-[0.3em] text-white/18"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Premium Visual Signing
            </span>
            <p
              className="text-[13px] font-light italic leading-relaxed text-white/35"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Van ontwerp en engineering
              <br />
              tot productie en montage.
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative h-11 w-px overflow-hidden bg-white/[0.09]">
              <div
                className="absolute left-0 right-0 h-full bg-[#f7f704]"
                style={{ animation: "hw-scrolldown 2.4s ease-in-out infinite" }}
              />
            </div>
            <span
              className="text-[8px] uppercase tracking-[0.32em] text-white/18"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Scroll
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-end gap-6">
            <div className="text-right">
              <div
                className="text-[24px] font-semibold leading-none tracking-[-0.05em] text-white"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <Counter target={120} suffix="+" />
              </div>
              <div
                className="mt-1.5 text-[8px] uppercase tracking-[0.24em] text-white/20"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Projecten
              </div>
            </div>
            <div className="mb-1 h-5 w-px bg-white/[0.07]" />
            <div className="text-right">
              <div
                className="text-[24px] font-semibold leading-none tracking-[-0.05em] text-white"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <Counter target={12} />
              </div>
              <div
                className="mt-1.5 text-[8px] uppercase tracking-[0.24em] text-white/20"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Jaar
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}