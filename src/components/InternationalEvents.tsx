"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const internationalEvents = [
  {
    title: "MESS WEEKEND",
    dates: "January 22–25",
    location: "Gudauri, Georgia",
    artists: ["Club De Combat", "Mishell"],
    videoFile: "mess-weekend.mp4",
  },
];

function GlobePin() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {/* Globe circle */}
      <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.1" />
      {/* Latitude lines */}
      <ellipse cx="14" cy="14" rx="5.5" ry="11" stroke="currentColor" strokeWidth="1.1" />
      <line x1="3" y1="14" x2="25" y2="14" stroke="currentColor" strokeWidth="1.1" />
      <path d="M5.5 9h17M5.5 19h17" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      {/* Pin dot */}
      <circle cx="14" cy="7" r="2.2" fill="var(--red)" />
      <circle cx="14" cy="7" r="2.2" fill="var(--red)" opacity="0.4">
        <animate attributeName="r" values="2.2;4.5;2.2" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

interface EventCardProps {
  event: (typeof internationalEvents)[0];
  index: number;
}

function EventCard({ event, index }: EventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const st = { trigger: cardRef.current, start: "top 90%", toggleActions: "play reverse play reverse" };

    gsap.fromTo(mediaRef.current,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power3.out", scrollTrigger: st }
    );
    gsap.fromTo(infoRef.current,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.15, scrollTrigger: st }
    );
  }, []);

  // Autoplay on mobile when in view, pause when out of view on all
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(v);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="grid grid-cols-1 md:grid-cols-[3fr_2fr] border-t border-[var(--border)]"
    >
      {/* Video — landscape */}
      <div className="relative w-full" style={{ aspectRatio: "16/9", overflow: "hidden", contain: "paint" }}>
        <div ref={mediaRef} className="absolute inset-0" style={{ clipPath: "inset(0 0 100% 0)" }}>
          <video
            ref={videoRef}
            src={`${base}/videos/${event.videoFile}`}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            muted
            playsInline
            loop
            preload="metadata"
          />
          {/* Subtle vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.2) 0%, transparent 40%)" }}
          />
        </div>
      </div>

      {/* Info */}
      <div
        ref={infoRef}
        className="flex flex-col justify-between p-8 md:p-12 border-l-0 md:border-l border-[var(--border)]"
        style={{ opacity: 0 }}
      >
        {/* Index + globe */}
        <div className="flex items-center justify-between mb-8">
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.62rem",
              letterSpacing: "0.22em",
              color: "var(--text-subtle)",
            }}
          >
            0{index + 1}
          </span>
          <span style={{ color: "var(--text-subtle)" }}>
            <GlobePin />
          </span>
        </div>

        {/* Title */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "var(--text)",
              marginBottom: "0.4rem",
            }}
          >
            {event.title}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--red)",
              fontWeight: 500,
            }}
          >
            {event.dates}
          </p>
        </div>

        {/* Details */}
        <dl className="mt-10 space-y-3" style={{ fontFamily: "var(--font-display)" }}>
          {/* Location with mini globe marker */}
          <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-3">
            <dt style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
              Location
            </dt>
            <dd style={{ fontSize: "0.88rem", fontWeight: 300, color: "var(--text-muted)" }}>
              {event.location}
            </dd>
          </div>

          {/* Artists */}
          <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-3">
            <dt style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
              Artists
            </dt>
            <dd style={{ fontSize: "0.88rem", fontWeight: 300, color: "var(--text-muted)", textAlign: "right" }}>
              {event.artists.join(", ")}
            </dd>
          </div>
        </dl>

        {/* Location badge */}
        <div className="mt-8 flex items-center gap-2">
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--red)", display: "inline-block", flexShrink: 0 }} />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text-subtle)",
            }}
          >
            International
          </span>
        </div>
      </div>
    </div>
  );
}

export default function InternationalEvents() {
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(tagRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: tagRef.current, start: "top 95%" } }
    );
  }, []);

  return (
    <section className="py-4 md:py-8">
      <div className="px-6 md:px-14 lg:px-20">
        <div ref={tagRef} className="flex items-center gap-3 mb-0 pt-10 border-t border-[var(--border)]">
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "var(--text-subtle)" }}>05</span>
          <span style={{ fontSize: "0.62rem", color: "var(--border-strong)" }}>—</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-subtle)" }}>International</span>
        </div>
      </div>

      <div className="mt-12 px-6 md:px-14 lg:px-20">
        {internationalEvents.map((event, i) => (
          <EventCard key={event.title} event={event} index={i} />
        ))}
      </div>
    </section>
  );
}
