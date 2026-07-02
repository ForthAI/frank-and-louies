/** Voice & narrative content — the family story, taglines and banter. */

export const taglines = [
  "The Rehoboth Beach Original.",
  "From Our Family to Yours.",
  "We take the time to do it right.",
] as const;

export const hero = {
  eyebrow: "The Rehoboth Beach Original",
  // Rendered as three stacked, color-blocked lines.
  headline: ["From Our", "Family", "to Yours."],
  sub: "A family-run Italian bakery & specialty kitchen in Rehoboth Beach, Delaware — home of the legendary Buttercake. We take the time to do it right.",
  primaryCta: { label: "Visit Us", href: "#visit" },
  secondaryCta: { label: "See the Goods", href: "#products" },
};

export const storyIntro = {
  eyebrow: "Our Story",
  headline: "Two brothers, one Mom, and a whole lot of butter.",
  lead: "Frank and Louie are the two faces you see on everything we make. For twelve years, with Mom (Diane) and Robin, we've built Rehoboth Beach's go-to Italian bakery and specialty shop one recipe at a time.",
  paragraphs: [
    "It started in Campobello di Mazara, Sicily — where Mom and Grandmom's love of baking was born, and where a strong family bond was forged over flour and butter. Those recipes crossed an ocean and landed right here in Delaware.",
    "Everything still starts with those recipes and a refusal to cut corners.",
  ],
};

export const family = [
  { name: "Frank", note: "Talks with his hands. Tastes everything twice." },
  { name: "Louie", note: "Swears his half of the recipe is the good half." },
  { name: "Diane", note: "Keeper of Mamma Bascio's recipes. The boss." },
  { name: "Robin", note: "Keeps the brothers in line — mostly." },
];

export const nextChapter = {
  eyebrow: "The Next Chapter",
  headline: "Same recipes. New rooms to fill with them.",
  body: "We're growing — a bigger kitchen at The Brush Factory, a fast-growing supply business, and new baked goods landing all the time. The Buttercakes still ship by the case, anywhere you are.",
};

/** Brothers' banter — use sparingly as captions. */
export const banter = {
  recipe: { frank: "Mamma Bascio's secret recipe.", louie: "Shhhhhhhhhh, Frank!" },
  vodka: { frank: "Just a splash of vodka.", louie: "The rest is for us!" },
  intro: { frank: "Hi! I'm Frank.", louie: "and I'm Louie!" },
  butter: { frank: "Hey Butter Cake!", louie: "Save me a slice!" },
};
