import type { ArticleMeta } from "@/types/article";

export const articles: ArticleMeta[] = [
  {
    slug: "billing-terintegrasi-pdam",
    title: "Mengapa PDAM Membutuhkan Sistem Billing Terintegrasi",
    description:
      "Alasan bisnis dan operasional mengapa billing PDAM perlu terhubung dengan pelanggan, sambungan, baca meter, tarif, DRD, kasir, piutang, dan laporan.",
    summary:
      "Billing terintegrasi membantu PDAM menjaga konsistensi data pelanggan, SL, meter, tarif versioned, DRD, pembayaran, piutang, dan laporan manajemen.",
    category: "Billing",
    audience: "Direktur, Kabag Hublang, Keuangan",
    publishedAt: "2026-06-18",
    readingTime: "5 menit",
    keywords: ["aplikasi billing PDAM", "sistem billing PDAM", "DRD PDAM"],
    contentFile: "src/content/articles/billing-terintegrasi-pdam.mdx",
    featured: true,
  },
  {
    slug: "audit-trail-sistem-informasi-pdam",
    title: "Pentingnya Audit Trail pada Sistem Informasi PDAM",
    description:
      "Audit trail membantu PDAM memperkuat kontrol internal, SoD, akuntabilitas pengguna, koreksi transaksi, dan pemeriksaan jurnal posted.",
    summary:
      "Jejak audit, SoD, period lock, reversal, dan hash-chain membuat aktivitas penting lebih mudah ditelusuri saat pengawasan internal.",
    category: "Audit",
    audience: "SPI, Auditor Internal, Manajemen",
    publishedAt: "2026-06-18",
    readingTime: "4 menit",
    keywords: ["audit trail PDAM", "kontrol internal PDAM", "hash chain audit PDAM"],
    contentFile: "src/content/articles/audit-trail-sistem-informasi-pdam.mdx",
    featured: true,
  },
  {
    slug: "hubungan-billing-kasir-akuntansi-pdam",
    title: "Hubungan Billing, Kasir, dan Akuntansi pada PDAM",
    description:
      "Penjelasan hubungan data DRD, penerimaan kasir, settlement, piutang, kas/bank, jurnal, buku besar, dan laporan pada PDAM.",
    summary:
      "Billing, kasir, dan akuntansi perlu berada dalam alur data yang sama agar piutang, GL, dan laporan SAK EP lebih mudah diverifikasi.",
    category: "Akuntansi",
    audience: "Keuangan, Kasir, Direktur",
    publishedAt: "2026-06-18",
    readingTime: "6 menit",
    keywords: ["akuntansi PDAM", "kasir PDAM", "settlement PDAM"],
    contentFile: "src/content/articles/hubungan-billing-kasir-akuntansi-pdam.mdx",
    featured: true,
  },
  {
    slug: "digitalisasi-pdam-baca-meter-laporan-keuangan",
    title: "Digitalisasi PDAM dari Baca Meter sampai Laporan Keuangan",
    description:
      "Bagaimana digitalisasi PDAM menghubungkan sambungan, baca meter, tarif, billing, pembayaran, piutang, jurnal, laporan, dan audit.",
    summary:
      "Digitalisasi yang benar bukan hanya input data, tetapi membangun alur kerja terpadu dari operasi sampai laporan SAK EP dan audit trail.",
    category: "Digitalisasi",
    audience: "Direktur, IT, Manajemen",
    publishedAt: "2026-06-18",
    readingTime: "5 menit",
    keywords: ["digitalisasi PDAM", "aplikasi PDAM", "laporan SAK EP PDAM"],
    contentFile:
      "src/content/articles/digitalisasi-pdam-baca-meter-laporan-keuangan.mdx",
    featured: false,
  },
  {
    slug: "mengurangi-selisih-tagihan-pembayaran-pdam",
    title: "Cara Mengurangi Selisih Tagihan dan Pembayaran PDAM",
    description:
      "Praktik pengendalian data untuk mengurangi selisih DRD, pembayaran, piutang, settlement, dan rekap kasir.",
    summary:
      "Selisih dapat dikurangi dengan validasi meter, tarif versioned, invoice idempoten, kontrol kasir, dan rekonsiliasi kas/bank yang tertib.",
    category: "Kasir",
    audience: "Hublang, Kasir, Keuangan",
    publishedAt: "2026-06-18",
    readingTime: "5 menit",
    keywords: ["tagihan PDAM", "pembayaran PDAM", "rekonsiliasi PDAM", "DRD PDAM"],
    contentFile:
      "src/content/articles/mengurangi-selisih-tagihan-pembayaran-pdam.mdx",
    featured: false,
  },
];

export const featuredArticles = articles.filter((article) => article.featured);
