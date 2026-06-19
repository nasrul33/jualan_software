export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export const mainNavigation: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Fitur", href: "/fitur" },
  { label: "Solusi", href: "/solusi" },
  { label: "Edukasi", href: "/edukasi" },
  { label: "Demo", href: "/demo" },
  { label: "Kontak", href: "/kontak" },
];

export const footerNavigation = {
  produk: [
    { label: "Fitur", href: "/fitur" },
    { label: "Solusi Akuntansi PDAM", href: "/solusi/akuntansi-pdam" },
    { label: "Solusi Billing PDAM", href: "/solusi/billing-pdam" },
    { label: "Demo", href: "/demo" },
  ],
  edukasi: [
    { label: "Artikel", href: "/edukasi" },
    { label: "Audit Trail PDAM", href: "/solusi/audit-trail-pdam" },
    { label: "Laporan Keuangan PDAM", href: "/solusi/laporan-keuangan-pdam" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Login Aplikasi", href: "/login" },
  ],
} satisfies Record<string, NavItem[]>;
