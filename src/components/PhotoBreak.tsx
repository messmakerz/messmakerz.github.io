"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function PhotoBreak() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax: image moves slower than scroll — cinematic depth
    gsap.fromTo(
      imgRef.current,
      { y: "-12%" },
      {
        y: "12%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    );

    // Text fade in
    gsap.fromTo(textRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" }
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: "85vh" }}
    >
      {/* Image — oversized to allow parallax travel */}
      <div
        ref={imgRef}
        className="absolute inset-0"
        style={{ top: "-15%", bottom: "-15%", left: 0, right: 0 }}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/mishell.jpg`}
          alt="MESS Production"
          fill
          className="object-cover object-center"
          style={{ objectPosition: "50% 30%" }}
          priority={false}
        />
      </div>

      {/* Dark veil — heavier at top and bottom, light in center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, var(--bg) 0%, transparent 22%, transparent 70%, var(--bg) 100%)",
        }}
      />

      {/* Subtle dark tint overall */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Corner text */}
      <div
        ref={textRef}
        className="absolute bottom-10 md:bottom-16 left-6 md:left-14 lg:left-20"
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(0.62rem, 1vw, 0.8rem)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(240,237,228,0.55)",
            lineHeight: 1.8,
          }}
        >
          Bold, sexy, uncompromising.
          <br />
          Tel Aviv, 2022 —
        </p>
      </div>
    </section>
  );
}
