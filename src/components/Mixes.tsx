"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mixes = [
  { title: "MESSLIST 003: Jackie", url: "https://soundcloud.com/messmakerz/messlist-003-jackie" },
  { title: "Nevos @ Mess Weekend 23.01.26", url: "https://soundcloud.com/messmakerz/nevos-mess-weekend-230126" },
  { title: "Messy Sessions #10 - Dor Danino", url: "https://soundcloud.com/messmakerz/messy-sessions-10-dor-danino" },
  { title: "MESSLIST 002: Toni B", url: "https://soundcloud.com/messmakerz/messlist-002-toni-b" },
  { title: "MESSLIST 001: Yuvèe", url: "https://soundcloud.com/messmakerz/messlist-001-yuvee" },
  { title: "Messy Sessions #8 - Mishell", url: "https://soundcloud.com/messmakerz/messy-sessions-8-mishell" },
];

export default function Mixes() {
  const tagRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(tagRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: tagRef.current, start: "top 95%" } }
    );
    const items = listRef.current?.querySelectorAll("[data-mix]");
    if (items) {
      gsap.fromTo(items,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.07,
          scrollTrigger: { trigger: listRef.current, start: "top 90%" } }
      );
    }
  }, []);

  return (
    <section className="px-6 md:px-14 lg:px-20 py-4 md:py-8">

      {/* Section tag */}
      <div ref={tagRef} className="flex items-center gap-3 pt-10 mb-12 border-t border-[var(--border)]">
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "var(--text-subtle)" }}>02</span>
        <span style={{ fontSize: "0.62rem", color: "var(--border-strong)" }}>—</span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-subtle)" }}>Mixes</span>
      </div>

      {/* SC Player - full profile */}
      <div className="mb-12" style={{ borderRadius: 0, overflow: "hidden" }}>
        <iframe
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/messmakerz&color=%23DD3235&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
          style={{ display: "block" }}
        />
      </div>

      {/* Track list */}
      <div ref={listRef} className="space-y-0">
        {mixes.map((mix, i) => (
          <a
            key={mix.title}
            data-mix
            href={mix.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-4 border-b border-[var(--border)] group"
            style={{ textDecoration: "none" }}
          >
            <div className="flex items-center gap-4">
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                color: "var(--text-subtle)",
                minWidth: "1.5rem",
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
                fontWeight: 300,
                color: "var(--text)",
                letterSpacing: "0.01em",
                transition: "color 0.2s",
              }}
              className="group-hover:text-[var(--red)]"
              >
                {mix.title}
              </span>
            </div>
            <svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
              style={{ color: "var(--red)" }}
            >
              <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        ))}
      </div>

      {/* Link to full profile */}
      <div className="mt-8">
        <a
          href="https://soundcloud.com/messmakerz"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            transition: "color 0.2s",
          }}
          className="hover:text-[var(--text)]"
        >
          All tracks on SoundCloud
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
            <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
