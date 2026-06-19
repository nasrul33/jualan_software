"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, MessageCircle, Send } from "lucide-react";

import { AnalyticsAnchor } from "@/components/analytics/analytics-link";
import { submitDemoRequest } from "@/app/demo/actions";
import { FormField, formControlClass } from "@/components/forms/form-field";
import { buttonVariants } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { DemoRequestActionState } from "@/types/forms";

const initialState: DemoRequestActionState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

const kebutuhanOptions = [
  "Demo end-to-end PDAMCore",
  "Billing, DRD, dan piutang PDAM",
  "Kasir, settlement, dan pembayaran digital",
  "Akuntansi, GL, period lock, dan laporan SAK EP",
  "Audit trail, SoD, dan kontrol internal",
  "Portal pelanggan, QRIS/VA, dan pengaduan",
  "Minta proposal implementasi PDAMCore",
] as const;

interface DemoRequestFormProps {
  defaultKebutuhan?: string;
  intent?: string;
}

export function DemoRequestForm({
  defaultKebutuhan = kebutuhanOptions[0],
  intent = "demo",
}: DemoRequestFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitDemoRequest,
    initialState,
  );
  const errors = state.fieldErrors;
  const trackedSuccessId = useRef<string | null>(null);
  const [formStartedAt, setFormStartedAt] = useState("");

  useEffect(() => {
    setFormStartedAt(Date.now().toString());
  }, []);

  useEffect(() => {
    if (
      state.status === "success" &&
      state.trackingId &&
      trackedSuccessId.current !== state.trackingId
    ) {
      trackedSuccessId.current = state.trackingId;
      trackEvent("demo_form_success", {
        intent,
        placement: "demo_form",
        has_whatsapp_fallback: Boolean(state.whatsappUrl),
      });
    }
  }, [intent, state.status, state.trackingId, state.whatsappUrl]);

  return (
    <form action={formAction} className="grid gap-5" noValidate>
      <input type="hidden" name="intent" value={intent} />
      <input
        type="hidden"
        name="formStartedAt"
        value={formStartedAt}
        readOnly
      />
      <div className="hidden" aria-hidden="true">
        <label htmlFor="demo-company-fax">Company fax</label>
        <input
          id="demo-company-fax"
          name="company_fax"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          disabled={isPending}
        />
      </div>

      {state.status !== "idle" ? (
        <div
          className={cn(
            "rounded-lg border p-4",
            state.status === "success"
              ? "border-teal-200 bg-teal-50 text-teal-950"
              : "border-red-200 bg-red-50 text-red-950",
          )}
          role="status"
          aria-live="polite"
        >
          <div className="flex gap-3">
            {state.status === "success" ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            ) : (
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            )}
            <div>
              <p className="text-sm font-semibold">{state.message}</p>
              {state.trackingId ? (
                <p className="mt-1 text-xs font-semibold">
                  Kode referensi: {state.trackingId}
                </p>
              ) : null}
              {state.whatsappUrl ? (
                <AnalyticsAnchor
                  href={state.whatsappUrl}
                  eventName="cta_whatsapp_click"
                  eventProps={{ placement: "demo_form_success" }}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                    "mt-4",
                  )}
                >
                  Kirim via WhatsApp
                  <MessageCircle className="h-4 w-4" />
                </AnalyticsAnchor>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          id="nama"
          label="Nama lengkap"
          required
          error={errors.nama}
        >
          <input
            id="nama"
            name="nama"
            type="text"
            autoComplete="name"
            className={formControlClass(errors.nama)}
            aria-invalid={Boolean(errors.nama)}
            aria-describedby={errors.nama ? "nama-error" : undefined}
            placeholder="Contoh: Rani Putri"
            disabled={isPending}
          />
        </FormField>

        <FormField
          id="jabatan"
          label="Jabatan"
          required
          error={errors.jabatan}
        >
          <input
            id="jabatan"
            name="jabatan"
            type="text"
            autoComplete="organization-title"
            className={formControlClass(errors.jabatan)}
            aria-invalid={Boolean(errors.jabatan)}
            aria-describedby={errors.jabatan ? "jabatan-error" : undefined}
            placeholder="Contoh: Kabag Keuangan"
            disabled={isPending}
          />
        </FormField>
      </div>

      <FormField
        id="instansi"
        label="Nama PDAM/Perumdam"
        required
        error={errors.instansi}
      >
        <input
          id="instansi"
          name="instansi"
          type="text"
          autoComplete="organization"
          className={formControlClass(errors.instansi)}
          aria-invalid={Boolean(errors.instansi)}
          aria-describedby={errors.instansi ? "instansi-error" : undefined}
          placeholder="Contoh: Perumdam Tirta Contoh"
          disabled={isPending}
        />
      </FormField>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          id="whatsapp"
          label="Nomor WhatsApp"
          required
          error={errors.whatsapp}
        >
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            className={formControlClass(errors.whatsapp)}
            aria-invalid={Boolean(errors.whatsapp)}
            aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
            placeholder="Contoh: 0812-3456-7890"
            disabled={isPending}
          />
        </FormField>

        <FormField id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={formControlClass(errors.email)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="nama@pdam.go.id"
            disabled={isPending}
          />
        </FormField>
      </div>

      <FormField
        id="kebutuhan"
        label="Kebutuhan demo"
        required
        error={errors.kebutuhan}
      >
        <select
          id="kebutuhan"
          name="kebutuhan"
          className={formControlClass(errors.kebutuhan)}
          defaultValue={defaultKebutuhan}
          aria-invalid={Boolean(errors.kebutuhan)}
          aria-describedby={errors.kebutuhan ? "kebutuhan-error" : undefined}
          disabled={isPending}
        >
          {kebutuhanOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="jadwal" label="Preferensi jadwal" error={errors.jadwal}>
        <input
          id="jadwal"
          name="jadwal"
          type="text"
          className={formControlClass(errors.jadwal)}
          aria-invalid={Boolean(errors.jadwal)}
          aria-describedby={errors.jadwal ? "jadwal-error" : undefined}
          placeholder="Contoh: Selasa pagi atau minggu depan"
          disabled={isPending}
        />
      </FormField>

      <FormField id="pesan" label="Catatan tambahan" error={errors.pesan}>
        <textarea
          id="pesan"
          name="pesan"
          rows={5}
          className={cn(formControlClass(errors.pesan), "h-auto py-3 leading-6")}
          aria-invalid={Boolean(errors.pesan)}
          aria-describedby={errors.pesan ? "pesan-error" : undefined}
          placeholder="Contoh: ingin melihat alur baca meter, DRD, kasir, jurnal, laporan SAK EP, dan audit trail."
          disabled={isPending}
        />
      </FormField>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <label className="flex gap-3 text-sm leading-6 text-slate-800">
          <input
            name="persetujuan"
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-700"
            aria-invalid={Boolean(errors.persetujuan)}
            aria-describedby={
              errors.persetujuan ? "persetujuan-error" : undefined
            }
            disabled={isPending}
          />
          <span>
            Saya menyetujui data kontak digunakan oleh PDAMCore untuk
            menindaklanjuti permintaan demo dan proposal.
          </span>
        </label>
        {errors.persetujuan ? (
          <p
            id="persetujuan-error"
            className="mt-2 text-sm font-semibold text-red-700"
          >
            {errors.persetujuan}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className={buttonVariants({
          variant: "primary",
          size: "lg",
          className: "w-full",
        })}
        disabled={isPending}
      >
        {isPending ? "Mengirim permintaan..." : "Kirim Permintaan Demo"}
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
