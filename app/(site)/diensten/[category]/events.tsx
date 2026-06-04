"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "@phosphor-icons/react"
import gsap from "gsap"

const services = [
  {
    id: "branding",
    number: "01",
    title: "Event Branding",
    slug: "event-branding",
    description:
      "Eén visuele lijn, van entree tot podium.",
    image: "/assets/images/events/event-branding.webp",
    services: [
      "Entree branding",
      "Backdrops & fotowanden",
      "Branding op wanden en vloeren",
      "Sponsoruitingen",
      "Visuele eventconcepten",
    ],
  },

  {
    id: "constructies",
    number: "02",
    title: "Constructies",
    slug: "tijdelijke-constructies-frames",
    description:
      "Flexibel, stevig en herbruikbaar.",
    image: "/assets/images/events/constructies.webp",
    services: [
      "Aluminium frames",
      "Textielframes",
      "Modulaire constructies",
      "Pop-up systemen",
      "Beurswanden",
    ],
  },

  {
    id: "routing",
    number: "03",
    title: "Routing",
    slug: "event-bewegwijzering-routing",
    description:
      "Bezoekers moeiteloos de juiste kant op.",
    image: "/assets/images/events/routing.webp",
    services: [
      "Routingborden",
      "Vloerstickers",
      "Hangende signage",
      "Informatiezuilen",
      "Wayfinding systemen",
    ],
  },

  {
    id: "outdoor",
    number: "04",
    title: "Outdoor",
    slug: "outdoor-event-signing",
    description:
      "Zichtbaarheid, ook buiten.",
    image: "/assets/images/events/outdoor.webp",
    services: [
      "Dranghekbanners",
      "Bouwhekdoeken",
      "Vlaggen & masten",
      "Geveldoeken",
      "Weerbestendige signing",
    ],
  },

  {
    id: "podium",
    number: "05",
    title: "Podium",
    slug: "podium-presentatie-signing",
    description:
      "Focus op de boodschap.",
    image: "/assets/images/events/podium.webp",
    services: [
      "Podiumbranding",
      "LED schermen",
      "Presentatiepanelen",
      "Desk branding",
      "Sprekersachtergronden",
    ],
  },

  {
    id: "beurs",
    number: "06",
    title: "Beurs",
    slug: "beurs-stand-signing",
    description:
      "Opvallen op de vierkante meter.",
    image: "/assets/images/events/beurs.webp",
    services: [
      "Standwanden",
      "Textielframes",
      "Hangende elementen",
      "Baliebranding",
      "Beursgraphics",
    ],
  },
]

