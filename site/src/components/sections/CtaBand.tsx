import { Cta } from "@/components/brand/Cta";
import { Reveal } from "@/components/brand/Reveal";
import { FacesMark } from "@/components/brand/FacesMark";

type CtaBandProps = {
  eyebrow?: string;
  title?: React.ReactNode;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CtaBand({
  eyebrow = "The Rehoboth Beach Original",
  title = "We take the time to do it right.",
  body = "Twelve years and counting. Come taste the difference a family kitchen makes — or have a case shipped to your door.",
  primary = { label: "Visit Us", href: "#visit" },
  secondary = { label: "Ship a Case", href: "#contact" },
}: CtaBandProps) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-fl">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-blush px-6 py-14 text-center sm:px-12">
          <FacesMark
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -left-8 size-44 text-turquoise/10"
          />
          <FacesMark
            aria-hidden
            className="pointer-events-none absolute -top-10 -right-8 size-44 -scale-x-100 text-coral/10"
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <span className="eyebrow text-turquoise">{eyebrow}</span>
            <h2 className="mt-4 display-md text-charcoal text-balance">{title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">{body}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Cta href={primary.href} size="lg">
                {primary.label}
              </Cta>
              <Cta href={secondary.href} size="lg" variant="outline">
                {secondary.label}
              </Cta>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
