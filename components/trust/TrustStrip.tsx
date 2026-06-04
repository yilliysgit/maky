// components/trust/TrustStrip.tsx
import TrustItem from "./TrustItem";

interface TrustStripProps {
  items?: {
    value: string;
    label: string;
  }[];
}

const DEFAULT_ITEMS = [
  { value: "15+", label: "Jaar ervaring" },
  { value: "500+", label: "Projecten gerealiseerd" },
  { value: "100%", label: "Eigen productie" },
  { value: "Van concept", label: "Tot montage" },
];

export default function TrustStrip({ items = DEFAULT_ITEMS }: TrustStripProps) {
  return (
    <section className="border-t border-white/5 bg-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <TrustItem
              key={index}
              value={item.value}
              label={item.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// hoe te gebruiken op andere pagina's:
//<TrustStrip
//items={[
//    { value: "Nationaal", label: "Actief" },
//    { value: "In-house", label: "Productie & montage" },
//    { value: "Architectuur", label: "Gedreven signing" },
//    { value: "1 partner", label: "Van A tot Z" },
// ]}
// />