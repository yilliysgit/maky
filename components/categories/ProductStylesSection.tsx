import Image from "next/image";

const FONT = "var(--font-sans)";

interface StyleItem {
  num?: string;
  title: string;
  description?: string;
  image?: {
    alt?: string;
    url?: string; // De query zet dit nu direct om naar een kant-en-klare tekst-link!
  };
}

interface ProductStylesSectionProps {
  label?: string;
  title?: string;
  styles?: StyleItem[];
  color?: string | null;
}

export function ProductStylesSection({ label, title, styles, color }: ProductStylesSectionProps) {
  const accentColor = color ?? "#f7f704";

  if (!styles || styles.length === 0) return null;

  return (
    <section className="w-full text-white py-16">
      <div className="max-w-xl mb-16">
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

      {/* DRIE-KOLOMMEN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {styles.map((style, idx) => {
          const displayNum = style.num || `0${idx + 1}`;
          
          // Hier halen we de url direct en super simpel uit het image object!
          const imageUrl = style.image?.url;

          return (
            <div 
              key={idx} 
              className="group flex flex-col bg-[#111111] border border-white/[0.04] rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 shadow-2xl"
            >
              {/* AFBEELDING */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900 border-b border-white/[0.04]">
                {imageUrl ? (
                  <Image 
                    src={imageUrl} 
                    alt={style.image?.alt || style.title} 
                    fill 
                    sizes="(max-w-768px) 100vw, 33vw"
                    className="object-cover object-center opacity-85 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-100" 
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-950 flex items-center justify-center text-xs text-neutral-600">
                    Geen afbeelding gevonden
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                <span 
                  className="absolute top-6 left-6 text-sm font-mono font-bold tracking-widest bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/[0.05]"
                  style={{ color: accentColor }}
                >
                  {displayNum}
                </span>
              </div>

              {/* TEKST INHOUD */}
              <div className="p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h4 className="text-xl font-bold text-white uppercase tracking-wide mb-3">
                    {style.title}
                  </h4>
                  {style.description && (
                    <p className="text-sm text-neutral-400 leading-relaxed font-light">
                      {style.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}