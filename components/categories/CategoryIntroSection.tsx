type CategoryIntroSectionProps = {
  title: string
  text: string
  color?: string | null
}

export function CategoryIntroSection({
  title,
  text,
  color,
}: CategoryIntroSectionProps) {
  return (
    <section className="bg-black py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {title}
        </h2>

        <div
          className="mx-auto mt-6 h-[2px] w-16"
          style={{ backgroundColor: color ?? "#f7f704" }}
        />

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-white/80 md:text-xl">
          {text}
        </p>
      </div>
    </section>
  )
}