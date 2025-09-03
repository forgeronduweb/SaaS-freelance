import Hero from "@/components/heros"; 
import FAQ from "@/components/faq";
import Benefits from "@/components/benefits";
import HowItWorks from "@/components/how-it-works";

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <HowItWorks />
      <FAQ />
    </>
  );
}
