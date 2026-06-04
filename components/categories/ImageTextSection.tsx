"use client"

import Image from 'next/image'
import Link from 'next/link'

type Props = {
  label?: string | null
  title: string
  text?: string | null
  bulletPoints?: string[] | null
  imagePosition?: 'left' | 'right'
  image?: { url: string; alt?: string | null } | null
  cta?: { label: string; url: string } | null
  color?: string | null
}

export function ImageTextSection({
  label,
  title,
  text,
  bulletPoints,
  imagePosition = 'right',
  image,
  cta,
  color,
}: Props) {
  const isLeft = imagePosition === 'left'

  return (
    <section className="bg-gradient-to-b from-black via-gray-950 to-black py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isLeft ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}>

          {/* Tekst */}
          <div>
            {label && (
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-[#f7f704]" />
                <span className="text-sm uppercase tracking-[0.25em] text-white/60">
                  {label}
                </span>
              </div>
            )}

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              {title}
            </h2>

            {text && (
              <p className="mt-6 text-lg text-white/60 leading-relaxed">
                {text}
              </p>
            )}

            {bulletPoints && bulletPoints.length > 0 && (
              <ul className="mt-8 space-y-4">
                {bulletPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: color ?? '#f7f704' }}
                    />
                    <span className="text-white/70 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {cta?.label && cta?.url && (
              <Link
                href={cta.url}
                className="inline-flex items-center gap-3 mt-10 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                style={{
                  backgroundColor: color ?? '#f7f704',
                  color: '#000',
                }}
              >
                {cta.label}
                <span>→</span>
              </Link>
            )}
          </div>

          {/* Afbeelding */}
          {image?.url ? (
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={image.url}
                alt={image.alt ?? title}
                fill
                className="object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              {/* Accent glow */}
              {color && (
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ background: `linear-gradient(135deg, ${color}, transparent)` }}
                />
              )}
              {/* Accent border */}
              {color && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ background: `linear-gradient(to right, ${color}, ${color}80, transparent)` }}
                />
              )}
            </div>
          ) : (
            // Placeholder als er geen afbeelding is
            <div
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
              style={{ backgroundColor: color ? `${color}15` : 'rgba(255,255,255,0.03)' }}
            />
          )}

        </div>
      </div>
    </section>
  )
}