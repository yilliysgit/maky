"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import Image from "next/image";

// Importeer hier al je frontend blok-componenten
import { ImageTextSection } from "@/components/categories/ImageTextSection";
import { CategoryIntroSection } from "@/components/categories/CategoryIntroSection";
import UspSection from "@/components/categories/UspSection";
import { ProductStylesSection } from "./ProductStylesSection";
import { MaterialSamplesSection } from "@/components/categories/MaterialSamplesSection";
import { PopupProjectsSection } from "@/components/categories/PopupProjectsSection";
import ProcessSection from "./ProcessSection";
import CategoryRelatedServicesSection from "@/components/categories/CategoryRelatedServicesSection";

import CTASection from "@/components/categories/CTASection";

const FONT = "var(--font-sans)";

interface SubServiceItem {
  id: string;
  num: string;
  title: string;
  description: string;
  imageUrl: string;
  categorySlug?: string;
  layerSections?: any[];
}

interface SubServiceSelectorProps {
  label?: string;
  title?: string;
  items: SubServiceItem[];
  color?: string | null;
}

interface RelatedService {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

export function SubServiceSelector({
  label,
  title: sectionTitle,
  items,
  color,
}: SubServiceSelectorProps) {
  const accentColor = color ?? "#f7f704";
  const [activeItem, setActiveItem] = useState<SubServiceItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Cinematic hover preview kaart op de hoofdpagina
  useEffect(() => {
    if (!sectionRef.current || !imageRevealRef.current || items.length === 0)
      return;

    const container = sectionRef.current;
    const imageReveal = imageRevealRef.current;

    const xTo = gsap.quickTo(imageReveal, "x", {
      duration: 0.7,
      ease: "power4.out",
    });
    const yTo = gsap.quickTo(imageReveal, "y", {
      duration: 0.7,
      ease: "power4.out",
    });
    const rotationTo = gsap.quickTo(imageReveal, "rotation", {
      duration: 0.7,
      ease: "power4.out",
    });

    let oldX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const speedX = x - oldX;
      oldX = x;
      const rotation = gsap.utils.clamp(-8, 8, speedX * 0.12);

      xTo(x);
      yTo(y);
      rotationTo(rotation);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [items]);

  const openLayer = (item: SubServiceItem) => {
    setActiveItem(item);
    document.body.setAttribute("data-lenis-prevent", "true");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      const tl = gsap.timeline();
      tl.to(
        sectionRef.current,
        {
          scale: 0.95,
          filter: "blur(6px)",
          opacity: 0.4,
          duration: 0.9,
          ease: "power4.inOut",
        },
        0,
      );

      tl.to(overlayRef.current, { opacity: 1, duration: 0.4 }, 0)
        .fromTo(
          layerRef.current,
          { yPercent: 100 },
          { yPercent: 0, duration: 0.9, ease: "power4.out" },
          "-=0.3",
        )
        .fromTo(
          ".immersive-anim",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.5",
        );
    }, 10);
  };

