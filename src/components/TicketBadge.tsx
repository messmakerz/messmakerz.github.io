"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const TICKET_URL = "https://tickets.mess.com";

export default function TicketBadge() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [dismissed, setDismissed] = useState(false);
  const isDragging = useRef(false);

  useEffect(() => {
    if (dismissed) return;

    // Entrance pop
    gsap.fromTo(
      wrapRef.current,
      { scale: 0, opacity: 0, rotate: -30 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.75, ease: "back.out(2)", delay: 1.2 }
    );

    // Rotate ring
    gsap.to(ringRef.current, {
      rotate: 360,
      duration: 10,
      ease: "none",
      repeat: -1,
      transformOrigin: "center center",
    });

    // Float bob
    const floatTween = gsap.to(wrapRef.current, {
      y: -8,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 2,
    });

    // Pulsing glow
    gsap.to(glowRef.current, {
      scale: 1.4,
      opacity: 0,
      duration: 1.8,
      ease: "sine.out",
      repeat: -1,
      delay: 1.8,
    });

    // Draggable
    const drag = Draggable.create(wrapRef.current, {
      type: "x,y",
      edgeResistance: 0.65,
      bounds: window,
      onDragStart() {
        isDragging.current = true;
        floatTween.pause();
        gsap.to(wrapRef.current, { scale: 1.08, duration: 0.15 });
      },
      onDragEnd() {
        gsap.to(wrapRef.current, { scale: 1, duration: 0.25, ease: "back.out(2)" });
        setTimeout(() => { isDragging.current = false; }, 50);
        floatTween.resume();
      },
    });

    return () => {
      drag[0]?.kill();
    };
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      ref={wrapRef}
      className="fixed right-6 top-6 z-[9000] opacity-0"
      style={{ willChange: "transform" }}
    >
      {/* Dismiss button */}
      <button
        onClick={() => {
          gsap.to(wrapRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: "back.in(2)",
            onComplete: () => setDismissed(true),
          });
        }}
        className="absolute -top-2 -right-2 z-10 w-5 h-5 rounded-full flex items-center justify-center"
        style={{
          background: "var(--bg)",
          border: "1px solid var(--border-strong)",
          color: "var(--text-subtle)",
          fontSize: "0.55rem",
          fontFamily: "var(--font-display)",
        }}
        aria-label="Dismiss"
      >
        ✕
      </button>

      <div
        ref={badgeRef}
        className="relative w-36 h-36"
        onClick={(e) => {
          if (isDragging.current) { e.preventDefault(); return; }
          window.open(TICKET_URL, "_blank", "noopener,noreferrer");
        }}
        style={{ cursor: "grab" }}
      >
        {/* Pulsing glow */}
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: "rgba(221,50,52,0.3)" }}
        />

        {/* Rotating ring text */}
        <svg
          ref={ringRef}
          viewBox="0 0 144 144"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ transformOrigin: "72px 72px" }}
        >
          <defs>
            <path
              id="ringPath"
              d="M 72,72 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
            />
          </defs>
          <text
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "9",
              fontWeight: 700,
              letterSpacing: "3.5",
              fill: "rgba(221,50,52,0.9)",
            }}
          >
            <textPath href="#ringPath">
              MESS DISCO BALL · GET TICKETS · MESS DISCO BALL ·{" "}
            </textPath>
          </text>
        </svg>

        {/* Inner filled circle */}
        <div
          className="absolute flex flex-col items-center justify-center rounded-full transition-transform duration-200 hover:scale-105"
          style={{ inset: "16px", background: "var(--red)" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 mb-1"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.46rem",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.4,
              textAlign: "center",
            }}
          >
            GET
            <br />
            TICKETS
          </span>
        </div>
      </div>
    </div>
  );
}
