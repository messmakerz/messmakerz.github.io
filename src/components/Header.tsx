"use client";

import { useEffect, useRef, useState } from "react";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const NAV_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/mess.production/" },
  { label: "SoundCloud", href: "https://soundcloud.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Contact", href: "mailto:mess@mishell.com" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 inset-x-0 z-[200] transition-all duration-500"
        style={{
          background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-14 lg:px-20 py-4 md:py-5">

          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <a href={`${base}/`} aria-label="MESS Production">
            <img
              src={`${base}/mess-small-logo.svg`}
              alt="MESS Production"
              style={{ width: "clamp(52px, 5vw, 76px)", height: "auto" }}
              draggable={false}
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-1 px-4 py-2 rounded-sm transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--text-subtle)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}
              >
                {link.label}
                <span style={{ fontSize: "0.55rem", opacity: 0.5 }}>↗</span>
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className="block h-px w-5 transition-all duration-300 origin-center"
              style={{
                background: "var(--text-subtle)",
                transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-px w-5 transition-all duration-300"
              style={{
                background: "var(--text-subtle)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-px w-5 transition-all duration-300 origin-center"
              style={{
                background: "var(--text-subtle)",
                transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className="fixed inset-0 z-[199] flex flex-col justify-center px-8 transition-all duration-400 md:hidden"
        style={{
          background: "var(--bg)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
        }}
      >
        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex items-center justify-between border-b border-[var(--border)] py-5"
              onClick={() => setMenuOpen(false)}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: "clamp(1.6rem, 6vw, 2.2rem)",
                  letterSpacing: "-0.02em",
                  color: "var(--text)",
                }}
              >
                {link.label}
              </span>
              <span style={{ color: "var(--text-subtle)", fontSize: "1rem" }}>↗</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
