export interface PrivacySection {
  title: string;
  summary: string;
  points: string[];
}

export const privacyEffectiveDate = "19 Juni 2026";

export const privacyHighlights = [
  "Website pdamcore.id hanya untuk marketing, edukasi, demo, proposal, dan kontak.",
  "Aplikasi operasional PDAMCore berada terpisah di app.pdamcore.id.",
  "Form publik tidak meminta password, token, data rekening pelanggan, atau data operasional PDAM.",
  "Data kontak dipakai untuk menindaklanjuti demo, proposal, dan komunikasi produk PDAMCore.",
] as const;

export const privacySections: PrivacySection[] = [
  {
    title: "Ruang lingkup",
    summary:
      "Kebijakan ini berlaku untuk website marketing dan edukasi PDAMCore di pdamcore.id.",
    points: [
      "Website ini berisi informasi produk, fitur, solusi, artikel edukasi, form demo, form kontak, dan CTA WhatsApp.",
      "Kebijakan ini tidak menggantikan perjanjian layanan, DPA, SOP keamanan, atau kebijakan internal PDAM/Perumdam pada aplikasi operasional.",
      "Login aplikasi diarahkan ke app.pdamcore.id dan dikendalikan oleh konfigurasi aplikasi operasional yang terpisah.",
    ],
  },
  {
    title: "Data yang dikumpulkan",
    summary:
      "Data publik yang dikumpulkan dibatasi pada data kontak dan konteks kebutuhan implementasi.",
    points: [
      "Form demo dapat memproses nama, jabatan, instansi, nomor WhatsApp, email opsional, kebutuhan demo, preferensi jadwal, dan catatan tambahan.",
      "Form kontak dapat memproses nama, instansi, nomor WhatsApp, pesan, dan persetujuan penggunaan data kontak.",
      "WhatsApp CTA membuka pesan yang sudah diisi otomatis, tetapi pengiriman akhir tetap berada pada kontrol pengguna.",
    ],
  },
  {
    title: "Tujuan penggunaan data",
    summary:
      "Data digunakan untuk komunikasi produk yang relevan dan tindak lanjut permintaan dari PDAM/Perumdam.",
    points: [
      "Menjawab pertanyaan tentang PDAMCore, modul billing, kasir, kas/bank, akuntansi, laporan, dan audit trail.",
      "Menjadwalkan demo, menyusun proposal, dan menyesuaikan pembahasan dengan prioritas PDAM/Perumdam.",
      "Meningkatkan kualitas konten edukasi, alur website, dan pemahaman kebutuhan calon pengguna.",
    ],
  },
  {
    title: "Webhook, WhatsApp, dan pihak ketiga",
    summary:
      "Integrasi server-side bersifat opsional dan dikonfigurasi melalui environment variable.",
    points: [
      "Jika webhook internal diaktifkan, data form dikirim ke endpoint yang dikonfigurasi oleh pengelola PDAMCore.",
      "Jika webhook tidak aktif atau gagal, website menampilkan WhatsApp fallback agar pengguna dapat mengirim detail secara manual.",
      "Analytics publik dapat digunakan untuk memahami trafik website tanpa meminta kredensial aplikasi operasional.",
    ],
  },
  {
    title: "Retensi dan penghapusan",
    summary:
      "Data kontak disimpan selama diperlukan untuk tindak lanjut komersial dan administrasi.",
    points: [
      "Pengguna dapat meminta koreksi atau penghapusan data kontak yang dikirim melalui website publik.",
      "Permintaan penghapusan dapat dikirim melalui halaman kontak resmi PDAMCore.",
      "Data yang sudah menjadi bagian dari dokumen proposal atau komunikasi bisnis dapat mengikuti ketentuan arsip administrasi yang berlaku.",
    ],
  },
  {
    title: "Keamanan",
    summary:
      "Website dirancang untuk meminimalkan data sensitif dan memisahkan kanal publik dari aplikasi operasional.",
    points: [
      "Website tidak menyimpan secret di kode sumber dan menggunakan environment variable untuk URL, nomor kontak, analytics, dan webhook.",
      "Form menggunakan validasi server-side agar input tidak diproses sebelum memenuhi format yang ditentukan.",
      "Jangan mengirim password, token, dump database, data pelanggan, atau dokumen rahasia melalui form publik.",
    ],
  },
  {
    title: "Perubahan kebijakan",
    summary:
      "Kebijakan dapat diperbarui saat fitur website, integrasi, atau kebutuhan kepatuhan berubah.",
    points: [
      "Tanggal efektif terbaru ditampilkan di bagian atas halaman ini.",
      "Perubahan material akan tercermin pada konten halaman privacy di pdamcore.id.",
      "Penggunaan website setelah pembaruan berarti pengguna memahami kebijakan yang berlaku saat itu.",
    ],
  },
];
