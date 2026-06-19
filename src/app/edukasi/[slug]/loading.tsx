export default function EdukasiArticleLoading() {
  return (
    <article className="section-padding bg-background">
      <div className="container grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <div className="h-9 w-40 animate-pulse rounded-md bg-slate-200" />
          <div className="mt-8 h-12 w-full max-w-3xl animate-pulse rounded-md bg-slate-200" />
          <div className="mt-5 h-7 w-full max-w-2xl animate-pulse rounded-md bg-slate-200" />
          <div className="mt-10 rounded-lg border border-border bg-white p-6">
            <div className="space-y-4">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="h-5 animate-pulse rounded-md bg-slate-200"
                  style={{ width: `${index % 3 === 0 ? 82 : 100}%` }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-white p-6">
          <div className="h-6 w-28 animate-pulse rounded-md bg-slate-200" />
          <div className="mt-5 h-28 animate-pulse rounded-md bg-slate-200" />
        </div>
      </div>
    </article>
  );
}
