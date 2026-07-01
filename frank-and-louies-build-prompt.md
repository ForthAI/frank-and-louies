# Build Prompt — Frank & Louie's Italian Specialties Website

> Paste this into Claude Code as the project brief. It is self-contained. Brand assets (logo SVGs, the full brand guide PDF, a sauce label, and the product-card catalog) ship alongside this file in `/brand-assets`. The one outstanding item is final product/lifestyle photography — use placeholders where noted until those land.

---

## 1. Project summary

Build a brand-new marketing website for **Frank & Louie's Italian Specialties**, a family-owned Italian deli, bakery, and specialty-food brand from Rehoboth Beach / Lewes, Delaware. This is a **standalone project** — do not share code, config, components, or deployment with any other client site. New repo, new Vercel project, its own domain (`frankandlouies.com`).

The current site (DudaOne template at frankandlouies.com) is a stopgap and should be fully replaced. The new site is a **modern, premium, gourmet brand landing experience** — not an e-commerce store.

**Primary goal:** a beautiful brand landing page (home + a few supporting pages) that tells the family story, showcases the signature products, and drives visitors to **come visit the locations**.

**Primary CTA (repeated throughout):** *Visit us* → directions/hours for the two locations.

## 2. Tech stack & deployment

- **Framework:** Next.js (App Router, TypeScript).
- **Styling:** Tailwind CSS + **shadcn/ui** for UI primitives.
- **Hosting:** Vercel. Configure for static/SSG where possible (this is a content site, no DB).
- **Images:** `next/image` with optimization.
- **Forms:** a simple contact/inquiry form that posts to email (e.g. Resend, Formspree, or a Next.js route handler emailing `FrankandLouiesRB@gmail.com`). No checkout, no accounts, no CMS required.
- **SEO:** proper metadata, Open Graph tags, sitemap, favicon, semantic HTML, fast Lighthouse scores. Mobile-first and fully responsive.
- **Accessibility:** WCAG AA — keyboard nav, alt text, sufficient contrast.
- **Domain:** built to deploy on `frankandlouies.com` (set canonical URLs accordingly).

## 3. Design direction

**Aesthetic: modern premium / gourmet specialty-food brand, built on F&L's existing brand system.** The brand already has a strong, characterful identity (see `/brand-assets/082423_FRANK&LOUIES_BRAND_CONCEPT.pdf`). Do NOT invent a new palette or logo — instead, take the existing bold, playful identity and present it with premium editorial polish: generous whitespace, large appetizing photography, confident type, and tasteful scroll motion. Elevated, not template-y. Playful soul, premium execution.

