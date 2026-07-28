import type { About as AboutType } from "@/types/portfolio";
import { NumberTicker } from "@/registry/magicui/number-ticker";

export default function About({ about }: { about: AboutType }) {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">About Me</span>
          <h2 className="section-title">Who I Am</h2>
        </div>

        <div className="about-grid">
          <div className="reveal">
            <p className="about-bio">{about.bio}</p>
            <a href="#contact" className="btn btn-primary mt-md">
              Get In Touch
            </a>
          </div>

          <div className="about-highlights reveal">
            {about.highlights.map((highlight, i) => {
              // Parse "5+" → num=5, suffix="+"  |  "20+ Projects" → num=20 suffix="+" label="Projects…"
              const match = highlight.match(/^(\d+)(\+?)\s*(.*)$/);
              if (match) {
                const num = parseInt(match[1], 10);
                const suffix = match[2]; // "+" or ""
                const label = match[3];
                return (
                  <div className="highlight-card" key={i}>
                    <span className="highlight-num">
                      <NumberTicker
                        value={num}
                        delay={i * 0.15}
                        className="highlight-num"
                      />
                      {suffix}
                    </span>
                    <span className="highlight-label">{label}</span>
                  </div>
                );
              }
              return (
                <div className="highlight-card" key={i}>
                  <span className="highlight-label">{highlight}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
