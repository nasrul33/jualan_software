import type { SolutionItem, SolutionSlug } from "@/types/marketing";

export const solutions: SolutionItem[] = [
  {
    slug: "akuntansi-pdam",
    title: "Solusi Akuntansi PDAM",
    shortTitle: "Akuntansi PDAM",
    icon: "Calculator",
    audience: "Kabag Keuangan, Akuntan, SPI, Direktur",
    description:
      "Menata CoA, jurnal, posting, reversal, buku besar, period lock, kas/bank, dan laporan SAK EP dari transaksi operasional yang tertelusur.",
    problemContext:
      "Akuntansi PDAM tidak cukup hanya mencatat jurnal manual. Data billing, kasir, piutang, bank, voucher, aset, dan gudang perlu membentuk jejak transaksi yang bisa masuk ke GL tanpa memutus kontrol.",
    impact: [
      "Jurnal sulit ditelusuri ke transaksi sumber seperti invoice, pembayaran, voucher, aset, atau persediaan.",
      "Koreksi setelah posting berisiko mengubah data final jika tidak memakai reversal.",
      "Laporan SAK EP terlambat karena buku besar dan subledger tidak konsisten.",
    ],
    howItHelps: [
      "Mengarahkan transaksi sumber ke jurnal double-entry dengan debit sama dengan kredit.",
      "Menerapkan jurnal posted immutable, reversal, period lock, dan source reference.",
      "Menyiapkan buku besar dan laporan dari posted ledger, bukan rekap mentah.",
    ],
    relatedModules: [
      "CoA",
      "Jurnal",
      "Buku Besar",
      "Kas & Bank",
      "Period Lock",
      "Reversal",
      "Laporan SAK EP",
      "Audit Trail",
    ],
    expectedBenefits: [
      "Kontrol posting lebih kuat",
      "Rekonsiliasi GL lebih cepat",
      "Laporan lebih siap diaudit",
    ],
    keywords: [
      "aplikasi akuntansi PDAM",
      "software akuntansi PDAM",
      "jurnal PDAM",
      "laporan SAK EP PDAM",
    ],
  },
  {
    slug: "billing-pdam",
    title: "Solusi Billing PDAM",
    shortTitle: "Billing PDAM",
    icon: "ReceiptText",
    audience: "Kabag Hublang, Petugas Meter, Kasir, Keuangan",
    description:
      "Mengelola siklus pelanggan, sambungan, baca meter, tarif blok progresif, DRD, invoice, piutang, koreksi, dan pelunasan.",
    problemContext:
      "Billing PDAM membutuhkan data pelanggan, SL, stand meter, versi tarif, komponen rekening, invoice, status piutang, dan koreksi yang konsisten per periode.",
    impact: [
      "Tagihan salah saat bacaan meter, zona tarif, atau komponen rekening tidak tervalidasi.",
      "DRD dan piutang rawan berbeda jika invoice tidak idempoten per sambungan dan periode.",
      "Koreksi rekening sulit diaudit jika invoice lama diedit langsung tanpa credit memo.",
    ],
    howItHelps: [
      "Menghubungkan pelanggan, sambungan, meter, tarif versioned, dan invoice periode.",
      "Menjaga satu invoice regular aktif per sambungan dan periode.",
      "Mendukung koreksi melalui credit memo, invoice pengganti, dan jejak audit.",
    ],
    relatedModules: [
      "Pelanggan",
      "Sambungan",
      "Baca Meter",
      "Tarif",
      "Billing",
      "DRD",
      "Piutang",
      "Koreksi Meter",
    ],
    expectedBenefits: [
      "DRD lebih konsisten",
      "Piutang lebih terpantau",
      "Selisih tagihan dan pembayaran berkurang",
    ],
    keywords: [
      "aplikasi billing PDAM",
      "sistem billing PDAM",
      "DRD PDAM",
      "tarif blok progresif PDAM",
    ],
  },
  {
    slug: "kasir-pdam",
    title: "Solusi Kasir dan Pembayaran PDAM",
    shortTitle: "Kasir PDAM",
    icon: "Banknote",
    audience: "Kasir, Bendahara, Keuangan, SPI",
    description:
      "Membantu penerimaan pembayaran loket dan digital, alokasi tagihan, struk, rekap kasir, overpay, dan jurnal kas/bank.",
    problemContext:
      "Kasir PDAM harus memperbarui status invoice secara tepat, mencegah pembayaran ganda, mengelola pembayaran sebagian, dan menjaga setoran tetap cocok dengan piutang.",
    impact: [
      "Status lunas terlambat atau salah jika pembayaran tidak terkunci ke invoice.",
      "Penerimaan ganda dapat terjadi tanpa idempotency dan row lock saat settlement.",
      "Overpay, partial payment, dan faktur void/written_off sulit dikontrol jika proses kasir terpisah.",
    ],
    howItHelps: [
      "Mencatat settlement idempoten dengan referensi kanal counter, QRIS, VA, PPOB, atau portal.",
      "Mengalokasikan pembayaran ke invoice, menangani partial/full payment, dan overpay ke deposit.",
      "Membentuk jurnal DR Kas/Bank dan CR Piutang untuk penerimaan yang valid.",
    ],
    relatedModules: [
      "Kasir",
      "Settlement",
      "QRIS/VA",
      "Struk",
      "Piutang",
      "Kas & Bank",
      "Jurnal",
      "Audit Trail",
    ],
    expectedBenefits: [
      "Kasir lebih tertib",
      "Pembayaran ganda lebih terkendali",
      "Setoran dan GL lebih mudah direkonsiliasi",
    ],
    keywords: [
      "aplikasi kasir PDAM",
      "pembayaran PDAM",
      "kasir PDAM",
      "settlement PDAM",
    ],
  },
  {
    slug: "audit-trail-pdam",
    title: "Solusi Audit Trail PDAM",
    shortTitle: "Audit Trail PDAM",
    icon: "ShieldCheck",
    audience: "SPI, Auditor Internal, Manajemen, IT",
    description:
      "Mencatat aktivitas penting, perubahan data, SoD, login, koreksi, void, reversal, dan integritas hash-chain pada jurnal posted.",
    problemContext:
      "PDAM membutuhkan bukti digital atas aktivitas pengguna dan perubahan transaksi, terutama pada billing, kasir, piutang, jurnal, voucher, dan laporan.",
    impact: [
      "SPI kesulitan menelusuri siapa melakukan apa, kapan, dan pada transaksi apa.",
      "Koreksi meter, void invoice, write-off, atau reversal sulit dipertanggungjawabkan.",
      "Jurnal posted rawan dipertanyakan jika tidak ada mekanisme integritas data.",
    ],
    howItHelps: [
      "Menyediakan jejak aktivitas dan perubahan data penting untuk pemeriksaan internal.",
      "Menerapkan Segregation of Duties untuk memisahkan fungsi kasir, akuntan, manajer, dan system poster.",
      "Mendukung verifikasi hash-chain agar perubahan pada jurnal posted dapat dideteksi.",
    ],
    relatedModules: [
      "Audit Trail",
      "IAM",
      "SoD",
      "Hash-Chain",
      "Koreksi",
      "Void",
      "Reversal",
      "Write-Off",
    ],
    expectedBenefits: [
      "Akuntabilitas meningkat",
      "Pemeriksaan internal lebih cepat",
      "Risiko koreksi tidak sah berkurang",
    ],
    keywords: [
      "audit trail PDAM",
      "sistem informasi PDAM",
      "kontrol internal PDAM",
      "hash chain audit PDAM",
    ],
  },
  {
    slug: "laporan-keuangan-pdam",
    title: "Solusi Laporan Keuangan PDAM",
    shortTitle: "Laporan Keuangan",
    icon: "FileBarChart",
    audience: "Kabag Keuangan, Direktur, Dewan Pengawas, SPI",
    description:
      "Membantu penyajian DRD, piutang, penerimaan, kas/bank, buku besar, neraca, laba rugi, LPE, arus kas, dan CaLK SAK EP.",
    problemContext:
      "Laporan PDAM membutuhkan konsistensi antara transaksi operasional, subledger AR, kas/bank, posted ledger, period lock, dan format laporan yang dibutuhkan manajemen.",
    impact: [
      "Laporan terlambat karena data harus digabung manual dari billing, kasir, dan keuangan.",
      "Angka DRD, piutang, penerimaan, dan GL rawan berbeda.",
      "Direksi dan dewan pengawas sulit membaca kinerja secara cepat dan dapat diverifikasi.",
    ],
    howItHelps: [
      "Menyediakan laporan operasional seperti DRD, rekap tagihan, pendapatan, dan piutang.",
      "Menyusun laporan keuangan dari posted ledger dan saldo periode.",
      "Mendukung output neraca, laba rugi, LPE, arus kas, CaLK, cetak A4, dan ekspor Excel.",
    ],
    relatedModules: [
      "DRD",
      "Piutang",
      "Kas & Bank",
      "Buku Besar",
      "Neraca",
      "Laba Rugi",
      "LPE",
      "Arus Kas",
      "CaLK",
    ],
    expectedBenefits: [
      "Laporan lebih cepat tersedia",
      "Angka lebih mudah direkonsiliasi",
      "Keputusan manajemen lebih berbasis data",
    ],
    keywords: [
      "laporan keuangan PDAM",
      "aplikasi laporan PDAM",
      "software PDAM",
      "SAK EP PDAM",
    ],
  },
];

export const solutionSlugs = solutions.map((solution) => solution.slug);

export function getSolutionBySlug(slug: SolutionSlug): SolutionItem {
  const solution = solutions.find((item) => item.slug === slug);

  if (!solution) {
    throw new Error(`Solution not found: ${slug}`);
  }

  return solution;
}
