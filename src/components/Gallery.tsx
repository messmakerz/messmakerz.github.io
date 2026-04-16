"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Placeholder grid items — each slot ready for a real photo upload
const SLOTS = [
  { id: 1, aspect: "tall", label: "MESS PLANET" },
  { id: 2, aspect: "wide", label: "LIVE FROM HELL" },
  { id: 3, aspect: "square", label: "MESSY SESSIONS" },
  { id: 4, aspect: "square", label: "A TRIBE CALLED MESS" },
  { id: 5, aspect: "wide", label: "MESS JUNGLE TRIP" },
  { id: 6, aspect: "tall", label: "MESS GALA" },
  { id: 7, aspect: "square", label: "MESS BAKERY RAVE" },
  { id: 8, aspect: "wide", label: "MESS PLANET II" },
  { id: 9, aspect: "square", label: "BEHIND THE SCENES" },
];

// Per-slot overlay opacities to give subtle tonal variation on top of var(--card-bg)
const TONE_OVERLAYS = [0, 0.03, 0.01, 0.05, 0.02, 0.04, 0, 0.06, 0.01];

interface LightboxProps {
  slot: (typeof SLOTS)[0];
  onClose: () => void;
}

function Lightbox({ slot, onClose }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(boxRef.current, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" });

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const close = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, onComplete: onClose });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/85 z-[10000] flex items-center justify-center p-6"
      onClick={close}
    >
      <div
        ref={boxRef}
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={close}
          className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm tracking-widest uppercase"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ESC / CLOSE ×
        </button>

        {/* Image area */}
        <div className="w-full aspect-video relative overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/mishell.jpg`}
            alt={slot.label}
            fill
            className="object-cover object-top"
          />
          {/* Bottom gradient for caption readability */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Caption */}
        <div className="mt-4 flex items-center justify-between">
          <span
            className="text-white font-bold tracking-tight text-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {slot.label}
          </span>
          <span
            className="text-white/40 text-sm tracking-widest uppercase"
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
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<null | (typeof SLOTS)[0]>(null);

  useEffect(() => {
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll(".gallery-item");
      gsap.fromTo(
        items,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.07,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 80%", toggleActions: "play reverse play reverse" },
        }
      );
    }
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="px-8 md:px-16 lg:px-20 py-14 md:py-20"
      >

        {/* Masonry-style grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3"
          style={{ gridAutoRows: "clamp(120px, 28vw, 220px)" }}
        >
          {SLOTS.map((slot, i) => {
            const overlayOpacity = TONE_OVERLAYS[i % TONE_OVERLAYS.length];
            // On mobile all items are col-span-1 row-span-1 for clean grid
            const spanCols = slot.aspect === "wide" ? "col-span-1 md:col-span-2" : "col-span-1";
            const spanRows = slot.aspect === "tall" ? "row-span-1 md:row-span-2" : "row-span-1";

            return (
              <div
                key={slot.id}
                className={`gallery-item ${spanCols} ${spanRows} relative overflow-hidden group cursor-none bg-[var(--card-bg)]`}
                style={{ willChange: "transform" }}
                onClick={() => setActive(slot)}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.03, duration: 0.18, ease: "power2.out" });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.4, ease: "elastic.out(1,0.5)" });
                }}
              >
                {/* Photo */}
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/mishell.jpg`}
                  alt={slot.label}
                  fill
                  className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-400"
                  style={{ objectPosition: `${30 + (slot.id * 7) % 40}% ${10 + (slot.id * 13) % 30}%` }}
                />

                {/* Dark tint */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-all duration-300 pointer-events-none" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[var(--red)] opacity-0 group-hover:opacity-80 transition-opacity duration-200 flex items-end p-5">
                  <span
                    className="text-white font-bold text-base md:text-lg tracking-tight opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {slot.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lightbox */}
      {active && <Lightbox slot={active} onClose={() => setActive(null)} />}
    </>
  );
}
