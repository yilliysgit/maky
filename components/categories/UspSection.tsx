// components/categories/UspSection.tsx
import type { FC } from 'react'

type UspItem = {
  title: string
  text?: string | null
}

type Props = {
  label?: string | null
  title: string
  intro?: string | null
  items: UspItem[]
  color?: string | null
}

export const UspSection: FC<Props> = ({ label, title, intro, items, color }) => {
  if (!items?.length) return null

  return (
    <section className="bg-gray-950 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl mb-16">
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

          {intro && (
            <p className="mt-6 text-lg text-white/60 leading-relaxed">
              {intro}
            </p>
          )}
        </div>

        {/* USP lijst */}
        <div className="divide-y divide-white/10">
          {items.map((item, index) => (
            <div
              key={index}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-20 py-10 items-center transition-all duration-300"
            >
              {/* Links: titel + accentlijn */}
              <div className="flex items-center gap-6">
                <div
                  className="hidden lg:block w-1 self-stretch rounded-full transition-all duration-300 group-hover:opacity-100 opacity-40"
                  style={{ backgroundColor: color ?? '#f7f704' }}
                />
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-white transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Rechts: tekst */}
              {item.text && (
                <p className="text-white/50 text-lg leading-relaxed group-hover:text-white/70 transition-colors">
                  {item.text}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}