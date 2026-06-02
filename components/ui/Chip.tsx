import { cn } from "@/lib/utils";

type Variant = "default" | "gold" | "tomato" | "dark";

const VARIANTS: Record<Variant, string> = {
  default: "bg-paper-3 text-carbon-800",
  gold: "bg-gold/18 text-gold-700",
  tomato: "bg-tomato/12 text-tomato-700",
  dark: "bg-paper/10 text-paper",
};

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  dot?: boolean;
}

export function Chip({ variant = "default", dot, className, children, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em]",
        VARIANTS[variant],
        className
      )}
      {...props}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden />}
      {children}
    </span>
  );
}
