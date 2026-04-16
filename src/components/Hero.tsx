"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const redBarRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [logoRef.current, redBarRef.current, line1Ref.current, line2Ref.current, line3Ref.current, metaRef.current];
    gsap.killTweensOf(els);

    // Hard brutal entrance — skew snap, not smooth fade
    gsap.set(line1Ref.current, { x: -120, skewX: -12, opacity: 0 });
    gsap.set(line2Ref.current, { x: 120, skewX: 12, opacity: 0 });
    gsap.set(line3Ref.current, { x: -80, skewX: -8, opacity: 0 });
    gsap.set([logoRef.current, metaRef.current], { opacity: 0 });
    gsap.set(redBarRef.current, { scaleX: 0, transformOrigin: "left center" });

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl
      .to(logoRef.current, { opacity: 1, duration: 0.4 }, 0)
      .to(redBarRef.current, { scaleX: 1, duration: 0.4, ease: "power4.out" }, 0.15)
      // Lines slam in hard, skew snaps to 0
      .to(line1Ref.current, { x: 0, skewX: 0, opacity: 1, duration: 0.55 }, 0.25)
      .to(line2Ref.current, { x: 0, skewX: 0, opacity: 1, duration: 0.55 }, 0.35)
      .to(line3Ref.current, { x: 0, skewX: 0, opacity: 1, duration: 0.55 }, 0.45)
      .to(metaRef.current, { opacity: 1, duration: 0.4 }, 0.7);

    // Random glitch bursts on lines — fire irregularly
    const glitchLine = (el: HTMLDivElement | null) => {
      if (!el) return;
      const fire = () => {
        gsap.to(el, {
          x: (Math.random() - 0.5) * 14,
          skewX: (Math.random() - 0.5) * 6,
          duration: 0.06,
          ease: "none",
          onComplete: () => gsap.to(el, { x: 0, skewX: 0, duration: 0.12, ease: "power2.out" }),
        });
        setTimeout(fire, 2500 + Math.random() * 5000);
      };
      setTimeout(fire, 1500 + Math.random() * 2000);
    };
    glitchLine(line1Ref.current);
    glitchLine(line2Ref.current);
    glitchLine(line3Ref.current);

    // Mouse parallax — different speeds per line, kinetic
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const dx = (e.clientX - rect.left) / rect.width - 0.5;
      [line1Ref.current, line2Ref.current, line3Ref.current].forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          x: dx * (10 + i * 8),
          skewX: dx * (1.5 + i * 0.5),
          duration: 0.3,
          ease: "power2.out",
        });
      });
    };
    const onLeave = () => {
      [line1Ref.current, line2Ref.current, line3Ref.current].forEach((el) => {
        if (!el) return;
        gsap.to(el, { x: 0, skewX: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
      });
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[40vh] md:min-h-screen flex flex-col border-b border-[var(--border)] overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        style={{ opacity: 0.18 }}
        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/hero-bg.mp4`}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
          opacity: 0.055,
        }}
      />

      {/* Diagonal red slash — punk gash across the bg */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: "-10%",
          right: "-5%",
          width: "55%",
          height: "130%",
          background: "var(--red)",
          clipPath: "polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 0.04,
        }}
      />

      {/* TOP BAR */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-16 lg:px-20 pt-6 md:pt-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={logoRef}
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/mess-small-logo.svg`}
          alt="MESS Production"
          style={{ width: "clamp(80px, 10vw, 130px)", height: "auto" }}
          draggable={false}
        />
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)] animate-pulse" />
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.6rem",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
          }}>Tel Aviv, Israel</span>
        </div>
      </div>

      {/* MAIN display type */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-20 py-4 md:py-8">

        {/* Red rule — full bleed, hard */}
        <div
          ref={redBarRef}
          className="mb-5"
          style={{ height: "3px", background: "var(--red)" }}
        />

        {/* CONCEPT */}
        <div
          ref={line1Ref}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(2.6rem, 13vw, 11rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.06em",
            color: "var(--text)",
            userSelect: "none",
          }}
        >
          CONCEPT
        </div>

        {/* DRIVEN — offset, red, outlined */}
        <div
          ref={line2Ref}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(2.6rem, 13vw, 11rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.06em",
            color: "transparent",
            WebkitTextStroke: "2px var(--red)",
            userSelect: "none",
            paddingLeft: "clamp(0.8rem, 5vw, 7rem)",
          }}
        >
          DRIVEN
        </div>

        {/* EVENTS */}
        <div
          ref={line3Ref}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(2.6rem, 13vw, 11rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.06em",
            color: "var(--text)",
            userSelect: "none",
          }}
        >
          EVENTS
        </div>

      </div>

      {/* MARQUEE TICKER — punk raw scrolling strip */}
      <div
        className="relative z-10 border-t border-b border-[var(--border)] overflow-hidden"
        style={{ borderColor: "var(--red)", borderWidth: "1px 0" }}
      >
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "marquee 18s linear infinite",
            padding: "10px 0",
          }}
        >
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "0.68rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--text-subtle)",
                paddingRight: "3rem",
              }}
            >
              MESS PRODUCTION · TEL AVIV · CONCEPT DRIVEN EVENTS · BOLD, SEXY, UNCOMPROMISING ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div
        ref={metaRef}
        className="relative z-10 px-8 md:px-16 lg:px-20 py-5 flex items-center justify-end"
      >
        <div className="flex items-center gap-3">
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.58rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
          }}>Scroll</span>
          <div style={{ width: "2.5rem", height: "1px", background: "var(--border-strong)" }} />
          <div className="w-1 h-1 rounded-full bg-[var(--red)]" />
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
