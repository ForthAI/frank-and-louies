"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { AccentColor } from "@/content/products";

const glow: Record<AccentColor, string> = {
  turquoise: "bg-turquoise/15",
  basil: "bg-basil/15",
  brown: "bg-brown/15",
  coral: "bg-coral/15",
  red: "bg-red/15",
};

/**
 * The Breads scene — a floating loaf that crossfades through the varieties
 * ("something different out of the oven"). Reduced-motion shows one static loaf.
 */
export function BreadRotator({
  images,
  accent = "brown",
}: {
  images: readonly string[];
  accent?: AccentColor;
}) {
  const reduced = useReducedMotion() ?? false;
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced || images.length < 2) return;
    const id = setInterval(() => setI((p) => (p + 1) % images.length), 2800);
    return () => clearInterval(id);
  }, [reduced, images.length]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div aria-hidden className={`absolute inset-10 rounded-full blur-3xl ${glow[accent]}`} />
      <div className="animate-floaty absolute inset-0">
        {images.map((src, idx) => (
          <Image
            key={src}
            src={src}
            alt="A freshly baked Frank & Louie's loaf"
            fill
            sizes="(min-width: 1024px) 44vw, 88vw"
            className="object-contain drop-shadow-[0_30px_44px_rgba(43,43,43,0.3)] transition-opacity duration-700 ease-in-out"
            style={{ opacity: idx === i ? 1 : 0 }}
          />
        ))}
      </div>
    </div>
  );
}
