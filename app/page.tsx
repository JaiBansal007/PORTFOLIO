import { getPortfolioData } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  const data = getPortfolioData();

  return (
    <>
      <div className="bg-grid" aria-hidden="true" />
      <Navbar personal={data.personal} />
      <main>
        <Hero personal={data.personal} />
        <About about={data.about} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Experience experience={data.experience} education={data.education} />
        <Testimonials testimonials={data.testimonials} />
        <Blog posts={data.blog} />
        <Contact personal={data.personal} />
      </main>
      <Footer personal={data.personal} />
      <ScrollReveal />
    </>
  );
}
