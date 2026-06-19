import type {
  DashboardInsight,
  DashboardPanel,
  HomepageAudience,
  HomepageMetric,
  ProblemItem,
  TrustItem,
  WorkflowStep,
} from "@/types/marketing";

export const homepageProblems: ProblemItem[] = [
  {
    title: "Siklus pelanggan sampai kas/bank sering terputus",
    description:
      "Data pelanggan, sambungan, baca meter, tarif, tagihan, kasir, piutang, dan bank kerap berjalan dalam rekap berbeda.",
    risk: "Risiko selisih DRD, piutang, penerimaan, dan setoran meningkat.",
  },
  {
    title: "Akuntansi PDAM butuh kontrol yang sesuai siklus transaksi",
    description:
      "Jurnal, buku besar, laporan SAK EP, period lock, dan reversal membutuhkan data sumber yang rapi dan dapat diverifikasi.",
    risk: "Laporan terlambat, angka antar laporan rawan berbeda, dan audit menjadi lebih berat.",
  },
  {
    title: "Koreksi, void, dan aktivitas penting sulit ditelusuri",
    description:
      "Koreksi baca meter, tagih ulang, pembayaran, penghapusan piutang, dan jurnal perlu jejak audit yang jelas.",
    risk: "Akuntabilitas melemah dan kontrol SPI tidak punya bukti digital yang kuat.",
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    step: "01",
    title: "Pelanggan & Sambungan",
    description:
      "Data pelanggan, SL, status layanan, dan zona tarif menjadi referensi transaksi.",
    icon: "Users",
  },
  {
    step: "02",
    title: "Baca Meter",
    description:
      "Stand meter, konsumsi, estimasi, foto, dan anomali divalidasi sebelum billing.",
    icon: "Gauge",
  },
  {
    step: "03",
    title: "Tarif",
    description:
      "Tarif blok progresif, abonemen, biaya meter, dan versi tarif digunakan secara tertelusur.",
    icon: "Calculator",
  },
  {
    step: "04",
    title: "Billing & DRD",
    description:
      "Invoice periode dan DRD diterbitkan dari data meter dan tarif yang sudah tervalidasi.",
    icon: "ReceiptText",
  },
  {
    step: "05",
    title: "Kasir & Settlement",
    description:
      "Pembayaran counter, QRIS, VA, atau kanal lain dialokasikan ke tagihan secara idempoten.",
    icon: "CreditCard",
  },
  {
    step: "06",
    title: "Piutang & Kas/Bank",
    description:
      "Piutang, aging, ECL, kas/bank, dan rekonsiliasi menjadi jembatan ke akuntansi.",
    icon: "Landmark",
  },
  {
    step: "07",
    title: "Jurnal & GL",
    description:
      "Transaksi sumber membentuk jurnal double-entry, posted ledger, dan buku besar.",
    icon: "WalletCards",
  },
  {
    step: "08",
    title: "Laporan & Audit",
    description:
      "Laporan operasional, laporan SAK EP, audit trail, dan hash-chain siap diperiksa.",
    icon: "FileBarChart",
  },
];

export const homepageMetrics: HomepageMetric[] = [
  {
    label: "Cakupan domain",
    value: "17 modul",
    icon: "DatabaseZap",
  },
  {
    label: "Standar laporan",
    value: "SAK EP 2025",
    icon: "Workflow",
  },
  {
    label: "Kontrol audit",
    value: "Hash-chain",
    icon: "ShieldCheck",
  },
  {
    label: "Kanal layanan",
    value: "Portal + QRIS/VA",
    icon: "CreditCard",
  },
];

export const homepageAudiences: HomepageAudience[] = [
  {
    role: "Direktur",
    need: "Kontrol kinerja dan laporan cepat",
    message: "Data operasional dan keuangan lebih mudah dibaca untuk keputusan manajemen.",
    icon: "LineChart",
  },
  {
    role: "Kabag Keuangan",
    need: "Kas/bank, jurnal, GL, dan SAK EP",
    message:
      "Transaksi operasional lebih mudah ditelusuri sampai jurnal, buku besar, dan laporan.",
    icon: "Calculator",
  },
  {
    role: "Kabag Hublang",
    need: "Pelanggan, SL, meter, tarif, dan DRD",
    message:
      "Alur pelanggan sampai penerbitan tagihan lebih terkontrol antar periode.",
    icon: "Users",
  },
  {
    role: "SPI / Auditor",
    need: "Jejak aktivitas dan kontrol akses",
    message: "Aktivitas penting memiliki jejak digital untuk pemeriksaan internal.",
    icon: "ShieldCheck",
  },
];

