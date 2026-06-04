"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "@phosphor-icons/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const gevelreclame = [
  "Doosletters",
  "Freesletters",
  "Lichtbakken",
  "Uitsteekborden",
  "Belettering",
  "Neon signing",
]

const wayfinding = [
  "Wayfinding",
  "Pylonen",
  "Zuilen",
  "Routing",
]

const campaigns = [
  "Spandoeken",
  "Geveldoeken",
  "Bouwborden",
  "Tijdelijke signing",
]

const process = [
  {
    number: "01",
    title: "Analyse",
    text: "We analyseren zichtlijnen, locatie, architectuur en merkidentiteit om de juiste signing-oplossing te bepalen.",
    image: "/assets/images/process/analyse.webp",
  },
  {
    number: "02",
    title: "Concept",
    text: "Van eerste visualisaties tot technische uitwerking en materiaalkeuzes die perfect aansluiten op de omgeving.",
    image: "/assets/images/process/concept.webp",
  },
  {
    number: "03",
    title: "Productie",
    text: "Eigen productie met hoogwaardige materialen, precisie-afwerking en volledige kwaliteitscontrole.",
    image: "/assets/images/process/productie.webp",
  },
  {
    number: "04",
    title: "Montage",
    text: "Professionele plaatsing met aandacht voor detail, veiligheid en perfecte afwerking op locatie.",
    image: "/assets/images/process/montage.webp",
  },
]

