"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const st = { start: "top 95%", toggleActions: "play none none none" };

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


  const handleMouseEnter = () => {
    setHovered(true);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    const v = videoRef.current;
    if (v) v.pause();
    if (cursorRef.current) {
      cursorRef.current.style.opacity = "0";
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cursorRef.current;
    const arrowEl = arrowRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.opacity = "1";

    // Point arrow toward Mishell's face (approx top-center of image)
    if (arrowEl) {
      const faceX = rect.width * 0.5;
      const faceY = rect.height * 0.18;
      const angle = Math.atan2(faceY - y, faceX - x) * (180 / Math.PI);
      arrowEl.style.transform = `rotate(${angle}deg)`;
    }
  };

  return (
    <section ref={sectionRef} className="pt-8 md:pt-24 pb-16 md:pb-24">

      {/* Section tag + heading — padded */}
      <div className="px-6 md:px-14 lg:px-20">
        <div ref={tagRef} className="flex items-center gap-3 mb-12">
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "var(--text-subtle)" }}>01</span>
          <span style={{ fontSize: "0.62rem", color: "var(--border-strong)" }}>—</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-subtle)" }}>Who We Are</span>
        </div>

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
      </div>

      {/* Split: image full-bleed left, body padded right */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-end">
        <div
          ref={imgRef}
          className="relative overflow-hidden w-full"
          style={{ aspectRatio: "4/5", cursor: "none" }}
          data-hide-cursor
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {/* Static image */}
          <Image
            src={`${base}/mishell.jpeg`}
            alt="Mishell"
            fill
            className="object-cover object-top"
            style={{
              transition: "opacity 0.4s ease",
              opacity: hovered ? 0 : 1,
            }}
          />

          {/* Custom cursor */}
          <div
            ref={cursorRef}
            style={{
              position: "absolute",
              pointerEvents: "none",
              opacity: 0,
              transform: "translate(-50%, -50%)",
              zIndex: 20,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "opacity 0.2s ease",
            }}
          >
            {/* Arrow */}
            <svg ref={arrowRef} width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, transition: "transform 0.08s linear" }}>
              <path d="M2 2L16 9L2 16V2Z" fill="white" />
            </svg>
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#fff",
              whiteSpace: "nowrap",
              textShadow: "0 1px 8px rgba(0,0,0,0.7)",
            }}>
              This is Mishell
            </span>
          </div>

          {/* Hover video */}
          <video
            ref={videoRef}
            src={`${base}/videos/mishell-hover.mp4`}
            muted
            playsInline
            loop
            preload="metadata"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 0.4s ease",
              opacity: hovered ? 1 : 0,
            }}
          />
        </div>

        <div ref={bodyRef} className="flex flex-col justify-end pt-8 md:pt-0 pb-2 px-6 md:px-14 lg:px-20 md:pl-12 lg:pl-16">
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
