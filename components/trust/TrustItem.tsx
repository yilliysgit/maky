// components/trust/TrustItem.tsx
interface TrustItemProps {
  value: string;
  label: string;
}

export default function TrustItem({ value, label }: TrustItemProps) {
  return (
    <div className="text-center">
      <div className="text-2xl font-semibold text-[#f7f704]">
        {value}
      </div>
      <div className="mt-1 text-sm text-white/60">
        {label}
      </div>
    </div>
  );
}