"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { SpeechBubble } from "@/components/brand/SpeechBubble";

/* ── tiny interpolation helpers ─────────────────────────────── */
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
/** normalized 0→1 progress of `p` within [a, b] */
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
function mixHex(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  const c = pa.map((v, i) => Math.round(lerp(v, pb[i], t)));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

const EXPR = ["/brand/expr-1.svg", "/brand/expr-2.svg", "/brand/expr-3.svg", "/brand/expr-4.svg", "/brand/expr-5.svg"];

/**
 * Scroll-driven brand intro that recreates the brand-concept storyboard:
 * blue screen → Frank's half-face → Louie completes the pair → expression
 * cycle → the badge resolves and flies up into the nav. Plays once per session
 * (gated by an inline script in the home page) and is fully skipped for
 * reduced-motion / no-JS visitors.
 */
export function IntroSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<boolean | null>(null); // null until decided client-side
  const [done, setDone] = useState(false);
  const [p, setP] = useState(0);

  // Decide whether to play, then drive the sequence from the section's
  // position via a rAF loop. Done in one mount effect (window/sessionStorage
  // aren't available during SSR; the rAF read is robust to scroll-event quirks).
  useEffect(() => {
    let play = true;
    try {
      const seen = sessionStorage.getItem("flIntroSeen");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (seen || reduced) play = false;
    } catch {
      /* storage blocked → just play */
    }
    const root = document.documentElement;
    // data-intro-playing: hides the whole nav until the badge nears the top.
    // data-intro-active: hides ONLY the nav's own logo until the intro fully
    //   hands off, so the flying badge is the single visible logo.
    if (play) {
      root.setAttribute("data-intro-playing", "1");
      root.setAttribute("data-intro-active", "1");
    } else {
      root.removeAttribute("data-intro-playing");
      root.removeAttribute("data-intro-active");
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(play);
    if (!play) return;

    let raf = 0;
    let last = -1;
    let finished = false;
    const tick = () => {
      const el = ref.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const prog = total > 0 ? clamp01(-r.top / total) : 0;
        if (Math.abs(prog - last) > 0.001) {
          last = prog;
          setP(prog);
          if (prog > 0.9) root.removeAttribute("data-intro-playing");
          else root.setAttribute("data-intro-playing", "1");
        }
        if (prog >= 0.999 && !finished) {
          finished = true;
          try {
            sessionStorage.setItem("flIntroSeen", "1");
          } catch {
            /* ignore */
          }
          root.removeAttribute("data-intro-playing");
          root.removeAttribute("data-intro-active");
          window.scrollTo({ top: 0, behavior: "instant" });
          setDone(true);
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      root.removeAttribute("data-intro-playing");
      root.removeAttribute("data-intro-active");
    };
  }, []);

  if (done || active === false) return null;

  /* ── derived beat values ─────────────────────────────────── */
  const bg = mixHex("#009cb7", "#f5e7e6", seg(p, 0.08, 0.22));
  const wordmarkOpacity = 1 - seg(p, 0.08, 0.16);

  const frankIn = seg(p, 0.16, 0.26);
  const louieReveal = seg(p, 0.3, 0.44); // clip right inset 50%→0%
  const facesPresent = p > 0.16;
  const bubblesOut = seg(p, 0.44, 0.48);
  const frankBubble = seg(p, 0.19, 0.27) * (1 - bubblesOut);
  const louieBubble = seg(p, 0.33, 0.42) * (1 - bubblesOut);

  // Expression crossfade, then a clean (non-overlapping) hand-off to the badge.
  const exprOut = seg(p, 0.74, 0.79); // last face fully gone before the badge
  const exprOpacity = [
    Math.min(frankIn, 1) * (1 - seg(p, 0.5, 0.54)),
    seg(p, 0.5, 0.54) * (1 - seg(p, 0.56, 0.6)),
    seg(p, 0.56, 0.6) * (1 - seg(p, 0.62, 0.66)),
    seg(p, 0.62, 0.66) * (1 - seg(p, 0.68, 0.72)),
    seg(p, 0.68, 0.72) * (1 - exprOut),
  ];
  const badgeOpacity = seg(p, 0.79, 0.88);
  const badgeScale = lerp(0.9, 1, seg(p, 0.79, 0.9));

  // Fly straight up, centered, into the nav's centered logo. The badge stays
  // opaque (it *becomes* the nav logo); only the background fades away.
  const fly = seg(p, 0.88, 1);
  const bgOpacity = 1 - seg(p, 0.9, 0.99);
  const stageTransform = `translateY(calc((-50vh + 4.25rem) * ${fly})) scale(${lerp(1, 0.235, fly)})`;

  return (
    <section ref={ref} className="fl-intro relative" style={{ height: "380vh" }} aria-hidden>
      {/* Overlay sits ABOVE the nav (z-60) so the badge lands on top of it. */}
      <div className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center overflow-hidden">
        {/* Background — fades out to reveal the site as the badge flies up */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: bg, opacity: bgOpacity }}
          aria-hidden
        />

        {/* Beat 1 — wordmark + scroll cue */}
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: wordmarkOpacity }}
        >
          <h1 className="font-display text-6xl leading-[0.95] font-extrabold tracking-tight text-cream sm:text-8xl lg:text-9xl">
            Frank &amp; Louie&apos;s
          </h1>
          <span className="mt-12 flex flex-col items-center gap-1 text-cream/80">
            <span className="eyebrow">Scroll</span>
            <ChevronDown className="size-7 animate-bounce" aria-hidden />
          </span>
        </div>

        {/* Beats 2–5 — faces / bubbles / badge stage */}
        <div
          className="relative flex items-center justify-center"
          style={{ transform: stageTransform, transformOrigin: "center" }}
        >
          {/* Frank bubble (left) */}
          <div
            className="absolute right-[calc(50%+8.5rem)] hidden sm:block"
            style={{ opacity: frankBubble, transform: `translateX(${lerp(-28, 0, frankBubble)}px)` }}
          >
            <SpeechBubble from="frank" tail="right" className="text-lg">
              Hi! I&apos;m Frank.
            </SpeechBubble>
          </div>

          {/* Louie bubble (right) */}
          <div
            className="absolute left-[calc(50%+8.5rem)] hidden sm:block"
            style={{ opacity: louieBubble, transform: `translateX(${lerp(28, 0, louieBubble)}px)` }}
          >
            <SpeechBubble from="louie" tail="left" className="text-lg">
              and I&apos;m Louie!
            </SpeechBubble>
          </div>

          {/* Faces box — aspect matches the SVG (792:612) so the seam sits at 50%. */}
          <div className="relative aspect-[792/612] w-[82vmin] max-w-[720px]">
            {/* expr-1 doubles as the Frank→Louie reveal (clipped at the seam) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={EXPR[0]}
              alt=""
              className="absolute inset-0 h-full w-full object-contain"
              style={{
                opacity: facesPresent ? exprOpacity[0] : 0,
                clipPath: `inset(0 ${lerp(50, 0, louieReveal)}% 0 0)`,
                transform: `scale(${lerp(0.92, 1, frankIn)})`,
              }}
            />
            {EXPR.slice(1).map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt=""
                className="absolute inset-0 h-full w-full object-contain"
                style={{ opacity: exprOpacity[i + 1] }}
              />
            ))}
            {/* Badge resolve (faces fully gone first → no ghosting) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo.svg"
              alt=""
              className="absolute inset-0 h-full w-full object-contain"
              style={{ opacity: badgeOpacity, transform: `scale(${badgeScale})` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
