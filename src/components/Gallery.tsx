"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  { id: 1, label: "MESS PLANET", num: "01" },
  { id: 2, label: "LIVE FROM HELL", num: "02" },
  { id: 3, label: "MESSY SESSIONS", num: "03" },
  { id: 4, label: "A TRIBE CALLED MESS", num: "04" },
  { id: 5, label: "MESS JUNGLE TRIP", num: "05" },
  { id: 6, label: "MESS GALA", num: "06" },
  { id: 7, label: "MESS BAKERY RAVE", num: "07" },
  { id: 8, label: "MESS PLANET II", num: "08" },
  { id: 9, label: "BEHIND THE SCENES", num: "09" },
];

interface LightboxProps {
  slide: (typeof SLIDES)[0];
  onClose: () => void;
}

function Lightbox({ slide, onClose }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(boxRef.current, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" });

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, onComplete: onClose });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/90 z-[10000] flex items-center justify-center p-6"
      onClick={close}
    >
      <div
        ref={boxRef}
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute -top-10 right-0 text-white/60 hover:text-white text-xs tracking-widest uppercase transition-colors"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ESC / CLOSE ×
        </button>

        <div className="w-full aspect-video relative overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/mishell.jpg`}
            alt={slide.label}
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span
            className="text-white font-bold tracking-tight text-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {slide.label}
          </span>
          <span
            className="text-white/40 text-xs tracking-widest uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            MESS Production
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const tagRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<null | (typeof SLIDES)[0]>(null);

  useEffect(() => {
    // Section tag fade-in
    gsap.fromTo(tagRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.7, scrollTrigger: { trigger: tagRef.current, start: "top 95%" } }
    );

    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    // Single clean context — one ScrollTrigger, no dual-create pattern
    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Section tag — outside pinned area */}
      <div className="px-6 md:px-14 lg:px-20">
        <div ref={tagRef} className="flex items-center gap-3 pt-10 mb-10 border-t border-[var(--border)]">
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "var(--text-subtle)" }}>05</span>
          <span style={{ fontSize: "0.62rem", color: "var(--border-strong)" }}>—</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-subtle)" }}>Gallery</span>

          {/* Scroll progress bar */}
          <div className="ml-auto flex items-center gap-3">
            <div className="w-24 md:w-40 h-px bg-[var(--border)] relative overflow-hidden">
              <div
                ref={progressRef}
                className="absolute inset-y-0 left-0 bg-[var(--text-subtle)] transition-none"
                style={{ width: "0%" }}
              />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--text-subtle)", textTransform: "uppercase" }}>
              Scroll
            </span>
          </div>
        </div>
      </div>

      {/* Pinned horizontal scroll container — no overflow:hidden so pin spacer works */}
      <div ref={containerRef} style={{ height: "85vh" }}>
        <div
          ref={trackRef}
          className="flex h-full items-stretch"
          style={{ width: `${SLIDES.length * 88}vw` }}
        >
          {SLIDES.map((slide, i) => (
            <div
              key={slide.id}
              className="relative flex-shrink-0 overflow-hidden cursor-none group"
              style={{ width: "84vw", marginRight: "1vw" }}
              onClick={() => setActive(slide)}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/mishell.jpg`}
                alt={slide.label}
                fill
                className="object-cover object-top grayscale group-hover:grayscale-0 transition-[filter] duration-500"
                style={{ objectPosition: `${20 + (i * 11) % 50}% ${10 + (i * 7) % 35}%` }}
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Hover red overlay */}
              <div className="absolute inset-0 bg-[var(--red)] opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />

              {/* Bottom label */}
              <div className="absolute bottom-0 inset-x-0 p-7 md:p-10 flex items-end justify-between">
                <span
                  className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 300,
                    fontSize: "clamp(1.2rem, 2.2vw, 2rem)",
                    letterSpacing: "-0.02em",
                    color: "#fff",
                  }}
                >
                  {slide.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {slide.num}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active && <Lightbox slide={active} onClose={() => setActive(null)} />}
    </>
  );
}
