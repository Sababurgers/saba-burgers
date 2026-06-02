import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full font-body text-sm px-3.5 py-3 rounded-md border bg-paper text-carbon-800 transition-colors",
        "focus:outline-none focus:border-carbon-800 focus:ring-2 focus:ring-carbon-800/8",
        invalid ? "border-danger" : "border-carbon-800/12",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full font-body text-sm px-3.5 py-3 rounded-md border bg-paper text-carbon-800 resize-y transition-colors",
        "focus:outline-none focus:border-carbon-800 focus:ring-2 focus:ring-carbon-800/8",
        invalid ? "border-danger" : "border-carbon-800/12",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

/** Wrapper para form fields — label arriba, hint/error abajo. */
export function Field({ label, hint, error, htmlFor, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-[13px] font-semibold">
        {label}
      </label>
      {children}
      {error ? (
        <span className="text-xs text-danger">{error}</span>
      ) : hint ? (
        <span className="text-xs text-stone">{hint}</span>
      ) : null}
    </div>
  );
}
