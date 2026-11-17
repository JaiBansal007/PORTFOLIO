"use client";
import { useState, type KeyboardEvent } from "react";
import type { Experience as ExpType, Education } from "@/types/portfolio";

export default function Experience({
  experience,
  education,
}: {
  experience: ExpType[];
  education: Education[];
}) {
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    let nextTab: "work" | "education";
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
      case "ArrowLeft":
      case "ArrowUp":
        nextTab = activeTab === "work" ? "education" : "work";
        break;
      case "Home":
        nextTab = "work";
        break;
      case "End":
        nextTab = "education";
        break;
      default:
        return;
    }

    event.preventDefault();
    setActiveTab(nextTab);
    document.getElementById(`tab-${nextTab}`)?.focus();
  }

  return (
    <section id="experience" className="section" aria-labelledby="experience-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Career</span>
          <h2 className="section-title" id="experience-heading">Experience & Education</h2>
        </div>

        <div className="timeline-tabs" role="tablist" aria-label="Career history">
          <button
            type="button"
            className={`tab-btn${activeTab === "work" ? " active" : ""}`}
            onClick={() => setActiveTab("work")}
            onKeyDown={handleTabKeyDown}
            id="tab-work"
            role="tab"
            aria-selected={activeTab === "work"}
            aria-controls="timeline-work"
            tabIndex={activeTab === "work" ? 0 : -1}
          >
            Work
          </button>
          <button
            type="button"
            className={`tab-btn${activeTab === "education" ? " active" : ""}`}
            onClick={() => setActiveTab("education")}
            onKeyDown={handleTabKeyDown}
            id="tab-education"
            role="tab"
            aria-selected={activeTab === "education"}
            aria-controls="timeline-education"
            tabIndex={activeTab === "education" ? 0 : -1}
          >
            Education
          </button>
        </div>

        {/* Work Timeline */}
        <div
          className="timeline"
          id="timeline-work"
          role="tabpanel"
          aria-labelledby="tab-work"
          tabIndex={0}
          hidden={activeTab !== "work"}
        >
          {experience.map((item, i) => (
            <div className="timeline-item reveal" key={i}>
              <div className="timeline-card">
                <div className="timeline-header">
                  <h3 className="timeline-role">{item.role}</h3>
                  <span className="timeline-period">{item.period}</span>
                </div>
                <p className="timeline-company">{item.company}</p>
                {item.location && <p className="timeline-location">📍 {item.location}</p>}
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
        <div
          className="timeline timeline-edu"
          id="timeline-education"
          role="tabpanel"
          aria-labelledby="tab-education"
          tabIndex={0}
          hidden={activeTab !== "education"}
        >
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
                  <p className="timeline-gpa">Result: {item.gpa}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
