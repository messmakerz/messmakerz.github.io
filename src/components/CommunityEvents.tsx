"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const communityEvents = [
  { title: "MESSY SESSIONS", date: "5 sessions / year", tickets: "100 each", booking: "Jenia Tarso" },
  { title: "MESS GALA", date: "May 2025", tickets: "150", booking: "O.I, N.O.Y" },
  { title: "MESS BAKERY RAVE", date: "Sep 2025", tickets: "200", booking: "Mishell" },
];

export default function CommunityEvents() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(tagRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: tagRef.current, start: "top 95%", toggleActions: "play reverse play reverse" } }
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
          scrollTrigger: { trigger: gridRef.current, start: "top 95%", toggleActions: "play reverse play reverse" },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="px-6 md:px-14 lg:px-20 py-4 md:py-8">
      <div ref={tagRef} className="flex items-center gap-3 mb-14 pt-10 border-t border-[var(--border)]">
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "var(--text-subtle)" }}>05</span>
        <span style={{ fontSize: "0.62rem", color: "var(--border-strong)" }}>—</span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-subtle)" }}>Community Events</span>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
        {communityEvents.map((event, i) => (
          <article
            key={event.title}
            className="com-card group overflow-hidden"
            style={{ background: "var(--bg)" }}
          >
            {/* Image */}
            <div className="relative overflow-hidden w-full" style={{ aspectRatio: "3/4" }}>
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/mishell.jpg`}
                alt={event.title}
                fill
                className="object-cover object-top grayscale group-hover:grayscale-0"
                style={{ objectPosition: `${20 + i * 20}% top`, transition: "transform 0.7s ease, filter 0.7s ease" }}
              />
            </div>

            {/* Info */}
            <div className="p-6 md:p-8 border-t border-[var(--border)]" style={{ fontFamily: "var(--font-display)" }}>
              <span style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-subtle)", display: "block", marginBottom: "0.6rem" }}>
                0{i + 1}
              </span>
              <h3 style={{ fontWeight: 300, fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)", letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "1rem" }}>
                {event.title}
              </h3>
              <div className="space-y-1.5">
                <p style={{ fontSize: "0.75rem", color: "var(--text-subtle)" }}>{event.date}</p>
                <p style={{ fontSize: "0.75rem", color: "var(--text-subtle)" }}>
                  {event.tickets} tickets · {event.booking}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
