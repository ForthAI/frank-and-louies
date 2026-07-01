import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

// Master logo aspect ratio (viewBox 138.92 × 150.93).
const RATIO = 138.92 / 150.93;

type LogoProps = {
  /** "color" for light backgrounds, "reverse" for turquoise/dark backgrounds. */
  tone?: "color" | "reverse";
  /** Rendered height in px (width derived from the badge ratio). */
  height?: number;
  className?: string;
  priority?: boolean;
  /** Wrap in a link to home. */
  href?: string | null;
};

export function Logo({
  tone = "color",
  height = 64,
  className,
  priority = false,
  href = "/",
}: LogoProps) {
  const width = Math.round(height * RATIO);
  const src = tone === "reverse" ? "/brand/logo-reverse.svg" : "/brand/logo.svg";

  const img = (
    <Image
      src={src}
      alt={`${siteConfig.legalName} logo`}
      width={width}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto select-none", className)}
      style={{ height, width }}
    />
  );

  if (href === null) return img;

  return (
    <Link
      href={href}
      aria-label={`${siteConfig.name} — home`}
      className="inline-flex shrink-0 transition-transform duration-200 hover:-rotate-2 hover:scale-[1.03]"
    >
      {img}
    </Link>
  );
}
