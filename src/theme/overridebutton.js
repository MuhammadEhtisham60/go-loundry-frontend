import { cn } from "@/lib/utils";

/**
 * Maps variant, color, and size props to the premium tailwind design system.
 */
export function getButtonStyles({
  variant = "contained",
  color = "primary",
  size = "medium",
  className = "",
}) {
  // Normalize parameters
  const normVariant =
    variant === "contained" ? "contained" : variant === "text" ? "text" : "outlined";
  const normColor =
    color === "primary"
      ? "primary"
      : color === "success"
        ? "success"
        : color === "warning"
          ? "warning"
          : color === "error" || color === "destructive"
            ? "destructive"
            : "secondary";
  const normSize =
    size === "small" || size === "sm"
      ? "small"
      : size === "large" || size === "lg"
        ? "large"
        : "medium";

  const baseClasses =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold cursor-pointer transition-all duration-200 select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]";

  const sizeClasses = {
    small: "h-8 px-3.5 text-xs rounded-lg",
    medium: "h-10 px-5 text-sm rounded-xl",
    large: "h-12 px-7 text-base rounded-2xl",
  };

  const colorVariantClasses = {
    contained: {
      primary:
        "bg-primary hover:bg-[color-mix(in_oklab,var(--primary)_90%,black)] text-primary-foreground shadow-gold hover:shadow-lg",
      secondary:
        "bg-secondary hover:bg-[color-mix(in_oklab,var(--primary)_15%,transparent)] text-secondary-foreground shadow-sm",
      success:
        "bg-success hover:bg-[color-mix(in_oklab,var(--success)_90%,black)] text-success-foreground shadow-sm",
      warning:
        "bg-warning hover:bg-[color-mix(in_oklab,var(--warning)_90%,black)] text-warning-foreground shadow-sm",
      destructive:
        "bg-destructive hover:bg-[color-mix(in_oklab,var(--destructive)_90%,black)] text-destructive-foreground shadow-sm",
    },
    outlined: {
      primary: "border border-primary/40 text-primary hover:bg-primary/8 hover:border-primary/60",
      secondary:
        "border border-border text-foreground hover:bg-accent hover:text-accent-foreground",
      success: "border border-success/40 text-success hover:bg-success/8 hover:border-success/60",
      warning: "border border-warning/40 text-warning hover:bg-warning/8 hover:border-warning/60",
      destructive:
        "border border-destructive/40 text-destructive hover:bg-destructive/8 hover:border-destructive/60",
    },
    text: {
      primary: "text-primary hover:bg-primary/8",
      secondary: "text-muted-foreground hover:text-foreground hover:bg-accent",
      success: "text-success hover:bg-success/8",
      warning: "text-warning hover:bg-warning/8",
      destructive: "text-destructive hover:bg-destructive/8",
    },
  };

  return cn(
    baseClasses,
    sizeClasses[normSize],
    colorVariantClasses[normVariant][normColor],
    className,
  );
}

export default getButtonStyles;
