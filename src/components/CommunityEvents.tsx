"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

function ArrowUpRight() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M1.5 7.5L7.5 1.5M7.5 1.5H2.5M7.5 1.5V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

gsap.registerPlugin(ScrollTrigger);

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const communityEvents = [
  {
    title: "MESSY SESSIONS",
    date: "5 sessions / year",
    tickets: "100 each",
    booking: "Jenia Tarso",
    type: "video" as const,
    video: `${base}/videos/messy-sessions.mp4`,
    slug: null,
  },
  {
    title: "MESS GALA",
    date: "May 2025",
    tickets: "150",
    booking: "O.I, N.O.Y",
    type: "video" as const,
    video: `${base}/videos/mess-gala.mp4`,
    slug: "mess-gala",
  },
  {
    title: "MESS BAKERY RAVE",
    date: "Sep 2025",
    tickets: "200",
    booking: "Mishell",
    type: "video" as const,
    video: `${base}/videos/mess-roldain.mp4`,
    slug: null,
  },
];

// ─── Video lightbox ────────────────────────────────────────────────────────────
interface VideoLightboxProps {
  src: string;
  title: string;
  onClose: () => void;
}

function VideoLightbox({ src, title, onClose }: VideoLightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    videoRef.current?.play().catch(() => {});
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => {
    videoRef.current?.pause();
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, onComplete: onClose });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] bg-black/95 flex flex-col items-center justify-center p-4"
      onClick={close}
    >
      <div className="w-full max-w-sm relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={close}
          className="absolute -top-10 right-0 text-white/50 hover:text-white transition-colors text-xs tracking-widest uppercase"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="flex items-center gap-1.5">ESC / CLOSE <CloseIcon /></span>
        </button>
        <video
          ref={videoRef}
          src={src}
          className="w-full rounded-sm"
          controls
          playsInline
          style={{ maxHeight: "85vh", objectFit: "contain" }}
        />
        <p
          className="mt-3 text-center"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          {title}
        </p>
      </div>
    </div>
  );
}

// ─── Video card media ──────────────────────────────────────────────────────────
function VideoMedia({ src }: { src: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);

  // Desktop: hover to play/pause
  const handleMouseEnter = () => {
    const v = previewRef.current;
    if (v) { v.currentTime = 0; v.play().catch(() => {}); }
  };
  const handleMouseLeave = () => {
    const v = previewRef.current;
    if (v) { v.pause(); v.currentTime = 0; }
  };

  // Mobile: autoplay when >50% visible
  useEffect(() => {
    const el = wrapRef.current;
    const v = previewRef.current;
    if (!el || !v) return;

    const isMobile = () => window.matchMedia("(hover: none)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!isMobile()) return;
        const entry = entries[0];
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full"
      style={{ aspectRatio: "3/4", overflow: "hidden", transform: "translateZ(0)" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={previewRef}
        src={src}
        className="grayscale group-hover:grayscale-0 transition-[filter] duration-500"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        muted
        playsInline
        loop
        preload="metadata"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
      {/* Play icon — desktop only */}
      <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
        <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center opacity-80 group-hover:opacity-0 transition-opacity duration-300">
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
            <path d="M5 3l10 6-10 6V3z" fill="rgba(255,255,255,0.8)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function CommunityEvents({ sectionNumber = "06", showDetails = false }: { sectionNumber?: string; showDetails?: boolean }) {
  const tagRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    document.body.style.overflow = activeVideo ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeVideo]);

  useEffect(() => {
    gsap.fromTo(tagRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: tagRef.current, start: "top 95%", toggleActions: "play none none none" } }
    );

    const cards = gridRef.current?.querySelectorAll(".com-card");
    if (cards) {
      gsap.fromTo(cards,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 95%", toggleActions: "play none none none" },
        }
      );
    }
  }, []);

  return (
    <>
      <section className="px-6 md:px-14 lg:px-20 py-4 md:py-8">
        <div ref={tagRef} className="flex items-center gap-3 mb-14 pt-10 border-t border-[var(--border)]">
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "var(--text-subtle)" }}>{sectionNumber}</span>
          <span style={{ fontSize: "0.62rem", color: "var(--border-strong)" }}>—</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-subtle)" }}>Community Events</span>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
          {communityEvents.map((event, i) => {
            const cardInner = (
              <article
                key={event.title}
                className={`com-card group overflow-hidden${event.type === "video" ? " cursor-none" : event.slug ? " cursor-none" : ""}`}
                style={{ background: "var(--bg)" }}
                onClick={() => {
                  if (event.type === "video" && !event.slug) {
                    setActiveVideo({ src: event.video, title: event.title });
                  }
                }}
              >
                {/* Media */}
                <VideoMedia src={event.video} />

                {/* Info */}
                <div className="p-6 md:p-8 border-t border-[var(--border)]" style={{ fontFamily: "var(--font-display)" }}>
                  <span style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-subtle)", display: "block", marginBottom: "0.6rem" }}>
                    0{i + 1}
                  </span>
                  <h3 style={{ fontWeight: 700, fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)", letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "1rem" }}>
                    {event.title}
                  </h3>
                  <div className="space-y-1.5">
                    <p style={{ fontSize: "0.75rem", color: "var(--text-subtle)" }}>{event.date}</p>
                    {showDetails && (
                    <p style={{ fontSize: "0.75rem", color: "var(--text-subtle)" }}>
                      {event.tickets} tickets · {event.booking}
                    </p>
                    )}
                  </div>
                  {event.slug && (
                    <span
                      className="mt-6 inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                      style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-subtle)" }}
                    >
                      <span className="flex items-center gap-1.5">View photos <ArrowUpRight /></span>
                    </span>
                  )}
                </div>
              </article>
            );

            return event.slug ? (
              <Link key={event.title} href={`/gallery/${event.slug}`} className="block">
                {cardInner}
              </Link>
            ) : (
              <div key={event.title}>{cardInner}</div>
            );
          })}
        </div>
      </section>

      {activeVideo && (
        <VideoLightbox
          src={activeVideo.src}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  );
}
