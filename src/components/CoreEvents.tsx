"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

function ArrowUpRight() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M1.5 7.5L7.5 1.5M7.5 1.5H2.5M7.5 1.5V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

gsap.registerPlugin(ScrollTrigger);

const coreEvents = [
  { title: "MESS PLANET", date: "December 2024", tickets: "600", booking: "Mita Gami", slug: "mess-planet", coverPhoto: "PLANET01", coverSlug: "mess-planet" },
  { title: "LIVE FROM HELL", date: "March 2025", tickets: "1,000", booking: "Omri, Garden City Movement", slug: "live-from-hell", coverPhoto: "HELL_COVER", coverSlug: "live-from-hell" },
  { title: "A TRIBE CALLED MESS", date: "Aug 2025", tickets: "800", booking: "Darco Genish", slug: "tribe-called-mess", coverPhoto: "TRIBE_COVER", coverSlug: "tribe-called-mess" },
  { title: "MESS JUNGLE TRIP", date: "Oct 2025", tickets: "1,200", booking: "Cour T, Kino Todo", slug: "mess-jungle-trip", coverPhoto: "JUNGLE_COVER", coverSlug: "mess-jungle-trip" },
];

interface EventRowProps {
  event: (typeof coreEvents)[0];
  index: number;
  flip: boolean;
}

function EventRow({ event, index, flip }: EventRowProps) {
  const rowRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const st = { trigger: rowRef.current, start: "top 95%", toggleActions: "play reverse play reverse" };

    gsap.fromTo(imgRef.current,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "power3.out", scrollTrigger: st }
    );
    gsap.fromTo(infoRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { ...st, start: "top 92%" } }
    );

    // Parallax: inner image drifts as you scroll past
    const innerImg = imgRef.current?.querySelector("img");
    if (innerImg) {
      gsap.fromTo(
        innerImg,
        { y: "-8%" },
        {
          y: "8%",
          ease: "none",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    }

    // Hover scale
    const onEnter = () => innerImg && gsap.to(innerImg, { scale: 1.04, duration: 0.6, ease: "power2.out" });
    const onLeave = () => innerImg && gsap.to(innerImg, { scale: 1, duration: 0.8, ease: "power2.out" });
    rowRef.current?.addEventListener("mouseenter", onEnter);
    rowRef.current?.addEventListener("mouseleave", onLeave);
    return () => {
      rowRef.current?.removeEventListener("mouseenter", onEnter);
      rowRef.current?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const inner = (
    <article
      ref={rowRef}
      className={`grid grid-cols-1 md:grid-cols-2 border-t border-[var(--border)] overflow-hidden${event.slug ? " group cursor-none" : ""}`}
      style={{ direction: flip ? "rtl" : "ltr" }}
    >
      {/* Image */}
      <div
        ref={imgRef}
        className="relative overflow-hidden w-full"
        style={{ aspectRatio: "4/3", direction: "ltr", clipPath: "inset(0 0 100% 0)" }}
      >
        <Image
          src={
            event.coverPhoto && event.coverSlug
              ? `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/events/${event.coverSlug}/${event.coverPhoto}.jpg`
              : `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/mishell.jpg`
          }
          alt={event.title}
          fill
          className="object-cover"
          style={{ objectPosition: "50% 25%", transform: "scale(1)" }}
        />
        {/* Hover overlay — click to see gallery */}
        {event.slug && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-400 flex items-center justify-center pointer-events-none">
            <span
              className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "0.6em 1.2em",
              }}
            >
              Click to see more
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div
        ref={infoRef}
        className="flex flex-col justify-between p-8 md:p-12 lg:p-16"
        style={{ direction: "ltr" }}
      >
        <div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.62rem",
              letterSpacing: "0.22em",
              color: "var(--text-subtle)",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            0{index + 1}
          </span>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--text)",
            }}
          >
            {event.title}
          </h3>
        </div>

        <dl
          className="mt-10 md:mt-0 space-y-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {[
            { label: "Date", value: event.date },
            { label: "Tickets sold", value: event.tickets },
            { label: "Artists", value: event.booking },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-baseline justify-between border-b border-[var(--border)] pb-3">
              <dt style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-subtle)" }}>{label}</dt>
              <dd style={{ fontSize: "0.9rem", fontWeight: 300, color: "var(--text-muted)" }}>{value}</dd>
            </div>
          ))}
        </dl>

        {event.slug && (
          <span
            className="mt-8 self-start translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.62rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text-subtle)",
            }}
          >
            <span className="flex items-center gap-1.5">View photos <ArrowUpRight /></span>
          </span>
        )}
      </div>
    </article>
  );

  return event.slug ? (
    <Link href={`/gallery/${event.slug}`} className="block">
      {inner}
    </Link>
  ) : inner;
}

export default function CoreEvents() {
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
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "var(--text-subtle)" }}>04</span>
          <span style={{ fontSize: "0.62rem", color: "var(--border-strong)" }}>—</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-subtle)" }}>Core Events</span>
        </div>
      </div>

      <div className="mt-12">
        {coreEvents.map((event, i) => (
          <EventRow key={event.title} event={event} index={i} flip={i % 2 !== 0} />
        ))}
      </div>
    </section>
  );
}
