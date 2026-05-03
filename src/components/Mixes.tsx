"use client";

import { useEffect, useRef, useState } from "react";
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

function buildEmbedUrl(trackUrl: string, autoPlay: boolean) {
  const encoded = encodeURIComponent(trackUrl);
  return `https://w.soundcloud.com/player/?url=${encoded}&color=%23DD3235&auto_play=${autoPlay}&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;
}

export default function Mixes() {
  const tagRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [iframeKey, setIframeKey] = useState(0);
  const [embedUrl, setEmbedUrl] = useState(
    buildEmbedUrl("https://soundcloud.com/messmakerz", false)
  );

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

  const handleSelectMix = (index: number, url: string) => {
    setActiveIndex(index);
    setEmbedUrl(buildEmbedUrl(url, true));
    setIframeKey(k => k + 1);
  };

  return (
    <section className="px-6 md:px-14 lg:px-20 py-4 md:py-8">

      {/* Section tag */}
      <div ref={tagRef} className="flex items-center gap-3 pt-10 mb-12 border-t border-[var(--border)]">
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "var(--text-subtle)" }}>02</span>
        <span style={{ fontSize: "0.62rem", color: "var(--border-strong)" }}>—</span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-subtle)" }}>Mixes</span>
      </div>

      {/* SC Player */}
      <div className="mb-12" style={{ borderRadius: 0, overflow: "hidden" }}>
        <iframe
          key={iframeKey}
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={embedUrl}
          style={{ display: "block" }}
        />
      </div>

      {/* Track list */}
      <div ref={listRef} className="space-y-0">
        {mixes.map((mix, i) => {
          const isActive = activeIndex === i;
          return (
            <button
              key={mix.title}
              data-mix
              onClick={() => handleSelectMix(i, mix.url)}
              className="w-full flex items-center justify-between py-4 border-b border-[var(--border)] group text-left"
              style={{ background: "none", border: "none", borderBottom: "1px solid var(--border)", cursor: "pointer", padding: "1rem 0" }}
            >
              <div className="flex items-center gap-4">
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.18em",
                  color: isActive ? "var(--red)" : "var(--text-subtle)",
                  minWidth: "1.5rem",
                  transition: "color 0.2s",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
                  fontWeight: isActive ? 500 : 300,
                  color: isActive ? "var(--text)" : "var(--text)",
                  letterSpacing: "0.01em",
                  transition: "color 0.2s",
                }}
                className={isActive ? "" : "group-hover:text-[var(--red)]"}
                >
                  {mix.title}
                </span>
              </div>

              {/* Active: pulsing bars / Inactive: play icon on hover */}
              {isActive ? (
                <PlayingBars />
              ) : (
                <svg
                  width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
                  style={{ color: "var(--red)" }}
                >
                  <path d="M3 1L13 7L3 13V1Z" fill="currentColor"/>
                </svg>
              )}
            </button>
          );
        })}
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

/* Animated playing indicator — 3 bars bouncing */
function PlayingBars() {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "2px",
        height: "14px",
        flexShrink: 0,
      }}
    >
      {[0, 1, 2].map((j) => (
        <span
          key={j}
          style={{
            display: "block",
            width: "3px",
            background: "var(--red)",
            borderRadius: "1px",
            animation: `mixBar 0.9s ease-in-out ${j * 0.15}s infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes mixBar {
          from { height: 4px; }
          to   { height: 14px; }
        }
      `}</style>
    </span>
  );
}
