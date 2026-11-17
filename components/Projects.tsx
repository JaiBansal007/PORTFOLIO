"use client";
import { useState } from "react";
import type { Project } from "@/types/portfolio";
import { isSafeExternalUrl } from "@/lib/utils";

const ICONS = ["📊", "🌱", "₿", "💻", "🌱", "🏥", "⚡", "🔮", "🎨", "📊"];

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

export default function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<"all" | "featured">("all");

  const visible = filter === "featured" ? projects.filter((p) => p.featured) : projects;

  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Portfolio</span>
          <h2 className="section-title" id="projects-heading">Featured Projects</h2>
        </div>

        <div className="project-filters">
          <button
            type="button"
            className={`filter-btn${filter === "all" ? " active" : ""}`}
            onClick={() => setFilter("all")}
            id="filter-all"
            aria-pressed={filter === "all"}
          >
            All ({projects.length})
          </button>
          <button
            type="button"
            className={`filter-btn${filter === "featured" ? " active" : ""}`}
            onClick={() => setFilter("featured")}
            id="filter-featured"
            aria-pressed={filter === "featured"}
          >
            Featured ({projects.filter((p) => p.featured).length})
          </button>
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {visible.length} projects shown
        </p>
        <div className="projects-grid">
          {visible.map((project, i) => (
            <article className="project-card reveal" key={project.title}>
              <div className="project-thumbnail">
                <div className="project-thumb-bg" aria-hidden="true" />
                <span className="project-thumb-icon" aria-hidden="true">
                  {ICONS[i % ICONS.length]}
                </span>
                {project.featured && (
                  <span className="featured-badge">Featured</span>
                )}
              </div>
              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span className="project-tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  {isSafeExternalUrl(project.liveUrl) && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      id={`project-live-${i}`}
                      aria-label={`Open ${project.title} live demo (opens in a new tab)`}
                    >
                      <ExternalIcon /> Live Demo
                    </a>
                  )}
                  {isSafeExternalUrl(project.githubUrl) && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      id={`project-github-${i}`}
                      aria-label={`Open ${project.title} source code (opens in a new tab)`}
                    >
                      <GithubIcon /> Source
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
