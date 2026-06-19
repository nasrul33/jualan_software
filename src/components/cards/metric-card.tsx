import { MarketingIcon } from "@/components/icons/icon-map";
import type { IconName } from "@/types/marketing";

interface MetricCardProps {
  label: string;
  value: string;
  icon: IconName;
}

export function MetricCard({ label, value, icon }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-white/20 bg-white/10 p-4 text-white backdrop-blur">
      <div className="flex items-center gap-2 text-sm font-semibold text-sky-100">
        <MarketingIcon name={icon} className="h-4 w-4" />
        {label}
      </div>
      <p className="mt-2 text-2xl font-bold tracking-normal">{value}</p>
    </div>
  );
}
