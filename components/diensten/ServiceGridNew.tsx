"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
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
  slug?: { current: string }
  color?: string | null
  homepageImage?: { asset?: { url?: string } }
  image?: { asset?: { url?: string } }
}

type ServicesProps = {
  categories: Category[]
}

export default function ServicesAtmosphere({ categories }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const services = categories.map((category, index) => ({
    id: String(index + 1).padStart(2, "0"),
    title: category.title,
    sub: category.tagline ?? category.shortDescription ?? "",
    href: `/diensten/${category.slug?.current}`,
    color: category.color ?? "#f7f704",
    image: category.homepageImage?.asset?.url ?? category.image?.asset?.url ?? "",
  }))

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
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

      // Row animations
      gsap.utils.toArray<HTMLElement>(".ss-row").forEach((row) => {
        const ghost = row.querySelector(".ss-ghost") as HTMLElement
        const border = row.querySelector(".ss-border") as HTMLElement

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

        if (ghost) {
          gsap.fromTo(ghost,
            { y: 40 },
            {
              y: -40,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Background image transition with slow zoom
  useEffect(() => {
    if (!bgRef.current) return

    if (activeIndex !== null && services[activeIndex]?.image) {
      const bgElement = bgRef.current
      const imgElement = bgElement.querySelector(".ss-bg-img") as HTMLElement

      gsap.to(bgElement, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
      })

      if (imgElement) {
        gsap.fromTo(imgElement,
          { scale: 1 },
          { scale: 1.08, duration: 12, ease: "none", repeat: -1, yoyo: true }
        )
      }
    } else {
      const bgElement = bgRef.current
      const imgElement = bgElement.querySelector(".ss-bg-img") as HTMLElement

      gsap.to(bgElement, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      })

      if (imgElement) {
        gsap.killTweensOf(imgElement)
        gsap.set(imgElement, { scale: 1 })
      }
    }
  }, [activeIndex, services])

  const currentBgImage = activeIndex !== null ? services[activeIndex]?.image : null

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#080808] text-white overflow-hidden">
      {/* ATMOSFERISCHE ACHTERGROND */}
      <div
        ref={bgRef}
        className="pointer-events-none fixed inset-0 z-0 opacity-0"
        style={{ willChange: "opacity" }}
      >
        {currentBgImage && (
          <>
            <img
              src={currentBgImage}
              alt=""
              className="ss-bg-img absolute inset-0 h-full w-full object-cover"
              style={{ willChange: "transform" }}
            />
            {/* Donkere overlay — zorgt dat tekst leesbaar blijft */}
            <div className="absolute inset-0 bg-black/70" />
            {/* Subtiele blur */}
            <div className="absolute inset-0 backdrop-blur-[1px]" />
          </>
        )}
        {/* Noise texture */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* HEADING */}
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

          <h1
            className="text-[clamp(56px,10vw,148px)] font-bold leading-[0.86] tracking-[-0.07em]"
            style={{ fontFamily: FONT }}
          >
            <div style={{ overflow: "hidden", display: "block" }}>
              <span className="ss-w1 block" style={{ transform: "translateY(108%)" }}>
                Signing
              </span>
            </div>
            <div style={{ overflow: "hidden", display: "block" }}>
              <span
                className="ss-w2 block"
                style={{
                  transform: "translateY(108%)",
                  WebkitTextStroke: "1.5px rgba(255,255,255,0.18)",
                  color: "transparent",
                }}
              >
                die richting
              </span>
            </div>
            <div style={{ overflow: "hidden", display: "block" }}>
              <span className="ss-w3 block" style={{ transform: "translateY(108%)" }}>
                geeft<span style={{ color: "#f7f704" }}>.</span>
              </span>
            </div>
          </h1>
        </div>

        {/* SERVICE ROWS — titels beginnen WIT, worden GEEL bij hover */}
        <div>
          {services.map((service, idx) => (
            <Link
              key={service.id}
              href={service.href}
              className={`ss-row group relative block overflow-hidden`}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Border top */}
              <div className="ss-border absolute left-0 right-0 top-0 h-px origin-left bg-white/[0.06]" />

              {/* Ghost number */}
              <div
                aria-hidden
                className="ss-ghost pointer-events-none absolute right-0 top-0 select-none leading-none tracking-[-0.07em] transition-all duration-700 group-hover:-translate-y-4"
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(80px,12vw,180px)",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.03)",
                  lineHeight: 1,
                  zIndex: 0,
                }}
              >
                {service.id}
              </div>

              {/* Content */}
              <div className="relative z-[2] flex items-center justify-between py-10 lg:py-12">
                <div className="flex items-center gap-6 lg:gap-10">
                  {/* Nummer — wordt geel bij hover */}
                  <span
                    className="w-8 text-[10px] tabular-nums tracking-[0.2em] text-white/40 transition-all duration-500 group-hover:text-[#f7f704]"
                    style={{ fontFamily: FONT }}
                  >
                    {service.id}
                  </span>

                  <div>
                    {/* Titel — BEGINT WIT (geen outline) → wordt GEEL bij hover */}
                    <h2
                      className="text-[clamp(32px,5vw,72px)] font-bold leading-none tracking-[-0.055em] text-white transition-all duration-500 group-hover:text-[#f7f704]"
                      style={{ fontFamily: FONT }}
                    >
                      {service.title}
                    </h2>
                    {/* Subtitel — blijft leesbaar, wordt iets helderder bij hover */}
                    <p
                      className="mt-2 text-[12px] uppercase tracking-[0.2em] text-white/35 transition-all duration-500 group-hover:text-white/60"
                      style={{ fontFamily: FONT }}
                    >
                      {service.sub}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f704] text-black opacity-0 transition-all duration-500 group-hover:opacity-100"
                  style={{ transform: "translateX(-8px)" }}
                >
                  <ArrowUpRight size={16} weight="bold" />
                </div>
              </div>

              {/* Bottom border */}
              {idx === services.length - 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />
              )}
            </Link>
          ))}
        </div>

        {/* CTA */}
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