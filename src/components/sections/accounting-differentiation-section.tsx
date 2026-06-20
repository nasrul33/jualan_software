import { MarketingIcon } from "@/components/icons/icon-map";
import { Badge } from "@/components/ui/badge";
import { accountingDifferentiators } from "@/content/home";

const proofChain = [
  "Baca meter",
  "DRD",
  "Kasir",
  "Piutang",
  "Kas/Bank",
  "Jurnal",
  "GL",
  "Laporan SAK EP",
] as const;

export function AccountingDifferentiationSection() {
  return (
    <section className="section-padding bg-slate-950 text-white">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <Badge variant="success">Diferensiasi Produk</Badge>
            <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-normal text-white sm:text-4xl">
              Billing-to-accounting: angka tidak berhenti di tagihan dan loket
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-sky-50">
              PDAMCore tidak hanya membantu menerbitkan tagihan. Produk ini
              menghubungkan data pelanggan, baca meter, DRD, kasir, piutang,
              kas/bank, jurnal, buku besar, laporan SAK EP, dan audit trail
              sebagai satu alur bukti.
            </p>

            <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-sky-950/30">
              <p className="text-sm font-semibold uppercase tracking-wide text-teal-200">
                Rantai Bukti Transaksi
              </p>
              <ol className="mt-5 grid gap-3 sm:grid-cols-2">
                {proofChain.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.05] p-3"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sky-400/15 text-sm font-bold text-sky-100">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold text-white">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {accountingDifferentiators.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-sky-950/20 transition duration-200 hover:-translate-y-0.5 hover:border-teal-300/50 hover:bg-white/[0.09]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-300/10 text-teal-100">
                  <MarketingIcon name={item.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-sky-50">
                  {item.description}
                </p>
                <p className="mt-4 rounded-md border border-teal-300/20 bg-teal-300/10 p-3 text-sm font-semibold leading-6 text-teal-50">
                  {item.proof}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
