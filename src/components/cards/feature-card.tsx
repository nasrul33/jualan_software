import { CheckCircle2 } from "lucide-react";

import { MarketingIcon } from "@/components/icons/icon-map";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { FeatureModule } from "@/types/marketing";

interface FeatureCardProps {
  feature: FeatureModule;
  compact?: boolean;
}

export function FeatureCard({ feature, compact = false }: FeatureCardProps) {
  return (
    <Card className="h-full transition-shadow hover:shadow-soft">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50 text-sky-800">
            <MarketingIcon name={feature.icon} className="h-5 w-5" />
          </div>
          <Badge variant="neutral">{feature.shortTitle}</Badge>
        </div>
        <CardTitle>{feature.title}</CardTitle>
        <CardDescription>{feature.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!compact ? (
          <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-950">
            <span className="font-semibold">Masalah:</span> {feature.problem}
          </div>
        ) : null}
        <ul className="mt-5 space-y-3">
          {feature.benefits.map((benefit) => (
            <li key={benefit} className="flex gap-2 text-sm leading-6 text-slate-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
