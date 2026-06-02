import { Wordmark } from "./Wordmark";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

const ICON_SIZES: Record<Size, string> = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-16 h-16",
};

const WORDMARK_SIZE: Record<Size, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "sm",
  lg: "md",
};

interface LockupProps {
  size?: Size;
  variant?: "gold" | "cream";
  className?: string;
}

/**
 * Lockup horizontal: icono actual de hamburguesa + wordmark refrescado.
 * El icono se muestra como crop del JPG existente — reemplazar con SVG limpio cuando esté.
 */
export function Lockup({ size = "md", variant = "gold", className }: LockupProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          ICON_SIZES[size],
          "rounded-md bg-carbon-900 bg-cover bg-no-repeat flex-none"
        )}
        style={{
          backgroundImage: "url('/logo-saba.jpg')",
          backgroundSize: "280%",
          backgroundPosition: "50% 32%",
        }}
        aria-hidden
      />
      <Wordmark size={WORDMARK_SIZE[size]} variant={variant}>SABA</Wordmark>
    </div>
  );
}
