"use client";
import { useState } from "react";
import type { Testimonial } from "@/types/portfolio";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="section" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Social Proof</span>
          <h2 className="section-title" id="testimonials-heading">What People Say</h2>
        </div>

        <div
          className="testimonials-outer reveal"
          role="region"
          aria-label="Testimonials"
          aria-roledescription="carousel"
        >
          <div
            className="testimonials-track"
            style={{ transform: `translateX(calc(-${current * 100}% - ${current * 24}px))` }}
            aria-live="polite"
          >
            {testimonials.map((t, i) => {
              const initials = t.name.split(" ").map((n) => n[0]).join("").toUpperCase();
              return (
                <div
                  className="testimonial-card"
                  key={i}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${testimonials.length}`}
                  aria-hidden={i !== current}
                >
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar" aria-hidden="true">
                      {t.avatar ? <img src={t.avatar} alt="" loading="lazy" decoding="async" /> : initials}
                    </div>
                    <div>
                      <p className="testimonial-name">{t.name}</p>
                      <p className="testimonial-role">{t.title}</p>
                    </div>
                    <span className="testimonial-stars" role="img" aria-label={`${t.rating} out of 5 stars`}>
                      {"★".repeat(t.rating)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button
              type="button"
              key={i}
              className={`dot${i === current ? " active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
              aria-pressed={i === current}
              id={`dot-${i}`}
            />
          ))}
        </div>

        {/* Nav arrows */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "16px" }}>
          <button
            type="button"
            onClick={prev}
            className="btn btn-ghost"
            style={{ padding: "8px 18px", fontSize: "1rem" }}
            id="testimonial-prev"
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            className="btn btn-ghost"
            style={{ padding: "8px 18px", fontSize: "1rem" }}
            id="testimonial-next"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
