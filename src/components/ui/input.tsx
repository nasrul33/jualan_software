import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-11 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-slate-950 shadow-sm transition-colors placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";
