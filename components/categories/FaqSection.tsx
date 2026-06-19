"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  label?: string | null;
  title?: string | null;
  intro?: string | null;
  items: FaqItem[];
  color?: string | null;
};

export function FaqSection({
  label,
  title,
  intro,
  items,
  color,
}: Props) {
  const [open, setOpen] = useState<number | null>(0);

  const accent = color ?? "#f7f704";

  if (!items?.length) return null;

  return (
    <section className="bg-[#080808] py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Header */}
        <div className="mb-24 max-w-4xl">
          {label && (
            <div className="mb-6 flex items-center gap-4">
              <div
                className="h-px w-6"
                style={{ backgroundColor: accent }}
              />

              <span className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                {label}
              </span>
            </div>
          )}

          {title && (
            <h2 className="text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.9] tracking-[-0.06em] text-white">
              {title}
            </h2>
          )}

          {intro && (
            <p className="mt-8 max-w-xl text-white/45 leading-relaxed">
              {intro}
            </p>
          )}
        </div>

        {/* FAQ */}
        <div className="border-t border-white/10">
          {items.map((item, index) => {
            const isOpen = open === index;

            return (
              <div
                key={index}
                className="border-b border-white/10"
              >
                <button
                  onClick={() =>
                    setOpen(isOpen ? null : index)
                  }
                  className="group flex w-full items-start gap-6 py-10 text-left"
                >
                  {/* Nummer */}
                  <div className="w-16 shrink-0">
                    <span className="text-2xl font-black text-white/15 transition-colors duration-300 group-hover:text-white">
                      {(index + 1)
                        .toString()
                        .padStart(2, "0")}
                    </span>
                  </div>

                  {/* Vraag */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold tracking-[-0.03em] text-white">
                      {item.question}
                    </h3>

                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        isOpen
                          ? "mt-6 max-h-[300px]"
                          : "max-h-0"
                      }`}
                    >
                      <p className="max-w-3xl text-white/50 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>

                  {/* Plus */}
                  <div
                    className="text-3xl font-light transition-transform duration-300"
                    style={{
                      color: accent,
                      transform: isOpen
                        ? "rotate(45deg)"
                        : "rotate(0deg)",
                    }}
                  >
                    +
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}