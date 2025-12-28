import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorks from "@/components/sections/HowItWorks";
import AppExperience from "@/components/sections/AppExperience";
import GlobalGeneration from "@/components/sections/GlobalGeneration";
import WhyChoose from "@/components/sections/WhyChoose";
import UseCases from "@/components/sections/UseCases";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <AppExperience />
        <GlobalGeneration />
        <WhyChoose />
        <UseCases />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
