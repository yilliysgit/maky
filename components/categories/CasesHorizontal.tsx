"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { urlFor } from "@/sanity/lib/image"

gsap.registerPlugin(ScrollTrigger)

const FONT = "var(--font-sans)"

interface SanityImage {
  asset: { _ref: string; _type: "reference" }
  alt?: string
}

interface Project {
  _id: string
  projectName: string
  slug: { current: string }
  featuredImage?: SanityImage | null
  subcategory?: { title: string } | null
}

interface CasesData {
  label?: string
  heading?: string
  items?: Project[]
}

interface CasesHorizontalProps {
  data?: CasesData | null
}

export default function CasesHorizontal({ data }: CasesHorizontalProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)

  const projects    = data?.items ?? []
  const totalPanels = projects.length + 1  // + CTA
  // Exact zelfde formule als origineel: 4 panels = -80%, 5 panels = -80% etc
  // Origineel: 4 project panels + 1 CTA = 5 panels, xPercent = -80
  // Formule: -(totalPanels - 1) / totalPanels * 100
  const xPercent    = -Math.round((totalPanels - 1) / totalPanels * 100)
  const trackWidth  = `${totalPanels * 100}vw`
  const minHeight   = `${totalPanels * 100}vh`

  const getImageUrl = (image?: SanityImage | null) => {
    if (!image?.asset?._ref) return null
    return urlFor(image).width(2400).quality(95).auto("format").url()
  }

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || !projects.length) return

    const ctx = gsap.context(() => {

      // EXACT zelfde als origineel — geen pin, sticky via CSS
      const scrollTween = gsap.to(trackRef.current, {
        xPercent,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      })

      gsap.utils.toArray<HTMLElement>(".case-panel").forEach((panel, i) => {
        const image   = panel.querySelector(".case-image")
        const content = panel.querySelector(".case-content")
        const line    = panel.querySelector(".case-line")

        if (image) {
          gsap.fromTo(image, { scale: 1.12 }, {
            scale: 1, ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left right", end: "right left",
              scrub: true,
            },
          })
        }

        if (i === 0) {
          gsap.set(content, { opacity: 1, y: 0, filter: "blur(0px)" })
          gsap.set(line,    { scaleX: 1, transformOrigin: "left center" })
        } else {
          if (content) {
            gsap.fromTo(content,
              { opacity: 0, y: 60, filter: "blur(4px)" },
              {
                opacity: 1, y: 0, filter: "blur(0px)", ease: "power3.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: "left 70%", end: "center center",
                  scrub: 1,
                },
              }
            )
          }
          if (line) {
            gsap.fromTo(line,
              { scaleX: 0, transformOrigin: "left center" },
              {
                scaleX: 1, ease: "power2.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: "left 60%", end: "center 40%",
                  scrub: 0.8,
                },
              }
            )
          }
        }
      })

      gsap.fromTo(".cases-intro",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: ".cases-intro",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [xPercent, projects.length])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080808] text-white"
      style={{ minHeight }}
    >
      {/* INTRO */}
      <div className="cases-intro relative z-20 px-6 pb-24 pt-32 lg:px-10">
        <div className="max-w-5xl">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-5 bg-[#f7f704]" />
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/30" style={{ fontFamily: FONT }}>
              {data?.label ?? "Geselecteerd werk"}
            </p>
          </div>
          <h2
            className="text-[clamp(38px,5.5vw,72px)] font-bold leading-[0.88] tracking-[-0.06em] text-white"
            style={{ fontFamily: FONT }}
          >
            {data?.heading ?? "Projecten die ruimtes zichtbaar maken."}
          </h2>
        </div>
      </div>

      {/* STICKY VIEWPORT — CSS sticky, geen GSAP pin */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="pointer-events-none absolute left-0 top-0 z-20 h-32 w-full"
          style={{ background: "linear-gradient(to bottom, #080808, transparent)" }}
        />

        {/* TRACK */}
        <div ref={trackRef} className="flex h-full" style={{ width: trackWidth }}>

          {/* PROJECT PANELS */}
          {projects.map((project, i) => {
            const imgUrl = getImageUrl(project.featuredImage)
            return (
              <article
                key={project._id}
                className="case-panel relative h-screen w-screen shrink-0 overflow-hidden"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div className="case-image absolute inset-0">
                    {imgUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imgUrl}
                        alt={project.featuredImage?.alt ?? project.projectName}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-white/[0.04]" />
                    )}
                  </div>
                </div>

                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute right-[-10%] top-[-10%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_70%)]" />

                <Link
                  href={`/projecten/${project.slug.current}`}
                  className="case-content absolute bottom-12 left-8 z-20 max-w-4xl lg:bottom-16 lg:left-12"
                >
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/45" style={{ fontFamily: FONT }}>
                    {String(i + 1).padStart(2, "0")}
                    {project.subcategory?.title ? ` / ${project.subcategory.title}` : ""}
                  </p>
                  <h3
                    className="mt-4 text-5xl font-bold leading-[0.88] tracking-[-0.06em] text-white md:text-7xl lg:text-8xl"
                    style={{ fontFamily: FONT }}
                  >
                    {project.projectName}
                  </h3>
                  <div className="case-line mt-6 h-px w-12 origin-left bg-[#f7f704]" />
                </Link>
              </article>
            )
          })}

          {/* CTA PANEL */}
          <article className="relative flex h-screen w-screen shrink-0 items-center justify-center overflow-hidden bg-[#080808]">
            <div className="absolute inset-0" style={{
              backgroundImage: "linear-gradient(to right, rgba(255,255,255,.022) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.022) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }} />
            <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f7f704]/[0.05] blur-[100px]" />

            <div className="relative z-10 max-w-5xl px-6 text-center">
              <div className="mb-8 flex items-center justify-center gap-3">
                <div className="h-px w-5 bg-[#f7f704]" />
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/28" style={{ fontFamily: FONT }}>Meer projecten</p>
                <div className="h-px w-5 bg-[#f7f704]" />
              </div>
              <h2 className="text-[clamp(42px,6vw,88px)] font-bold leading-[0.88] tracking-[-0.06em] text-white" style={{ fontFamily: FONT }}>
                Bekijk alle<br />
                <span style={{ WebkitTextStroke: "1.5px #f7f704", color: "transparent" }}>gerealiseerde</span><br />
                projecten.
              </h2>
              <div className="mt-11 flex items-center justify-center gap-6">
                <Link
                  href="/projecten"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#f7f704] px-8 py-[14px] text-[11px] font-bold tracking-[0.04em] text-black transition-all duration-300 hover:scale-[1.03] hover:bg-white"
                  style={{ fontFamily: FONT }}
                >
                  Bekijk alle projecten
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </Link>
                <Link href="/contact" className="text-[10px] uppercase tracking-[0.22em] text-white/25 transition-colors duration-300 hover:text-white" style={{ fontFamily: FONT }}>
                  Project starten ↗
                </Link>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  )
}