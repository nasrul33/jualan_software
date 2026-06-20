import type { BenefitItem } from "@/types/marketing";

export const benefits: BenefitItem[] = [
  {
    title: "DRD sampai GL lebih menyatu",
    description:
      "Baca meter, tarif, DRD, kasir, piutang, kas/bank, jurnal, dan buku besar berada dalam alur data yang sama.",
    icon: "Workflow",
  },
  {
    title: "Posting akuntansi lebih terkendali",
    description:
      "Double-entry, jurnal posted, reversal, period lock, dan GL membantu keuangan menjaga angka final.",
    icon: "ShieldCheck",
  },
  {
    title: "Rekonsiliasi lebih cepat",
    description:
      "Selisih DRD, penerimaan, piutang, kas/bank, dan laporan lebih mudah dicari dari referensi transaksi.",
    icon: "BarChart3",
  },
  {
    title: "Audit trail dan SoD lebih jelas",
    description:
      "Aktivitas penting, pemisahan tugas, koreksi, void, reversal, dan hash-chain audit membantu pemeriksaan internal.",
    icon: "FileCheck2",
  },
];
