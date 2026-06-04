"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Service = {
  _id: string;
  _type: string;
  order?: number | null;
  title: string;
  slug: {
    current: string;
  };
  tagline?: string | null;
  shortDescription?: string | null;
  image?: {
    alt?: string | null;
    asset?: {
      url: string;
    };
  };
};

type Props = {
  services: Service[];
  title?: string | null;
  intro?: string | null;
  color?: string | null;
  categorySlug: string;
  subcategorySlug?: string | null;
};

export function CategoryServiceListSection({
  services,
  title,
  intro,
  color = "#f7f704",
  categorySlug,
  subcategorySlug,
}: Props) {
  const [active, setActive] = useState(0);

  if (!services?.length) return null;

  const sortedServices = [...services].sort(
    (a, b) => (a.order ?? 999) - (b.order ?? 999)
  );

  const safeColor = color ?? "#f7f704";

  return (
    <section className="relative min-h-screen bg-black text-white">
      {/* Achtergrondgloed */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full blur-[150px] transition-all duration-1000" 
          style={{ backgroundColor: `${safeColor}15` }}
        />
      </div>

      <div className="relative mx-auto max-w-[1800px] px-6 py-32 lg:px-16">
        
        {/* INTRO */}
        <div className="mb-32 max-w-5xl">
          <div className="mb-8 flex items-center gap-4 overflow-hidden">
            <span
              className="h-px w-16"
              style={{ backgroundColor: safeColor }}
            />
            <span className="text-xs uppercase tracking-[0.35em] text-white/40">
              Onze oplossingen
            </span>
          </div>

          {title && (
            <h2 className="text-[clamp(3rem,6vw,8rem)] font-bold leading-[0.9] tracking-[-0.05em]">
              {title}
            </h2>
          )}

          {intro && (
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/50">
              {intro}
            </p>
          )}
        </div>

        {/* HOOFD GRID - ZONDER items-start! */}
        <div className="grid gap-16 lg:grid-cols-[1fr_45%] lg:gap-24 relative">
          
          {/* LINKS: SERVICE LIST */}
          <div className="space-y-3 pb-12">
            {sortedServices.map((service, index) => {
              const isActive = active === index;

              return (
                <Link
                  key={service._id}
                  href={
                    service._type === "service" && subcategorySlug
                      ? `/diensten/${categorySlug}/${subcategorySlug}/${service.slug.current}`
                      : `/diensten/${categorySlug}/${service.slug.current}`
                  }
                  onMouseEnter={() => setActive(index)}
                  className="group relative block"
                >
                  <div
                    className={`relative rounded-2xl p-8 transition-all duration-500 ${
                      isActive
                        ? "bg-white/5 backdrop-blur-md"
                        : "hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-start gap-6">
                      <div
                        className={`text-5xl font-black tabular-nums transition-all duration-500 ${
                          isActive
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600"
                            : "text-white/20 group-hover:text-white/40"
                        }`}
                        style={
                          isActive && safeColor !== "#f7f704"
                            ? { backgroundImage: `linear-gradient(to right, ${safeColor}, ${safeColor})` }
                            : undefined
                        }
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="flex-1">
                        {service.tagline && (
                          <div
                            className={`mb-3 text-xs uppercase tracking-[0.3em] transition-all duration-300 ${
                              isActive ? "opacity-100" : "text-white/40"
                            }`}
                            style={{ color: isActive ? safeColor : undefined }}
                          >
                            {service.tagline}
                          </div>
                        )}

                        <h3 className="text-3xl font-bold tracking-[-0.03em] transition-all duration-500 lg:text-4xl">
                          {service.title}
                        </h3>

                        {service.shortDescription && (
                          <p
                            className={`mt-4 max-w-md transition-all duration-300 text-sm leading-relaxed ${
                              isActive ? "text-white/70" : "text-white/30 group-hover:text-white/50"
                            }`}
                          >
                            {service.shortDescription}
                          </p>
                        )}
                      </div>

                      <div
                        className={`text-3xl transition-all duration-500 ${
                          isActive
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        }`}
                        style={{ color: safeColor }}
                      >
                        →
                      </div>
                    </div>
                  </div>

                  {isActive && (
                    <div
                      className="absolute -left-2 top-1/2 h-12 w-1 -translate-y-1/2 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                      style={{ backgroundColor: safeColor }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* RECHTS: STICKY IMAGE */}
          <div className="hidden lg:block relative">
            <div className="sticky top-[120px]">
              <div className="h-[calc(100vh-160px)]">
                <div className="relative h-full w-full overflow-hidden rounded-[32px] border border-white/10 bg-neutral-950 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
                  
                  {sortedServices.map((service, index) => {
                    if (!service.image?.asset?.url) return null;
                    const isActive = index === active;

                    return (
                      <div
                        key={service._id}
                        className="absolute inset-0 transform-gpu"
                        style={{
                          zIndex: isActive ? 20 : 10,
                          clipPath: isActive 
                            ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" 
                            : "polygon(0 0, 0 0, 0 100%, 0 100%)",
                          transition: "clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1)"
                        }}
                      >
                        <Image
                          src={service.image.asset.url}
                          alt={service.image.alt ?? service.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 45vw"
                          priority={index === 0}
                          className="object-cover object-center"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

                        <div className="absolute bottom-0 left-0 right-0 p-12 z-30">
                          <div
                            className={`transition-all duration-1000 ${
                              isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                          >
                            <p className="text-3xl font-bold text-white mb-2">
                              {service.title}
                            </p>
                            <div
                              className="h-[2px] rounded-full"
                              style={{
                                backgroundColor: safeColor,
                                width: isActive ? "48px" : "0px",
                                transition: "all .7s ease",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}