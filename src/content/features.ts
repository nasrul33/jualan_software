import type { FeatureModule } from "@/types/marketing";

export const features: FeatureModule[] = [
  {
    id: "pelanggan-sambungan",
    title: "Pelanggan dan Sambungan Langganan",
    shortTitle: "Pelanggan",
    icon: "Users",
    description:
      "Mengelola profil pelanggan, sambungan langganan, status layanan, PSB, mutasi, penutupan, dan riwayat transaksi dalam satu basis data.",
    problem:
      "Data pelanggan dan sambungan yang tersebar membuat validasi status, mutasi, riwayat rekening, dan penelusuran layanan menjadi lambat.",
    capabilities: [
      "Profil pelanggan, SL, alamat, zona tarif, dan status layanan",
      "Siklus PSB, mutasi, penutupan, dan riwayat perubahan",
      "Customer 360 untuk tagihan, pembayaran, dan pengaduan",
    ],
    benefits: [
      "Data hublang lebih tertib",
      "Riwayat layanan mudah ditelusuri",
      "Validasi transaksi lebih cepat",
    ],
  },
  {
    id: "baca-meter",
    title: "Baca Meter dan Koreksi Pembacaan",
    shortTitle: "Baca Meter",
    icon: "Gauge",
    description:
      "Pencatatan stand meter, konsumsi, estimasi, foto, deteksi anomali, serta koreksi pembacaan dengan persetujuan dan jejak audit.",
    problem:
      "Kesalahan stand meter atau konsumsi tidak wajar dapat langsung memengaruhi DRD, piutang, dan koreksi rekening.",
    capabilities: [
      "Input stand meter per periode dan sambungan",
      "Deteksi anomali, estimasi, dan validasi pemakaian",
      "Pengajuan koreksi baca meter dan tagih ulang terkendali",
    ],
    benefits: [
      "Kualitas data billing meningkat",
      "Koreksi lebih akuntabel",
      "Selisih rekening lebih mudah dicegah",
    ],
  },
  {
    id: "tarif-pdam",
    title: "Tarif Blok Progresif",
    shortTitle: "Tarif",
    icon: "Calculator",
    description:
      "Mengelola versi tarif, zona pelanggan, blok progresif, abonemen, biaya meter, minimum charge, dan simulasi rekening.",
    problem:
      "Tarif yang tidak versioned membuat rekonstruksi tagihan lama sulit saat ada perubahan tarif atau koreksi periode.",
    capabilities: [
      "Versi tarif aktif dan arsip tarif",
      "Zona tarif, blok progresif, abonemen, biaya meter, dan minimum charge",
      "Tariff pinning pada invoice agar tagihan tidak berubah retroaktif",
    ],
    benefits: [
      "Kalkulasi tagihan lebih konsisten",
      "Riwayat tarif tetap dapat diaudit",
      "Simulasi tarif lebih mudah dikontrol",
    ],
  },
  {
    id: "billing-drd",
    title: "Billing, Invoice, dan DRD",
    shortTitle: "Billing",
    icon: "ReceiptText",
    description:
      "Menerbitkan invoice/DRD dari data pelanggan, baca meter, tarif, komponen rekening, dan periode yang sudah tervalidasi sebagai sumber piutang dan jurnal.",
    problem:
      "Penerbitan tagihan yang tidak idempoten dan tidak terhubung ke data sumber rawan duplikasi, koreksi sulit, dan piutang tidak akurat.",
    capabilities: [
      "Generate tagihan per periode dari data meter dan tarif",
      "Satu invoice regular aktif per sambungan dan periode",
      "Koreksi rekening melalui credit memo dan invoice pengganti",
    ],
    benefits: [
      "DRD lebih konsisten",
      "Piutang lebih akurat",
      "Alur ke akuntansi lebih jelas",
    ],
  },
  {
    id: "kasir-settlement",
    title: "Kasir, Pembayaran, dan Settlement",
    shortTitle: "Kasir",
    icon: "CreditCard",
    description:
      "Mencatat pembayaran counter, QRIS, virtual account, PPOB, alokasi partial/full, overpay, struk, rekap kasir, dan referensi kas/bank.",
    problem:
      "Penerimaan yang tidak terkunci ke invoice dapat menimbulkan status lunas yang terlambat, pembayaran ganda, atau selisih kasir.",
    capabilities: [
      "Settlement idempoten dengan referensi pembayaran",
      "Alokasi tagihan, pembayaran sebagian, lunas, dan overpay ke deposit",
      "Struk kasir 58mm, 80mm, A5, dan rekap penerimaan",
    ],
    benefits: [
      "Status tagihan lebih akurat",
      "Rekap kasir lebih cepat",
      "Penerimaan lebih mudah direkonsiliasi",
    ],
  },
  {
    id: "piutang-ecl-dunning",
    title: "Piutang, Aging, ECL, dan Dunning",
    shortTitle: "Piutang",
    icon: "BarChart3",
    description:
      "Memantau aging piutang, tunggakan, dunning, penyisihan ECL SAK EP Bab 11, dan penghapusan piutang tak tertagih.",
    problem:
      "Piutang yang tidak dikelompokkan menurut umur membuat penagihan, penyisihan, dan penghapusan menjadi sulit dipertanggungjawabkan.",
    capabilities: [
      "Aging piutang per pelanggan dan bucket umur",
      "Dunning SP1/SP2/SP3 dan log penagihan",
      "ECL, write-off, dan recovery dengan jurnal sumber",
    ],
    benefits: [
      "Tunggakan lebih mudah diprioritaskan",
      "Penyisihan piutang lebih terukur",
      "Penghapusan piutang tetap berjejak",
    ],
  },
  {
    id: "kas-bank",
    title: "Kas, Bank, dan Rekonsiliasi",
    shortTitle: "Kas & Bank",
    icon: "Landmark",
    description:
      "Menghubungkan penerimaan, pengeluaran, rekening bank, settlement, bank statement, rekonsiliasi, dan jurnal sumber.",
    problem:
      "Kas/bank yang berjalan terpisah dari pembayaran dan jurnal membuat rekonsiliasi harian maupun bulanan memakan waktu.",
    capabilities: [
      "Pencatatan penerimaan dan pengeluaran kas/bank",
      "Import atau input rekening koran",
      "Matching kas/bank terhadap jurnal dan transaksi sumber",
    ],
    benefits: [
      "Arus kas lebih transparan",
      "Rekonsiliasi lebih cepat",
      "Data bank siap masuk laporan",
    ],
  },
  {
    id: "akuntansi-jurnal",
    title: "Akuntansi, Jurnal, dan Buku Besar",
    shortTitle: "Akuntansi",
    icon: "WalletCards",
    description:
      "Mengelola CoA, auto-journal dari transaksi sumber, jurnal manual, posting, reversal, period lock, general ledger, dan subledger AR.",
    problem:
      "Jurnal yang tidak terhubung ke transaksi sumber membuat laporan sulit diverifikasi dan koreksi berisiko mengubah data final.",
    capabilities: [
      "Double-entry dengan debit sama dengan kredit",
      "Jurnal posted immutable dan koreksi melalui reversal",
      "Buku besar dari posted ledger, bukan dari transaksi mentah",
    ],
    benefits: [
      "Traceability billing-to-accounting lebih kuat",
      "Jejak transaksi lebih jelas",
      "Laporan lebih siap diaudit",
    ],
  },
  {
    id: "laporan-sak-ep",
    title: "Laporan Operasional dan Keuangan SAK EP",
    shortTitle: "Laporan",
    icon: "FileBarChart",
    description:
      "Menyediakan laporan DRD, penerimaan, piutang, kas/bank, buku besar, neraca, laba rugi, LPE, arus kas, dan CaLK.",
    problem:
      "Laporan yang disusun dari banyak file membuat angka antar laporan rawan berbeda dan terlambat disajikan.",
    capabilities: [
      "Laporan operasional DRD, rekap tagihan, dan pendapatan",
      "Neraca, laba rugi, LPE, arus kas, dan CaLK SAK EP",
      "Cetak A4 dan ekspor Excel untuk kebutuhan manajemen",
    ],
    benefits: [
      "Laporan lebih cepat tersedia",
      "Angka lebih mudah diverifikasi",
      "Manajemen mendapat basis keputusan yang lebih kuat",
    ],
  },
  {
    id: "audit-trail",
    title: "Audit Trail, SoD, dan Hash-Chain",
    shortTitle: "Audit Trail",
    icon: "ShieldCheck",
    description:
      "Mencatat aktivitas penting, login, perubahan data, pemisahan tugas, dan integritas hash-chain atas jurnal posted.",
    problem:
      "Tanpa audit trail, SPI sulit memastikan siapa melakukan apa, kapan dilakukan, dan apakah data final pernah berubah.",
    capabilities: [
      "Jejak aktivitas pengguna dan perubahan data penting",
      "Segregation of Duties untuk kasir, akuntan, manajer, dan system poster",
      "Verifikasi hash-chain untuk jurnal posted",
    ],
    benefits: [
      "Akuntabilitas meningkat",
      "Manipulasi data lebih mudah dideteksi",
      "Pemeriksaan internal lebih cepat",
    ],
  },
  {
    id: "portal-pelanggan",
    title: "Portal Pelanggan dan Pembayaran Digital",
    shortTitle: "Portal",
    icon: "DatabaseZap",
    description:
      "Mendukung API portal pelanggan untuk OTP, cek tagihan, detail invoice, pembayaran QRIS/VA, bukti bayar, dan pengaduan.",
    problem:
      "Tanpa kanal mandiri, pelanggan harus bergantung pada loket untuk mengecek tagihan, bukti bayar, dan pengaduan.",
    capabilities: [
      "OTP login pelanggan dengan sesi bearer mandiri",
      "Daftar tagihan, detail invoice, histori pembayaran, dan bukti bayar signed URL",
      "Payment intent QRIS/VA dan webhook pembayaran",
    ],
    benefits: [
      "Layanan pelanggan lebih cepat",
      "Beban loket dapat berkurang",
      "Pembayaran digital lebih mudah diintegrasikan",
    ],
  },
  {
    id: "nrw-dma",
    title: "NRW, DMA, dan Water Balance",
    shortTitle: "NRW",
    icon: "Activity",
    description:
      "Mengelola DMA, target NRW, IWA water balance, ILI, UARL, dan penyesuaian GL untuk analisis kehilangan air.",
    problem:
      "NRW yang tidak dihitung terstruktur membuat manajemen sulit memisahkan kehilangan nyata, kehilangan semu, dan dampak keuangan.",
    capabilities: [
      "DMA zone, target NRW, dan water balance per periode",
      "Perhitungan NRW percentage, ILI, dan UARL",
      "Penyesuaian GL untuk valuasi kehilangan air jika dibutuhkan",
    ],
    benefits: [
      "NRW lebih mudah dimonitor",
      "Kinerja distribusi lebih terukur",
      "Analisis operasional tersambung ke keuangan",
    ],
  },
  {
    id: "aset-pdam",
    title: "Aset, Penyusutan, dan Konstruksi",
    shortTitle: "Aset",
    icon: "Building2",
    description:
      "Mengelola aset tetap, kategori aset, penyusutan garis lurus, pelepasan, revaluasi, dan konstruksi dalam pengerjaan.",
    problem:
      "Aset dan penyusutan yang dikelola manual berisiko tidak sinkron dengan GL dan laporan keuangan.",
    capabilities: [
      "Master aset, kategori, masa manfaat, dan akun terkait",
      "Penyusutan periodik, pelepasan, dan revaluasi",
      "Integrasi jurnal aset ke laporan SAK EP",
    ],
    benefits: [
      "Nilai buku aset lebih tertib",
      "Penyusutan lebih konsisten",
      "Dampak aset ke laporan lebih jelas",
    ],
  },
  {
    id: "rkap-anggaran",
    title: "RKAP, Anggaran, dan Realisasi",
    shortTitle: "RKAP",
    icon: "ClipboardCheck",
    description:
      "Mendukung rencana kerja dan anggaran perusahaan, revisi, realisasi GL, threshold alert, dan ekspor format manajemen.",
    problem:
      "Anggaran yang tidak dibandingkan dengan realisasi GL membuat kontrol biaya dan pendapatan terlambat diketahui.",
    capabilities: [
      "Workflow RKAP draft, submitted, approved, dan revised",
      "Budget vs realization dari saldo GL",
      "Alert threshold dan ekspor Excel/PDF",
    ],
    benefits: [
      "Kontrol anggaran lebih aktif",
      "Variance lebih cepat terlihat",
      "Direksi mendapat ringkasan realisasi lebih siap",
    ],
  },
  {
    id: "gudang-inventaris",
    title: "Gudang, Inventaris, dan Stok Opname",
    shortTitle: "Gudang",
    icon: "WalletCards",
    description:
      "Mengelola barang, GRN, GIN, moving average/FIFO costing, stok opname, dan jurnal penyesuaian persediaan.",
    problem:
      "Mutasi barang yang tidak bernilai akuntansi membuat stok dan laporan keuangan mudah berbeda.",
    capabilities: [
      "Penerimaan barang, pengeluaran barang, dan stock movement",
      "Harga rata-rata tertimbang atau layer costing",
      "Stok opname dengan jurnal surplus atau shortage",
    ],
    benefits: [
      "Stok lebih akurat",
      "Nilai persediaan lebih terkendali",
      "Penyesuaian gudang berjejak ke jurnal",
    ],
  },
  {
    id: "voucher-pengeluaran",
    title: "Voucher Pengeluaran",
    shortTitle: "Voucher",
    icon: "Banknote",
    description:
      "Mengelola bukti kas/bank keluar, pemasok, otorisasi berjenjang, pembayaran, void, cetak voucher, dan aging utang.",
    problem:
      "Pengeluaran tanpa workflow otorisasi dan jurnal sumber memperlemah kontrol kas/bank dan audit pembayaran.",
    capabilities: [
      "FSM voucher draft, verified, approved, paid, dan void",
      "SoD pembuat, pemeriksa, penyetuju, dan pembayar",
      "Auto-jurnal pengeluaran dan reversal saat void",
    ],
    benefits: [
      "Pengeluaran lebih terkendali",
      "Otorisasi lebih jelas",
      "Audit kas/bank lebih mudah",
    ],
  },
  {
    id: "iam-keamanan",
    title: "IAM, Role, Permission, dan 2FA",
    shortTitle: "IAM",
    icon: "LockKeyhole",
    description:
      "Mengatur role, permission, login, 2FA, proteksi route, service account, dan pembatasan akses berdasarkan tanggung jawab.",
    problem:
      "Akses yang terlalu luas membuat kasir, akuntan, hublang, gudang, dan manajemen rawan melampaui fungsi tugasnya.",
    capabilities: [
      "Role untuk super admin, direktur, keuangan, akuntan, kasir, meter, hublang, gudang, dan system poster",
      "Permission route dan menu berdasarkan kewenangan",
      "Dukungan 2FA serta audit login",
    ],
    benefits: [
      "Akses lebih aman",
      "SoD lebih mudah ditegakkan",
      "Risiko penyalahgunaan akun berkurang",
    ],
  },
];
