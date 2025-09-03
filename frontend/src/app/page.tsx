import Hero from "@/components/heros"; 
import Benefits from "@/components/benefits";
import Services from "@/components/services";
import HowItWorks from "@/components/how-it-works";
import FAQ from "@/components/faq";

export default function Home() {
  return (
    <main>
      <Hero />
      <Benefits />
      <HowItWorks />
      <Services />
      <FAQ />
    </main>
  );
}
