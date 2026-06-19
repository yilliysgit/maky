import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
};

export default function Breadcrumbs({
  items,
}: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-10 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40"
    >
      {items.map((item, index) => (
        <div
          key={item.label}
          className="flex items-center gap-2"
        >
          {item.href ? (
            <Link
              href={item.href}
              className="transition hover:text-white"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white/70">
              {item.label}
            </span>
          )}

          {index < items.length - 1 && (
            <span className="text-white/20">/</span>
          )}
        </div>
      ))}
    </nav>
  );
}