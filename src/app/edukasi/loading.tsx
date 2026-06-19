export default function EdukasiLoading() {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="max-w-3xl">
          <div className="h-7 w-32 animate-pulse rounded-md bg-slate-200" />
          <div className="mt-5 h-11 w-full max-w-2xl animate-pulse rounded-md bg-slate-200" />
          <div className="mt-4 h-6 w-full max-w-xl animate-pulse rounded-md bg-slate-200" />
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-lg border border-border bg-white p-6 shadow-sm shadow-slate-200/60"
            >
              <div className="h-5 w-24 animate-pulse rounded-md bg-slate-200" />
              <div className="mt-5 h-7 w-full animate-pulse rounded-md bg-slate-200" />
              <div className="mt-4 h-20 w-full animate-pulse rounded-md bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
