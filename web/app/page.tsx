import { Hero } from "@/components/home/Hero";
import { Footer } from "@/components/layout/Footer";
import { PatternDomains } from "@/components/home/PatternDomains";
import { ArtifactShowcase } from "@/components/home/ArtifactShowcase";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustClose } from "@/components/home/TrustClose";
import { JsonLd } from "@/components/ui/JsonLd";
import { graph, reviewsSchema } from "@/lib/seo/schema";
import { home } from "@/content/home";

/**
 * The homepage is ordered by the visitor's actual sequence of doubt:
 * recognition → the new idea → proof it's real → other people → the action.
 * It explains nothing about the company until after it has described them.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(...reviewsSchema(home.testimonials.items))} />

      <Hero hero={home.hero} questions={home.questions} />
      <PatternDomains domains={home.domains} />
      <ArtifactShowcase artifact={home.artifact} />
      <Testimonials testimonials={home.testimonials} />
      <TrustClose trust={home.trust} />
    <Footer />
    </>
  );
}
