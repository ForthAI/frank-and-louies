import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { footerLinks } from "@/content/nav";
import { Logo } from "@/components/brand/Logo";
import { FacesMark } from "@/components/brand/FacesMark";
import { FacebookIcon, InstagramIcon } from "@/components/brand/SocialIcons";

export function SiteFooter() {
  const year = 2026;

  return (
    <footer className="mt-auto border-t border-blush-deep/60 bg-blush">
      {/* deli-paper accent strip */}
      <div className="bg-deli h-3 w-full" aria-hidden />

      <div className="container-fl grid gap-12 py-14 md:grid-cols-[1.3fr_1fr_1.2fr]">
        {/* Brand */}
        <div>
          <Logo height={72} href={null} />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
            Family-run Italian bakery & specialty kitchen. Home of the Buttercake.
            From our family to yours.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Frank & Louie's on Instagram"
              className="inline-flex size-10 items-center justify-center rounded-full bg-turquoise text-cream transition-transform hover:-translate-y-0.5"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href={siteConfig.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Frank & Louie's on Facebook"
              className="inline-flex size-10 items-center justify-center rounded-full bg-turquoise text-cream transition-transform hover:-translate-y-0.5"
            >
              <FacebookIcon className="size-5" />
            </a>
          </div>
        </div>

        {/* Explore */}
        <nav aria-label="Footer">
          <h2 className="eyebrow text-turquoise-deep">Explore</h2>
          <ul className="mt-4 space-y-3">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-charcoal/80 transition-colors hover:text-turquoise-deep"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Visit / contact */}
        <div>
          <h2 className="eyebrow text-turquoise-deep">Find Us</h2>
          <ul className="mt-4 space-y-4 text-sm">
            {siteConfig.locations.map((loc) => (
              <li key={loc.id} className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-turquoise" aria-hidden />
                <span className="text-charcoal/80">
                  <span className="font-display font-bold text-charcoal">{loc.name}</span>
                  <br />
                  {loc.street}
                  {loc.city ? `, ${loc.city}, ${loc.state}` : ""}
                </span>
              </li>
            ))}
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-turquoise" aria-hidden />
              <a href={siteConfig.phoneHref} className="text-charcoal/80 hover:text-turquoise-deep">
                {siteConfig.phone}
                <span className="block text-xs text-muted-foreground">{siteConfig.phoneNote}</span>
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-turquoise" aria-hidden />
              <a
                href={siteConfig.emailHref}
                className="break-all text-charcoal/80 hover:text-turquoise-deep"
              >
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blush-deep/60">
        <div className="container-fl flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p className="flex items-center gap-2">
            <FacesMark className="size-4 text-turquoise/70" />
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="font-display text-base font-bold text-turquoise-deep">From our family to yours.</p>
        </div>
      </div>
    </footer>
  );
}
