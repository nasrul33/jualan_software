"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { MarketingIcon } from "@/components/icons/icon-map";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { HomepageMetric } from "@/types/marketing";

interface AnimatedMetricCardProps {
  metric: HomepageMetric;
}

function extractLeadingNumber(value: string): number | null {
  const match = value.match(/^(\d+)/);
  return match ? Number(match[1]) : null;
}

export function AnimatedMetricCard({ metric }: AnimatedMetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [displayNumber, setDisplayNumber] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const leadingNumber = useMemo(() => extractLeadingNumber(metric.value), [metric.value]);

  useEffect(() => {
    const element = ref.current;

    if (!element || reducedMotion) {
      setActive(true);
      setDisplayNumber(leadingNumber ?? 0);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [leadingNumber, reducedMotion]);

  useEffect(() => {
    if (!active || leadingNumber === null || reducedMotion) {
      return;
    }

    const duration = 800;
    const start = performance.now();
    let animationFrame = 0;

    const tick = (time: number) => {
      const progress = Math.min(1, (time - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayNumber(Math.round(leadingNumber * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [active, leadingNumber, reducedMotion]);

  const value =
    leadingNumber === null
      ? metric.value
      : metric.value.replace(String(leadingNumber), String(displayNumber));

  return (
    <div
      ref={ref}
      className="group rounded-lg border border-white/20 bg-white/10 p-4 text-white backdrop-blur transition duration-200 hover:-translate-y-1 hover:border-teal-200/60 hover:bg-white/15"
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-sky-100">
        <MarketingIcon
          name={metric.icon}
          className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
        />
        {metric.label}
      </div>
      <p className="mt-2 text-2xl font-bold tracking-normal">{value}</p>
    </div>
  );
}
