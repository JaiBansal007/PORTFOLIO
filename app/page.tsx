import { getPortfolioData } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Hackathons from "@/components/Hackathons";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  const data = getPortfolioData();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="bg-grid" aria-hidden="true" />
      <Navbar
        personal={data.personal}
        hasHackathons={data.hackathons.length > 0}
        hasTestimonials={data.testimonials.length > 0}
        hasBlog={data.blog.length > 0}
      />
      <main id="main-content" tabIndex={-1}>
        <Hero personal={data.personal} />
        <About about={data.about} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Hackathons hackathons={data.hackathons} />
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
