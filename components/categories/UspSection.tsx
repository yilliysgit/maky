// components/categories/UspSection.tsx

"use client";

type UspItem = {
  title: string;
  text?: string | null;
};

type Props = {
  label?: string | null;
  title: string;
  intro?: string | null;
  items: UspItem[];
  color?: string | null;
};

export default function UspSection({
  label,
  title,
  intro,
  items,
  color,
}: Props) {
  const accent = color ?? "#f7f704";

  if (!items?.length) return null;

  return (
    <section className="bg-black py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Header */}
        <div className="mb-24 max-w-3xl">
          {label && (
            <div className="mb-6 flex items-center gap-4">
              <div
                className="h-px w-8"
                style={{ backgroundColor: accent }}
              />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                {label}
              </span>
            </div>
          )}

          <h2 className="text-[clamp(3rem,6vw,6rem)] font-black uppercase tracking-[-0.06em] text-white">
            {title}
          </h2>

          {intro && (
            <p className="mt-8 max-w-xl text-white/50 leading-relaxed">
              {intro}
            </p>
          )}
        </div>

        {/* USP's */}
        <div className="border-t border-white/10">
          {items.map((item, index) => (
            <div
              key={index}
              className="group grid gap-8 border-b border-white/10 py-10 transition-colors duration-300 lg:grid-cols-[120px_1fr_1fr]"
            >
              {/* Nummer */}
              <div
                className="text-3xl font-black text-white/15 transition-all duration-300 group-hover:text-white"
              >
                {(index + 1).toString().padStart(2, "0")}
              </div>

              {/* Titel */}
              <h3
                className="text-3xl font-bold text-white transition-all duration-300"
                style={{
                  color: undefined,
                }}
              >
                {item.title}
              </h3>

              {/* Tekst */}
              <p className="max-w-lg text-white/45 transition-all duration-300 group-hover:text-white/70">
                {item.text}
              </p>

              {/* Hover accent */}
              <div
                className="absolute left-0 h-full w-1 scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
                style={{ backgroundColor: accent }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}