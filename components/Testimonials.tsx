"use client";
import { useState } from "react";
import type { Testimonial } from "@/types/portfolio";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section id="testimonials" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Social Proof</span>
          <h2 className="section-title">What People Say</h2>
        </div>

        <div className="testimonials-outer reveal">
          <div
            className="testimonials-track"
            style={{ transform: `translateX(calc(-${current * 100}% - ${current * 24}px))` }}
          >
            {testimonials.map((t, i) => {
              const initials = t.name.split(" ").map((n) => n[0]).join("").toUpperCase();
              return (
                <div className="testimonial-card" key={i}>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">
                      {t.avatar ? <img src={t.avatar} alt={t.name} /> : initials}
                    </div>
                    <div>
                      <p className="testimonial-name">{t.name}</p>
                      <p className="testimonial-role">{t.title}</p>
                    </div>
                    <div className="testimonial-stars" aria-label={`${t.rating} stars`}>
                      {"★".repeat(t.rating)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`dot${i === current ? " active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              id={`dot-${i}`}
            />
          ))}
        </div>

        {/* Nav arrows */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "16px" }}>
          <button
            onClick={prev}
            className="btn btn-ghost"
            style={{ padding: "8px 18px", fontSize: "1rem" }}
            id="testimonial-prev"
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <button
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
