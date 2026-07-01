import { ExternalLink, MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SiteLocation } from "@/lib/site";
import { Cta } from "@/components/brand/Cta";
import { FacesMark } from "@/components/brand/FacesMark";

export function LocationCard({
  location,
  className,
}: {
  location: SiteLocation;
  className?: string;
}) {
  const fullAddress = [
    location.street,
    location.city ? `${location.city}, ${location.state}${location.zip ? " " + location.zip : ""}` : "",
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-3xl bg-cream p-7 shadow-[0_30px_60px_-32px_rgba(0,0,0,0.45)] sm:p-8",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-turquoise">
          <FacesMark className="size-7 text-cream" />
        </span>
        <div>
          <h3 className="font-display text-2xl font-bold text-charcoal">{location.name}</h3>
          <p className="text-sm font-semibold text-turquoise-deep">{location.kicker}</p>
        </div>
      </div>

      <p className="mt-5 flex items-start gap-2 text-sm font-medium text-charcoal/80">
        <MapPin className="mt-0.5 size-4 shrink-0 text-turquoise" aria-hidden />
        {fullAddress}
      </p>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground text-pretty">
        {location.blurb}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Cta href={location.mapsUrl} external size="sm">
          <Navigation className="size-4" aria-hidden />
          Get Directions
        </Cta>
        {location.website ? (
          <Cta href={location.website} external size="sm" variant="outline">
            {location.websiteLabel}
            <ExternalLink className="size-4" aria-hidden />
          </Cta>
        ) : null}
      </div>
    </article>
  );
}
