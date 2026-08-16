import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ImpactBand from "@/components/ImpactBand";
import About from "@/components/About";
import ChaptersCarousel from "@/components/ChaptersCarousel";
import DigitalTransformation from "@/components/DigitalTransformation";
import Cybersecurity from "@/components/Cybersecurity";
import MarketAndDesign from "@/components/MarketAndDesign";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import HashScroll from "@/components/HashScroll";
import { getProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <HashScroll />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <ImpactBand />
        <About />
        <ChaptersCarousel>
          <DigitalTransformation />
          <Cybersecurity />
          <MarketAndDesign />
        </ChaptersCarousel>
        <Services projects={projects} />
        <Skills />
        <Projects projects={projects} />
        <Partners />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