export default function ExterieurPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // HERO
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
          y: 80,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
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
        
        {/* IMAGE */}
        <div className="absolute inset-0">
          <div className="parallax-image absolute inset-0 scale-105">
            <Image
              src="/assets/images/services/exterieur-hero.webp"
              alt="Exterieur signing"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 lg:px-10">
          
          <div className="max-w-5xl">
            
            <div className="hero-reveal flex items-center gap-4">
              <div className="h-px w-12 bg-[#f7f704]" />

              <p className="text-[11px] uppercase tracking-[0.28em] text-white/40">
                Exterieur signing
              </p>
            </div>

            <h1 className="hero-reveal mt-10 text-6xl font-semibold leading-[0.86] tracking-[-0.08em] text-white md:text-8xl lg:text-[160px]">
              Zichtbaarheid
              <br />
              die blijft
              <br />
              hangen.
            </h1>

            <p className="hero-reveal mt-10 max-w-2xl text-lg leading-[1.9] text-white/50 md:text-xl">
              Van gevelreclame en wayfinding tot tijdelijke campagnes.
              Exterieur signing die richting geeft aan je merk.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="relative z-10 -mt-32 pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          
          <div className="reveal-section grid gap-16 lg:grid-cols-12">
            
            <div className="lg:col-span-4">
              <p className="text-sm uppercase tracking-[0.24em] text-white/35">
                Buiten zichtbaar
              </p>
            </div>

            <div className="lg:col-span-8">
              <h2 className="text-5xl font-semibold leading-[1] tracking-[-0.06em] text-white md:text-7xl">
                Elke gevel
                <br />
                vertelt een verhaal.
              </h2>

              <p className="mt-10 max-w-2xl text-lg leading-[1.9] text-white/45">
                Exterieur signing bepaalt hoe een merk wordt ervaren.
                Van eerste indruk tot herkenbaarheid op afstand.
                Wij combineren zichtbaarheid, techniek en uitstraling
                in oplossingen die jarenlang impact maken.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GEVELRECLAME */}
      <section className="relative min-h-screen overflow-hidden">
        
        <div className="absolute inset-0">
          <div className="parallax-image absolute inset-0 scale-105">
            <Image
              src="/assets/images/services/gevelreclame.webp"
              alt="Gevelreclame"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-black/55" />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 lg:px-10">
          
          <div className="reveal-section max-w-3xl">
            
            <div className="mb-10 flex items-center gap-5">
              <span className="text-sm tracking-[0.24em] text-white/35">
                01
              </span>

              <div className="h-px w-16 bg-white/15" />
            </div>

            <h2 className="text-6xl font-semibold leading-[0.9] tracking-[-0.06em] md:text-8xl lg:text-[130px]">
              Gevel
              <br />
              reclame.
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-[1.8] text-white/50 md:text-xl">
              Van doosletters en lichtbakken tot opvallende
              uitsteekborden en neon signing.
            </p>

            <div className="mt-14 flex flex-col gap-4">
              {gevelreclame.map((service) => (
                <Link
                  key={service}
                  href={`/diensten/exterieur/${service
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="group flex items-center justify-between border-b border-white/[0.08] py-4 text-white/70 transition-all duration-300 hover:border-[#f7f704]/30 hover:text-white"
                >
                  <span className="text-2xl tracking-[-0.03em]">
                    {service}
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

      {/* WAYFINDING */}
      <section className="relative min-h-screen overflow-hidden">
        
        <div className="absolute inset-0">
          <div className="parallax-image absolute inset-0 scale-105">
            <Image
              src="/assets/images/services/bewegwijzering.webp"
              alt="Wayfinding"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-black/55" />

          <div className="absolute inset-0 bg-gradient-to-l from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-end px-6 lg:px-10">
          
          <div className="reveal-section max-w-3xl">
            
            <div className="mb-10 flex items-center gap-5">
              <span className="text-sm tracking-[0.24em] text-white/35">
                02
              </span>

              <div className="h-px w-16 bg-white/15" />
            </div>

            <h2 className="text-6xl font-semibold leading-[0.9] tracking-[-0.06em] md:text-8xl lg:text-[130px]">
              Beweg
              <br />
              wijzering.
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-[1.8] text-white/50 md:text-xl">
              Slimme routing en wayfinding systemen
              voor buitenruimtes en bedrijfslocaties.
            </p>

            <div className="mt-14 flex flex-col gap-4">
              {wayfinding.map((service) => (
                <Link
                  key={service}
                  href={`/diensten/exterieur/${service
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="group flex items-center justify-between border-b border-white/[0.08] py-4 text-white/70 transition-all duration-300 hover:border-[#f7f704]/30 hover:text-white"
                >
                  <span className="text-2xl tracking-[-0.03em]">
                    {service}
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

      {/* CAMPAIGNS */}
      <section className="relative min-h-screen overflow-hidden">
        
        <div className="absolute inset-0">
          <div className="parallax-image absolute inset-0 scale-105">
            <Image
              src="/assets/images/services/campagne.webp"
              alt="Campagnes"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 lg:px-10">
          
          <div className="reveal-section max-w-3xl">
            
            <div className="mb-10 flex items-center gap-5">
              <span className="text-sm tracking-[0.24em] text-white/35">
                03
              </span>

              <div className="h-px w-16 bg-white/15" />
            </div>

            <h2 className="text-6xl font-semibold leading-[0.9] tracking-[-0.06em] md:text-8xl lg:text-[130px]">
              Campagne
              <br />
              & tijdelijk.
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-[1.8] text-white/50 md:text-xl">
              Tijdelijke signing en campagne-uitingen
              met maximale zichtbaarheid.
            </p>

            <div className="mt-14 flex flex-col gap-4">
              {campaigns.map((service) => (
                <Link
                  key={service}
                  href={`/diensten/exterieur/${service
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="group flex items-center justify-between border-b border-white/[0.08] py-4 text-white/70 transition-all duration-300 hover:border-[#f7f704]/30 hover:text-white"
                >
                  <span className="text-2xl tracking-[-0.03em]">
                    {service}
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

      {/* PROCESS */}
      <section className="process-wrapper relative bg-black py-[25vh]">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-12 lg:px-10">
          
          {/* STICKY */}
          <div className="process-sticky h-fit lg:col-span-4 lg:top-32">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">
              Van visie tot montage
            </p>

            <h2 className="mt-8 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-7xl">
              Ons
              <br />
              proces.
            </h2>
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
                Exterieur
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
                    src={`/assets/images/projects/project-${item}.webp`}
                    alt="Project"
                    fill
                    className="object-cover transition-transform duration-[1600ms] group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 z-10 p-8 md:p-10">
                  <p className="text-sm uppercase tracking-[0.24em] text-white/40">
                    Gevelreclame
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
            Van gevel
            <br />
            tot herkenbaarheid.
          </h2>

          <p className="mx-auto mt-10 max-w-2xl text-lg leading-[1.9] text-white/45 md:text-xl">
            Samen realiseren we exterieur signing die
            aandacht trekt én professioneel aanvoelt.
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