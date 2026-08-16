import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ImpactBand from "@/components/ImpactBand";
import About from "@/components/About";
import Services from "@/components/Services";
import DigitalTransformation from "@/components/DigitalTransformation";
import Cybersecurity from "@/components/Cybersecurity";
import Skills from "@/components/Skills";
import MarketAndDesign from "@/components/MarketAndDesign";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import HashScroll from "@/components/HashScroll";

export default function Home() {
  return (
    <>
      <HashScroll />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <ImpactBand />
        <About />
        <Services />
        <DigitalTransformation />
        <Cybersecurity />
        <Skills />
        <MarketAndDesign />
        <Projects />
        <Partners />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
