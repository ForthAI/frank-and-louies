"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const floatShadow = "drop-shadow-[0_34px_46px_rgba(43,43,43,0.32)]";

/**
 * The buttercake "money shot" — a three-stage scroll-scrubbed reveal:
 *   whole cake → cut open (oozing center) → a wedge pulled out to serve.
 * The three cutouts share an aligned canvas, so the cake body stays put while
 * only the slice changes. Gentle zoom + a warm halo that swells as it opens.
 * Reduced-motion users get the final served shot, fully revealed, no motion.
 */
export function ButtercakeReveal({
  whole,
  cut,
  wedge,
}: {
  whole: string;
  cut: string;
  wedge: string;
}) {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: scope,
    offset: ["center 0.5", "center 0.1"],
  });

  // Two crossfades across the window: whole→cut, then cut→wedge.
  const wholeOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const cutOpacity = useTransform(scrollYProgress, [0.18, 0.36, 0.6, 0.78], [0, 1, 1, 0]);
  const wedgeOpacity = useTransform(scrollYProgress, [0.64, 0.9], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1.05]);
  const glowOpacity = useTransform(scrollYProgress, [0.15, 0.9], [0.2, 0.6]);

  const layers = [
    {
      src: whole,
      alt: "A whole Frank & Louie's vanilla Buttercake, dusted with sugar",
      style: reduced ? { opacity: 0 } : { opacity: wholeOpacity },
    },
    {
      src: cut,
      alt: "The Buttercake cut open to reveal its creamy, oozing center",
      style: reduced ? { opacity: 0 } : { opacity: cutOpacity },
    },
    {
      src: wedge,
      alt: "The Buttercake with a wedge pulled out, ready to serve",
      style: reduced ? { opacity: 1 } : { opacity: wedgeOpacity },
    },
  ];

  return (
    <div ref={scope} className="relative mx-auto aspect-[7/5] w-full max-w-xl">
      {/* warm halo, swells as the cake opens */}
      <motion.div
        aria-hidden
        className="absolute inset-x-10 top-8 bottom-10 rounded-full bg-blush-deep blur-3xl"
        style={reduced ? { opacity: 0.5 } : { opacity: glowOpacity }}
      />
      {/* idle bob (CSS transform) on the outer layer so it composes with the
          framer scale/opacity transforms on the inner layers */}
      <div className="animate-floaty absolute inset-0">
        <motion.div className="absolute inset-0" style={reduced ? undefined : { scale }}>
          {layers.map((layer) => (
            <motion.div key={layer.src} className="absolute inset-0" style={layer.style}>
              <Image
                src={layer.src}
                alt={layer.alt}
                fill
                sizes="(min-width: 1024px) 46vw, 88vw"
                className={`object-contain ${floatShadow}`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
