import type { Hackathon } from "@/types/portfolio";

export default function Hackathons({ hackathons }: { hackathons: Hackathon[] }) {
  if (hackathons.length === 0) return null;

  return (
    <section id="hackathons" className="section" aria-labelledby="hackathons-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Achievements</span>
          <h2 className="section-title" id="hackathons-heading">
            Hackathons &amp; Competitions
          </h2>
        </div>

        <div className="hackathons-grid">
          {hackathons.map((hackathon) => (
            <article className="hackathon-card reveal" key={hackathon.name}>
              <p className="hackathon-organizer">{hackathon.organizer}</p>
              <h3 className="hackathon-title">{hackathon.name}</h3>
              <p className="hackathon-result">{hackathon.result}</p>
              <p className="hackathon-description">{hackathon.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
