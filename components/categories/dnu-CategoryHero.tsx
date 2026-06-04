// components/categories/CategoryHero.tsx

import Image from "next/image";

type CategoryHeroProps = {
  title: string;
  subtitle?: string | null;
  description?: string | null;
  overlay?: boolean;
  color?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
};

export function CategoryHero({
  title,
  subtitle,
  description,
  overlay = true,
  color,
  imageUrl,
  imageAlt,
}: CategoryHeroProps) {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">

      {/* Background image */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={imageAlt ?? title}
          fill
          priority
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />
      )}

      {/* Dark overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-black/70" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[15%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#f7f704]/5 blur-[140px]" />

        <div className="absolute bottom-[10%] right-[10%] h-[400px] w-[400px] rounded-full bg-white/5 blur-[120px]" />
      </div>

      {/* Category color glow */}
      {color && (
        <div
          className="absolute bottom-0 left-0 h-[350px] w-[700px] opacity-20 blur-[140px]"
          style={{
            backgroundColor: color,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-end px-6 pb-20 lg:px-10 lg:pb-28">

        <div className="max-w-5xl">

          {/* Eyebrow */}
          <div className="mb-8 flex items-center gap-4">

            <span className="h-px w-8 bg-[#f7f704]" />

            {subtitle && (
              <span className="text-[11px] uppercase tracking-[0.3em] text-white/60">
                {subtitle}
              </span>
            )}

          </div>

          {/* Title */}
          <h1 className="max-w-5xl text-[clamp(4rem,10vw,9rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-white">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">
              {description}
            </p>
          )}

        </div>

      </div>

      {/* Bottom accent */}
      {color && (
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(to right, ${color}, transparent)`,
          }}
        />
      )}

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-black to-transparent" />

    </section>
  );
}