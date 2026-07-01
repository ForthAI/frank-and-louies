import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ctaVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-turquoise/40 disabled:pointer-events-none disabled:opacity-60 active:translate-y-px [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-turquoise text-cream shadow-[0_12px_28px_-12px_rgba(0,156,183,0.7)] hover:brightness-95 hover:shadow-[0_16px_32px_-12px_rgba(0,156,183,0.8)]",
        basil:
          "bg-basil text-white shadow-[0_12px_28px_-12px_rgba(0,168,77,0.6)] hover:brightness-95",
        red:
          "bg-red text-white shadow-[0_12px_28px_-12px_rgba(209,33,40,0.6)] hover:brightness-95",
        white:
          "bg-cream text-turquoise-deep shadow-[0_12px_28px_-12px_rgba(0,0,0,0.35)] hover:bg-white",
        outline:
          "border-2 border-turquoise text-turquoise-deep hover:bg-turquoise hover:text-cream",
        outlineLight:
          "border-2 border-cream/70 text-cream hover:bg-cream hover:text-turquoise-deep",
        ghost: "text-turquoise-deep hover:bg-blush",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-7 text-base",
        lg: "h-14 px-9 text-lg",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type CtaProps = VariantProps<typeof ctaVariants> & {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** External links open in a new tab. */
  external?: boolean;
  "aria-label"?: string;
};

/** Chunky, rounded brand button rendered as a link. */
export function Cta({
  href,
  children,
  variant,
  size,
  className,
  external,
  ...rest
}: CtaProps) {
  const classes = cn(ctaVariants({ variant, size }), className);
  const isInternal = href.startsWith("/") && !external;

  if (isInternal) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={classes}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}

export { ctaVariants };
