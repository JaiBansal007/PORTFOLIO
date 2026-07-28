"use client";
import { useState, type FormEvent } from "react";
import type { Personal } from "@/types/portfolio";
import { SocialLinks } from "@/components/SocialLinks";

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 14a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const MapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export default function Contact({ personal }: { personal: Personal }) {
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  function showToast(msg: string, type: "success" | "error") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    showToast("Message sent! I'll get back to you soon. ✨", "success");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Let&apos;s Connect</span>
          <h2 className="section-title">Get In Touch</h2>
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
                  <div className="contact-icon"><EmailIcon /></div>
                  <a href={`mailto:${personal.email}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {personal.email}
                  </a>
                </div>
              )}
              {personal.phone && (
                <div className="contact-item">
                  <div className="contact-icon"><PhoneIcon /></div>
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.location && (
                <div className="contact-item">
                  <div className="contact-icon"><MapIcon /></div>
                  <span>{personal.location}</span>
                </div>
              )}
            </div>
            <SocialLinks social={personal.social} className="contact-socials" />
          </div>

          {/* Right — Form */}
          <form className="contact-form reveal" onSubmit={handleSubmit} id="contact-form" noValidate>
            <div className="form-group">
              <label htmlFor="cf-name">Your Name</label>
              <input type="text" id="cf-name" name="name" placeholder="Jane Smith" required />
            </div>
            <div className="form-group">
              <label htmlFor="cf-email">Email Address</label>
              <input type="email" id="cf-email" name="email" placeholder="jane@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="cf-subject">Subject</label>
              <input type="text" id="cf-subject" name="subject" placeholder="Project Inquiry" />
            </div>
            <div className="form-group">
              <label htmlFor="cf-message">Message</label>
              <textarea id="cf-message" name="message" rows={5} placeholder="Tell me about your project..." required />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-full"
              id="cf-submit"
              disabled={sending}
            >
              <span>{sending ? "Sending…" : "Send Message"}</span>
              {!sending && <SendIcon />}
            </button>
          </form>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`toast show ${toast.type}`} role="alert">
          {toast.msg}
        </div>
      )}
    </section>
  );
}
