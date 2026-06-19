export default function Loading() {
  return (
    <div className="container py-16" role="status" aria-live="polite">
      <div className="grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="h-40 animate-pulse rounded-lg border border-border bg-slate-100"
          />
        ))}
      </div>
      <span className="sr-only">Memuat halaman PDAMCore.</span>
    </div>
  );
}
