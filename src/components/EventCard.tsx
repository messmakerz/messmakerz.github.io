"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface EventCardProps {
  title: string;
  date: string;
  tickets: string;
  booking: string;
  index: number;
}

export default function EventCard({ title, date, tickets, booking, index }: EventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const onEnter = () => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    const titleEl = titleRef.current;
    if (!card || !overlay || !titleEl) return;

    // Brutal scale punch + skew snap
    gsap.to(card, { scale: 1.02, skewY: -1, duration: 0.18, ease: "power3.out" });
    gsap.to(overlay, { scaleY: 1, duration: 0.3, ease: "power3.out" });
    gsap.to(titleEl, { x: 6, color: "var(--red)", duration: 0.18, ease: "power2.out" });
  };

  const onLeave = () => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    const titleEl = titleRef.current;
    if (!card || !overlay || !titleEl) return;

    gsap.to(card, { scale: 1, skewY: 0, duration: 0.35, ease: "elastic.out(1, 0.5)" });
    gsap.to(overlay, { scaleY: 0, duration: 0.25, ease: "power3.in" });
    gsap.to(titleEl, { x: 0, color: "var(--red)", duration: 0.25, ease: "power2.out" });
  };

  return (
    <div
      ref={cardRef}
      data-no-hover
      className="group relative flex flex-col gap-4 event-card"
      style={{ transformOrigin: "center center", willChange: "transform" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Image */}
      <div ref={imgWrapRef} className="relative overflow-hidden aspect-[4/3] bg-[var(--card-bg)]">
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-[var(--red)] origin-bottom"
          style={{ zIndex: 1, transform: "scaleY(0)" }}
        />
        <div className="absolute inset-0 z-2 flex items-end p-5" style={{ zIndex: 2 }}>
          <span
            className="text-white text-lg font-bold tracking-tight opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200"
            style={{ fontFamily: "var(--font-display)" }}
          >
            View Event →
          </span>
        </div>
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <Image
            src="/mishell.jpg"
            alt={title}
            fill
            className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-400"
            style={{ objectPosition: `${30 + index * 15}% top` }}
          />
        </div>
      </div>

      {/* Info */}
      <div style={{ fontFamily: "var(--font-display)" }}>
        <h4
          ref={titleRef}
          className="text-[var(--red)] font-bold text-2xl md:text-3xl leading-tight"
          style={{ fontWeight: 700 }}
        >
          {title}
        </h4>
        <div className="mt-3 space-y-1">
          <p className="text-sm font-light text-[var(--text-muted)]">{date}</p>
          <p className="text-sm font-light text-[var(--text-muted)]">
            Tickets sold: <span className="font-normal text-[var(--text)]">{tickets}</span>
          </p>
          <p className="text-sm font-light text-[var(--text-muted)]">
            Booking: <span className="font-normal text-[var(--text)]">{booking}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
