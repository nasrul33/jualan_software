import type { ProductScreenshot } from "@/types/marketing";

export const productScreenshots: ProductScreenshot[] = [
  {
    id: "dashboard-overview",
    title: "Dashboard operasional",
    module: "Executive overview",
    description:
      "Ringkasan pelanggan, tagihan outstanding, pembayaran 30 hari, pengaduan, dan akses cepat modul operasional.",
    src: "/images/product/dashboard-overview.webp",
    alt: "Dashboard PDAMCore dengan ringkasan pelanggan, tagihan, pembayaran, pengaduan, dan akses cepat modul.",
  },
  {
    id: "meter-reading",
    title: "Pencatatan meter",
    module: "Baca meter",
    description:
      "Input bacaan per periode dengan meter sebelumnya, meter saat ini, konsumsi, dan riwayat anomali bacaan.",
    src: "/images/product/meter-reading.webp",
    alt: "Halaman pencatatan meter PDAMCore dengan form input bacaan dan riwayat konsumsi pelanggan.",
  },
  {
    id: "cashier-payment",
    title: "Kasir dan pembayaran",
    module: "Collection",
    description:
      "Monitoring tagihan belum lunas, pembayaran terakhir, status lunas, dan bukti transaksi kasir.",
    src: "/images/product/cashier-payment.webp",
    alt: "Halaman kasir PDAMCore untuk penerimaan pembayaran tagihan pelanggan.",
  },
  {
    id: "tariff-versioning",
    title: "Tarif air versioned",
    module: "Tarif",
    description:
      "Kelola versi tarif, blok progresif, abonemen, biaya meter, dan tarif aktif yang bersifat read-only.",
    src: "/images/product/tariff-versioning.webp",
    alt: "Halaman tarif air PDAMCore dengan versi tarif aktif dan blok tarif progresif.",
  },
  {
    id: "drd-report",
    title: "DRD per periode",
    module: "Billing",
    description:
      "Daftar rekening ditagih per golongan atau zona untuk kontrol nilai DRD, pelunasan, dan outstanding.",
    src: "/images/product/drd-report.webp",
    alt: "Laporan DRD PDAMCore yang menampilkan jumlah rekening, nilai DRD, lunas, dan outstanding.",
  },
  {
    id: "journal-general-ledger",
    title: "Jurnal dan GL",
    module: "Akuntansi",
    description:
      "Jurnal posted dari transaksi sumber dengan debit-kredit seimbang dan status terkunci.",
    src: "/images/product/journal-general-ledger.webp",
    alt: "Halaman jurnal umum PDAMCore dengan jurnal posted debit dan kredit.",
  },
  {
    id: "trial-balance",
    title: "Neraca saldo",
    module: "General ledger",
    description:
      "Trial balance per periode dengan validasi total debit sama dengan total kredit.",
    src: "/images/product/trial-balance.webp",
    alt: "Neraca saldo PDAMCore dengan daftar akun dan total debit kredit seimbang.",
  },
  {
    id: "chart-of-accounts",
    title: "Bagan akun",
    module: "CoA",
    description:
      "Kelola kode akun, tipe akun, saldo normal, akun kontra, dan status rekening yang dipakai transaksi.",
    src: "/images/product/chart-of-accounts.webp",
    alt: "Halaman bagan akun PDAMCore untuk pengelolaan chart of accounts.",
  },
  {
    id: "financial-report",
    title: "Laporan keuangan",
    module: "SAK EP",
    description:
      "Laporan posisi keuangan dengan struktur aset, liabilitas, ekuitas, dan indikator seimbang.",
    src: "/images/product/financial-report.webp",
    alt: "Laporan keuangan PDAMCore yang menampilkan neraca sesuai SAK EP.",
  },
];
