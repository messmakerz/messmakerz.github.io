"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const st = { start: "top 95%", toggleActions: "play reverse play reverse" };

    gsap.fromTo(tagRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: tagRef.current, ...st } }
    );

    gsap.fromTo(headingRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, ...st } }
    );

    gsap.fromTo(imgRef.current,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: imgRef.current, ...st } }
    );

    gsap.fromTo(bodyRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: bodyRef.current, ...st } }
    );
  }, []);

  return (
    <section ref={sectionRef} className="px-6 md:px-14 lg:px-20 py-16 md:py-24">

      {/* Section tag */}
      <div ref={tagRef} className="flex items-center gap-3 mb-12 pt-10 border-t border-[var(--border)]">
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "var(--text-subtle)" }}>01</span>
        <span style={{ fontSize: "0.62rem", color: "var(--border-strong)" }}>—</span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-subtle)" }}>Who We Are</span>
      </div>

      {/* Statement heading */}
      <h2
        ref={headingRef}
        className="mb-16 md:mb-20"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.04em",
          color: "var(--text)",
          maxWidth: "18ch",
        }}
      >
        Mishell&apos;s core community. Concept-driven events, fashion, music.
      </h2>

      {/* Split: image left, body right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end">
        <div
          ref={imgRef}
          className="relative overflow-hidden w-full"
          style={{ aspectRatio: "4/5", clipPath: "inset(0 0 100% 0)" }}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/mishell.jpg`}
            alt="Mishell"
            fill
            className="object-cover object-top"
          />
        </div>

        <div ref={bodyRef} className="flex flex-col justify-end pb-2">
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
              lineHeight: 1.75,
              color: "var(--text-muted)",
              maxWidth: "48ch",
            }}
          >
            Mess Makers is Mishell&apos;s core community. Supported by his local
            team, Mishell has built a unique brand that brings a fresh style to
            the local and international scene.
            <br /><br />
            Mess is dedicated to producing{" "}
            <span style={{ color: "var(--text)" }}>concept-driven events, fashion, music, and more</span>
            {" "}— always with a bold, sexy, naughty and uncompromising approach,
            fully committed to pure art.
            <br /><br />
            The brand allows Mishell to form a direct connection with his
            audience and add a new dimension to his journey.
          </p>
        </div>
      </div>
    </section>
  );
}
