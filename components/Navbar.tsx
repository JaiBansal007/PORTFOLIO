"use client";
import { useEffect, useRef, useState } from "react";
import type { Personal } from "@/types/portfolio";

const BASE_NAV_ITEMS = ["about", "skills", "projects", "experience"];

export default function Navbar({
  personal,
  hasHackathons,
  hasTestimonials,
  hasBlog,
}: {
  personal: Personal;
  hasHackathons: boolean;
  hasTestimonials: boolean;
  hasBlog: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMenuOpen(false);
        document.querySelector<HTMLAnchorElement>(".nav-links a")?.focus();
      }
    };
    const desktopQuery = window.matchMedia("(min-width: 641px)");

    document.addEventListener("keydown", onKeyDown);
    desktopQuery.addEventListener("change", onBreakpointChange);
    mobileMenuRef.current?.querySelector("a")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktopQuery.removeEventListener("change", onBreakpointChange);
    };
  }, [menuOpen]);

  const initials = personal.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const closeMobileMenu = () => setMenuOpen(false);
  const navItems = [
    ...BASE_NAV_ITEMS,
    ...(hasHackathons ? ["hackathons"] : []),
    ...(hasTestimonials ? ["testimonials"] : []),
    ...(hasBlog ? ["blog"] : []),
    "contact",
  ];

  return (
    <>
      <nav
        className={`navbar${scrolled ? " scrolled" : ""}`}
        id="navbar"
        aria-label="Primary navigation"
      >
        <div className="nav-inner">
          <a href="#hero" className="nav-logo" aria-label={`${personal.name} — home`}>
            {initials}
          </a>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className={item === "contact" ? "nav-cta" : ""}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
          <button
            ref={menuButtonRef}
            type="button"
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            id="hamburger"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </nav>

      <nav
        ref={mobileMenuRef}
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        id="mobileMenu"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <ul>
          {navItems.map((item) => (
            <li key={item}>
              <a href={`#${item}`} onClick={closeMobileMenu}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
