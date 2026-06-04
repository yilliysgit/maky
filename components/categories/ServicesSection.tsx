"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { urlFor } from "@/sanity/lib/image"

gsap.registerPlugin(ScrollTrigger)

const FONT = "var(--font-sans)"

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

interface SanityImage {
  asset: { _ref: string; _type: "reference" }
  alt?: string
  hotspot?: { x: number; y: number; height: number; width: number }
}

interface Category {
  _id: string
  title: string
  tagline?: string
  slug: { current: string }
  homepageImage?: SanityImage | null
}

interface ServicesSectionProps {
  categories: Category[]
}

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

export default function ServicesSection({ categories }: ServicesSectionProps) {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const getImageUrl = (image?: SanityImage | null) => {
    if (!image?.asset?._ref) return null
    return urlFor(image)
      .width(800)
      .height(1000)
      .format("webp")
      .quality(90)
      .fit("crop")
      .url()
  }

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        ".sv-header",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: {
            trigger: ".sv-header",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        ".sv-bignumber",
        { opacity: 0 },
        {
          opacity: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: {
            trigger: ".sv-bignumber",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.utils.toArray<HTMLElement>(".sv-item").forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 55%",
          end: "bottom 45%",
          onEnter:     () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        })
      })

      gsap.fromTo(
        ".sv-progress-line",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1, ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 10%",
            end: "bottom 90%",
            scrub: 1,
          },
        }
      )

      ScrollTrigger.refresh()

    }, sectionRef)

    return () => ctx.revert()
  }, [categories])

  return (
    <section ref={sectionRef} className="relative bg-[#080808] text-white">

      {/* Naadloze overgang */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32"
        style={{ background: "linear-gradient(to bottom, #080808 0%, transparent 100%)" }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Header */}
        <div className="sv-header flex items-end justify-between border-b border-white/[0.06] py-10">
          <div className="flex items-center gap-4">
            <div className="h-px w-5 bg-[#f7f704]" aria-hidden />
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/30" style={{ fontFamily: FONT }}>
              Onze disciplines
            </p>
          </div>
          <Link
            href="/diensten"
            className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/25 transition-colors duration-300 hover:text-white"
            style={{ fontFamily: FONT }}
          >
            Alle diensten
            <span className="text-[#f7f704]/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </Link>
        </div>

        {/* Grid */}
        <div className="relative grid gap-0 lg:grid-cols-12">

          {/* Progress line */}
          <div aria-hidden className="absolute left-0 top-0 hidden h-full w-px lg:block" style={{ background: "rgba(255,255,255,0.04)" }}>
            <div className="sv-progress-line absolute inset-x-0 top-0 h-full bg-[#f7f704]/60" style={{ transformOrigin: "top center" }} />
          </div>

          {/* LEFT — sticky lijst */}
          <div className="lg:col-span-5 lg:pl-8">
            <div className="sticky top-0 flex h-screen flex-col justify-center py-20">

              {/* Ghost number */}
              <div
                aria-hidden
                className="sv-bignumber pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-[200px] font-bold leading-none tracking-[-0.06em] opacity-0"
                style={{ fontFamily: FONT, WebkitTextStroke: "1px rgba(255,255,255,0.04)", color: "transparent" }}
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </div>

              <div className="relative space-y-8">
                {categories.map((cat, index) => (
                  <div
                    key={cat._id}
                    className={`transition-all duration-500 ${activeIndex === index ? "opacity-100" : "opacity-[0.15]"}`}
                  >
                    <div className="flex items-start gap-5">
                      <span
                        className="mt-1 text-[10px] tabular-nums tracking-[0.18em] transition-colors duration-500"
                        style={{ fontFamily: FONT, color: activeIndex === index ? "#f7f704" : "rgba(255,255,255,0.25)" }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h2
                          className="text-[clamp(28px,3.5vw,44px)] font-bold leading-none tracking-[-0.055em] transition-all duration-500"
                          style={{
                            fontFamily: FONT,
                            color: activeIndex === index ? "#fff" : "transparent",
                            WebkitTextStroke: activeIndex === index ? "0px transparent" : "1px rgba(255,255,255,0.2)",
                          }}
                        >
                          {cat.title}
                        </h2>

                        {/* Description */}
                        <div
                          className="overflow-hidden transition-all duration-500"
                          style={{
                            maxHeight: activeIndex === index ? "80px" : "0px",
                            opacity:   activeIndex === index ? 1 : 0,
                            marginTop: activeIndex === index ? "12px" : "0px",
                          }}
                        >
                          {cat.tagline && (
                            <p className="max-w-[280px] text-[14px] leading-relaxed text-white/45" style={{ fontFamily: FONT }}>
                              {cat.tagline}
                            </p>
                          )}
                        </div>

                        {/* Yellow line */}
                        <div
                          className="mt-3 h-px bg-[#f7f704] transition-all duration-700 ease-out"
                          style={{ width: activeIndex === index ? "40px" : "0px", opacity: activeIndex === index ? 1 : 0 }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — scroll panels */}
          <div className="lg:col-span-7 lg:border-l lg:border-white/[0.05] lg:pl-14">
            <div className="space-y-[55vh] py-[18vh]">
              {categories.map((cat, idx) => {
                const imgUrl = getImageUrl(cat.homepageImage)
                return (
                  <div
                    key={cat._id}
                    className="sv-item flex min-h-[65vh] items-center"
                  >
                    <Link
                      href={`/diensten/${cat.slug.current}`}
                      className="group relative w-full overflow-hidden rounded-xl"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <div className="relative aspect-[4/5]">

                        {/* Image */}
                        {imgUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={imgUrl}
                            alt={cat.homepageImage?.alt ?? cat.title}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        ) : (
                          // Placeholder als er nog geen afbeelding is
                          <div className="absolute inset-0 bg-white/[0.03]" />
                        )}

                        {/* Overlays */}
                        <div className="absolute inset-0 bg-black/25" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                        {/* Border */}
                        <div className="absolute inset-0 rounded-xl border border-white/[0.06] transition-colors duration-300 group-hover:border-white/[0.12]" />

                        {/* Bottom label */}
                        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                          <div>
                            <p className="text-[9px] uppercase tracking-[0.26em] text-white/45" style={{ fontFamily: FONT }}>
                              {String(idx + 1).padStart(2, "0")}
                            </p>
                            <h3 className="mt-1 text-[22px] font-bold tracking-[-0.045em] text-white" style={{ fontFamily: FONT }}>
                              {cat.title}
                            </h3>
                          </div>
                          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/50 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:border-[#f7f704]/60 group-hover:text-[#f7f704] group-hover:opacity-100">
                            <span className="text-sm">↗</span>
                          </div>
                        </div>

                        {/* Yellow bottom accent */}
                        <div
                          className="absolute bottom-0 left-0 h-[2px] bg-[#f7f704] transition-all duration-500"
                          style={{ width: activeIndex === idx ? "100%" : "0%" }}
                        />
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}