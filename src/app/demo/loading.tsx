export default function DemoLoading() {
  return (
    <section className="section-padding bg-background">
      <div className="container grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <div className="h-7 w-36 animate-pulse rounded-md bg-slate-200" />
          <div className="mt-5 h-12 w-full max-w-2xl animate-pulse rounded-md bg-slate-200" />
          <div className="mt-4 h-6 w-full max-w-xl animate-pulse rounded-md bg-slate-200" />
          <div className="mt-8 grid gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-16 animate-pulse rounded-lg border border-slate-200 bg-white"
              />
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-white p-6 shadow-sm shadow-slate-200/60">
          <div className="h-6 w-32 animate-pulse rounded-md bg-slate-200" />
          <div className="mt-5 h-8 w-full max-w-md animate-pulse rounded-md bg-slate-200" />
          <div className="mt-8 grid gap-5">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index}>
                <div className="h-4 w-32 animate-pulse rounded-md bg-slate-200" />
                <div className="mt-2 h-11 animate-pulse rounded-md bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