**Color palette (exact, sampled from the master logo SVG):**
- Turquoise / primary: **`#009CB7`** (the signature F&L blue — the turquoise building, logo, packaging)
- Blush / cream: **`#F5E7E6`** (soft warm off-white — the brand's primary light background)
- Use generous fields of each, plus crisp white, and dark charcoal (≈`#2B2B2B`) for body text.
- **Accent colors** drawn from the packaging system (use sparingly, for sections/CTAs/product categories): coral/salmon `≈#F26B5E` (the speech-bubble text), playful magenta-pink `≈#E8559A` (the "Hey Butter Cake!" swag), warm sauce-label orange `≈#E8973A`, and brick/rust red `≈#A8331C`. Tell Code to sample exact values from the brand PDF.

**Typography:**
- **Headlines:** a chunky, rounded, all-caps display face matching the logo wordmark and the product-card headers (heavy, friendly, geometric — the FRANK & LOUIE'S lettering). If the exact licensed font isn't available, use a close Google Fonts analog such as **Hobeaux Rounded** (if licensed) or free alternatives like **"Chunko"/"Bagel Fat One"**-style rounded display — Code should pick the closest clean rounded-bold display face and note the choice.
- **Body / captions:** a clean, modern humanist sans (e.g. **Inter, Geist, or Montserrat**) — the product cards pair the chunky display headline with a plain readable sans for descriptions. Mirror that pairing.

**Signature brand motifs to use as design texture:**
- **The twin-faces icon** (Frank & Louie back-to-back) — use as a recurring mark, section divider, loading/scroll accent, favicon.
- **The "deli paper" pattern** (repeating two-tone faces, see brand PDF p.17) — use turquoise-on-blush as a tasteful background texture for section breaks, footer, or hero accents.
- **Speech-bubble captions** in the brothers' voice (e.g. *"Mamma Bascio's secret recipe." → "Shhhhhhhhhh, Frank!"*) — a charming way to caption products/sections. Use playfully, don't overdo it.

- Smooth scroll, tasteful hover states, no clutter. Quality over quantity of sections.

**Reference sites — match this caliber of design, motion, and product presentation:**

*General DTC food-brand polish (modern, bold, premium):*
- https://drinkolipop.com/
- https://drinkpoppi.com/
- https://doichfoods.com/
- https://www.graza.co/
- https://eatfishwife.com/
- https://flybyjing.com/
- https://brightland.co/

*Most targeted — Italian / jarred-sauce & specialty-food brands (closest to F&L's category and tone):*
- https://getsauz.com/
- https://www.carbonefinefood.com/
- https://www.raos.com/
- https://mutti-parma.com/us/

Lean hardest on the targeted group for layout, product hero treatment, and Italian heritage storytelling; borrow the energy, motion, and editorial confidence from the general group. The result should feel like a premium grocery/DTC Italian brand — elevated, appetizing, and trustworthy — while keeping F&L's warm family soul.

## 4. Audience

Serve two audiences gracefully on the same site:
1. **Local retail customers & visitors** (Rehoboth/Lewes locals and beach-town tourists) who want to visit and buy.
2. **Wholesale / out-of-area fans** interested in the products and supply business.

The locations CTA serves group 1; the contact/inquiry form serves group 2.

## 5. Pages / structure

Home (single scrolling landing page) plus a few supporting pages.

### Home (priority sections, in order)
1. **Hero** — the twin-faces logo, brand name, a strong tagline, a big appetizing hero image (the **Buttercake** is the signature product — lead with it), and a primary **Visit Us** CTA. Taglines from the brand system: *"The Rehoboth Beach Original."* / *"Crazy. Good. Italian."* / *"We take the time to do it right."*
2. **The Story / Family Heritage** — the family behind it (Frank, Louie, Mom *Diane*, and Robin), the 12 years in Rehoboth Beach, and the next chapter (partnership with Pazzo Italiano, expansion at The Brush Factory in Lewes, growing supply business and new baked goods). Warm, personal, photo-driven. This is a real twin-brothers brand — the back-to-back-faces logo and the brothers' bantering speech-bubble voice are central to the story.
3. **Signature Products** — lead with the hero **Buttercakes** (the signature item — a pound-cake exterior with creamy filling, shippable by the case; flavors include Vanilla, Chocolate, Chocolate PB, Strawberry, Lemon, Dulce de Leche, Pumpkin). Then present the broader range by category, each with a photo and a short, appetizing description:
   - **Buttercakes** (hero)
   - **Cookies & Biscotti** (rainbow cookies, pizzelle, biscotti, snowies, Italian wedding, cannoli & ricotta cookies, fig & nut cucidati)
   - **Breads** (rustic Italian long bread, ciabatta, focaccia, prosciutto, asiago, sourdough, baguettes)
   - **Pasta Sauces** (Vodka, Tomato Basil — see `/brand-assets` sauce label)
   - **Meatballs** (the original veal/beef/pork recipe) & prepared items (tortellini salads, chicken salad)
   - **Pastries** (pasticiotti, Napoleon, cream puffs)
   - **Pantry & Snacks** (taralli, toffee nuts, balsamic glaze, chocolates, Marcona almonds)
   - Note: the full Brush Factory catalog is in `/brand-assets/F&L Product Cards...pdf` for reference — Code should feature a curated, photogenic selection, not all ~70 SKUs.
4. **Where to Find Us** — the two places to get Frank & Louie's:
   - **Pazzo Italiano** — the reimagined original location at **58 Baltimore Avenue, Rehoboth Beach** (walk-in Italian market; partnership with Second Block Hospitality). Link out to `https://www.eatpazzo.com/`.
   - **The Brush Factory** on **Kings Highway, Lewes, DE** — expanded offerings.
   - Include map links, and a note that customers can email about shipping a case of Buttercakes.
5. **Footer** — logo, contact (phone, email), social links, address, copyright.

### Supporting pages (keep light)
- **About / Our Story** (expanded version of the home story section).
- **Products** (fuller product showcase).
- **Visit / Locations** (detailed locations, maps, hours, links to Pazzo).
- **Contact** (inquiry form for retail, wholesale/supply, and case-shipping requests → emails `FrankandLouiesRB@gmail.com`).

Use a sticky/responsive nav linking these, with the **Visit Us** CTA and the phone number prominent.

## 6. Brand facts & content (use verbatim where useful)

- **Business name:** Frank & Louie's Italian Specialties — "The Rehoboth Beach Original"
- **Tagline / voice:** "The Rehoboth Beach Original." / "We take the time to do it right." / "Crazy. Good. Italian." / "Stay Pazzo!" / "Hey Butter Cake!" — warm, family, playful twin-brother banter (Frank and Louie razz each other in speech bubbles), proud of quality and old-world tradition. Many items are playfully *"imported" from Brooklyn, NY*.
- **Origin:** Family-owned and operated Italian deli, bakery, and specialty store, Rehoboth Beach, DE — 12 years on Baltimore Avenue.
- **Next chapter:** Original Baltimore Ave location is now **Pazzo Italiano** (partnership with Second Block Hospitality) — a reimagined walk-in Italian market that continues F&L's recipes and hospitality. F&L has expanded at **The Brush Factory on Kings Highway in Lewes** and is growing its supply/wholesale business, new products, and baked goods.
- **Family names:** Frank, Louie, Mom (Diane), and Robin.
- **Phone:** 302-227-5777 ("Call Ahead to Order")
- **Email:** FrankandLouiesRB@gmail.com
- **Address (Pazzo / original):** 58 Baltimore Avenue, Rehoboth Beach, DE
- **Second location:** The Brush Factory, Kings Highway, Lewes, DE
- **Pazzo website:** https://www.eatpazzo.com/
- **Social:** Instagram `https://instagram.com/frankandlouies` · Facebook `https://www.facebook.com/profile.php?id=100049901894681`
- **Products:** Buttercakes (signature — shippable by the case), pasta sauces, cookies, meatballs, Italian sandwiches.

## 7. Assets

All brand assets ship in the **`/brand-assets`** folder alongside this brief:

- **`Logo Blue w White Outline.svg`** — primary full logo (twin-faces badge + "FRANK & LOUIE'S / ITALIAN SPECIALTIES" lockup). Vector; use for nav/footer/hero. Brand colors live inside it (`#009CB7` turquoise, `#F5E7E6` blush).
- **`Faces Right.svg`** — the twin-faces icon on its own. Use as favicon, recurring mark, section dividers, and pattern source.
- **`082423_FRANK&LOUIES_BRAND_CONCEPT.pdf`** — the master brand guide: logo versions, exact palette, the chunky display type, packaging concepts (Buttercake & Pasta Sauce labels), the deli-paper face pattern, and branded swag ("Hey Butter Cake!"). This is the source of truth for look & feel — Code should study it before designing.
- **`072023_F&L_TOMATO_BASIL_SAUCE_PRINT.pdf`** — Tomato Basil pasta-sauce label artwork.
- **`F&L Product Cards (3 x 3 in).pdf`** — the full Brush Factory product catalog (names, descriptions, prices) for reference. Provided for context, NOT as a literal layout to reproduce — pull copy from it for the curated product selection.

**Still needed — product & lifestyle photography.** Final hero/product/family photos are not yet delivered (Matthew will provide; sauces with finished labels are still being produced). Until then: use tasteful placeholders sized for the final layout, and you may pull existing photos from the current frankandlouies.com CDN as interim stand-ins. Build the image components so swapping in final assets is trivial (centralized image map / clearly-named files).

## 8. Deliverables & quality bar

- Clean, well-organized Next.js repo with a clear README (run/build/deploy steps).
- Reusable, typed components; content kept in easily editable data files (e.g. `content/` or typed config) so non-developers can update copy and products.
- Fully responsive, fast (good Lighthouse), accessible, SEO-complete.
- Ready to deploy to Vercel on `frankandlouies.com`.
- A working contact form that delivers to `FrankandLouiesRB@gmail.com`.

## 9. Out of scope (for now)

- No online checkout / payments / cart.
- No customer accounts or login.
- No CMS (content lives in repo data files).
- Keep it standalone — no shared monorepo or shared components with other client sites.
