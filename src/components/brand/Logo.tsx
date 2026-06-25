import logoAsset from "@/assets/fyndor-logo.png.asset.json";

interface LogoProps {
  size?: number;
  className?: string;
}

/** Fyndor mark — full lockup (book + wordmark). */
export function Logo({ size = 32, className }: LogoProps) {
  return (
    <img
      src={logoAsset.url}
      alt="Fyndor"
      width={size}
      height={size}
      className={className}
      style={{ height: size, width: "auto" }}
    />
  );
}
