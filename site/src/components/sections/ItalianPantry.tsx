import Image from "next/image";
import { images } from "@/content/images";
import { FadeUp, Parallax } from "@/components/brand/Motion";

/**
 * The imports side of the shop — a floating cutout of imported pantry goods
 * with a shelf-stocking pitch. Sits after the made-in-house products.
 */
export function ItalianPantry() {
  return (
    <section id="pantry" className="scroll-mt-24 overflow-hidden bg-blush py-24 sm:py-32">
      <div className="container-fl grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Floating pantry cutout */}
        <Parallax amount={28} className="relative lg:order-2">
          <div className="relative mx-auto aspect-square w-full max-w-lg">
            <div
              aria-hidden
              className="absolute inset-8 rounded-full bg-turquoise/12 blur-3xl"
            />
            <div className="animate-floaty absolute inset-0">
              <Image
                src={images.pantryStaples}
                alt="Imported Italian pantry staples — La Valle D.O.P. tomatoes, Kimbo coffee and Bonomelli chamomile"
                fill
                sizes="(min-width: 1024px) 46vw, 90vw"
                className="object-contain drop-shadow-[0_30px_44px_rgba(43,43,43,0.3)]"
              />
            </div>
          </div>
        </Parallax>

        {/* Copy */}
        <FadeUp className="lg:order-1">
          <span className="eyebrow text-turquoise-deep">The Italian Pantry</span>
          <h2 className="mt-3 display-md text-balance text-charcoal">
            Italian Pantry Staples
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl">
            Stock your shelves with quality! Extra virgin olive oils, vinegars,
            canned tomatoes and imported pastas. Canned, jarred, and bottled items
            that are simply must-haves to create beautiful and delicious meals at
            home.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
