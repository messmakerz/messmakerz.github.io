"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { EventData } from "@/lib/events";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

function ArrowLeft() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M13 5H1M1 5l4-4M1 5l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M1 5h12M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
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

interface LightboxProps {
  event: EventData;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ event, index, onClose, onPrev, onNext }: LightboxProps) {
  const photo = event.photos[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black/95 flex flex-col"
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 md:px-10 py-5 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          {event.title} — {String(index + 1).padStart(2, "0")} / {String(event.photos.length).padStart(2, "0")}
        </span>
        <button
          onClick={onClose}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
          }}
          className="hover:text-white transition-colors"
        >
          <span className="flex items-center gap-1.5">ESC / CLOSE <CloseIcon /></span>
        </button>
      </div>

      {/* Image */}
      <div className="flex-1 relative flex items-center justify-center px-4 md:px-16 pb-20" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full h-full max-w-6xl">
          <Image
            src={`${base}/events/${event.slug}/${photo}.jpg`}
            alt={`${event.title} — ${photo}`}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Bottom nav */}
      <div
        className="absolute bottom-0 inset-x-0 flex items-center justify-between px-6 md:px-10 py-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onPrev}
          disabled={index === 0}
          className="disabled:opacity-20 transition-opacity"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <span className="flex items-center gap-2"><ArrowLeft /> PREV</span>
        </button>

        {/* Dot strip */}
        <div className="hidden md:flex items-center gap-1 flex-wrap justify-center max-w-xs">
          {event.photos.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                /* handled by parent through index */
              }}
              className="w-1 h-1 rounded-full transition-all duration-200"
              style={{ background: i === index ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)" }}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          disabled={index === event.photos.length - 1}
          className="disabled:opacity-20 transition-opacity"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <span className="flex items-center gap-2">NEXT <ArrowRight /></span>
        </button>
      </div>
    </div>
  );
}

interface Props {
  event: EventData;
}

export default function EventGalleryClient({ event }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const nextPhoto = useCallback(() =>
    setLightboxIndex((i) => (i !== null && i < event.photos.length - 1 ? i + 1 : i)),
  [event.photos.length]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <main className="min-h-[100dvh]" style={{ background: "var(--bg)" }}>
      {/* Top bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-14 lg:px-20 py-5 border-b border-[var(--border)]" style={{ background: "var(--bg)" }}>
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${base}/mess-small-logo.svg`}
            alt="MESS Production"
            style={{ width: "clamp(44px, 4vw, 60px)", height: "auto" }}
            draggable={false}
          />
        </Link>

        <Link
          href="/gallery"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.6rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
          }}
          className="hover:text-[var(--text)] transition-colors"
        >
          <span className="flex items-center gap-2"><ArrowLeft /> All Events</span>
        </Link>
      </div>

      {/* Event header */}
      <div className="px-6 md:px-14 lg:px-20 pt-12 pb-10 border-b border-[var(--border)]">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                color: "var(--text-subtle)",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              {event.date}
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(2rem, 6vw, 5.5rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                color: "var(--text)",
              }}
            >
              {event.title}
            </h1>
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text-subtle)",
            }}
          >
            {event.photos.length} photos
          </span>
        </div>
      </div>

      {/* Photo grid */}
      <div className="px-6 md:px-14 lg:px-20 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-1.5">
          {event.photos.map((file, i) => (
            <button
              key={file}
              className="relative overflow-hidden group cursor-none bg-[var(--card-bg)] focus:outline-none"
              style={{ aspectRatio: "3/2" }}
              onClick={() => openLightbox(i)}
            >
              <Image
                src={`${base}/events/${event.slug}/${file}.jpg`}
                alt={`${event.title} — ${String(i + 1).padStart(2, "0")}`}
                fill
                className="object-cover transition-[filter,transform] duration-500 grayscale group-hover:grayscale-0 group-hover:scale-[1.04]"
                style={{ objectPosition: "50% 30%" }}
              />
              {/* Dark veil */}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/0 transition-colors duration-400 pointer-events-none" />
              {/* Number on hover */}
              <span
                className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer strip */}
      <div className="border-t border-[var(--border)] px-6 md:px-14 lg:px-20 py-5 flex items-center justify-between">
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
          © 2026 MESS Production
        </span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
          Tel Aviv, Israel
        </span>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          event={event}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </main>
  );
}
