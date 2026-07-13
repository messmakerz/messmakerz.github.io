"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    const bar = barRef.current;
    const fill = barFillRef.current;
    if (!overlay || !logo || !bar || !fill) return;

    // Lock scroll while loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();

    // Logo slams in from top with skew
    tl.fromTo(logo,
      { y: -60, opacity: 0, skewX: -10 },
      { y: 0, opacity: 1, skewX: 0, duration: 0.6, ease: "expo.out" }
    )
    // Progress bar fill
    .fromTo(fill,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 1.2, ease: "power2.inOut" },
      "-=0.1"
    )
    // Brief hold
    .to({}, { duration: 0.15 })
    // Logo scales up and blows out
    .to(logo, { scale: 1.15, opacity: 0, duration: 0.4, ease: "expo.in" })
    // Overlay slices up (clip-path wipe)
    .to(overlay, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.55,
      ease: "expo.in",
      onComplete: () => {
        document.body.style.overflow = "";
        setDone(true);
      },
    }, "-=0.15");

    // Failsafe: GSAP runs on requestAnimationFrame, which browsers suspend in
    // background tabs (and it never runs at all if a chunk fails to load).
    // Never trap the user behind the overlay — force-clear after 4s.
    const failsafe = setTimeout(() => {
      document.body.style.overflow = "";
      setDone(true);
    }, 4000);

    return () => clearTimeout(failsafe);
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{
        background: "var(--bg)",
        clipPath: "inset(0 0 0% 0)",
      }}
    >
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
          opacity: 0.05,
        }}
      />

      {/* Logo — big, centered */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={logoRef}
        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/mess-small-logo.svg`}
        alt="MESS Production"
        style={{
          width: "clamp(180px, 40vw, 420px)",
          height: "auto",
          opacity: 0,
        }}
        draggable={false}
      />

      {/* Progress bar */}
      <div
        ref={barRef}
        className="absolute bottom-12 left-8 right-8 md:left-16 md:right-16 lg:left-20 lg:right-20"
        style={{ height: "2px", background: "var(--border)" }}
      >
        <div
          ref={barFillRef}
          className="h-full"
          style={{ background: "var(--red)", transformOrigin: "left center" }}
        />
      </div>
    </div>
  );
}
