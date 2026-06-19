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
  slug?: { current: string }
  color?: string | null
  homepageImage?: { asset?: { url?: string } }
  image?: { asset?: { url?: string } }
}

type ServicesProps = {
  categories: Category[]
}

export default function ServicesLayered({ categories }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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
      // ──────────────────────────────────────────────────────────
      // HEADING ANIMATION
      // ──────────────────────────────────────────────────────────
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

      // ──────────────────────────────────────────────────────────
      // LAYERED SCROLL EFFECT — elke dienst wordt een "panel"
      // ──────────────────────────────────────────────────────────
      const panels = gsap.utils.toArray<HTMLElement>(".ss-panel")
      
      panels.forEach((panel, i) => {
        const imageWrap = panel.querySelector(".ss-image-wrap") as HTMLElement
        const image = panel.querySelector(".ss-image") as HTMLElement
        const content = panel.querySelector(".ss-content") as HTMLElement
        const ghost = panel.querySelector(".ss-ghost") as HTMLElement
        const border = panel.querySelector(".ss-border") as HTMLElement

        // Elke panel krijgt een eigen ScrollTrigger
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          end: "bottom top",
          pin: imageWrap,           // De foto blijft gepind
          pinSpacing: false,        // Geen extra spacing
          scrub: 1.2,
          invalidateOnRefresh: true,
        })

        // Content beweegt omhoog terwijl foto blijft
        if (content) {
          gsap.fromTo(content,
            { y: 0 },
            {
              y: -100,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top top",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          )
        }

        // Ghost number parallax
        if (ghost) {
          gsap.fromTo(ghost,
            { y: 60, opacity: 0.08 },
            {
              y: -60,
              opacity: 0.02,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          )
        }

        // Border reveal on first appearance
        if (border && i === 0) {
          gsap.fromTo(border,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 1.2,
              scrollTrigger: {
                trigger: panel,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          )
        }

        // Subtiele image zoom tijdens scroll
        if (image) {
          gsap.fromTo(image,
            { scale: 1 },
            {
              scale: 1.12,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          )
        }

        // Kleur van nummer en titel verandert tijdens scroll
        const numberSpan = panel.querySelector(".ss-number")
        const titleSpan = panel.querySelector(".ss-title")
        
        if (numberSpan && titleSpan) {
          ScrollTrigger.create({
            trigger: panel,
            start: "top 80%",
            end: "top 20%",
            onUpdate: (self) => {
              const progress = self.progress
              const color = services[i]?.color ?? "#f7f704"
              // Naarmate je scrollt, wordt de kleur intenser
              ;(numberSpan as HTMLElement).style.color = `rgba(247, 247, 4, ${0.3 + progress * 0.7})`
              ;(titleSpan as HTMLElement).style.color = progress > 0.6 ? color : "white"
            },
          })
        }
      })

      // Zorg dat de laatste panel niet blijft hangen
      ScrollTrigger.create({
        trigger: services.length > 0 ? `.ss-panel-${services.length - 1}` : undefined,
        start: "bottom bottom",
        onLeaveBack: () => {
          // Reset
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [services])

  return (
    <section ref={sectionRef} className="relative bg-[#080808] text-white">
      {/* Noise overlay — consistent over alle layers */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[5] opacity-[0.032] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* HEADER SECTION — vast, scrollt weg */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="pt-32 pb-32 lg:pt-44 lg:pb-40">
          <div className="ss-meta mb-8 flex items-center gap-4 opacity-0">
            <div className="h-px w-5 bg-[#f7f704]" aria-hidden />
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/30" style={{ fontFamily: FONT }}>
              Vier disciplines
            </p>
          </div>

          <h1 className="text-[clamp(56px,10vw,148px)] font-bold leading-[0.86] tracking-[-0.07em]" style={{ fontFamily: FONT }}>
            <div style={{ overflow: "hidden", display: "block" }}>
              <span className="ss-w1 block" style={{ transform: "translateY(108%)" }}>Signing</span>
            </div>
            <div style={{ overflow: "hidden", display: "block" }}>
              <span className="ss-w2 block" style={{ transform: "translateY(108%)", WebkitTextStroke: "1.5px rgba(255,255,255,0.18)", color: "transparent" }}>die richting</span>
            </div>
            <div style={{ overflow: "hidden", display: "block" }}>
              <span className="ss-w3 block" style={{ transform: "translateY(108%)" }}>geeft<span style={{ color: "#f7f704" }}>.</span></span>
            </div>
          </h1>
        </div>
      </div>

      {/* LAYERED PANELS — elke dienst is een eigen scroll-laag */}
      <div ref={containerRef} className="relative">
        {services.map((service, idx) => (
          <div
            key={service.id}
            className={`ss-panel ss-panel-${idx} relative min-h-screen w-full`}
          >
            {/* ACHTERGROND FOTO — blijft gepind tijdens scroll */}
            <div className="ss-image-wrap pointer-events-none fixed inset-0 z-0 h-screen w-full overflow-hidden">
              {service.image && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="ss-image absolute inset-0 h-full w-full object-cover"
                  />
                  {/* Donkere overlay */}
                  <div className="absolute inset-0 bg-black/65" />
                  {/* Subtiele gradient voor betere leesbaarheid */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
                </>
              )}
              {/* Fallback als er geen foto is */}
              {!service.image && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
              )}
            </div>

            {/* CONTENT — scrollt omhoog over de foto heen */}
            <div className="ss-content relative z-10 mx-auto max-w-7xl px-6 lg:px-10 min-h-screen flex items-center">
              <div className="w-full py-24">
                {/* Border top — alleen bij eerste voor reveal */}
                {idx === 0 && (
                  <div className="ss-border absolute left-0 right-0 top-0 h-px origin-left bg-white/[0.08]" />
                )}

                <div className="max-w-3xl">
                  {/* Nummer + titel */}
                  <div className="flex items-center gap-4 mb-6">
                    <span
                      className="ss-number text-[32px] md:text-[48px] font-bold tabular-nums leading-none text-white/30 transition-colors duration-300"
                      style={{ fontFamily: FONT }}
                    >
                      {service.id}
                    </span>
                    <div
                      className="h-px w-12 transition-all duration-500"
                      style={{ backgroundColor: service.color }}
                    />
                  </div>

                  <h2
                    className="ss-title text-[clamp(48px,8vw,112px)] font-bold leading-[0.9] tracking-[-0.055em] text-white transition-all duration-500"
                    style={{ fontFamily: FONT }}
                  >
                    {service.title}
                  </h2>

                  <p
                    className="mt-6 text-lg md:text-xl text-white/50 max-w-xl leading-relaxed"
                    style={{ fontFamily: FONT }}
                  >
                    {service.sub}
                  </p>

                  {/* Link */}
                  <Link
                    href={service.href}
                    className="group inline-flex items-center gap-3 mt-10"
                  >
                    <span className="text-[11px] uppercase tracking-[0.24em] text-white/40 transition-all duration-300 group-hover:text-white/80">
                      Ontdek {service.title.toLowerCase()}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-white/40 transition-all duration-300 group-hover:text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>

                {/* Scheidingslijn onderaan (behalve laatste) */}
                {idx < services.length - 1 && (
                  <div
                    className="absolute bottom-12 left-6 right-6 h-px lg:left-10 lg:right-10"
                    style={{
                      background: `linear-gradient(90deg, ${service.color}40, transparent 80%)`,
                    }}
                  />
                )}
              </div>
            </div>

            {/* Ghost number — decoratief, beweegt mee */}
            <div
              aria-hidden
              className="ss-ghost pointer-events-none absolute bottom-0 right-6 select-none leading-none tracking-[-0.07em] lg:right-12"
              style={{
                fontFamily: FONT,
                fontSize: "clamp(120px,18vw,280px)",
                fontWeight: 700,
                color: "rgba(255,255,255,0.04)",
                lineHeight: 0.8,
                zIndex: 1,
              }}
            >
              {service.id}
            </div>
          </div>
        ))}
      </div>

      {/* CTA SECTION — na alle layers */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="py-32 lg:py-44">
          <div className="flex flex-col items-start justify-between gap-10 border-t border-white/[0.06] pt-16 lg:flex-row lg:items-end">
            <div>
              <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-white/28" style={{ fontFamily: FONT }}>
                Klaar om te starten
              </p>
              <h2 className="text-[clamp(32px,5vw,72px)] font-bold leading-[0.88] tracking-[-0.06em] text-white" style={{ fontFamily: FONT }}>
                Van visie naar
                <br />
                <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.18)", color: "transparent" }}>zichtbaarheid</span>
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