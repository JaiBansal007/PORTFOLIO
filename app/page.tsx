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
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export default function Home() {
  const data = getPortfolioData();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: data.personal.name,
        url: SITE_URL,
        jobTitle: "Computer Science Student",
        description: SITE_DESCRIPTION,
        image: `${SITE_URL}/opengraph-image`,
        affiliation: {
          "@type": "CollegeOrUniversity",
          name: "Netaji Subhas University of Technology",
        },
        sameAs: Object.values(data.personal.social).filter(
          (url): url is string => Boolean(url)
        ),
        knowsAbout: data.skills.flatMap((skill) => skill.items),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      ...data.projects.map((project) => ({
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        keywords: project.tags,
        url: project.liveUrl || project.githubUrl,
        author: { "@id": `${SITE_URL}/#person` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
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
