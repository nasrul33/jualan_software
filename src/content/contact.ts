import {
  CalendarCheck,
  FileText,
  Mail,
  MessageCircle,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export interface ContactMethod {
  title: string;
  description: string;
  label: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
}

export interface ContactReason {
  title: string;
  description: string;
}

export interface ContactStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const contactReasons: ContactReason[] = [
  {
    title: "Demo alur PDAM",
    description:
      "Bahas pelanggan, sambungan, baca meter, tarif, DRD, kasir, piutang, jurnal, laporan, dan audit trail.",
  },
  {
    title: "Proposal implementasi",
    description:
      "Minta bahan kebutuhan, ruang lingkup modul, prioritas deployment, dan estimasi tahapan implementasi.",
  },
  {
    title: "Diskusi kontrol internal",
    description:
      "Validasi kebutuhan SoD, audit trail, period lock, reversal, rekonsiliasi, dan laporan SAK EP.",
  },
];

export const contactSteps: ContactStep[] = [
  {
    title: "Kirim kebutuhan",
    description:
      "Tuliskan konteks PDAM/Perumdam dan area yang ingin dibahas agar respons tidak generik.",
    icon: FileText,
  },
  {
    title: "Konfirmasi kanal",
    description:
      "Tim PDAMCore menindaklanjuti melalui WhatsApp atau email sesuai data kontak yang dikirim.",
    icon: MessageCircle,
  },
  {
    title: "Jadwalkan pembahasan",
    description:
      "Sesi lanjutan difokuskan ke workflow yang prioritas: billing, kasir, akuntansi, laporan, atau audit.",
    icon: CalendarCheck,
  },
];

export const contactAssurances: ContactReason[] = [
  {
    title: "Website publik terpisah",
    description:
      "Halaman ini hanya untuk marketing dan edukasi. Aplikasi operasional tetap berada di app.pdamcore.id.",
  },
  {
    title: "Data kontak terbatas",
    description:
      "Data yang dikirim melalui form dipakai untuk menindaklanjuti demo, proposal, dan konsultasi PDAMCore.",
  },
  {
    title: "Tidak meminta password",
    description:
      "PDAMCore tidak meminta kredensial aplikasi, token, atau data sensitif melalui form kontak publik.",
  },
];

export const contactMethodIcons = {
  whatsapp: MessageCircle,
  email: Mail,
  demo: CalendarCheck,
  privacy: ShieldCheck,
} as const;
