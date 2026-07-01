import Image from "next/image";
import { ArrowRight, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { featuredProducts, type AccentColor } from "@/content/products";
import { images } from "@/content/images";
import { Cta } from "@/components/brand/Cta";
import { FadeUp, Parallax } from "@/components/brand/Motion";
import { SectionHeading } from "@/components/brand/SectionHeading";
import { SmartImage } from "@/components/brand/SmartImage";
import { SpeechBubble } from "@/components/brand/SpeechBubble";
import { SauceConverge } from "@/components/sections/SauceConverge";
import { ButtercakeReveal } from "@/components/sections/ButtercakeReveal";

const accentText: Record<AccentColor, string> = {
  turquoise: "text-turquoise-deep",
  basil: "text-basil",
  brown: "text-brown",
  coral: "text-coral",
  red: "text-red",
};
// Soft blurred halo behind a floating cutout — tinted to the product's accent.
const accentGlow: Record<AccentColor, string> = {
  turquoise: "bg-turquoise/20",
  basil: "bg-basil/18",
  brown: "bg-brown/18",
  coral: "bg-coral/20",
  red: "bg-red/18",
};

const floatShadow = "drop-shadow-[0_30px_44px_rgba(43,43,43,0.3)]";

/** A single transparent product cutout that floats over its accent glow. */
function FloatingCutout({
  src,
  alt,
  accent,
}: {
  src: string;
  alt: string;
  accent: AccentColor;
}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div
        aria-hidden
        className={cn("absolute inset-8 rounded-full blur-3xl", accentGlow[accent])}
      />
      <div className="animate-floaty absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 46vw, 88vw"
          className={cn("object-contain", floatShadow)}
        />
      </div>
    </div>
  );
}

export function ProductRows() {
  return (
    <section id="products" className="scroll-mt-24 bg-white py-24 sm:py-32">
      <div className="container-fl">
        <SectionHeading
          eyebrow="What We Make"
          title="The good stuff"
          intro="Made fresh and made the old way, right here in Delaware. The lineup changes with the season — here's what we're always known for. Come see what's out today."
        />

        <div className="mt-20 flex flex-col gap-28 lg:gap-36">
          {featuredProducts.map((product, idx) => {
            const flip = idx % 2 === 1;
            const src = images[product.image];
            const banterNode = product.banter ? (
              <div className="absolute -bottom-2 left-2 z-30 rotate-[-2deg] sm:left-6">
                <SpeechBubble
                  from={flip ? "louie" : "frank"}
                  tail="bottom"
                  className="text-base"
                >
                  {flip ? product.banter.louie : product.banter.frank}
                </SpeechBubble>
              </div>
            ) : null;
            return (
              <div
                key={product.id}
                id={product.id}
                className="grid scroll-mt-24 items-center gap-12 lg:grid-cols-2 lg:gap-20"
              >
                {/* Floating cutout scene */}
                {product.id === "sauce" ? (
                  // Scroll-scrubbed: jars scatter apart, then snap into the trio.
                  <div className={cn("relative", flip && "lg:order-2")}>
                    <SauceConverge accent={product.accent} />
                    {banterNode}
                  </div>
                ) : product.id === "buttercakes" ? (
                  // Scroll-scrubbed: whole cake opens to the oozing cut center.
                  <div className={cn("relative", flip && "lg:order-2")}>
                    <ButtercakeReveal
                      whole={images.buttercakeWhole}
                      cut={images.buttercakeCut}
                      wedge={images.buttercakeWedge}
                    />
                    {banterNode}
                  </div>
                ) : (
                  <Parallax amount={30} className={cn("relative", flip && "lg:order-2")}>
                    {src ? (
                      <FloatingCutout
                        src={src}
                        alt={`${product.name} from Frank & Louie's`}
                        accent={product.accent}
                      />
                    ) : (
                      // No cutout yet (e.g. Breads) — branded floating placeholder.
                      <div className="relative mx-auto aspect-square w-full max-w-md">
                        <SmartImage
                          src={src}
                          alt={`${product.name} from Frank & Louie's`}
                          label={product.name}
                          tone={product.accent}
                          className="animate-floaty h-full w-full rounded-[2.5rem] shadow-[0_44px_80px_-34px_rgba(43,43,43,0.45)]"
                        />
                      </div>
                    )}
                    {banterNode}
                  </Parallax>
                )}

                {/* Copy */}
                <FadeUp className={cn(flip && "lg:order-1")}>
                  <span className={cn("eyebrow", accentText[product.accent])}>
                    {product.tagline}
                  </span>
                  <h3 className="mt-3 font-display text-5xl font-extrabold tracking-tight text-charcoal sm:text-6xl">
                    {product.name}
                  </h3>

                  {product.shippable ? (
                    <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-basil/12 px-3 py-1 text-xs font-bold tracking-wide text-basil uppercase">
                      <Truck className="size-3.5" aria-hidden />
                      Ships by the case
                    </span>
                  ) : null}

                  <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl">
                    {product.description}
                  </p>

                  <div className="mt-8">
                    {product.shippable ? (
                      <Cta href="#contact" variant="basil" size="lg">
                        Ship a Case
                      </Cta>
                    ) : (
                      <a
                        href="#visit"
                        className={cn(
                          "inline-flex items-center gap-1.5 text-base font-semibold underline-offset-4 hover:underline",
                          accentText[product.accent],
                        )}
                      >
                        See what&apos;s fresh today
                        <ArrowRight className="size-4" aria-hidden />
                      </a>
                    )}
                  </div>
                </FadeUp>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
