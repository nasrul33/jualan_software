import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "border-sky-200 bg-sky-50 text-sky-800",
        success: "border-teal-200 bg-teal-50 text-teal-800",
        warning: "border-amber-200 bg-amber-50 text-amber-900",
        neutral: "border-slate-200 bg-slate-100 text-slate-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