export const dashboardInsights: DashboardInsight[] = [
  {
    title: "Billing, DRD, dan piutang",
    description:
      "Ringkasan tagihan, status lunas, tunggakan, aging, dan piutang per periode.",
    icon: "ReceiptText",
  },
  {
    title: "Kasir dan settlement",
    description:
      "Monitoring pembayaran pelanggan, rekap kasir, kanal pembayaran, dan kesiapan setoran.",
    icon: "CreditCard",
  },
  {
    title: "Kas/bank, jurnal, dan GL",
    description:
      "Transaksi sumber menuju kas/bank, jurnal posted, buku besar, dan laporan SAK EP.",
    icon: "Landmark",
  },
  {
    title: "Audit trail",
    description:
      "Jejak aktivitas penting membantu pemeriksaan transaksi dan perubahan data.",
    icon: "FileCheck2",
  },
];

export const dashboardPanels: DashboardPanel[] = [
  {
    id: "billing",
    title: "Billing, DRD, dan Piutang",
    eyebrow: "Revenue cycle",
    description:
      "Pantau invoice periode, DRD, status lunas, tunggakan, aging, dan piutang pelanggan dalam satu tampilan.",
    icon: "ReceiptText",
    metric: {
      label: "Objek kontrol",
      value: "DRD + AR",
    },
    points: [
      "Satu invoice regular per sambungan dan periode",
      "Tarif versioned tersimpan pada invoice",
      "Dasar aging, ECL, dunning, dan rekonsiliasi piutang",
    ],
    accentClassName: "bg-sky-600",
  },
  {
    id: "kasir",
    title: "Kasir dan Settlement",
    eyebrow: "Collection control",
    description:
      "Lihat penerimaan pembayaran counter, QRIS, VA, status lunas, dan alokasi pembayaran yang terhubung ke tagihan.",
    icon: "CreditCard",
    metric: {
      label: "Objek kontrol",
      value: "Idempotent pay",
    },
    points: [
      "Pembayaran partial, full, dan overpay ke deposit",
      "Rekap kasir harian dan referensi kanal pembayaran",
      "Faktur void dan written_off tidak menerima pembayaran baru",
    ],
    accentClassName: "bg-teal-600",
  },
  {
    id: "akuntansi",
    title: "Jurnal, GL, dan SAK EP",
    eyebrow: "Finance traceability",
    description:
      "Hubungkan transaksi sumber dengan jurnal double-entry, buku besar posted, period lock, dan laporan SAK EP.",
    icon: "Calculator",
    metric: {
      label: "Objek kontrol",
      value: "Debit = Credit",
    },
    points: [
      "Jurnal posted bersifat immutable",
      "Koreksi jurnal melalui reversal, bukan edit langsung",
      "Laporan berasal dari posted ledger dan period lock",
    ],
    accentClassName: "bg-amber-500",
  },
  {
    id: "audit",
    title: "Audit Trail dan SoD",
    eyebrow: "Internal control",
    description:
      "Tampilkan aktivitas penting, pemisahan tugas, dan integritas hash-chain untuk membantu SPI dan auditor internal.",
    icon: "ShieldCheck",
    metric: {
      label: "Objek kontrol",
      value: "Hash-chain",
    },
    points: [
      "Kasir tidak mengakses GL dan akuntan tidak menjadi poster tunggal",
      "Hash-chain mendeteksi perubahan jurnal posted",
      "Koreksi meter, void, write-off, dan reversal meninggalkan jejak",
    ],
    accentClassName: "bg-slate-800",
  },
];

export const trustItems: TrustItem[] = [
  {
    title: "Siap untuk on-premise atau private cloud",
    description:
      "Konteks operasional mendukung deployment private server, PostgreSQL, Redis, object storage, worker, dan scheduler.",
    icon: "Building2",
  },
  {
    title: "Role-based access dan SoD",
    description:
      "Akses modul dipisahkan untuk direktur, keuangan, akuntan, kasir, meter, hublang, gudang, SPI, dan service poster.",
    icon: "LockKeyhole",
  },
  {
    title: "Audit-ready untuk transaksi penting",
    description:
      "Jurnal posted, reversal, period lock, idempotency, dan audit chain membantu pengawasan internal serta pemeriksaan.",
    icon: "BadgeCheck",
  },
];
