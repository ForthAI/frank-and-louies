import type { Metadata } from "next";
import { Cta } from "@/components/brand/Cta";
import { FacesMark } from "@/components/brand/FacesMark";
import { SpeechBubble } from "@/components/brand/SpeechBubble";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-blush">
      <div className="container-fl flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <FacesMark className="size-20 text-turquoise" />
        <div className="mt-6 flex items-center gap-3">
          <SpeechBubble from="frank">Where&apos;d this page go?</SpeechBubble>
          <SpeechBubble from="louie" tail="right">
            You lost it, Frank!
          </SpeechBubble>
        </div>
        <h1 className="mt-8 display-lg text-charcoal">Lost a crumb.</h1>
        <p className="mt-4 max-w-md text-lg text-muted-foreground text-pretty">
          We couldn&apos;t find that page — but there&apos;s plenty of good stuff
          back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Cta href="/" size="lg">
            Back Home
          </Cta>
          <Cta href="/#products" size="lg" variant="outline">
            See the Goods
          </Cta>
        </div>
      </div>
    </section>
  );
}
