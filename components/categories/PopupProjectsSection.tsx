import Image from "next/image";
import Link from "next/link";

const FONT = "var(--font-sans)";

interface ProjectItem {
  title: any;
  slug?: string;
  imageUrl?: any;
  client?: any; 
  year?: any;
}

interface PopupProjectsSectionProps {
  label?: string;
  title?: string;
  projects?: ProjectItem[];
  color?: string | null;
}

export function PopupProjectsSection({ label, title, projects, color }: PopupProjectsSectionProps) {
  const accentColor = color ?? "#f7f704";

  // HIER RESETTEN WE DE SCROLL HANDMATIG BIJ EEN KLIK
  const handleLinkClick = () => {
    document.body.removeAttribute("data-lenis-prevent");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  };

  if (!projects || !Array.isArray(projects) || projects.length === 0) return null;

  return (
    <section className="w-full text-white py-16">
      <div className="max-w-xl mb-20">
        {label && (
          <span style={{ color: `${accentColor}60` }} className="text-xs font-black uppercase tracking-[0.2em] block mb-4">
            {label}
          </span>
        )}
        {title && (
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-[0.95]" style={{ fontFamily: FONT }}>
            {title}
          </h3>
        )}
      </div>

      {/* STACK VAN GROTE PROJECTEN */}
      <div className="flex flex-col gap-20">
        {projects.map((proj, idx) => {
          if (!proj) return null;

          const projectTitle = proj.title && typeof proj.title === "object" 
            ? proj.title.name || proj.title.title || "Naamloos project" 
            : proj.title || "Naamloos project";

          let resolvedImageUrl = "";
          if (typeof proj.imageUrl === "string") {
            resolvedImageUrl = proj.imageUrl;
          } else if (proj.imageUrl && typeof proj.imageUrl === "object") {
            resolvedImageUrl = proj.imageUrl.url || proj.imageUrl.asset?.url || "";
          }

          let displayClient = "";
          if (proj.client && typeof proj.client === "object") {
            displayClient = proj.client.name || "";
          } else if (typeof proj.client === "string") {
            displayClient = proj.client;
          }

          let displayYear = "";
          if (proj.year && typeof proj.year === "object") {
            displayYear = proj.year.title || proj.year.name || "";
          } else if (typeof proj.year === "string" || typeof proj.year === "number") {
            displayYear = String(proj.year);
          }

          const projectUrl = proj.slug ? `/projecten/${proj.slug}` : "#";

          return (
            <Link 
              key={idx} 
              href={projectUrl}
              onClick={handleLinkClick} // <-- ROEP HIER DE CLEANUP AAN
              className="group w-full flex flex-col gap-6 cursor-pointer"
            >
              {/* AFBEELDING */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/[0.04] bg-neutral-900">
                {resolvedImageUrl ? (
                  <Image 
                    src={resolvedImageUrl} 
                    alt={projectTitle} 
                    fill 
                    sizes="100vw"
                    className="object-cover object-center opacity-90 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-102" 
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-950 flex items-center justify-center text-xs text-neutral-600">
                    Geen projectafbeelding gevonden
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* PROJECT INFO ONDER DE FOTO */}
              <div className="flex justify-between items-baseline px-2">
                <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight" style={{ fontFamily: FONT }}>
                  <span className="group-hover:text-neutral-300 transition-colors duration-300">
                    {projectTitle}
                  </span>
                </h4>
                <div className="flex gap-4 text-xs font-mono text-neutral-500 uppercase tracking-widest">
                  {displayClient && <span>{displayClient}</span>}
                  {displayYear && <span>© {displayYear}</span>}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}