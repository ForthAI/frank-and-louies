import { cn } from "@/lib/utils";

type SpeechBubbleProps = {
  children: React.ReactNode;
  /** Whose voice — drives the text colour (Frank = coral, Louie = turquoise). */
  from?: "frank" | "louie" | "neutral";
  /** Which side the little tail points to. */
  tail?: "left" | "right" | "bottom";
  className?: string;
};

const toneText: Record<NonNullable<SpeechBubbleProps["from"]>, string> = {
  frank: "text-coral",
  louie: "text-turquoise",
  neutral: "text-charcoal",
};

/**
 * The brothers' banter caption — a soft blush bubble with a tail.
 * e.g. "Mamma Bascio's secret recipe." → "Shhhhhhhhhh, Frank!"
 */
export function SpeechBubble({
  children,
  from = "neutral",
  tail = "left",
  className,
}: SpeechBubbleProps) {
  return (
    <span
      className={cn(
        "relative inline-block rounded-[1.4em] bg-white px-4 py-2 text-sm font-semibold shadow-[0_8px_24px_-12px_rgba(43,43,43,0.35)]",
        toneText[from],
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "absolute h-3 w-3 rotate-45 bg-white",
          tail === "left" && "top-1/2 -left-1 -translate-y-1/2",
          tail === "right" && "top-1/2 -right-1 -translate-y-1/2",
          tail === "bottom" && "-bottom-1 left-6",
        )}
      />
    </span>
  );
}
