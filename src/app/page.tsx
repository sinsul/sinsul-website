import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import IntroSection from "@/components/home/IntroSection";
import BusinessSection from "@/components/home/BusinessSection";
import HistorySection from "@/components/home/HistorySection";
import OrgSection from "@/components/home/OrgSection";
import StrengthsSection from "@/components/home/StrengthsSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import CertsSection from "@/components/home/CertsSection";
import NewsSection from "@/components/home/NewsSection";
import CtaSection from "@/components/home/CtaSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <IntroSection />
        <BusinessSection />
        <HistorySection />
        <OrgSection />
        <StrengthsSection />
        <ProjectsSection />
        <CertsSection />
        <NewsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
