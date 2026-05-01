"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MapBackground = dynamic(() => import("./MapBackground"), { ssr: false });

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const internationalEvents = [
  {
    title: "MESS WEEKEND",
    dates: "January 22–25",
    location: "Gudauri, Georgia",
    artists: ["Club De Combat", "Mishell"],
    videoFile: "mess-weekend.mp4",
    lat: 42.4819,
    lng: 44.4725,
    zoom: 10,
  },
];

function GlobePin() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.1" />
      <ellipse cx="14" cy="14" rx="5.5" ry="11" stroke="currentColor" strokeWidth="1.1" />
      <line x1="3" y1="14" x2="25" y2="14" stroke="currentColor" strokeWidth="1.1" />
      <path d="M5.5 9h17M5.5 19h17" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const st = { trigger: cardRef.current, start: "top 88%", toggleActions: "play reverse play reverse" };
    gsap.fromTo(infoRef.current,
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: st }
    );
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out", scrollTrigger: st }
    );
  }, []);

  // Autoplay when in view
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 }
    );
    observer.observe(v);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative border-t border-[var(--border)]"
      style={{ minHeight: "480px" }}
    >
      {/* ── Map background ── */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <MapBackground lat={event.lat} lng={event.lng} zoom={event.zoom} />
      </div>

      {/* ── Dark gradient overlay ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          opacity: 0,
          background: "linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.2) 100%)",
        }}
      />

      {/* ── Video strip — right side ── */}
      <div
        className="absolute right-0 top-0 bottom-0 hidden md:block"
        style={{ width: "42%", zIndex: 2, overflow: "hidden", contain: "paint" }}
      >
        <video
          ref={videoRef}
          src={`${base}/videos/${event.videoFile}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }}
          muted
          playsInline
          loop
          preload="metadata"
        />
        {/* Fade left edge into the map */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(10,10,10,0.9) 0%, transparent 40%)" }}
        />
      </div>

      {/* ── Event info ── */}
      <div
        ref={infoRef}
        className="relative p-8 md:p-14 lg:p-20 flex flex-col justify-between"
        style={{ zIndex: 3, minHeight: "480px", opacity: 0, maxWidth: "62%" }}
      >
        {/* Top */}
        <div className="flex items-center justify-between">
          <span style={{
            fontFamily: "var(--font-display)", fontSize: "0.62rem",
            letterSpacing: "0.22em", color: "rgba(255,255,255,0.35)",
          }}>
            0{index + 1}
          </span>
          <span style={{ color: "rgba(255,255,255,0.4)" }}><GlobePin /></span>
        </div>

        {/* Center — title */}
        <div>
          <p style={{
            fontFamily: "var(--font-display)", fontSize: "0.72rem",
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "var(--red)", fontWeight: 500, marginBottom: "0.75rem",
          }}>
            {event.dates}
          </p>
          <h3 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(2rem, 4.5vw, 4rem)", letterSpacing: "-0.04em",
            lineHeight: 0.95, color: "#fff",
          }}>
            {event.title}
          </h3>
        </div>

        {/* Bottom — details */}
        <dl style={{ fontFamily: "var(--font-display)" }}>
          <div style={{
            display: "flex", alignItems: "baseline", justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.75rem", marginBottom: "0.75rem",
          }}>
            <dt style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Location</dt>
            <dd style={{ fontSize: "0.88rem", fontWeight: 300, color: "rgba(255,255,255,0.75)" }}>{event.location}</dd>
          </div>
          <div style={{
            display: "flex", alignItems: "baseline", justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.75rem",
          }}>
            <dt style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Artists</dt>
            <dd style={{ fontSize: "0.88rem", fontWeight: 300, color: "rgba(255,255,255,0.75)" }}>{event.artists.join(", ")}</dd>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--red)", display: "inline-block" }} />
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
              International
            </span>
          </div>
        </dl>
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
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "var(--text-subtle)" }}>06</span>
          <span style={{ fontSize: "0.62rem", color: "var(--border-strong)" }}>—</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-subtle)" }}>International</span>
        </div>
      </div>

      <div className="mt-12">
        {internationalEvents.map((event, i) => (
          <EventCard key={event.title} event={event} index={i} />
        ))}
      </div>
    </section>
  );
}
