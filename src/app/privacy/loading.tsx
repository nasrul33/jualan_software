export default function PrivacyLoading() {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="h-7 w-36 animate-pulse rounded-md bg-slate-200" />
            <div className="mt-5 h-12 w-full max-w-2xl animate-pulse rounded-md bg-slate-200" />
            <div className="mt-4 h-6 w-full max-w-xl animate-pulse rounded-md bg-slate-200" />
            <div className="mt-8 h-40 animate-pulse rounded-lg border border-sky-200 bg-sky-50" />
            <div className="mt-6 grid gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-16 animate-pulse rounded-lg border border-slate-200 bg-white"
                />
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-white p-6 shadow-sm shadow-slate-200/60">
            <div className="h-12 w-12 animate-pulse rounded-lg bg-slate-200" />
            <div className="mt-5 h-8 w-full max-w-md animate-pulse rounded-md bg-slate-200" />
            <div className="mt-8 grid gap-3">
              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 animate-pulse rounded-md border border-slate-200 bg-slate-50"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
