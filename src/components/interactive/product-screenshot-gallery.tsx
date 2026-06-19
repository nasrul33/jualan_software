"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ImageOff, Loader2, MonitorCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ProductScreenshot } from "@/types/marketing";

interface ProductScreenshotGalleryProps {
  screenshots: ProductScreenshot[];
}

type ScreenshotLoadState = "loading" | "loaded" | "error";

export function ProductScreenshotGallery({
  screenshots,
}: ProductScreenshotGalleryProps) {
  const [activeScreenshotId, setActiveScreenshotId] = useState(
    screenshots[0]?.id ?? "",
  );
  const [imageStates, setImageStates] = useState<
    Record<string, ScreenshotLoadState>
  >({});
  const activeImageRef = useRef<HTMLImageElement | null>(null);
  const activeScreenshot =
    screenshots.find((item) => item.id === activeScreenshotId) ??
    screenshots[0];
  const activeScreenshotSrc = activeScreenshot?.src;

  useEffect(() => {
    const image = activeImageRef.current;

    if (!activeScreenshotSrc || !image?.complete) {
      return;
    }

    setImageStates((current) => ({
      ...current,
      [activeScreenshotSrc]: image.naturalWidth > 0 ? "loaded" : "error",
    }));
  }, [activeScreenshotSrc]);

  if (!activeScreenshot) {
    return (
      <div
        className="rounded-lg border border-slate-200 bg-white p-6 text-center shadow-soft"
        data-testid="product-screenshot-gallery"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-slate-100 text-slate-500">
          <ImageOff className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-base font-bold tracking-normal text-slate-950">
          Preview aplikasi belum tersedia
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          Screenshot produk akan ditampilkan setelah aset publik disiapkan.
        </p>
      </div>
    );
  }

  const activeImageState = imageStates[activeScreenshot.src] ?? "loading";

  const setImageState = (src: string, state: ScreenshotLoadState) => {
    setImageStates((current) => ({
      ...current,
      [src]: state,
    }));
  };

  return (
    <div
      className="min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-soft"
      data-testid="product-screenshot-gallery"
    >
      <div className="flex min-w-0 gap-2 overflow-x-auto pb-2">
        {screenshots.map((screenshot) => {
          const selected = screenshot.id === activeScreenshot.id;

          return (
            <button
              key={screenshot.id}
              type="button"
              onClick={() => setActiveScreenshotId(screenshot.id)}
              onMouseEnter={() => setActiveScreenshotId(screenshot.id)}
              onFocus={() => setActiveScreenshotId(screenshot.id)}
              className={cn(
                "min-w-[150px] rounded-md border px-3 py-2 text-left text-sm font-semibold transition",
                selected
                  ? "border-sky-300 bg-sky-50 text-sky-950"
                  : "border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:bg-slate-50",
              )}
              aria-pressed={selected}
              aria-label={`Tampilkan screenshot ${screenshot.title}`}
            >
              <span className="block truncate">{screenshot.title}</span>
              <span className="mt-1 block text-xs font-medium text-slate-500">
                {screenshot.module}
              </span>
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
        <div className="relative aspect-[1600/787] w-full">
          <Image
            key={activeScreenshot.src}
            src={activeScreenshot.src}
            alt={activeScreenshot.alt}
            fill
            sizes="(min-width: 1280px) 58vw, (min-width: 768px) 90vw, 100vw"
            className="object-cover"
            priority={activeScreenshot.id === screenshots[0]?.id}
            ref={activeImageRef}
            onLoad={() => setImageState(activeScreenshot.src, "loaded")}
            onError={() => setImageState(activeScreenshot.src, "error")}
          />
          {activeImageState === "loading" ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-700">
              <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold shadow-sm">
                <Loader2 className="h-4 w-4 animate-spin text-sky-700" />
                Memuat preview
              </div>
            </div>
          ) : null}
          {activeImageState === "error" ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 p-6 text-center">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-white text-slate-500 shadow-sm">
                  <ImageOff className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-950">
                  Preview gagal dimuat
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Aset gambar tidak tersedia atau gagal diproses browser.
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-4 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[auto_1fr] sm:items-start">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-sky-100 text-sky-800">
          <MonitorCheck className="h-5 w-5" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">{activeScreenshot.module}</Badge>
            <h3 className="text-base font-bold tracking-normal text-slate-950">
              {activeScreenshot.title}
            </h3>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            {activeScreenshot.description}
          </p>
        </div>
      </div>
    </div>
  );
}
