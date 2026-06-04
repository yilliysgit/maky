"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { urlFor } from "@/sanity/lib/image"

gsap.registerPlugin(ScrollTrigger)

type Project = {
  _id: string
  projectName: string
  slug: { current: string }
  heroTagline?: string
  featuredImage?: {
    asset: { _ref: string; _type?: "reference" }
    alt?: string
    hotspot?: { x: number; y: number }
  } | null
  subcategory?: { title: string } | null
}

type ProjectenClientProps = {
  projects: Project[]
}

const FONT = "var(--font-sans)"

const layout = [
  "lg:col-span-7 lg:row-span-2 min-h-[620px]",
  "lg:col-span-5 min-h-[360px]",
  "lg:col-span-5 min-h-[420px]",
  "lg:col-span-4 min-h-[520px]",
  "lg:col-span-4 min-h-[420px]",
  "lg:col-span-4 min-h-[560px]",
  "lg:col-span-8 min-h-[480px]",
  "lg:col-span-4 min-h-[480px]",
]

function getImg(project: Project, width = 1400) {
  if (!project.featuredImage?.asset?._ref) return null
  return urlFor(project.featuredImage).width(width).quality(90).auto("format").url()
}

export default function ProjectenClient({ projects }: ProjectenClientProps) {
  const rootRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const heroImageRef = useRef<HTMLDivElement>(null)
  const wallRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)

  const featured = projects[0]
  const second = projects[1]
  const featuredUrl = featured ? getImg(featured, 1900) : null
  const secondUrl = second ? getImg(second, 1500) : null

  const categories = useMemo(() => {
    return Array.from(new Set(projects.map((p) => p.subcategory?.title).filter(Boolean))) as string[]
  }, [projects])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-line",
        { y: "115%" },
        { y: "0%", duration: 1.15, ease: "power4.out", stagger: 0.08, delay: 0.15 }
      )

      gsap.fromTo(
        ".hero-meta",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.65 }
      )

      gsap.to(".hero-word-outline", {
        color: "#f7f704",
        WebkitTextStrokeColor: "#f7f704",
        ease: "none",
        scrollTrigger: {
          trigger: ".projects-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { clipPath: "inset(18% 18% 18% 18% round 32px)", scale: 1.08, opacity: 0.65 },
          {
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".featured-pin",
              start: "top bottom",
              end: "top 20%",
              scrub: 1,
            },
          }
        )
      }

      gsap.utils.toArray<HTMLElement>(".case-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 90, rotate: i % 2 ? 1.5 : -1.5 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })

      gsap.utils.toArray<HTMLElement>(".drift-left").forEach((el) => {
        gsap.to(el, {
          xPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        })
      })

      gsap.utils.toArray<HTMLElement>(".drift-right").forEach((el) => {
        gsap.to(el, {
          xPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        })
      })

      gsap.to(".wall-title", {
        xPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: wallRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const coarse = window.matchMedia("(pointer: coarse)").matches
    if (reduced || coarse) return

    let x = 0
    let y = 0
    let tx = 0
    let ty = 0
    let raf = 0

    const move = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
    }

    const loop = () => {
      x += (tx - x) * 0.16
      y += (ty - y) * 0.16
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener("mousemove", move, { passive: true })
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener("mousemove", move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <main ref={rootRef} className="relative overflow-hidden bg-[#080808] text-white" style={{ fontFamily: FONT }}>
      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
        @media (pointer: fine) {
          .projects-main { cursor: none; }
          .projects-main a, .projects-main button { cursor: none; }
        }
      `}</style>

      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-20 w-20 items-center justify-center rounded-full border border-[#f7f704]/50 bg-[#f7f704]/10 text-[9px] font-bold uppercase tracking-[0.2em] text-[#f7f704] backdrop-blur-md lg:flex"
        style={{ opacity: active === null ? 0 : 1 }}
      >
        View
      </div>

      <div className="projects-main relative">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <section className="projects-hero relative z-10 min-h-screen px-6 pt-28 lg:px-12 lg:pt-40">
          <div className="mx-auto max-w-[1540px]">
            <header className="hero-meta mb-14 flex items-center justify-between border-b border-white/10 pb-6">
              <Link href="/" className="text-[10px] uppercase tracking-[0.28em] text-white/35 transition-colors hover:text-white">
                ← Home
              </Link>
              <div className="hidden items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-white/30 md:flex">
                <span className="h-px w-8 bg-[#f7f704]" />
                <span>{projects.length} cases live</span>
              </div>
            </header>

            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-9">
                <div className="overflow-hidden">
                  <h1 className="reveal-line text-[clamp(62px,11.5vw,190px)] font-black uppercase leading-[0.78] tracking-[-0.085em]">
                    Niet
                  </h1>
                </div>
                <div className="overflow-hidden">
                  <h1 className="reveal-line text-[clamp(62px,11.5vw,190px)] font-black uppercase leading-[0.78] tracking-[-0.085em]">
                    gemaakt om
                  </h1>
                </div>
                <div className="overflow-hidden">
                  <h1
                    className="reveal-line hero-word-outline text-[clamp(62px,11.5vw,190px)] font-black uppercase leading-[0.78] tracking-[-0.085em] text-transparent"
                    style={{ WebkitTextStroke: "2px rgba(255,255,255,0.32)" }}
                  >
                    genegeerd
                  </h1>
                </div>
              </div>

              <aside className="hero-meta lg:col-span-3">
                <p className="max-w-sm text-[15px] leading-[1.85] text-white/48">
                  Gevels, voertuigen, glas, interieurs en wayfinding. Signing die niet alleen zichtbaar is, maar ruimte claimt.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {categories.slice(0, 4).map((cat) => (
                    <span key={cat} className="rounded-full border border-white/10 px-3 py-2 text-[9px] uppercase tracking-[0.2em] text-white/35">
                      {cat}
                    </span>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        {featured && (
          <section className="featured-pin relative z-10 px-6 pb-28 lg:px-12 lg:pb-40">
            <div className="mx-auto max-w-[1540px]">
              <Link
                href={`/projecten/${featured.slug.current}`}
                className="group grid overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] lg:grid-cols-12"
                onMouseEnter={() => setActive(0)}
                onMouseLeave={() => setActive(null)}
              >
                <div ref={heroImageRef} className="relative h-[70vh] min-h-[560px] overflow-hidden lg:col-span-8">
                  {featuredUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={featuredUrl} alt={featured.featuredImage?.alt ?? featured.projectName} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-white/[0.03]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                  <div className="absolute left-6 top-6 rounded-full bg-[#f7f704] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-black">
                    Featured
                  </div>
                </div>

                <div className="flex flex-col justify-between p-7 lg:col-span-4 lg:p-12">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.32em] text-[#f7f704]">Case 01</p>
                    <h2 className="mt-8 text-[clamp(42px,5vw,78px)] font-black uppercase leading-[0.88] tracking-[-0.07em]">
                      {featured.projectName}
                    </h2>
                    {featured.heroTagline && (
                      <p className="mt-8 max-w-md text-[16px] leading-[1.8] text-white/48">{featured.heroTagline}</p>
                    )}
                  </div>

                  <div className="mt-14 flex items-center justify-between border-t border-white/10 pt-6">
                    <span className="text-[11px] uppercase tracking-[0.24em] text-white/35">Open project</span>
                    <span className="text-3xl text-[#f7f704] transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {second && (
          <section className="relative z-10 px-6 pb-28 lg:px-12 lg:pb-40">
            <div className="mx-auto grid max-w-[1540px] gap-8 lg:grid-cols-12 lg:items-center">
              <div className="drift-left lg:col-span-5">
                <p className="mb-6 text-[10px] uppercase tracking-[0.32em] text-white/25">More than decoration</p>
                <h2 className="text-[clamp(48px,7vw,120px)] font-black uppercase leading-[0.82] tracking-[-0.08em]">
                  Built for the street<span className="text-[#f7f704]">.</span>
                </h2>
              </div>

              <Link
                href={`/projecten/${second.slug.current}`}
                className="case-card group relative min-h-[620px] overflow-hidden rounded-[2rem] bg-white/[0.025] lg:col-span-7"
                onMouseEnter={() => setActive(1)}
                onMouseLeave={() => setActive(null)}
              >
                {secondUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={secondUrl} alt={second.featuredImage?.alt ?? second.projectName} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1300ms] group-hover:scale-[1.06]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                  <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-[#f7f704]">Case 02</p>
                  <h3 className="text-[clamp(36px,5vw,82px)] font-black uppercase leading-[0.88] tracking-[-0.07em]">{second.projectName}</h3>
                </div>
              </Link>
            </div>
          </section>
        )}

        <section ref={wallRef} className="relative z-10 px-6 pb-28 lg:px-12 lg:pb-40">
          <div className="mx-auto max-w-[1540px]">
            <div className="mb-12 overflow-hidden border-y border-white/10 py-8">
              <div className="wall-title whitespace-nowrap text-[clamp(72px,12vw,190px)] font-black uppercase leading-none tracking-[-0.08em] text-transparent" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.2)" }}>
                Project wall — project wall — project wall —
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
              {projects.map((project, i) => {
                const img = getImg(project, i % 3 === 0 ? 1500 : 1100)
                const size = layout[i % layout.length]

                return (
                  <Link
                    key={project._id}
                    href={`/projecten/${project.slug.current}`}
                    className={`case-card group relative overflow-hidden rounded-[1.7rem] bg-white/[0.025] ${size}`}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                  >
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img} alt={project.featuredImage?.alt ?? project.projectName} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.075]" />
                    ) : (
                      <div className="absolute inset-0 bg-white/[0.035]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/18 to-black/0 transition-opacity duration-500 group-hover:opacity-80" />
                    <div className="absolute inset-0 rounded-[1.7rem] border border-white/[0.08] transition-colors duration-500 group-hover:border-[#f7f704]/45" />

                    <div className="absolute left-5 top-5 flex items-center gap-3 rounded-full border border-white/10 bg-black/25 px-3 py-2 backdrop-blur-md">
                      <span className="text-[10px] tabular-nums text-[#f7f704]">{String(i + 1).padStart(2, "0")}</span>
                      {project.subcategory?.title && (
                        <span className="text-[9px] uppercase tracking-[0.22em] text-white/45">{project.subcategory.title}</span>
                      )}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                      <h3 className="max-w-3xl text-[clamp(28px,4vw,64px)] font-black uppercase leading-[0.9] tracking-[-0.065em] text-white">
                        {project.projectName}
                      </h3>
                      {project.heroTagline && (
                        <p className="mt-5 max-w-md translate-y-3 text-[14px] leading-relaxed text-white/0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-white/55">
                          {project.heroTagline}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section className="relative z-10 px-6 pb-24 lg:px-12 lg:pb-32">
          <div className="mx-auto max-w-[1540px] overflow-hidden rounded-[2rem] bg-[#f7f704] p-8 text-black md:p-14 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="mb-6 text-[10px] font-black uppercase tracking-[0.32em] text-black/50">Start iets zichtbaar</p>
                <h2 className="text-[clamp(48px,8vw,132px)] font-black uppercase leading-[0.82] tracking-[-0.08em]">
                  Claim je plek in de ruimte.
                </h2>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <p className="mb-8 text-[15px] leading-[1.7] text-black/60 lg:ml-auto lg:max-w-sm">
                  Van idee tot montage. Wij maken signing die niet stilletjes aanwezig is, maar direct blijft hangen.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-4 rounded-full bg-black px-8 py-4 text-[12px] font-black uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:scale-[1.04]">
                  Project starten <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
