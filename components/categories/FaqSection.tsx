"use client"

// components/categories/FaqSection.tsx
import { useState } from 'react'

type FaqItem = {
  question: string
  answer: string
}

type Props = {
  title?: string | null
  intro?: string | null
  items: FaqItem[]
  color?: string | null
}

export function FaqSection({ title, intro, items, color }: Props) {
  const [open, setOpen] = useState<number | null>(null)

  if (!items?.length) return null

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {title}
          </h2>
        )}
        {intro && (
          <p className="mt-3 text-white/50 leading-relaxed">
            {intro}
          </p>
        )}
      </div>

      {/* Accordion */}
      <div className="divide-y divide-white/10">
        {items.map((item, index) => (
          <div key={index} className="py-5">
            <button
              onClick={() => setOpen(open === index ? null : index)}
              className="w-full flex items-start justify-between gap-6 text-left group"
            >
              <span className="text-white font-medium group-hover:text-white/80 transition-colors leading-snug">
                {item.question}
              </span>
              <span
                className="shrink-0 mt-0.5 text-lg transition-transform duration-300"
                style={{
                  color: color ?? '#f7f704',
                  transform: open === index ? 'rotate(45deg)' : 'none',
                }}
              >
                +
              </span>
            </button>

            {open === index && (
              <p className="mt-4 text-white/50 leading-relaxed text-sm pr-8">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}