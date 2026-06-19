export default function KontakLoading() {
  return (
    <section className="section-padding bg-background">
      <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="h-7 w-36 animate-pulse rounded-md bg-slate-200" />
          <div className="mt-5 h-12 w-full max-w-2xl animate-pulse rounded-md bg-slate-200" />
          <div className="mt-4 h-6 w-full max-w-xl animate-pulse rounded-md bg-slate-200" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-44 animate-pulse rounded-lg border border-slate-200 bg-white"
              />
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-white p-6 shadow-sm shadow-slate-200/60">
          <div className="h-6 w-32 animate-pulse rounded-md bg-slate-200" />
          <div className="mt-5 h-8 w-full max-w-md animate-pulse rounded-md bg-slate-200" />
          <div className="mt-8 grid gap-5">
            {Array.from({ length: 5 }).map((_, index) => (
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
