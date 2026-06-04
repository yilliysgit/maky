"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ArrowUpRight,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: "Interieur",
    href: "/diensten/interieur-signing",
  },
  {
    title: "Exterieur",
    href: "/diensten/gevelreclame",
  },
  {
    title: "Voertuigen",
    href: "/diensten/voertuigbelettering",
  },
  {
    title: "Events",
    href: "/diensten/event-signing",
  },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-up animatie voor footer elementen
      gsap.fromTo(
        ".footer-reveal",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            once: true,
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#1a1a0a] to-black text-white"
    >
      
      {/* TOP BORDER - Subtieler gemaakt */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#f7f704]/30 to-transparent" />

      {/* AMBIENT LIGHT - Warm geel/oranje glow */}
      <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(247,247,4,0.08),transparent_70%)] blur-3xl" />

      {/* SECONDAIRE GLOW - Rechtsonder voor diepte */}
      <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(247,247,4,0.04),transparent_70%)] blur-3xl" />

      <div className="relative z-10">
        
        {/* TOP SECTION */}
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-10 lg:pt-32">
          
          {/* BIG TITLE */}
          <div className="footer-reveal max-w-5xl">
            <p className="text-sm uppercase tracking-[0.25em] text-white/40">
              MAKY
            </p>

            <h2 className="mt-6 text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white md:text-7xl lg:text-[96px]">
              Visual signing
              <br />
              voor ruimtes
              <br />
              die opvallen.
            </h2>
          </div>

          {/* GRID */}
          <div className="footer-reveal mt-20 grid gap-20 border-t border-white/10 pt-16 lg:mt-24 lg:grid-cols-12 lg:gap-24">
            
            {/* SERVICES */}
            <div className="lg:col-span-7">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/40">
                Diensten
              </p>

              <div className="mt-10 grid gap-y-6 md:grid-cols-2">
                {services.map((service, index) => (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="group inline-flex w-fit items-center gap-4 text-2xl font-semibold tracking-[-0.03em] text-white/70 transition-all duration-300 hover:text-white md:text-3xl lg:text-4xl"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {service.title}

                    <ArrowUpRight
                      size={22}
                      weight="bold"
                      className="translate-y-0.5 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100 md:size-[24px]"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* CONTACT */}
            <div className="lg:col-span-5">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/40">
                Contact
              </p>

              <div className="mt-10 space-y-8">
                
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/30">
                    E-mail
                  </p>

                  <Link
                    href="mailto:info@maky.nl"
                    className="mt-2 inline-block text-xl font-medium tracking-[-0.02em] text-white/80 transition-all duration-300 hover:text-[#f7f704] hover:translate-x-1 md:text-2xl"
                  >
                    info@maky.nl
                  </Link>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/30">
                    Telefoon
                  </p>

                  <Link
                    href="tel:+310612345678"
                    className="mt-2 inline-block text-xl font-medium tracking-[-0.02em] text-white/80 transition-all duration-300 hover:text-[#f7f704] hover:translate-x-1 md:text-2xl"
                  >
                    +31 (0)6 12 34 56 78
                  </Link>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/30">
                    Locatie
                  </p>

                  <p className="mt-2 text-lg leading-relaxed text-white/70 md:text-xl">
                    Almere
                    <br />
                    Nederland
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/5 bg-black/20 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 text-sm text-white/30 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            
            {/* LEFT */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <p className="text-xs uppercase tracking-wider">
                © 2026 MAKY
              </p>

              <Link
                href="/privacybeleid"
                className="text-xs uppercase tracking-wider transition-colors duration-300 hover:text-white/70"
              >
                Privacy
              </Link>

              <Link
                href="/algemene-voorwaarden"
                className="text-xs uppercase tracking-wider transition-colors duration-300 hover:text-white/70"
              >
                Voorwaarden
              </Link>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="rounded-full p-1 text-white/40 transition-all duration-300 hover:text-[#f7f704] hover:scale-110"
                aria-label="Instagram"
              >
                <InstagramLogo size={20} weight="regular" />
              </Link>

              <Link
                href="#"
                className="rounded-full p-1 text-white/40 transition-all duration-300 hover:text-[#f7f704] hover:scale-110"
                aria-label="LinkedIn"
              >
                <LinkedinLogo size={20} weight="regular" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}