export default function EventsPage() {
  const [active, setActive] = useState(services[0])

  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      {
        scale: 1.08,
        opacity: 0.7,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      }
    )

    gsap.fromTo(
      contentRef.current,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }
    )
  }, [active])

  return (
    <main className="overflow-hidden bg-black text-white">
      
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">
        
        <div className="absolute inset-0">
          
          <Image
            src="/assets/images/events/events-hero.webp"
            alt="Events"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/70" />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 lg:px-10">
          
          <div className="max-w-5xl">
            
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/60 backdrop-blur-sm">
              
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f7f704] opacity-75" />

                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#f7f704]" />
              </span>

              Event & beurs signing
            </div>

            <h1 className="mt-8 text-6xl font-semibold leading-[0.82] tracking-[-0.08em] text-white md:text-8xl lg:text-[170px]">
              Events
              <br />
              die blijven
              <br />
              hangen.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-[1.9] text-white/50 md:text-xl">
              Van beursstands en routing tot complete event branding
              en tijdelijke constructies.
            </p>
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="relative border-t border-white/[0.08] py-24">
        
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          
          {/* TOP */}
          <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">
                Onze diensten
              </p>

              <h2 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-7xl">
                Eén systeem.
                <br />
                Alle impact.
              </h2>
            </div>

            <p className="max-w-md text-lg leading-[1.8] text-white/45">
              Geen eindeloze pagina’s.
              Gewoon één krachtige showcase waarin alle eventdiensten samenkomen.
            </p>
          </div>

          {/* TABS */}
          <div className="hide-scrollbar mb-10 overflow-x-auto">
            
            <div className="flex min-w-max gap-3">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActive(service)}
                  className={`rounded-full border px-5 py-3 text-sm uppercase tracking-[0.18em] transition-all duration-500 ${
                    active.id === service.id
                      ? "border-[#f7f704] bg-[#f7f704] text-black"
                      : "border-white/10 bg-white/[0.03] text-white/40 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </div>

          {/* MAIN SHOWCASE */}
          <div className="grid gap-10 lg:grid-cols-12">
            
            {/* IMAGE */}
            <div className="lg:col-span-7">
              
              <div
                ref={imageRef}
                className="relative aspect-[4/5] overflow-hidden rounded-[32px] md:aspect-[16/10]"
              >
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                {/* FLOATING NUMBER */}
                <div className="absolute left-8 top-8 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-xl">
                  
                  <span className="text-sm tracking-[0.24em] text-[#f7f704]">
                    {active.number}
                  </span>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div
              ref={contentRef}
              className="flex flex-col justify-center lg:col-span-5"
            >
              <h3 className="text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white md:text-6xl">
                {active.title}
              </h3>

              <p className="mt-8 max-w-lg text-lg leading-[1.9] text-white/45">
                {active.description}
              </p>

              {/* SERVICES */}
              <div className="mt-12 flex flex-col">
                {active.services.map((service) => (
                  <div
                    key={service}
                    className="group flex items-center justify-between border-b border-white/[0.08] py-5"
                  >
                    <span className="text-xl tracking-[-0.03em] text-white/75 transition-colors duration-300 group-hover:text-white">
                      {service}
                    </span>

                    <ArrowUpRight
                      size={18}
                      weight="bold"
                      className="text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#f7f704]"
                    />
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-12">
                <Link
                  href={`/diensten/events/${active.slug}`}
                  className="group inline-flex items-center gap-4 rounded-full bg-[#f7f704] px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-black transition-all duration-500 hover:scale-[1.02]"
                >
                  Bekijk service

                  <ArrowUpRight
                    size={18}
                    weight="bold"
                    className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section className="border-t border-white/[0.08] py-28">
        
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          
          <div className="flex items-end justify-between">
            
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">
                Recent werk
              </p>

              <h2 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-7xl">
                Event
                <br />
                projecten.
              </h2>
            </div>

            <Link
              href="/projecten"
              className="group hidden items-center gap-4 text-sm uppercase tracking-[0.18em] text-white/40 transition-colors duration-300 hover:text-[#f7f704] md:flex"
            >
              Bekijk alle projecten

              <ArrowUpRight
                size={18}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>

          {/* CASES */}
          <div className="hide-scrollbar mt-20 flex gap-6 overflow-x-auto pb-6">
            
            {[1, 2, 3].map((item) => (
              <Link
                key={item}
                href="/projecten"
                className="group relative min-w-[85vw] overflow-hidden rounded-[32px] md:min-w-[42vw]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  
                  <Image
                    src={`/assets/images/projects/event-${item}.webp`}
                    alt="Event project"
                    fill
                    className="object-cover transition-transform duration-[1600ms] group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 z-10 p-8 md:p-10">
                  
                  <p className="text-sm uppercase tracking-[0.24em] text-white/40">
                    Event branding
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

        <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
          
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">
            Klaar voor impact?
          </p>

          <h2 className="mt-10 text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white md:text-7xl lg:text-[110px]">
            Van beurs
            <br />
            tot merkbeleving.
          </h2>

          <p className="mx-auto mt-10 max-w-2xl text-lg leading-[1.9] text-white/45 md:text-xl">
            Wij creëren event signing die bezoekers begeleidt,
            merken versterkt en ervaringen onvergetelijk maakt.
          </p>

          <div className="mt-14">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 rounded-full bg-[#f7f704] px-8 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-black transition-all duration-500 hover:scale-[1.02]"
            >
              Event bespreken

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