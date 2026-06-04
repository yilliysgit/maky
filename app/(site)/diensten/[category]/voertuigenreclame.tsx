"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "@phosphor-icons/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const vehicleServices = [
  {
    number: "01",
    title: "Carwrapping",
    description:
      "Maximale impact, elke kilometer opnieuw zichtbaar.",
    image: "/assets/images/vehicles/carwrapping.webp",
    services: [
      "Full wrap",
      "Partial wrap",
      "Kleurwisseling",
      "PPF (Paint Protection Film)",
      "Speciale finishes",
    ],
  },

  {
    number: "02",
    title: "Belettering",
    description:
      "Duidelijke communicatie, professioneel en herkenbaar onderweg.",
    image: "/assets/images/vehicles/belettering.webp",
    services: [
      "Volledige belettering",
      "Gedeeltelijke belettering",
      "Magneetbelettering",
      "One-way vision folie",
      "Reflecterende elementen",
    ],
  },

  {
    number: "03",
    title: "Fleetbranding",
    description:
      "Eén herkenbare uitstraling voor het volledige wagenpark.",
    image: "/assets/images/vehicles/fleetbranding.webp",
    services: [
      "Wagenpark belettering",
      "Wagenpark wrapping",
      "Huisstijl op voertuigen",
      "Uniforme branding",
      "Multi-location uitrol",
    ],
  },
]

const process = [
  {
    number: "01",
    title: "Analyse",
    text: "We analyseren voertuigen, zichtbaarheid en merkidentiteit om maximale impact onderweg te creëren.",
    image: "/assets/images/process/vehicle-analyse.webp",
  },
  {
    number: "02",
    title: "Concept",
    text: "Van visualisatie tot technische uitwerking en materiaalkeuze. Alles ontworpen voor uitstraling én duurzaamheid.",
    image: "/assets/images/process/vehicle-concept.webp",
  },
  {
    number: "03",
    title: "Productie",
    text: "Precisieprint, hoogwaardige folies en perfecte afwerking voor een premium resultaat onderweg.",
    image: "/assets/images/process/vehicle-productie.webp",
  },
  {
    number: "04",
    title: "Montage",
    text: "Professionele montage met oog voor detail, duurzaamheid en perfecte positionering op elk voertuig.",
    image: "/assets/images/process/vehicle-montage.webp",
  },
]

