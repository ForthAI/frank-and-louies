/**
 * Single source of truth for business facts (NAP), URLs and social links.
 * Update here and it propagates to metadata, nav, footer, contact, schema.org.
 */
export const siteConfig = {
  name: "Frank & Louie's",
  legalName: "Frank & Louie's Italian Specialties",
  tagline: "The Rehoboth Beach Original.",
  description:
    "Frank & Louie's Italian Specialties — the Rehoboth Beach original. A family-run Italian bakery & specialty brand in Delaware, famous for shippable Buttercakes, fresh-baked breads, cookies and pasta sauces. From our family to yours.",
  // Production domain — used for canonical URLs, sitemap and Open Graph.
  url: "https://frankandlouies.com",
  ogImage: "/og.png",

  phone: "302-227-5777",
  phoneHref: "tel:+13022275777",
  phoneNote: "Stop in or give us a call",

  email: "FrankandLouiesRB@gmail.com",
  emailHref: "mailto:FrankandLouiesRB@gmail.com",

  socials: {
    instagram: "https://instagram.com/frankandlouies",
    facebook: "https://www.facebook.com/profile.php?id=100049901894681",
  },

  locations: [
    {
      id: "pazzo",
      name: "Pazzo Italiano",
      kicker: "Italian market · Baltimore Ave",
      street: "58 Baltimore Avenue",
      city: "Rehoboth Beach",
      state: "DE",
      zip: "19971",
      blurb:
        "Find Frank & Louie's favorites at this walk-in Italian market on Baltimore Avenue in Rehoboth Beach.",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=58+Baltimore+Avenue+Rehoboth+Beach+DE",
      website: "https://www.eatpazzo.com/",
      websiteLabel: "eatpazzo.com",
    },
    {
      id: "brush-factory",
      name: "The Brush Factory",
      kicker: "Bakery & kitchen · Lewes",
      street: "Kings Highway",
      city: "Lewes",
      state: "DE",
      zip: "",
      blurb:
        "Our bakery and kitchen on Kings Highway in Lewes — where the Buttercakes, breads, cookies and sauces are made fresh.",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Brush+Factory+Kings+Highway+Lewes+DE",
      website: "",
      websiteLabel: "",
    },
  ],
} as const

export type SiteLocation = (typeof siteConfig.locations)[number]
