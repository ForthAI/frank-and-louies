import { siteConfig } from "@/lib/site";

/**
 * schema.org LocalBusiness/Bakery markup for rich results.
 * Rendered as a JSON-LD script — safe, static, no user input.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    servesCuisine: "Italian",
    slogan: siteConfig.tagline,
    sameAs: [siteConfig.socials.instagram, siteConfig.socials.facebook],
    address: siteConfig.locations.map((loc) => ({
      "@type": "PostalAddress",
      streetAddress: loc.street,
      addressLocality: loc.city,
      addressRegion: loc.state,
      postalCode: loc.zip || undefined,
      addressCountry: "US",
    })),
    location: siteConfig.locations.map((loc) => ({
      "@type": "Place",
      name: loc.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: loc.street,
        addressLocality: loc.city,
        addressRegion: loc.state,
        addressCountry: "US",
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inject here.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