  const closeLayer = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveItem(null);
        document.body.removeAttribute("data-lenis-prevent");
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      },
    });

    tl.to(
      sectionRef.current,
      {
        scale: 1,
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.7,
        ease: "power4.out",
      },
      0,
    );

    tl.to(
      layerRef.current,
      { yPercent: 100, duration: 0.6, ease: "power4.inOut" },
      0,
    ).to(overlayRef.current, { opacity: 0, duration: 0.4 }, "-=0.3");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLayer();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem]);

  if (!items || items.length === 0) return null;

  return (
    <>
      {/* HOOFDSECTIE OP DE SERVICEPAGINA */}
      <section
        ref={sectionRef}
        className="w-full bg-[#050505] text-white px-6 lg:px-20 py-36 border-b border-white/[0.04] relative overflow-hidden will-change-transform origin-center"
      >
        {/* IMAGE HOVER REVEAL */}
        <div
          ref={imageRevealRef}
          className="absolute top-0 left-0 pointer-events-none z-30 hidden lg:block -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{
            opacity: hoveredId ? 1 : 0,
            transform: hoveredId ? "scale(1)" : "scale(0.8)",
            transition:
              "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="relative aspect-[4/5] w-[380px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.9)] bg-[#0a0a0a]">
            {items.map((item) => (
              <div
                key={item.id}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: hoveredId === item.id ? 1 : 0 }}
              >
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt=""
                    fill
                    sizes="380px"
                    className="object-cover object-center"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-[1600px] relative z-10">
          <div className="mb-32">
            <span
              style={{ color: `${accentColor}60` }}
              className="text-xs font-bold uppercase tracking-[0.25em]"
            >
              {label || "Klasse Architectuur & Signage"}
            </span>
            <h2 className="text-2xl font-light text-neutral-400 tracking-tight mt-4 max-w-xl">
              {sectionTitle ||
                "Selecteer een structuurklasse om de technische blauwdrukken te openen."}
            </h2>
          </div>

          {/* GROTE TYPOGRAFISCHE LIJST */}
          <div className="flex flex-col border-t border-white/[0.06]">
            {items.map((item, idx) => {
              const isAnyHovered = hoveredId !== null;
              const isCurrentHovered = hoveredId === item.id;
              const displayNum = item.num || `0${idx + 1}`;

              return (
                <div
                  key={item.id}
                  onClick={() => openLayer(item)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group w-full flex items-center justify-between py-12 md:py-16 border-b border-white/[0.06] cursor-pointer select-none transition-opacity duration-500"
                  style={{
                    opacity: isAnyHovered && !isCurrentHovered ? 0.15 : 1,
                  }}
                >
                  <div className="flex items-center gap-12 lg:gap-24 flex-grow">
                    <span
                      className="text-sm font-bold tracking-widest transition-all duration-500 font-mono w-16"
                      style={{
                        color: isCurrentHovered
                          ? accentColor
                          : "rgba(255,255,255,0.15)",
                      }}
                    >
                      {isCurrentHovered
                        ? `${displayNum} / ${String(items.length).padStart(2, "0")}`
                        : displayNum}
                    </span>
                    <h3
                      className="text-[clamp(40px,6.5vw,110px)] font-black uppercase tracking-[-0.04em] leading-[0.9] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:translate-x-6"
                      style={{
                        fontFamily: FONT,
                        color: isCurrentHovered ? accentColor : "#ffffff",
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <div className="shrink-0 pl-6 hidden md:block">
                    <span
                      className="text-3xl font-light transition-all duration-500 inline-block group-hover:translate-x-2"
                      style={{
                        color: isCurrentHovered
                          ? accentColor
                          : "rgba(255,255,255,0.1)",
                        transform: isCurrentHovered
                          ? "scale(1.2) translateX(8px)"
                          : "scale(1)",
                      }}
                    >
                      →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MINI LANDINGSPAGINA POP-UP LAYER */}
      {activeItem &&
        mounted &&
        createPortal(
          <div
            ref={overlayRef}
            className="fixed inset-0 z-[99999] opacity-0 bg-black/50 overflow-hidden flex justify-end"
            onClick={closeLayer}
          >
            {/* SLUITBALK EN HEADER CONTROLS */}
            <div className="absolute top-0 left-0 z-[100] w-full flex justify-between items-center px-6 lg:px-20 py-6 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.04]">
              <div className="flex items-center gap-4">
                <span className="text-xs font-black tracking-widest text-neutral-400 uppercase">
                  MAKY Studio
                </span>
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  {activeItem.title}
                </span>
              </div>
              <button
                onClick={closeLayer}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors group text-neutral-400"
              >
                Sluiten [ESC]
                <span
                  className="inline-block transition-transform group-hover:rotate-90 duration-300"
                  style={{ color: accentColor }}
                >
                  ✕
                </span>
              </button>
            </div>

            {/* CONTENT VAN DE MINI LANDINGSPAGINA */}
            <div
              ref={layerRef}
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="w-full h-full overflow-y-auto bg-[#0a0a0a] border-t md:border-t-0 md:border-l border-white/[0.08] relative flex flex-col scroll-smooth overscroll-contain"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto max-w-[1400px] w-full px-6 lg:px-20 pt-[160px] pb-24 flex-grow">
                {/* INTRODUCTIE BLOCK */}
                <div className="max-w-4xl immersive-anim mb-10">
                  <h4
                    className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-[-0.04em] leading-[0.85] text-white"
                    style={{ fontFamily: FONT }}
                  >
                    {activeItem.title}
                    <span style={{ color: accentColor }}>.</span>
                  </h4>
                  {activeItem.description && (
                    <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed font-light tracking-wide mt-8 max-w-3xl">
                      {activeItem.description}
                    </p>
                  )}
                </div>

                {/* INTRO HOOFDAFBEELDING */}
                {activeItem.imageUrl && (
                  <div className="relative aspect-[16/8] w-full overflow-hidden rounded-2xl border border-white/[0.08] mb-24 immersive-anim bg-neutral-950">
                    <Image
                      src={activeItem.imageUrl}
                      alt={activeItem.title}
                      fill
                      priority
                      className="object-cover object-center opacity-90 transition-transform duration-[2000ms] hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                )}

                {/* DYNAMISCHE PAGINABUILDER BLOKKEN UIT SANITY */}
                {activeItem.layerSections &&
                  activeItem.layerSections.length > 0 && (
                    <div className="w-full flex flex-col gap-24 immersive-anim">
                      {activeItem.layerSections.map(
                        (layerSection: any, idx: number) => {
                          const hasFaq =
                            layerSection.items &&
                            layerSection.items.length > 0 &&
                            layerSection.items[0].question;
                          const hasCta =
                            layerSection.cta &&
                            (layerSection.cta.label || layerSection.cta.url);

                          return (
                            <div key={idx} className="flex flex-col gap-24">
                              {/* DE SWITCH CODES VOOR DE BLOKKEN */}
                              {(() => {
                                switch (layerSection._type) {
                                  case "categoryIntroSection":
                                    return (
                                      <div className="border-t border-white/[0.06] pt-16">
                                        <CategoryIntroSection
                                          title={layerSection.title}
                                          text={layerSection.text}
                                          color={accentColor}
                                        />
                                      </div>
                                    );

                                  case "imageTextSection":
                                    return (
                                      <div className="border-t border-white/[0.06] pt-16">
                                        <ImageTextSection
                                          label={layerSection.label}
                                          title={layerSection.title}
                                          text={layerSection.text}
                                          bulletPoints={
                                            layerSection.bulletPoints
                                          }
                                          imagePosition={
                                            layerSection.imagePosition
                                          }
                                          image={layerSection.image}
                                          cta={layerSection.cta}
                                          color={accentColor}
                                        />
                                      </div>
                                    );

                                  case "productStylesSection":
                                    return (
                                      <div className="border-t border-white/[0.06] pt-16">
                                        <ProductStylesSection
                                          label={layerSection.label}
                                          title={layerSection.title}
                                          styles={layerSection.styles}
                                          color={accentColor}
                                        />
                                      </div>
                                    );

                                  case "materialSamplesSection":
                                    return (
                                      <div className="border-t border-white/[0.06] pt-16">
                                        <MaterialSamplesSection
                                          label={layerSection.label}
                                          title={layerSection.title}
                                          materials={layerSection.materials}
                                          color={accentColor}
                                        />
                                      </div>
                                    );

                                  case "makyPopupPortfolio":
                                    return (
                                      <div className="border-t border-white/[0.06] pt-16">
                                        <PopupProjectsSection
                                          label={layerSection.label}
                                          title={layerSection.title}
                                          projects={layerSection.projects}
                                          color={accentColor}
                                        />
                                      </div>
                                    );

                                  case "relatedServicesSection": {
                                    const relatedItems = layerSection.services || [];
                                    if (relatedItems.length === 0) return null;

                                    const currentCategory = items[0]?.categorySlug || "gevelreclame";

                                    const mappedForComponent = relatedItems.map((item: any) => {
                                      // Zorg dat we ALTIJD een unieke ID hebben voor React's key-prop
                                      const uniqueId = item.id || item._id || Math.random().toString();
                                      const realSlug = item.slug?.current || "service";
                                      
                                      return {
                                        // We sturen ze voor de veiligheid allebei mee, zo mist CategoryRelatedServicesSection nooit zijn key!
                                        _id: uniqueId,
                                        id: uniqueId,
                                        title: item.title,
                                        shortDescription: item.shortDescription || item.description,
                                        slug: { current: realSlug },
                                        image: {
                                          alt: item.image?.alt || item.title,
                                          asset: {
                                            url: item.image?.asset?.url || item.imageUrl || ""
                                          }
                                        }
                                      };
                                    });

                                    return (
                                      <div 
                                        key={idx}
                                        className="border-t border-white/[0.06] pt-16 clear-both block w-full relative"
                                        onClickCapture={(e) => {
                                          const anchor = (e.target as HTMLElement).closest("a");
                                          if (anchor) {
                                            const href = anchor.getAttribute("href") || "";
                                            
                                            // We zoeken nu heel slim in de mapped items welk product er is aangeklikt
                                              
                                            const matchedMappedItem = mappedForComponent.find((m: any) =>
                                                href.includes(m.slug.current)
                                            );

                                            if (matchedMappedItem) {
                                              // Zoek nu de bijbehorende volledige data op in je hoofd-items lijst
                                              const targetItem = items.find(i => i.id === matchedMappedItem.id);

                                              if (targetItem) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                
                                                // Update de popup state vloeibaar!
                                                setActiveItem(targetItem);
                                                layerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                                              }
                                            }
                                          }
                                        }}
                                      >
                                        <CategoryRelatedServicesSection
                                          label={layerSection.label || "Meer mogelijkheden"}
                                          title={layerSection.title || "Ook interessant"}
                                          intro={layerSection.text || layerSection.intro || ""}
                                          services={mappedForComponent}
                                          categorySlug={currentCategory} 
                                        />
                                      </div>
                                    );
                                  }

                                  case "processSection": {
                                    const mappedSteps =
                                      layerSection.steps?.map((step: any) => ({
                                        title: step.title || "",
                                        description:
                                          step.text || step.description || "",
                                      })) || [];

                                    const rawHeading = layerSection.title || "";
                                    const headingWords = rawHeading.split(" ");
                                    const fallbackHeading =
                                      headingWords.length < 6
                                        ? `${rawHeading} . . . . .`
                                        : rawHeading;

                                    const processData = {
                                      label:
                                        layerSection.label || "Onze werkwijze",
                                      heading: fallbackHeading,
                                      intro: layerSection.intro || "",
                                      steps: mappedSteps,
                                    };

                                    return (
                                      <div className="border-t border-white/[0.06] relative unique-popup-process-wrapper">
                                        <style
                                          dangerouslySetInnerHTML={{
                                            __html: `
                                    .unique-popup-process-wrapper .ps-header,
                                    .unique-popup-process-wrapper .ps-content,
                                    .unique-popup-process-wrapper .ps-cta { opacity: 1 !important; transform: none !important; }
                                    .unique-popup-process-wrapper .ps-border { transform: scaleX(1) !important; }
                                  `,
                                          }}
                                        />
                                        <ProcessSection data={processData} />
                                      </div>
                                    );
                                  }

                                  case "uspSection":
                                    return (
                                      <div className="border-t border-white/[0.06] pt-16">
                                        <UspSection
                                          label={layerSection.label}
                                          title={layerSection.title}
                                          intro={layerSection.intro}
                                          items={layerSection.items}
                                          color={accentColor}
                                        />
                                      </div>
                                    );

                                  // ==========================================
                                  // HIER IS JOUW INGEBOUWDE CTA BLOK CASE!
                                  // ==========================================
                           case "ctaSection": {
                                    const ctaDataForComponent = {
                                      heading: layerSection.title,
                                      subtext: layerSection.text,
                                      primaryLabel: layerSection.buttonLabel,
                                      secondaryLabel: layerSection.secondaryButtonLabel,
                                      trust: layerSection.bullets || undefined, // Hier stond 'tru'
                                    };

                                    return (
                                      <div key={idx} className="w-full relative clear-both block">
                                        <CTASection 
                                          data={ctaDataForComponent} 
                                          color={accentColor} 
                                        />
                                      </div>
                                    );
                                  }

                                  default:
                                    return null;
                                }
                              })()}
                            
                              {/* AUTOMATISCHE FAQ GENERATOR */}
                              {hasFaq && (
                                <div className="border-t border-white/[0.06] pt-16 text-white">
                                  <div className="max-w-xl mb-12">
                                    {layerSection.label && (
                                      <span
                                        style={{ color: `${accentColor}60` }}
                                        className="text-xs font-black uppercase tracking-[0.2em] block mb-4"
                                      >
                                        {layerSection.label}
                                      </span>
                                    )}
                                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-[0.95] font-sans">
                                      {layerSection.title ||
                                        "Veelgestelde vragen"}
                                    </h3>
                                  </div>

                                  <div className="max-w-3xl flex flex-col gap-4">
                                    {layerSection.items.map(
                                      (item: any, faqIdx: number) => (
                                        <details
                                          key={faqIdx}
                                          className="group rounded-2xl border border-white/[0.04] bg-neutral-900/30 p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer transition-colors duration-300 hover:bg-neutral-900/50"
                                        >
                                          <summary className="flex items-center justify-between gap-1.5 text-white">
                                            <h4 className="text-base md:text-lg font-bold uppercase tracking-tight font-sans">
                                              {item.question}
                                            </h4>
                                            <span className="relative size-5 shrink-0">
                                              <span className="absolute inset-0 m-auto h-0.5 w-3 bg-white transition-transform duration-300 group-open:rotate-90" />
                                              <span className="absolute inset-0 m-auto h-3 w-0.5 bg-white transition-transform duration-300 group-open:scale-y-0" />
                                            </span>
                                          </summary>
                                          <p className="mt-4 text-neutral-400 text-xs md:text-sm leading-relaxed pr-6">
                                            {item.answer}
                                          </p>
                                        </details>
                                      ),
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* AUTOMATISCHE CTA GENERATOR (FALLBACK) */}
                              {hasCta && (
                                <div className="border-t border-white/[0.06] pt-24 pb-12 text-center flex flex-col items-center justify-center">
                                  <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-8 max-w-2xl leading-[0.95] font-sans">
                                    {layerSection.title ||
                                      "Klaar om je project te starten?"}
                                  </h4>
                                  <button
                                    onClick={() => {
                                      closeLayer();
                                      window.location.href =
                                        layerSection.cta.url || "/contact";
                                    }}
                                    style={{ backgroundColor: accentColor }}
                                    className="inline-flex items-center gap-4 rounded-full px-8 py-4 text-xs font-black tracking-[0.15em] text-black uppercase transition-all duration-300 hover:scale-[1.03] hover:bg-white"
                                  >
                                    {layerSection.cta.label ||
                                      "Neem contact op"}
                                    <span className="text-base">→</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        },
                      )}
                    </div>
                  )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}