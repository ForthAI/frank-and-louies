import Image from "next/image";
import { cn } from "@/lib/utils";
import { FacesMark } from "./FacesMark";

type Tone = "blush" | "turquoise" | "basil" | "brown" | "coral" | "red";

const onColor = {
  mark: "text-white/35",
  label: "text-white",
  note: "text-white/80",
};

const placeholderTone: Record<
  Tone,
  { wrap: string; mark: string; label: string; note: string }
> = {
  blush: {
    wrap: "bg-blush",
    mark: "text-turquoise/25",
    label: "text-turquoise-deep",
    note: "text-turquoise-deep/70",
  },
  turquoise: {
    wrap: "bg-turquoise",
    mark: "text-blush/35",
    label: "text-blush",
    note: "text-blush/70",
  },
  basil: { wrap: "bg-basil", ...onColor },
  brown: { wrap: "bg-brown", ...onColor },
  coral: { wrap: "bg-coral", ...onColor },
  red: { wrap: "bg-red", ...onColor },
};

type SmartImageProps = {
  /** Final/interim photo. When omitted, a tasteful on-brand placeholder shows. */
  src?: string | null;
  alt: string;
  /** Caption shown on the placeholder (e.g. "Vanilla Buttercake"). */
  label?: string;
  tone?: Tone;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** object-position for the photo (e.g. "center top"). */
  objectPosition?: string;
};

/**
 * Single image component for the whole site. Swap final photography in by
 * setting `src` (see src/content/images.ts) — no layout changes needed.
 * Until a photo exists, it renders an intentional branded placeholder.
 */
export function SmartImage({
  src,
  alt,
  label,
  tone = "blush",
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority = false,
  objectPosition,
}: SmartImageProps) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden bg-blush", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={objectPosition ? { objectPosition } : undefined}
        />
      </div>
    );
  }

  const t = placeholderTone[tone];
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden text-center",
        t.wrap,
        className,
      )}
      role="img"
      aria-label={alt}
    >
      <FacesMark className={cn("h-20 w-20", t.mark)} />
      {label ? (
        <span className={cn("mt-3 px-4 font-display text-lg font-bold", t.label)}>
          {label}
        </span>
      ) : null}
      <span className={cn("eyebrow mt-1", t.note)}>Photo coming soon</span>
    </div>
  );
}
