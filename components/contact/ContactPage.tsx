"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ArrowUpRight,
  MapPin,
  Phone,
  EnvelopeSimple,
} from "@phosphor-icons/react"

gsap.registerPlugin(ScrollTrigger)

const services = [
  "Interieur",
  "Exterieur",
  "Voertuigen",
  "Events",
]

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      )

      gsap.to(".contact-glow", {
        y: -80,
        x: 40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black text-white"
    >
      {/* TOP SPACING */}
      <div className="h-32 md:h-40" />

      {/* AMBIENT LIGHT */}
      <div className="contact-glow absolute left-[15%] top-[20%] h-[900px] w-[900px] rounded-full bg-[#f7f704]/[0.07] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        
        {/* HERO */}
        <div className="max-w-5xl">
          <p className="contact-reveal text-sm uppercase tracking-[0.24em] text-white/35">
            Contact
          </p>

          <h1 className="contact-reveal mt-8 text-6xl font-semibold leading-[0.82] tracking-[-0.08em] text-white md:text-8xl lg:text-[120px]">
            Laten we iets
            <br />
            zichtbaar maken.
          </h1>

          <p className="contact-reveal mt-10 max-w-2xl text-lg leading-[1.7] text-white/55 md:text-xl">
            Vertel ons over je project, ruimte of merkbeleving.
            Van eerste concept tot volledige realisatie.
          </p>
        </div>

        {/* MAIN GRID */}
        <div
          ref={contentRef}
          className="mt-32 grid gap-24 border-t border-white/10 pt-20 lg:grid-cols-12"
        >
          {/* LEFT SIDE */}
          <div className="lg:col-span-5">
            
            {/* CONTACT INFO */}
            <div className="contact-reveal">
              <p className="text-sm uppercase tracking-[0.24em] text-white/35">
                Contactgegevens
              </p>

              <div className="mt-10 space-y-10">
                
                <div className="flex items-start gap-4">
                  <EnvelopeSimple
                    size={22}
                    weight="regular"
                    className="mt-1 text-[#f7f704]"
                  />

                  <div>
                    <p className="text-sm text-white/35">
                      E-mail
                    </p>

                    <a
                      href="mailto:info@maky.nl"
                      className="mt-2 inline-block text-2xl font-medium tracking-[-0.03em] text-white transition-colors duration-300 hover:text-[#f7f704]"
                    >
                      info@maky.nl
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone
                    size={22}
                    weight="regular"
                    className="mt-1 text-[#f7f704]"
                  />

                  <div>
                    <p className="text-sm text-white/35">
                      Telefoon
                    </p>

                    <a
                      href="tel:+310612345678"
                      className="mt-2 inline-block text-2xl font-medium tracking-[-0.03em] text-white transition-colors duration-300 hover:text-[#f7f704]"
                    >
                      +31 (0)6 12 34 56 78
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin
                    size={22}
                    weight="regular"
                    className="mt-1 text-[#f7f704]"
                  />

                  <div>
                    <p className="text-sm text-white/35">
                      Locatie
                    </p>

                    <p className="mt-2 text-2xl font-medium tracking-[-0.03em] text-white">
                      Almere
                      <br />
                      Nederland
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SERVICES */}
            <div className="contact-reveal mt-24">
              <p className="text-sm uppercase tracking-[0.24em] text-white/35">
                Diensten
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                {services.map((service) => (
                  <button
                    key={service}
                    className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-7">
            <form className="contact-reveal">
              
              {/* NAME */}
              <div className="border-b border-white/10 pb-8">
                <label className="block text-sm uppercase tracking-[0.2em] text-white/35">
                  Naam
                </label>

                <input
                  type="text"
                  placeholder="Jouw naam"
                  className="mt-6 w-full bg-transparent text-3xl tracking-[-0.03em] text-white outline-none placeholder:text-white/20"
                />
              </div>

              {/* COMPANY */}
              <div className="border-b border-white/10 py-8">
                <label className="block text-sm uppercase tracking-[0.2em] text-white/35">
                  Bedrijf
                </label>

                <input
                  type="text"
                  placeholder="Bedrijfsnaam"
                  className="mt-6 w-full bg-transparent text-3xl tracking-[-0.03em] text-white outline-none placeholder:text-white/20"
                />
              </div>

              {/* EMAIL */}
              <div className="border-b border-white/10 py-8">
                <label className="block text-sm uppercase tracking-[0.2em] text-white/35">
                  E-mail
                </label>

                <input
                  type="email"
                  placeholder="naam@bedrijf.nl"
                  className="mt-6 w-full bg-transparent text-3xl tracking-[-0.03em] text-white outline-none placeholder:text-white/20"
                />
              </div>

              {/* MESSAGE */}
              <div className="border-b border-white/10 py-8">
                <label className="block text-sm uppercase tracking-[0.2em] text-white/35">
                  Projectomschrijving
                </label>

                <textarea
                  rows={5}
                  placeholder="Vertel ons meer over het project..."
                  className="mt-6 w-full resize-none bg-transparent text-3xl leading-[1.3] tracking-[-0.03em] text-white outline-none placeholder:text-white/20"
                />
              </div>

              {/* BUTTON */}
              <div className="pt-12">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-4 rounded-full bg-[#f7f704] px-8 py-5 text-sm font-semibold text-black transition-colors duration-300 hover:bg-white"
                >
                  Project versturen

                  <ArrowUpRight
                    size={20}
                    weight="bold"
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* BOTTOM SPACING */}
        <div className="h-40 md:h-56" />
      </div>
    </section>
  )
}