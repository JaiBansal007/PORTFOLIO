"use client";
import { useState } from "react";
import type { Experience as ExpType, Education } from "@/types/portfolio";

export default function Experience({
  experience,
  education,
}: {
  experience: ExpType[];
  education: Education[];
}) {
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");

  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Career</span>
          <h2 className="section-title">Experience & Education</h2>
        </div>

        <div className="timeline-tabs">
          <button
            className={`tab-btn${activeTab === "work" ? " active" : ""}`}
            onClick={() => setActiveTab("work")}
            id="tab-work"
          >
            Work
          </button>
          <button
            className={`tab-btn${activeTab === "education" ? " active" : ""}`}
            onClick={() => setActiveTab("education")}
            id="tab-education"
          >
            Education
          </button>
        </div>

        {/* Work Timeline */}
        <div className={`timeline${activeTab !== "work" ? " hidden" : ""}`} id="timeline-work">
          {experience.map((item, i) => (
            <div className="timeline-item reveal" key={i}>
              <div className="timeline-card">
                <div className="timeline-header">
                  <h3 className="timeline-role">{item.role}</h3>
                  <span className="timeline-period">{item.period}</span>
                </div>
                <p className="timeline-company">{item.company}</p>
                <p className="timeline-location">📍 {item.location}</p>
                <p className="timeline-desc">{item.description}</p>
                <div className="timeline-highlights">
                  {item.highlights.map((h, j) => (
                    <span className="timeline-highlight" key={j}>{h}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education Timeline */}
        <div className={`timeline timeline-edu${activeTab !== "education" ? " hidden" : ""}`} id="timeline-education">
          {education.map((item, i) => (
            <div className="timeline-item reveal" key={i}>
              <div className="timeline-card">
                <div className="timeline-header">
                  <h3 className="timeline-role">{item.degree}</h3>
                  <span className="timeline-period">{item.period}</span>
                </div>
                <p className="timeline-company">{item.institution}</p>
                <p className="timeline-desc">{item.description}</p>
                {item.gpa && (
                  <p className="timeline-gpa">GPA: {item.gpa}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
