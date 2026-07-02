"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { hero } from "@/content/story";
import { Cta } from "@/components/brand/Cta";
import { FadeUp } from "@/components/brand/Motion";
import { SpeechBubble } from "@/components/brand/SpeechBubble";
import { FacesMark } from "@/components/brand/FacesMark";

// The frames to play, in order (owner-picked subset of the 14 source frames).
const FRAME_ORDER = [1, 6, 9, 10, 11, 12, 13, 14];
const FRAME_COUNT = FRAME_ORDER.length;
const FRAMES = FRAME_ORDER.map((n) => `/photos/cutouts/animation/${n}.webp`);
// Track height in vh. The sticky stage fills 100vh, so the frames scrub across
// (TRACK_VH − 100)vh of scrolling before the page continues to the story.
const TRACK_VH = 300;

export function Hero() {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [frame, setFrame] = useState(0);
  // Phones get a compact, non-pinned hero (a pinned stacked layout overflows
  // 100vh). Tablets/desktop (≥ md) go side-by-side and pin/scrub.
  const [phone, setPhone] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setPhone(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  // Map scroll progress → frame index (hard cut, stop-motion).
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(v * (FRAME_COUNT - 1))));
    setFrame((prev) => (prev === idx ? prev : idx));
  });

  // Warm the browser cache so each hard cut is instant (no flash mid-scrub).
  useEffect(() => {
    FRAMES.forEach((src) => {
      const im = new window.Image();
      im.src = src;
    });
  }, []);

  const facesWatermark = (
    <FacesMark
      aria-hidden
      className="pointer-events-none absolute -top-24 -right-24 h-[40rem] w-[40rem] text-turquoise/[0.06] sm:-right-10"
    />
  );

  const copy = (
    <div className="flex flex-col items-start">
      <FadeUp className="flex items-center gap-2">
        <FacesMark className="size-5 text-turquoise" />
        <span className="eyebrow text-turquoise-deep">{hero.eyebrow}</span>
      </FadeUp>

      <FadeUp delay={0.08}>
        <h1 className="mt-5 font-display text-6xl leading-[0.92] font-extrabold tracking-tight text-turquoise sm:text-7xl lg:text-8xl">
          <span className="block">{hero.headline[0]}</span>
          <span className="block">{hero.headline[1]}</span>
          <span className="block">{hero.headline[2]}</span>
        </h1>
      </FadeUp>

      <FadeUp delay={0.16}>
        <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
          {hero.sub}
        </p>
      </FadeUp>

      <FadeUp delay={0.24} className="mt-9 flex flex-wrap items-center gap-4">
        <Cta href={hero.primaryCta.href} size="lg">
          {hero.primaryCta.label}
        </Cta>
        <Cta href={hero.secondaryCta.href} size="lg" variant="outline">
          {hero.secondaryCta.label}
        </Cta>
      </FadeUp>
    </div>
  );

  // The 14-frame stop-motion stage. All frames are stacked and preloaded; the
  // active one is opaque (instant swap = hard cut).
  const stage = (staticFrame?: number) => (
    <div
      className="relative mx-auto aspect-[774/610] w-full max-w-xl"
      role="img"
      aria-label="A Frank & Louie's Buttercake, sliced to reveal its creamy center"
    >
      <div
        aria-hidden
        className="absolute inset-x-8 top-6 bottom-10 rounded-full bg-blush-deep/70 blur-3xl"
      />
      {FRAMES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_34px_46px_rgba(43,43,43,0.32)]"
          style={{ opacity: i === (staticFrame ?? frame) ? 1 : 0 }}
        />
      ))}
      <div className="absolute -top-2 right-2 z-10 rotate-3 sm:right-6">
        <SpeechBubble from="frank" tail="bottom" className="text-base">
          Hey Butter Cake!
        </SpeechBubble>
      </div>
    </div>
  );

  // Reduced motion or phones: a normal-height hero showing the whole cake, no
  // pin/scrub (avoids overflowing a pinned 100vh on a stacked layout).
  if (reduced || phone) {
    return (
      <section className="relative overflow-hidden bg-blush pt-16 pb-20 sm:pt-20 sm:pb-28">
        {facesWatermark}
        <div className="container-fl relative grid items-center gap-10 md:grid-cols-[1.02fr_0.98fr] md:gap-12">
          {copy}
          {stage(0)}
        </div>
      </section>
    );
  }

  return (
    <section ref={track} className="relative" style={{ height: `${TRACK_VH}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-blush pt-20">
        {facesWatermark}
        <div className="container-fl relative grid w-full items-center gap-10 md:grid-cols-[1.02fr_0.98fr] md:gap-12">
          {copy}
          {stage()}
        </div>
      </div>
    </section>
  );
}
