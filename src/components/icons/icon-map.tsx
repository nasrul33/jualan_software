import {
  Activity,
  BadgeCheck,
  Banknote,
  BarChart3,
  BookOpenCheck,
  Building2,
  Calculator,
  ClipboardCheck,
  CreditCard,
  DatabaseZap,
  FileBarChart,
  FileCheck2,
  Gauge,
  Landmark,
  LineChart,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  Users,
  WalletCards,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import type { IconName } from "@/types/marketing";

const icons: Record<IconName, LucideIcon> = {
  Activity,
  BadgeCheck,
  Banknote,
  BarChart3,
  BookOpenCheck,
  Building2,
  Calculator,
  ClipboardCheck,
  CreditCard,
  DatabaseZap,
  FileBarChart,
  FileCheck2,
  Gauge,
  Landmark,
  LineChart,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  Users,
  WalletCards,
  Workflow,
};

interface MarketingIconProps {
  name: IconName;
  className?: string;
  ariaHidden?: boolean;
}

export function MarketingIcon({
  name,
  className,
  ariaHidden = true,
}: MarketingIconProps) {
  const Icon = icons[name];
  return <Icon aria-hidden={ariaHidden} className={className} />;
}
