export type IconName =
  | "Activity"
  | "BadgeCheck"
  | "Banknote"
  | "BarChart3"
  | "BookOpenCheck"
  | "Building2"
  | "Calculator"
  | "ClipboardCheck"
  | "CreditCard"
  | "DatabaseZap"
  | "FileBarChart"
  | "FileCheck2"
  | "Gauge"
  | "Landmark"
  | "LineChart"
  | "LockKeyhole"
  | "ReceiptText"
  | "ShieldCheck"
  | "Users"
  | "WalletCards"
  | "Workflow";

export interface CtaLink {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "outline" | "ghost";
  eventName?: string;
}

export interface FeatureModule {
  id: string;
  title: string;
  shortTitle: string;
  icon: IconName;
  description: string;
  problem: string;
  capabilities: string[];
  benefits: string[];
}

export interface BenefitItem {
  title: string;
  description: string;
  icon: IconName;
}

export interface ProblemItem {
  title: string;
  description: string;
  risk: string;
}

export interface AccountingDifferentiator {
  title: string;
  description: string;
  proof: string;
  icon: IconName;
}

export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface TrustItem {
  title: string;
  description: string;
  icon: IconName;
}

export interface HomepageMetric {
  label: string;
  value: string;
  icon: IconName;
}

export interface HomepageAudience {
  role: string;
  need: string;
  message: string;
  icon: IconName;
}

export interface DashboardInsight {
  title: string;
  description: string;
  icon: IconName;
}

export interface ProductScreenshot {
  id: string;
  title: string;
  module: string;
  description: string;
  src: string;
  alt: string;
}

export type SolutionSlug =
  | "akuntansi-pdam"
  | "billing-pdam"
  | "kasir-pdam"
  | "audit-trail-pdam"
  | "laporan-keuangan-pdam";

export interface SolutionItem {
  slug: SolutionSlug;
  title: string;
  shortTitle: string;
  icon: IconName;
  audience: string;
  description: string;
  problemContext: string;
  impact: string[];
  howItHelps: string[];
  relatedModules: string[];
  expectedBenefits: string[];
  keywords: string[];
}
