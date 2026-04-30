"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const metaRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [metaRef.current, line1Ref.current, line2Ref.current];
    gsap.killTweensOf(els);
    gsap.set(els, { opacity: 0 });
    gsap.set([line1Ref.current, line2Ref.current], { y: 28 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl
      .to(line1Ref.current, { opacity: 1, y: 0, duration: 1.1 }, 0.35)
      .to(line2Ref.current, { opacity: 1, y: 0, duration: 1.1 }, 0.5)
      .to(metaRef.current, { opacity: 1, duration: 0.8 }, 0.55);
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Video bg — very subtle, texture only */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.25 }}
        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/hero-bg.mp4`}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Gradient overlay — fade edges into bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg) 0%, transparent 20%, transparent 55%, var(--bg) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-14 lg:px-20 pt-28 md:pt-36 pb-14 md:pb-20">

        {/* Meta row */}
        <div ref={metaRef} className="flex items-center justify-between mb-5 md:mb-7">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)] animate-pulse" />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text-subtle)",
              }}
            >
              Since 2022
            </span>
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-subtle)",
            }}
          >
            Scroll ↓
          </span>
        </div>

        {/* Display type — editorial weight */}
        <div
          ref={line1Ref}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(3rem, 9.5vw, 10.5rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.04em",
            color: "var(--text)",
          }}
        >
          CONCEPT-DRIVEN
        </div>

        <div ref={line2Ref} className="relative">
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(3rem, 9.5vw, 10.5rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
              color: "var(--text)",
            }}
          >
            EVENTS.
          </div>

          {/* Tagline — absolute bottom-right on desktop, below on mobile */}
          <p
            className="mt-4 md:mt-0 md:absolute md:bottom-[0.4em] md:right-0"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(0.72rem, 1.1vw, 0.88rem)",
              lineHeight: 1.65,
              letterSpacing: "0.01em",
              color: "var(--text-subtle)",
              maxWidth: "24ch",
              textAlign: "right",
            }}
          >
            Bold, sexy, uncompromising.
            <br />
            Production based in Tel Aviv.
          </p>
        </div>
      </div>
    </section>
  );
}
