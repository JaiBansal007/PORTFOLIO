"use client";
import { useState, type FormEvent } from "react";
import type { Personal } from "@/types/portfolio";
import { SocialLinks } from "@/components/SocialLinks";

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 14a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const MapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true" focusable="false">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export default function Contact({ personal }: { personal: Personal }) {
  const [status, setStatus] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!personal.email.trim()) {
      setStatus("The contact form is unavailable until an email address is added.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const senderEmail = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim()
      || `Portfolio inquiry from ${name}`;
    const message = String(formData.get("message") ?? "").trim();
    const body = `Name: ${name}\nEmail: ${senderEmail}\n\n${message}`;
    const mailto = `mailto:${personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setStatus("Your email app should open with a draft. The message is not sent until you send it there.");
    window.location.href = mailto;
  }

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Let&apos;s Connect</span>
          <h2 className="section-title" id="contact-heading">Get In Touch</h2>
        </div>

        <div className="contact-grid">
          {/* Left — Info */}
          <div className="reveal">
            <p className="contact-intro">
              Have a project in mind or just want to say hi? My inbox is always open.
              I&apos;ll get back to you as soon as possible.
            </p>
            <div className="contact-details">
              {personal.email && (
                <div className="contact-item">
                  <div className="contact-icon" aria-hidden="true"><EmailIcon /></div>
                  <a href={`mailto:${personal.email}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {personal.email}
                  </a>
                </div>
              )}
              {personal.phone && (
                <div className="contact-item">
                  <div className="contact-icon" aria-hidden="true"><PhoneIcon /></div>
                  <a href={`tel:${personal.phone.replace(/[^\d+]/g, "")}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {personal.phone}
                  </a>
                </div>
              )}
              {personal.location && (
                <div className="contact-item">
                  <div className="contact-icon" aria-hidden="true"><MapIcon /></div>
                  <span>{personal.location}</span>
                </div>
              )}
            </div>
            <SocialLinks social={personal.social} className="contact-socials" />
          </div>

          {/* Right — Form */}
          <form className="contact-form reveal" onSubmit={handleSubmit} id="contact-form">
            <div className="form-group">
              <label htmlFor="cf-name">Your Name</label>
              <input type="text" id="cf-name" name="name" placeholder="Jane Smith" autoComplete="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="cf-email">Email Address</label>
              <input type="email" id="cf-email" name="email" placeholder="jane@example.com" autoComplete="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="cf-subject">Subject</label>
              <input type="text" id="cf-subject" name="subject" placeholder="Project Inquiry" />
            </div>
            <div className="form-group">
              <label htmlFor="cf-message">Message</label>
              <textarea id="cf-message" name="message" rows={5} placeholder="Tell me about your project..." required />
            </div>
            <p className="contact-form-note">
              This opens your email app; it does not send the message automatically.
              {personal.email && (
                <> If it does not open, email <a href={`mailto:${personal.email}`}>{personal.email}</a>.</>
              )}
            </p>
            <button
              type="submit"
              className="btn btn-primary btn-full"
              id="cf-submit"
            >
              <span>Open Email App</span>
              <SendIcon />
            </button>
            {status && (
              <p className="contact-status" role="status" aria-live="polite" aria-atomic="true">
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
