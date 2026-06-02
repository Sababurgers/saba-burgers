import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "dark-ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-tomato text-paper hover:bg-tomato-700",
  secondary: "bg-gold text-carbon-800 hover:bg-gold-700",
  ghost: "bg-transparent text-carbon-800 border border-carbon-800/12 hover:bg-paper-3",
  "dark-ghost":
    "bg-transparent text-paper border border-paper/25 hover:bg-paper/5",
};

const SIZES: Record<Size, string> = {
  sm: "px-3.5 py-2 text-[13px]",
  md: "px-4.5 py-3 text-sm",
  lg: "px-6 py-4 text-base",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  full?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", full, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 rounded-pill font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato focus-visible:ring-offset-2",
          VARIANTS[variant],
          SIZES[size],
          full && "w-full justify-center",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
