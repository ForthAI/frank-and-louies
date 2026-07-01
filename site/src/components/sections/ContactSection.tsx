import { Suspense } from "react";
import { Mail, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { Reveal } from "@/components/brand/Reveal";
import { SectionHeading } from "@/components/brand/SectionHeading";
import { FacebookIcon, InstagramIcon } from "@/components/brand/SocialIcons";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 bg-blush py-20 sm:py-28">
      <div className="container-fl">
        <SectionHeading
          eyebrow="Say Hello"
          title="Get in touch"
          intro="Questions about visiting, wholesale and supply, or shipping a case of Buttercakes? Drop us a line — we read every message."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* Form */}
          <Reveal>
            <div className="rounded-3xl bg-white p-6 shadow-[0_24px_50px_-32px_rgba(43,43,43,0.35)] ring-1 ring-blush-deep/50 sm:p-8">
              <Suspense fallback={<p className="text-muted-foreground">Loading form…</p>}>
                <ContactForm />
              </Suspense>
            </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={100} className="flex flex-col gap-6">
            <div>
              <h3 className="eyebrow text-turquoise-deep">Reach us directly</h3>
              <ul className="mt-4 space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-5 shrink-0 text-turquoise" aria-hidden />
                  <a
                    href={siteConfig.phoneHref}
                    className="font-display text-lg font-bold text-charcoal hover:text-turquoise-deep"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-turquoise" aria-hidden />
                  <a
                    href={siteConfig.emailHref}
                    className="font-medium break-all text-charcoal hover:text-turquoise-deep"
                  >
                    {siteConfig.email}
                  </a>
                </li>
              </ul>
            </div>

            <div className="border-t border-blush-deep/60 pt-6">
              <h3 className="eyebrow text-turquoise-deep">Follow along</h3>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Frank & Louie's on Instagram"
                  className="inline-flex size-11 items-center justify-center rounded-full bg-turquoise text-cream transition-transform hover:-translate-y-0.5"
                >
                  <InstagramIcon className="size-5" />
                </a>
                <a
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Frank & Louie's on Facebook"
                  className="inline-flex size-11 items-center justify-center rounded-full bg-turquoise text-cream transition-transform hover:-translate-y-0.5"
                >
                  <FacebookIcon className="size-5" />
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-white/70 p-5 text-sm text-muted-foreground">
              Want a case of Buttercakes shipped? Pick{" "}
              <span className="font-semibold text-turquoise-deep">
                &ldquo;Ship a case of Buttercakes&rdquo;
              </span>{" "}
              in the form and tell us where to send them.
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
