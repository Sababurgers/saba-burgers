import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  variant?: "light" | "dark" | "cream";
  className?: string;
}

/**
 * Header de sección — h3 en Alfa Slab One con sombra desplazada.
 * El color de la sombra cambia según fondo (carbón en claro, gold en oscuro).
 */
export function SectionHeader({ title, subtitle, variant = "light", className }: SectionHeaderProps) {
  return (
    <header className={cn("mb-7", className)}>
      <h3
        className={cn(
          "font-display text-[42px] md:text-[52px] leading-[0.95] mb-2",
          variant === "light" && "text-carbon-800 [text-shadow:0.075em_0.075em_0_var(--color-carbon-800)] [text-shadow:0.075em_0.075em_0_color-mix(in_srgb,var(--color-gold)_100%,transparent)]",
          variant === "dark" && "text-paper [text-shadow:0.075em_0.075em_0_var(--color-gold)]",
          variant === "cream" && "text-carbon-800 [text-shadow:0.075em_0.075em_0_var(--color-gold)]"
        )}
      >
        {title}
      </h3>
      {subtitle && (
        <p
          className={cn(
            "max-w-[50ch] text-base md:text-lg",
            variant === "dark" ? "text-paper-3/80" : "text-stone"
          )}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
