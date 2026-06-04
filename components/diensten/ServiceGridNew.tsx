"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "@phosphor-icons/react"

gsap.registerPlugin(ScrollTrigger)

const FONT = "var(--font-sans)"

type Category = {
  _id?: string
  title: string
  tagline?: string | null
  shortDescription?: string | null
  description?: string | null
  slug?: {
    current: string
  }
  image?: {
    asset?: {
      url?: string
    }
    alt?: string
  }
  homepageImage?: {
    asset?: {
      url?: string
    }
    alt?: string
  }
  color?: string | null
}

type ServicesGridNewProps = {
  categories: Category[]
}


export default function ServicesGridNew({ categories }: ServicesGridNewProps) {
  
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── HEADING CHARS ────────────────────────────────────────
      gsap.to(".ss-w1, .ss-w2, .ss-w3", {
        y: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.1,
      })

      gsap.fromTo(".ss-meta",
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", delay: 0.2 }
      )

      // ── ROWS ─────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".ss-row").forEach((row) => {
        const imgWrap = row.querySelector(".ss-img-wrap") as HTMLElement
        const img     = row.querySelector(".ss-img") as HTMLElement
        const ghost   = row.querySelector(".ss-ghost") as HTMLElement
        const border  = row.querySelector(".ss-border") as HTMLElement

        // Initial states
        gsap.set(imgWrap, { clipPath: "inset(0 100% 0 0)" })
        gsap.set(img,     { scale: 1.1 })

        // Border reveal on scroll
        if (border) {
          gsap.fromTo(border,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 1.2,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          )
        }

        // Ghost number scrub
        if (ghost) {
          gsap.set(ghost, { opacity: 1 })
          gsap.fromTo(ghost,
            { y: 40 },
            {
              y: -40,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: 2,
              },
            }
          )
        }

        // HOVER IN
        row.addEventListener("mouseenter", () => {
          gsap.to(imgWrap, { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "expo.inOut" })
          gsap.to(img,     { scale: 1, duration: 1.4, ease: "power3.out" })
          gsap.to(row.querySelector(".ss-title"), {
            x: 16, duration: 0.5, ease: "power3.out",
          })
          gsap.to(row.querySelector(".ss-arrow"), {
            opacity: 1, x: 0, duration: 0.4, ease: "power3.out",
          })
        })

        // HOVER OUT
        row.addEventListener("mouseleave", () => {
          gsap.to(imgWrap, { clipPath: "inset(0 100% 0 0)", duration: 0.6, ease: "expo.inOut" })
          gsap.to(img,     { scale: 1.1, duration: 0.6, ease: "power3.in" })
          gsap.to(row.querySelector(".ss-title"), {
            x: 0, duration: 0.4, ease: "power3.out",
          })
          gsap.to(row.querySelector(".ss-arrow"), {
            opacity: 0, x: -8, duration: 0.3, ease: "power3.in",
          })
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

const services = categories.map((category, index) => ({
  id: String(index + 1).padStart(2, "0"),
  title: category.title,
  sub: category.tagline ?? category.shortDescription ?? "",
  href: `/diensten/${category.slug?.current}`,
  image:
    category.homepageImage?.asset?.url ??
    category.image?.asset?.url ??
    "",
  color: category.color ?? "#f7f704",
}))

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#080808] text-white"
    >
      {/* Noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.032]"
        style={{
          mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">

        {/* ── HEADING ── */}
        <div className="pt-32 pb-20 lg:pt-44 lg:pb-24">

          <div className="ss-meta mb-8 flex items-center gap-4 opacity-0">
            <div className="h-px w-5 bg-[#f7f704]" aria-hidden />
            <p
              className="text-[10px] uppercase tracking-[0.28em] text-white/30"
              style={{ fontFamily: FONT }}
            >
              Onze disciplines
            </p>
          </div>

          {/* Hero-taal */}
          <h1
            className="text-[clamp(56px,10vw,148px)] font-bold leading-[0.86] tracking-[-0.07em]"
            style={{ fontFamily: FONT }}
          >
            {/* Signing — solid */}
            <div style={{ overflow: "hidden", display: "block" }}>
              <span
                className="ss-w1 block"
                style={{ transform: "translateY(108%)", fontFamily: FONT }}
              >
                Signing
              </span>
            </div>
            {/* die richting — outline */}
            <div style={{ overflow: "hidden", display: "block" }}>
              <span
                className="ss-w2 block"
                style={{
                  transform: "translateY(108%)",
                  fontFamily: FONT,
                  WebkitTextStroke: "1.5px rgba(255,255,255,0.18)",
                  color: "transparent",
                }}
              >
                die richting
              </span>
            </div>
            {/* geeft. — solid + gele punt */}
            <div style={{ overflow: "hidden", display: "block" }}>
              <span
                className="ss-w3 block text-white"
                style={{ transform: "translateY(108%)", fontFamily: FONT }}
              >
                geeft<span style={{ color: "#f7f704" }}>.</span>
              </span>
            </div>
          </h1>
        </div>

        {/* ── SERVICE ROWS ── */}
        <div>
          {services.map((service, i) => (
            <Link
              key={service.id}
              href={service.href}
              className="ss-row group relative block overflow-hidden"
            >
              {/* Fullscreen image — revealed on hover */}
              <div
                className="ss-img-wrap pointer-events-none absolute inset-0 z-[1]"
                style={{ clipPath: "inset(0 100% 0 0)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="ss-img absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/55" />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, transparent 60%)",
                  }}
                />
              </div>

              {/* Border top */}
              <div
                className="ss-border absolute left-0 right-0 top-0 h-px origin-left bg-white/[0.07]"
              />

              {/* Ghost number */}
              <div
                aria-hidden
                className="ss-ghost pointer-events-none absolute right-0 top-0 select-none leading-none tracking-[-0.07em]"
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(80px,12vw,180px)",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.04)",
                  lineHeight: 1,
                  zIndex: 0,
                }}
              >
                {service.id}
              </div>

              {/* Row content */}
              <div className="relative z-[2] flex items-center justify-between py-8 lg:py-10">

                {/* Left */}
                <div className="flex items-center gap-6 lg:gap-10">
                  <span
                    className="w-8 text-[10px] tabular-nums tracking-[0.2em] text-white/25 transition-colors duration-300 group-hover:text-[#f7f704]"
                    style={{ fontFamily: FONT }}
                  >
                    {service.id}
                  </span>

                  <div>
                    <h2
                      className="ss-title text-[clamp(28px,4.5vw,64px)] font-bold leading-none tracking-[-0.055em] text-white"
                      style={{ fontFamily: FONT }}
                    >
                      {service.title}
                    </h2>
                    <p
                      className="mt-1.5 text-[11px] uppercase tracking-[0.2em] text-white/28 transition-colors duration-300 group-hover:text-white/50"
                      style={{ fontFamily: FONT }}
                    >
                      {service.sub}
                    </p>
                  </div>
                </div>

                {/* Arrow — slides in on hover */}
                <div
                  className="ss-arrow flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f704] text-black opacity-0"
                  style={{ transform: "translateX(-8px)" }}
                >
                  <ArrowUpRight size={16} weight="bold" />
                </div>

              </div>

              {/* Border bottom on last item */}
              {i === services.length - 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.07]" />
              )}
            </Link>
          ))}
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="py-32 lg:py-44">
          <div className="flex flex-col items-start justify-between gap-10 border-t border-white/[0.06] pt-16 lg:flex-row lg:items-end">

            <div>
              <p
                className="mb-4 text-[10px] uppercase tracking-[0.28em] text-white/28"
                style={{ fontFamily: FONT }}
              >
                Klaar om te starten
              </p>
              <h2
                className="text-[clamp(32px,5vw,72px)] font-bold leading-[0.88] tracking-[-0.06em] text-white"
                style={{ fontFamily: FONT }}
              >
                Van visie naar
                <br />
                <span
                  style={{
                    WebkitTextStroke: "1.5px rgba(255,255,255,0.18)",
                    color: "transparent",
                    fontFamily: FONT,
                  }}
                >
                  zichtbaarheid
                </span>
                <span style={{ color: "#f7f704" }}>.</span>
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[#f7f704] px-8 py-[14px] text-[11px] font-bold tracking-[0.04em] text-black transition-all duration-300 hover:scale-[1.03] hover:bg-white"
                style={{ fontFamily: FONT }}
              >
                Project bespreken
                <ArrowUpRight
                  size={16}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <p
                className="text-[9px] uppercase tracking-[0.22em] text-white/22"
                style={{ fontFamily: FONT }}
              >
                Reactie binnen 1 werkdag
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}