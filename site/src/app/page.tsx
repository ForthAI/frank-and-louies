import { IntroSequence } from "@/components/intro/IntroSequence";
import { Hero } from "@/components/sections/Hero";
import { StorySection } from "@/components/sections/StorySection";
import { ProductRows } from "@/components/sections/ProductRows";
import { ItalianPantry } from "@/components/sections/ItalianPantry";
import { LocationsSection } from "@/components/sections/LocationsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";

// Runs before paint: skip the intro for returning/reduced-motion visitors
// (no flash); otherwise hide the nav until the intro hands off to it.
const INTRO_GATE = `(function(){try{var d=document.documentElement;var seen=sessionStorage.getItem('flIntroSeen');var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(seen||reduced){d.setAttribute('data-intro-skip','1');}else{d.setAttribute('data-intro-playing','1');}}catch(e){}})();`;

export default function HomePage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: INTRO_GATE }} />
      <noscript>
        <style>{`.fl-intro{display:none!important}`}</style>
      </noscript>
      <IntroSequence />
      <Hero />
      <StorySection />
      <ProductRows />
      <ItalianPantry />
      <LocationsSection />
      <ContactSection />
      <CtaBand />
      <JsonLd />
    </>
  );
}
