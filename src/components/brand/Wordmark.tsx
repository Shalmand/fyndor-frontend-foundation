interface WordmarkProps {
  className?: string;
}

/** Text-only Fyndor wordmark for compact headers. */
export function Wordmark({ className }: WordmarkProps) {
  return (
    <span
      className={
        "font-display text-2xl font-semibold tracking-tight text-foreground " + (className ?? "")
      }
    >
      fyndor
    </span>
  );
}
