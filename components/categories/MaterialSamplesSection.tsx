import Image from "next/image";

const FONT = "var(--font-sans)";

interface MaterialItem {
  title: string;
  description?: string;
  textureImage?: {
    alt?: string;
    url?: string;
  };
}

interface MaterialSamplesSectionProps {
  label?: string;
  title?: string;
  materials?: MaterialItem[];
  color?: string | null;
}

export function MaterialSamplesSection({ label, title, materials, color }: MaterialSamplesSectionProps) {
  const accentColor = color ?? "#f7f704";

  if (!materials || materials.length === 0) return null;

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

      {/* LUXE CONFIGURATOR SAMPLES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {materials.map((mat, idx) => {
          const imageUrl = mat.textureImage?.url;

          return (
            <div 
              key={idx} 
              className="group relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/[0.04] bg-[#111] hover:border-white/30 transition-all duration-700 cursor-default flex flex-col justify-end p-8"
            >
              {/* HIGH-END TEXTUUR ACHTERGROND */}
              {imageUrl && (
                <Image 
                  src={imageUrl} 
                  alt={mat.textureImage?.alt || mat.title} 
                  fill
                  sizes="(max-w-768px) 100vw, 25vw"
                  className="object-cover object-center opacity-40 grayscale contrast-125 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:opacity-70 group-hover:grayscale-0" 
                />
              )}
              {/* SUBTIELE GRADIENT VOOR TEXT LEESBAARHEID */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

              {/* INHOUD OP DE KAART */}
              <div className="relative z-20 transform transition-transform duration-500 group-hover:-translate-y-2">
                <h4 className="text-2xl font-black tracking-tight uppercase mb-2" style={{ fontFamily: FONT }}>
                  {mat.title}
                </h4>
                {mat.description && (
                  <p className="text-xs text-neutral-400 font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-[200px]">
                    {mat.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}