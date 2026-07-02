/**
 * Central image map. THE place to swap in / add photography.
 *
 * Product cutouts are transparent WebPs (optimized from the originals in
 * public/photos/<Category>/) — they float on the page for the scroll cinema.
 * `null` slots render a tasteful branded placeholder until a cutout exists.
 */
export const images = {
  // Hero — the signature floating buttercake (vanilla + chocolate, cut open)
  heroButtercakes: "/photos/cutouts/buttercakes-hero.webp",
  buttercakesCluster: "/photos/cutouts/buttercakes-cluster.webp",

  // The "money shot" sequence — whole vanilla buttercake → cut-open oozing
  // center → wedge pulled out, revealed on scroll (aligned canvases so the cake
  // body stays registered while only the slice changes).
  buttercakeWhole: "/photos/cutouts/buttercake-whole.webp",
  buttercakeCut: "/photos/cutouts/buttercake-cut.webp",
  buttercakeWedge: "/photos/cutouts/buttercake-wedge.webp",

  // Story / family — the real photo behind the counter
  storyFamily: "/photos/family.webp",
  storyBrothers: "/interim/brush-factory.jpg",
  familyGroup: "/interim/family-group.jpg",

  // Italian pantry staples — transparent cutout of imported goods
  pantryStaples: "/photos/cutouts/pantry-staples.webp",

  // Product cutouts (null → branded placeholder)
  productButtercakes: "/photos/cutouts/buttercake-vanilla.webp",
  productBreads: null,
  productCookies: "/photos/cutouts/cookies.webp",
  productSauce: "/photos/cutouts/sauce-tomato.webp",

  // Places
  storeInterior: "/interim/store-interior.jpg",
  storeShelves: "/interim/store-shelves.jpg",
  brushFactory: "/interim/brush-factory.jpg",
} as const;

export type ImageKey = keyof typeof images;

export type SmartTone = "blush" | "turquoise" | "basil" | "brown" | "coral" | "red";

/** The three pasta sauces, for the sauce scene's floating jar trio. */
export const sauceJars = [
  "/photos/cutouts/sauce-tomato.webp",
  "/photos/cutouts/sauce-spicy.webp",
  "/photos/cutouts/sauce-blush.webp",
] as const;
