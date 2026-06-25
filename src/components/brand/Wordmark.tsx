interface WordmarkProps {
  className?: string;
  /** Optional size override. Defaults to a confident, header-friendly scale. */
  size?: "sm" | "md" | "lg";
}

const SIZES: Record<NonNullable<WordmarkProps["size"]>, string> = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
};

/**
 * Fyndor wordmark. Display serif, tight tracking, with a near-imperceptible
 * vertical purple gradient at the baseline. Carries the brand presence in
 * compact headers without a separate logomark.
 */
export function Wordmark({ className, size = "md" }: WordmarkProps) {
  return (
    <span
      className={[
        "font-display font-semibold tracking-tight leading-none",
        "text-gradient-brand select-none",
        SIZES[size],
        className ?? "",
      ].join(" ")}
    >
      Fyndor
    </span>
  );
}
