"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;

      setProgress(nextProgress);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[60] h-1 bg-gradient-to-r from-sky-600 via-teal-500 to-amber-400 transition-[width] duration-150"
      style={{ width: `${progress * 100}%` }}
      aria-hidden="true"
      data-testid="scroll-progress"
    />
  );
}