export default function VehiclesPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // HERO REVEAL
      gsap.from(".hero-reveal", {
        opacity: 0,
        y: 80,
        duration: 1.2,
        stagger: 0.12,
        ease: "power3.out",
      })

      // PARALLAX IMAGES
      gsap.utils.toArray(".parallax-image").forEach((img: any) => {
        gsap.to(img, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })

      // REVEALS
      gsap.utils.toArray(".reveal-section").forEach((section: any) => {
        gsap.from(section, {
          opacity: 0,
          y: 100,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
          },
        })
      })

      // PROCESS PIN
      ScrollTrigger.create({
        trigger: ".process-wrapper",
        start: "top top",
        end: "bottom bottom",
        pin: ".process-sticky",
        scrub: true,
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <main
      ref={pageRef}
      className="overflow-hidden bg-black text-white"
    >
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">
        
        <div className="absolute inset-0">
          
          <div className="parallax-image absolute inset-0 scale-105">
            <Image
              src="/assets/images/vehicles/vehicles-hero.webp"
              alt="Voertuigreclame"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-black/65" />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 lg:px-10">
          
          <div className="max-w-5xl">
            
            <div className="hero-reveal flex items-center gap-4">
              <div className="h-px w-12 bg-[#f7f704]" />

              <p className="text-[11px] uppercase tracking-[0.28em] text-white/40">
                Voertuigreclame
              </p>
            </div>

            <h1 className="hero-reveal mt-10 text-6xl font-semibold leading-[0.84] tracking-[-0.08em] text-white md:text-8xl lg:text-[170px]">
              Onderweg
              <br />
              zichtbaar.
            </h1>

            <p className="hero-reveal mt-10 max-w-2xl text-lg leading-[1.9] text-white/50 md:text-xl">
              Van carwrapping en voertuigbelettering tot complete fleetbranding.
              Reclame die elke kilometer impact maakt.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="relative z-10 -mt-24 pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          
          <div className="reveal-section grid gap-16 lg:grid-cols-12">
            
            <div className="lg:col-span-4">
              <p className="text-sm uppercase tracking-[0.24em] text-white/35">
                Altijd in beweging
              </p>
            </div>

            <div className="lg:col-span-8">
              <h2 className="text-5xl font-semibold leading-[1] tracking-[-0.06em] text-white md:text-7xl">
                Elke rit
                <br />
                wordt reclame.
              </h2>

              <p className="mt-10 max-w-2xl text-lg leading-[1.9] text-white/45">
                Voertuigreclame combineert zichtbaarheid, herkenbaarheid en uitstraling.
                Van één bestelwagen tot complete wagenparken.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      {vehicleServices.map((service, index) => (
        <section
          key={service.title}
          className="relative min-h-screen overflow-hidden"
        >
          <div className="absolute inset-0">
            
            <div className="parallax-image absolute inset-0 scale-105">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-black/60" />

            <div
              className={`absolute inset-0 ${
                index % 2 === 0
                  ? "bg-gradient-to-r from-black via-black/40 to-transparent"
                  : "bg-gradient-to-l from-black via-black/40 to-transparent"
              }`}
            />
          </div>

          <div
            className={`relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 lg:px-10 ${
              index % 2 !== 0 ? "justify-end" : ""
            }`}
          >
            <div className="reveal-section max-w-3xl">
              
              <div className="mb-10 flex items-center gap-5">
                <span className="text-sm tracking-[0.24em] text-white/35">
                  {service.number}
                </span>

                <div className="h-px w-16 bg-white/15" />
              </div>

              <h2 className="text-6xl font-semibold leading-[0.9] tracking-[-0.06em] md:text-8xl lg:text-[130px]">
                {service.title}
              </h2>

              <p className="mt-8 max-w-xl text-lg leading-[1.8] text-white/50 md:text-xl">
                {service.description}
              </p>

              {/* SUBSERVICES */}
              <div className="mt-14 flex flex-col gap-4">
                {service.services.map((sub) => (
                  <Link
                    key={sub}
                    href={`/diensten/voertuigen/${sub
                      .toLowerCase()
                      .replace(/[()]/g, "")
                      .replace(/\s+/g, "-")}`}
                    className="group flex items-center justify-between border-b border-white/[0.08] py-4 text-white/70 transition-all duration-300 hover:border-[#f7f704]/30 hover:text-white"
                  >
                    <span className="text-2xl tracking-[-0.03em]">
                      {sub}
                    </span>

                    <ArrowUpRight
                      size={20}
                      weight="bold"
                      className="text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#f7f704]"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* PROCESS */}
      <section className="process-wrapper relative border-t border-white/[0.08] bg-black py-[24vh]">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-12 lg:px-10">
          
          {/* STICKY */}
          <div className="process-sticky h-fit lg:col-span-4 lg:top-32">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">
              Van concept tot montage
            </p>

            <h2 className="mt-8 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-7xl">
              Ons
              <br />
              proces.
            </h2>

            <p className="mt-8 max-w-sm text-lg leading-[1.8] text-white/45">
              Van eerste ontwerp tot perfecte plaatsing.
              Elk voertuig wordt ontworpen om onderweg maximale impact te maken.
            </p>
          </div>

          {/* STEPS */}
          <div className="space-y-[18vh] lg:col-span-8">
            {process.map((step) => (
              <div
                key={step.number}
                className="reveal-section"
              >
                <div className="overflow-hidden rounded-[32px]">
                  <div className="relative aspect-[16/10]">
                    
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                </div>

                <div className="mt-10 flex items-center gap-5">
                  <span className="text-sm tracking-[0.24em] text-[#f7f704]">
                    {step.number}
                  </span>

                  <div className="h-px w-16 bg-white/10" />
                </div>

                <h3 className="mt-6 text-5xl font-semibold tracking-[-0.05em] text-white">
                  {step.title}
                </h3>

                <p className="mt-6 max-w-2xl text-lg leading-[1.9] text-white/45">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section className="relative border-t border-white/[0.08] py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">
                Recent werk
              </p>

              <h2 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white md:text-7xl">
                Voertuig
                <br />
                projecten.
              </h2>
            </div>

            <Link
              href="/projecten"
              className="group hidden items-center gap-4 text-sm uppercase tracking-[0.24em] text-white/40 transition-colors duration-300 hover:text-[#f7f704] md:flex"
            >
              Bekijk alle projecten

              <ArrowUpRight
                size={18}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>

          {/* HORIZONTAL CASES */}
          <div className="mt-20 flex gap-6 overflow-x-auto pb-6">
            {[1, 2, 3].map((item) => (
              <Link
                key={item}
                href="/projecten"
                className="group relative min-w-[85vw] overflow-hidden rounded-[32px] md:min-w-[42vw]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  
                  <Image
                    src={`/assets/images/projects/vehicle-${item}.webp`}
                    alt="Voertuig project"
                    fill
                    className="object-cover transition-transform duration-[1600ms] group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 z-10 p-8 md:p-10">
                  <p className="text-sm uppercase tracking-[0.24em] text-white/40">
                    Carwrapping
                  </p>

                  <h3 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white">
                    Project naam
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-white/[0.08] py-40">
        
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f7f704]/[0.04] blur-[160px]" />

        <div className="reveal-section relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-10">
          
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">
            Klaar om zichtbaar te worden?
          </p>

          <h2 className="mt-10 text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white md:text-7xl lg:text-[110px]">
            Onderweg
            <br />
            herkenbaar.
          </h2>

          <p className="mx-auto mt-10 max-w-2xl text-lg leading-[1.9] text-white/45 md:text-xl">
            Van één voertuig tot complete fleets.
            Wij creëren voertuigreclame die blijft opvallen.
          </p>

          <div className="mt-14">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 rounded-full bg-[#f7f704] px-8 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-black transition-all duration-500 hover:scale-[1.02]"
            >
              Project bespreken

              <ArrowUpRight
                size={18}
                weight="bold"
                className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}