import { APP_URL, CONTACT_EMAIL, SITE_URL } from "@/lib/constants";
import type { CtaLink } from "@/types/marketing";

export const siteConfig = {
  name: "PDAMCore",
  tagline: "Billing dan Akuntansi PDAM dalam Satu Alur yang Tertelusur",
  description:
    "PDAMCore menghubungkan pelanggan, baca meter, DRD, kasir, piutang, kas/bank, jurnal, GL, laporan SAK EP, dan audit trail PDAM dalam satu platform billing-to-accounting yang tertib dan tertelusur.",
  url: SITE_URL,
  appUrl: APP_URL,
  email: CONTACT_EMAIL,
  cta: {
    demo: "/demo",
    whatsapp: "#floating-whatsapp",
    proposal: "/demo?intent=proposal",
    features: "/fitur",
  },
} as const;

export const primaryCtas: CtaLink[] = [
  {
    label: "Jadwalkan Demo",
    href: "/demo",
    variant: "primary",
    eventName: "cta_demo_click",
  },
  {
    label: "Hubungi WhatsApp",
    href: "#floating-whatsapp",
    variant: "secondary",
    eventName: "cta_whatsapp_click",
  },
  {
    label: "Lihat Fitur",
    href: "/fitur",
    variant: "outline",
  },
];
