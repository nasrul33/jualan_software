"use client";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EdukasiErrorProps {
  error: Error;
  reset: () => void;
}

export default function EdukasiError({ error, reset }: EdukasiErrorProps) {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="mx-auto max-w-2xl rounded-lg border border-red-200 bg-white p-8 text-center shadow-sm shadow-slate-200/60">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 text-red-700">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-2xl font-bold tracking-normal text-slate-950">
            Artikel belum bisa dimuat
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Terjadi kendala saat memuat konten edukasi. Detail teknis:{" "}
            <span className="font-semibold text-slate-950">{error.message}</span>
          </p>
          <Button className="mt-6" onClick={reset}>
            Muat Ulang
          </Button>
        </div>
      </div>
    </section>
  );
}
