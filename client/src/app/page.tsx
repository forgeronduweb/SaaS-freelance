import Hero from "@/components/hero"; 
import Benefits from "@/components/benefits";
import Services from "@/components/services";
import HowItWorks from "@/components/how-it-works";
import FAQ from "@/components/faq";
import Pricing from "@/components/pricing";
import CTAFinal from "@/components/cta-final";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Benefits />
      <HowItWorks />
      <Services />
      <Pricing />
      <FAQ />
      <CTAFinal />
      <Footer />
    </main>
  );
}
