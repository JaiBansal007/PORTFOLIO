import type { SkillCategory } from "@/types/portfolio";

export default function Skills({ skills }: { skills: SkillCategory[] }) {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Expertise</span>
          <h2 className="section-title">Skills & Technologies</h2>
        </div>

        <div className="skills-grid">
          {skills.map((cat, i) => (
            <div className="skill-category reveal" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <p className="skill-cat-title">{cat.category}</p>
              <div className="skill-tags">
                {cat.items.map((item, j) => (
                  <span className="skill-tag" key={j}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
