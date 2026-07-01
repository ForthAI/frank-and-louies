"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  backOut,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { sauceJars } from "@/content/images";
import type { AccentColor } from "@/content/products";

const accentGlow: Record<AccentColor, string> = {
  turquoise: "bg-turquoise/20",
  basil: "bg-basil/18",
  brown: "bg-brown/18",
  coral: "bg-coral/20",
  red: "bg-red/18",
};

const floatShadow = "drop-shadow-[0_30px_44px_rgba(43,43,43,0.3)]";

type JarSpec = {
  src: string;
  label: string;
  /** Resting layout (no transforms here — framer owns transform). */
  pos: string;
  bobDelay: string;
  /** Scattered start, relative to the resting spot. */
  from: { x: number; y: number; rot: number; scale: number };
  /** Resting rotation. */
  rot: number;
  /** Scroll-progress window over which this jar flies in. */
  range: [number, number];
};

const JARS: JarSpec[] = [
  {
    src: sauceJars[1], // Spicy — flies in from the upper-left
    label: "Spicy Sauce",
    pos: "left-[2%] bottom-2 z-10 w-[40%]",
    bobDelay: "-2s",
    from: { x: -180, y: -64, rot: -32, scale: 0.55 },
    rot: -4,
    range: [0, 0.82],
  },
  {
    src: sauceJars[2], // Blush — flies in from the lower-right
    label: "Blush Sauce",
    pos: "right-[2%] bottom-2 z-10 w-[40%]",
    bobDelay: "-4s",
    from: { x: 188, y: 72, rot: 34, scale: 0.55 },
    rot: 4,
    range: [0, 0.82],
  },
  {
    src: sauceJars[0], // Tomato Basil — rises up last, largest, in front
    label: "Tomato Basil Sauce",
    pos: "left-[26%] bottom-0 z-20 w-[48%]",
    bobDelay: "0s",
    from: { x: 0, y: 132, rot: 12, scale: 0.5 },
    rot: 0,
    range: [0.18, 1],
  },
];

function Jar({
  spec,
  progress,
  reduced,
}: {
  spec: JarSpec;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const { from, range, rot } = spec;
  const opacityStop = range[0] + (range[1] - range[0]) * 0.35;

  // Hooks must run unconditionally; we just ignore the values when reduced.
  const x = useTransform(progress, range, [from.x, 0], { ease: backOut });
  const y = useTransform(progress, range, [from.y, 0], { ease: backOut });
  const rotate = useTransform(progress, range, [from.rot, rot], { ease: backOut });
  const scale = useTransform(progress, range, [from.scale, 1], { ease: backOut });
  const opacity = useTransform(progress, [range[0], opacityStop], [0, 1]);

  const style = reduced
    ? { rotate: rot }
    : { x, y, rotate, scale, opacity };

  return (
    <motion.div
      className={cn("absolute aspect-[3/5]", spec.pos)}
      style={style}
    >
      <div
        className="animate-floaty relative h-full w-full"
        style={{ animationDelay: spec.bobDelay }}
      >
        <Image
          src={spec.src}
          alt={spec.label}
          fill
          sizes="(min-width: 1024px) 22vw, 42vw"
          className={cn("object-contain", floatShadow)}
        />
      </div>
    </motion.div>
  );
}

/**
 * The three pasta sauces, scattered apart, that snap together into a trio as the
 * section scrolls toward center. Scroll-scrubbed (reversible); reduced-motion
 * users get the assembled trio with no scatter.
 */
export function SauceConverge({ accent }: { accent: AccentColor }) {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: scope,
    offset: ["start end", "center center"],
  });

  return (
    <div ref={scope} className="relative mx-auto aspect-[4/3] w-full max-w-lg">
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-8 top-12 bottom-6 rounded-full blur-3xl",
          accentGlow[accent],
        )}
      />
      {JARS.map((spec) => (
        <Jar key={spec.src} spec={spec} progress={scrollYProgress} reduced={reduced} />
      ))}
    </div>
  );
}
