import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-32 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-slate-950 shadow-sm transition-colors placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";
