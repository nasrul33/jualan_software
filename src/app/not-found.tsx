import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="text-sm font-semibold uppercase tracking-wide text-sky-800">
        404
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-normal text-slate-950">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-slate-700">
        Tautan yang Anda buka tidak tersedia. Kembali ke beranda atau jadwalkan
        demo untuk konsultasi kebutuhan PDAMCore.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className={buttonVariants({ variant: "primary" })}>
          Kembali ke Beranda
        </Link>
        <Link href="/demo" className={buttonVariants({ variant: "outline" })}>
          Jadwalkan Demo
        </Link>
      </div>
    </section>
  );
}
