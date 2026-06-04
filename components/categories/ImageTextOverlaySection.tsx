// components/categories/ImageTextOverlaySection.tsx

import Link from "next/link";

type Props = {
  label?: string | null;
  title: string;
  text?: string | null;
  bulletPoints?: string[] | null;
  cta?: {
    label: string;
    url: string;
  } | null;
  color?: string | null;
};

export function ImageTextOverlaySection({
  label,
  title,
  text,
  bulletPoints,
  cta,
  color,
}: Props) {
  return (
    <section className="hero-overlay-content relative z-20 py-32 text-white">

      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {label && (
          <div className="mb-6 flex items-center gap-4">

            <span className="h-px w-12 bg-[#f7f704]" />

            <span className="text-xs uppercase tracking-[0.3em] text-white/60">
              {label}
            </span>

          </div>
        )}

        <div className="max-w-4xl">

          <h2 className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.05em]">
            {title}
          </h2>

          {text && (
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70">
              {text}
            </p>
          )}

          {bulletPoints && bulletPoints.length > 0 && (
            <ul className="mt-10 space-y-4">

              {bulletPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: color ?? "#f7f704",
                    }}
                  />

                  <span className="text-white/75">
                    {point}
                  </span>

                </li>
              ))}

            </ul>
          )}

          {cta?.label && cta?.url && (
            <Link
              href={cta.url}
              className="inline-flex items-center gap-3 mt-12 rounded-full border border-white/15 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-black"
            >
              {cta.label}
              <span>→</span>
            </Link>
          )}

        </div>

      </div>

    </section>
  );
}