import Hero from "@/components/heros"; 
import Benefits from "@/components/benefits";
import Services from "@/components/services";
import HowItWorks from "@/components/how-it-works";
import FAQ from "@/components/faq";
import Pricing from "@/components/pricing";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Benefits />
      <HowItWorks />
      <Services />
      <FAQ />
      <Pricing />
      <Footer />
    </main>
  );
}
