import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-sm shadow-sky-900/10 hover:-translate-y-0.5 hover:bg-sky-800 hover:shadow-md",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm shadow-teal-900/10 hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-md",
        outline:
          "border border-slate-300 bg-white text-slate-950 shadow-sm hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50",
        ghost: "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-red-700",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-5",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);

Button.displayName = "Button";
