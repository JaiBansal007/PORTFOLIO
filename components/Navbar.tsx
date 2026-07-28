"use client";
import { useEffect, useState } from "react";
import type { Personal } from "@/types/portfolio";

const NAV_ITEMS = ["about", "skills", "projects", "experience", "blog", "contact"];

export default function Navbar({ personal }: { personal: Personal }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = personal.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const closeMobileMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`} id="navbar">
        <div className="nav-inner">
          <a href="#hero" className="nav-logo">{initials}</a>
          <ul className="nav-links">
            {NAV_ITEMS.map((item) => (
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
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
            id="hamburger"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`} id="mobileMenu">
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <a href={`#${item}`} onClick={closeMobileMenu}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
