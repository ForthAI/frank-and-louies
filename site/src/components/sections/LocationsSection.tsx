import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Cta } from "@/components/brand/Cta";
import { Reveal } from "@/components/brand/Reveal";
import { FacesMark } from "@/components/brand/FacesMark";
import { LocationCard } from "./LocationCard";

export function LocationsSection() {
  return (
    <section
      id="visit"
      className="bg-deli relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      {/* darken the deli texture slightly for contrast */}
      <div aria-hidden className="absolute inset-0 bg-turquoise/85" />

      <div className="container-fl relative">
        <Reveal className="flex flex-col items-center text-center">
          <FacesMark className="size-10 text-cream" />
          <span className="eyebrow mt-4 text-cream/85">Where to Find Us</span>
          <h2 className="mt-3 display-lg text-cream text-balance">
            Where to get Frank &amp; Louie&apos;s
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream/90 text-pretty">
            Come say hi, grab a Buttercake, and take home a jar of sauce. We&apos;d
            love to see you.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {siteConfig.locations.map((location, i) => (
            <Reveal key={location.id} delay={i * 100} className="h-full">
              <LocationCard location={location} />
            </Reveal>
          ))}
        </div>

        {/* Wholesale / retailer call-out */}
        <Reveal className="mt-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-3xl bg-cream/[0.12] p-8 text-center ring-1 ring-cream/25 backdrop-blur-sm sm:p-10">
            <span className="eyebrow text-cream/85">For Shops &amp; Retailers</span>
            <h3 className="display-md text-cream text-balance">
              Want to carry Frank &amp; Louie&apos;s?
            </h3>
            <p className="max-w-xl leading-relaxed text-cream/90 text-pretty">
              Shops, markets and caf&eacute;s — if you&apos;d like to put our
              stuff on your shelves, let&apos;s talk. We&apos;d love to make your
              customers regulars.
            </p>
            <Cta href="#contact" variant="white" size="lg">
              Become a Retailer
            </Cta>
          </div>
        </Reveal>

        <Reveal className="mt-8 flex justify-center">
          <a
            href={`${siteConfig.emailHref}?subject=${encodeURIComponent("Shipping a case of Buttercakes")}`}
            className="inline-flex items-center gap-2 rounded-full bg-cream/15 px-6 py-3 text-sm font-semibold text-cream ring-1 ring-cream/30 backdrop-blur-sm transition-colors hover:bg-cream/25"
          >
            <Mail className="size-4" aria-hidden />
            Not local? Email us about shipping a case of Buttercakes
          </a>
        </Reveal>
      </div>
    </section>
  );
}
