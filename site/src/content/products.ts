import type { ImageKey } from "./images";

export type AccentColor = "turquoise" | "basil" | "brown" | "coral" | "red";

export type FeaturedProduct = {
  /** Doubles as the section anchor id. */
  id: string;
  name: string;
  /** Short appetite hook (eyebrow). */
  tagline: string;
  /** One evocative, brand-voice line — no item lists (everything's seasonal). */
  description: string;
  accent: AccentColor;
  image: ImageKey;
  /** The brothers' banter for the scene. */
  banter?: { frank: string; louie: string };
  /** Shows the "ships by the case" flag + Ship-a-Case CTA. */
  shippable?: boolean;
};

/**
 * The four things we're known for. We feature the categories, not specifics —
 * the lineup changes with the season, so the copy stays evocative.
 */
export const featuredProducts: FeaturedProduct[] = [
  {
    id: "sauce",
    name: "Pasta Sauce™",
    tagline: "Mom's recipe, jarred",
    description:
      "Slow-simmered with Romano the way Mom taught us — no shortcuts, nothing you can't pronounce. Grab a jar and put dinner on easy mode.",
    accent: "red",
    image: "productSauce",
    banter: { frank: "Mom's recipe, no shortcuts.", louie: "Don't tell her I said so." },
  },
  {
    id: "breads",
    name: "Breads™",
    tagline: "Fresh from the oven",
    description:
      "Rustic loaves baked fresh every single morning — pillowy inside, a crust that actually crackles. What's coming out of the oven changes with the day, so come see what's still warm.",
    accent: "brown",
    image: "productBreads",
    banter: { frank: "Smell that?", louie: "That's breakfast, Frankie." },
  },
  {
    id: "cookies",
    name: "Cookies™",
    tagline: "The case you can't walk past",
    description:
      "All-butter, made the old way — the tray everybody fights over at the holidays. The lineup's always changing, which is just our excuse to bake a new favorite every week.",
    accent: "coral",
    image: "productCookies",
    banter: { frank: "Save me the rainbow ones.", louie: "Too late." },
  },
  {
    id: "buttercakes",
    name: "Buttercakes™",
    tagline: "The signature",
    description:
      "A little cake with a big mouth — golden pound-cake outside, a creamy center that bubbles over as it bakes. The thing people plan their week around. We'll ship a case anywhere you are.",
    accent: "basil",
    image: "productButtercakes",
    banter: { frank: "Hey Butter Cake!", louie: "Ship me a case, Frankie!" },
    shippable: true,
  },
];
