import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

export function FormField({
  id,
  label,
  required = false,
  error,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-slate-950">
        {label} {required ? <span className="text-red-700">*</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm font-semibold text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function formControlClass(error?: string): string {
  return cn(
    "h-11 w-full rounded-md border bg-white px-3 text-sm font-medium text-slate-950 shadow-sm transition placeholder:text-slate-500",
    "focus:border-sky-500 focus:ring-2 focus:ring-sky-200",
    error ? "border-red-300 bg-red-50" : "border-slate-300",
  );
}
