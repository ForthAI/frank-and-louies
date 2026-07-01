# Frank & Louie's — project guide for Claude

@AGENTS.md

## Brand source of truth

This project includes a brand reference exported from Tandem.

- **BRAND.md** (in this folder) is the source of truth for brand decisions: voice,
  tone, colors, copy patterns, product names, taglines, and do/don't rules. It is
  imported below so it's always in context.
- **brand-assets/** contains the brand's visual assets (logos, photos, icons,
  fonts). Reference these for any image needs; don't fetch external stock unless
  BRAND.md says you can.

@BRAND.md

### Rules

1. **Don't invent** colors, voice rules, copy patterns, or product details not
   present in BRAND.md. If something's missing, ask the human to update the brand
   guide first.
2. **Match the voice literally.** When writing copy for this brand, mirror the
   energy, vocabulary, and structure of the examples in BRAND.md. Don't drift
   toward generic marketing voice.
3. **Use brand assets first.** Before requesting new visuals, check brand-assets/
   for an existing photo / logo / icon that fits.
4. **Respect the don'ts.** The "Never" and "Don't" sections in BRAND.md are
   non-negotiable. If a design or copy choice would violate one, flag it instead
   of doing it.

## Refreshing the brand

The brand guide lives in Tandem. To pull the latest:
1. Open the brand guide → Admin → Settings → Developer Export.
2. Download the ZIP and replace BRAND.md + brand-assets/ in this project.
3. Commit the refresh as a single PR so the diff is reviewable.
