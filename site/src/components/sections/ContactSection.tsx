import { Suspense } from "react";
import { ContactForm } from "./ContactForm";
import { Reveal } from "@/components/brand/Reveal";
import { SectionHeading } from "@/components/brand/SectionHeading";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 bg-blush py-20 sm:py-28">
      <div className="container-fl">
        <SectionHeading
          eyebrow="Say Hello"
          title="Get in touch"
          intro="Questions about visiting, wholesale and supply, or shipping a case of Buttercakes? Drop us a line — we read every message."
        />

        <Reveal className="mx-auto mt-14 max-w-2xl">
          <div className="rounded-3xl bg-white p-6 shadow-[0_24px_50px_-32px_rgba(43,43,43,0.35)] ring-1 ring-blush-deep/50 sm:p-8">
            <Suspense fallback={<p className="text-muted-foreground">Loading form…</p>}>
              <ContactForm />
            </Suspense>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
