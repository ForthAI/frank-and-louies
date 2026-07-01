import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  /** Eyebrow accent colour utility, e.g. "text-coral". */
  eyebrowClassName?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  eyebrowClassName,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className={cn("eyebrow text-turquoise", eyebrowClassName)}>{eyebrow}</span>
      ) : null}
      <h2 className="display-lg max-w-3xl text-balance text-charcoal">{title}</h2>
      {intro ? (
        <p
          className={cn(
            "max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
