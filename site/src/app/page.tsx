import { Hero } from "@/components/sections/Hero";
import { StorySection } from "@/components/sections/StorySection";
import { ProductRows } from "@/components/sections/ProductRows";
import { ItalianPantry } from "@/components/sections/ItalianPantry";
import { LocationsSection } from "@/components/sections/LocationsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { JsonLd } from "@/components/seo/JsonLd";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StorySection />
      <ProductRows />
      <ItalianPantry />
      <LocationsSection />
      <ContactSection />
      <JsonLd />
    </>
  );
}
