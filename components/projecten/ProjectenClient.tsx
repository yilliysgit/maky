"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { urlFor } from "@/sanity/lib/image"

gsap.registerPlugin(ScrollTrigger)

const FONT = "var(--font-sans)"

interface Project {
  _id: string
  projectName: string
  slug: { current: string }
  heroTagline?: string
  featuredImage?: {
    asset: { _ref: string; _type: "reference" }
    alt?: string
    hotspot?: { x: number; y: number }
  } | null
  subcategory?: { title: string } | null
}

export default function ProjectenClient({ projects }: { projects: Project[] }) {
  const imgWrapRef  = useRef<HTMLDivElement>(null)
  const imgRef      = useRef<HTMLImageElement>(null)
  const mouse       = useRef({ x: 0, y: 0 })
  const imgPos      = useRef({ x: 0, y: 0 })
  const rafRef      = useRef<number>(0)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const getImageUrl = (project: Project) => {
    if (!project.featuredImage?.asset?._ref) return null
    return urlFor(project.featuredImage).width(900).height(600).quality(90).auto("format").url()
  }

  // ── FLOATING IMAGE ────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const loop = () => {
      imgPos.current.x += (mouse.current.x - imgPos.current.x) * 0.07
      imgPos.current.y += (mouse.current.y - imgPos.current.y) * 0.07

      if (imgWrapRef.current) {
        imgWrapRef.current.style.left = `${imgPos.current.x}px`
        imgWrapRef.current.style.top  = `${imgPos.current.y}px`
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

  // ── GSAP INTRO ────────────────────────────────────────────
  useEffect(() => {
    gsap.fromTo(".pj-header",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1 }
    )

    gsap.utils.toArray<HTMLElement>(".pj-item").forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          delay: i < 3 ? i * 0.08 : 0,
        }
      )
    })
  }, [projects])

  const handleEnter = (i: number) => {
    setHoveredIdx(i)
    const url = getImageUrl(projects[i])
    if (imgRef.current && url) imgRef.current.src = url
    gsap.to(imgWrapRef.current, {
      opacity: 1, scale: 1, duration: 0.45, ease: "power3.out",
    })
  }

  const handleLeave = () => {
    setHoveredIdx(null)
    gsap.to(imgWrapRef.current, {
      opacity: 0, scale: 0.94, duration: 0.3, ease: "power3.in",
    })
  }

  return (
    <main className="relative min-h-screen bg-[#080808] text-white">

      {/* Noise */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035]"
        style={{
          mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* Floating image */}
      <div
        ref={imgWrapRef}
        className="pointer-events-none fixed z-[50] overflow-hidden rounded-xl"
        style={{
          width: "380px",
          height: "250px",
          opacity: 0,
          transform: "translate(-50%, -60%) scale(0.94)",
          willChange: "transform, left, top",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 rounded-xl border border-white/[0.08]" />

        {hoveredIdx !== null && projects[hoveredIdx]?.subcategory?.title && (
          <div className="absolute bottom-4 left-4">
            <p className="text-[9px] uppercase tracking-[0.22em] text-white/50" style={{ fontFamily: FONT }}>
              {projects[hoveredIdx].subcategory!.title}
            </p>
          </div>
        )}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">

        {/* Header */}
        <div className="pj-header pt-32 pb-16 lg:pt-44">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-5 bg-[#f7f704]" />
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/30" style={{ fontFamily: FONT }}>
              Gerealiseerde projecten
            </p>
          </div>

          <h1
            className="font-bold leading-[0.86] tracking-[-0.07em]"
            style={{ fontFamily: FONT, fontSize: "clamp(52px,9vw,130px)" }}
          >
            <span className="text-white">Ons</span>{" "}
            <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.18)", color: "transparent" }}>
              werk
            </span>
            <span style={{ color: "#f7f704" }}>.</span>
          </h1>
        </div>

        {/* Project lijst */}
        <div>
          {projects.map((project, i) => (
            <Link
              key={project._id}
              href={`/projecten/${project.slug.current}`}
              className="pj-item group relative block"
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={handleLeave}
            >
              {/* Border */}
              <div className="h-px w-full bg-white/[0.06] transition-colors duration-500 group-hover:bg-[#f7f704]/20" />

              <div className="flex items-center justify-between py-8 lg:py-10">

                {/* Links — nummer + naam */}
                <div className="flex items-center gap-6 lg:gap-10">
                  <span
                    className="text-[10px] tabular-nums tracking-[0.22em] text-white/25 transition-colors duration-300 group-hover:text-[#f7f704]"
                    style={{ fontFamily: FONT }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h2
                      className="font-bold leading-none tracking-[-0.06em] transition-all duration-400"
                      style={{
                        fontFamily: FONT,
                        fontSize: "clamp(32px,5vw,80px)",
                        color: hoveredIdx === i ? "#f7f704" : "transparent",
                        WebkitTextStroke: hoveredIdx === i
                          ? "0px transparent"
                          : "1.5px rgba(255,255,255,0.4)",
                      }}
                    >
                      {project.projectName}
                    </h2>

                    {project.subcategory?.title && (
                      <p
                        className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/22 transition-colors duration-300 group-hover:text-white/45"
                        style={{ fontFamily: FONT }}
                      >
                        {project.subcategory.title}
                      </p>
                    )}
                  </div>
                </div>

                {/* Rechts — arrow */}
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-white/30 opacity-0 transition-all duration-300 group-hover:border-[#f7f704]/40 group-hover:text-[#f7f704] group-hover:opacity-100"
                >
                  <span className="text-sm">↗</span>
                </div>
              </div>
            </Link>
          ))}

          {/* Laatste border */}
          <div className="h-px w-full bg-white/[0.06]" />
        </div>

        {/* CTA */}
        <div className="py-32 lg:py-44">
          <div className="flex flex-col items-start justify-between gap-10 border-t border-white/[0.06] pt-16 lg:flex-row lg:items-end">
            <h2
              className="font-bold leading-[0.88] tracking-[-0.06em] text-white"
              style={{ fontFamily: FONT, fontSize: "clamp(32px,5vw,72px)" }}
            >
              Klaar voor jouw<br />
              <span style={{ WebkitTextStroke: "1.5px #f7f704", color: "transparent" }}>
                project
              </span>
              <span style={{ color: "#f7f704" }}>?</span>
            </h2>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-[#f7f704] px-8 py-[14px] text-[11px] font-bold tracking-[0.04em] text-black transition-all duration-300 hover:scale-[1.03] hover:bg-white flex-shrink-0"
              style={{ fontFamily: FONT }}
            >
              Project starten →
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}