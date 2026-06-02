import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg" | "xl";

const SIZES: Record<Size, string> = {
  sm: "text-[22px]",
  md: "text-[32px]",
  lg: "text-[64px]",
  xl: "text-[120px]",
};

interface WordmarkProps {
  size?: Size;
  variant?: "gold" | "cream";
  className?: string;
  children?: React.ReactNode;
}

/**
 * SABA wordmark — Alfa Slab One con sombra carbón sistemática.
 * Refrescado del original manteniendo personalidad.
 */
export function Wordmark({ size = "md", variant = "gold", className, children = "SABA" }: WordmarkProps) {
  return (
    <span
      className={cn(
        "wordmark",
        variant === "cream" && "wordmark--cream",
        SIZES[size],
        className
      )}
    >
      {children}
    </span>
  );
}
