"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    title: "MESS vol.1",
    badge: "LIMITED",
    price: "₪260",
    description: "Round Neck T-shirt, Oversized Fit",
    url: "https://www.wooooof.com/product/mess",
    image: "https://cdn.shopify.com/s/files/1/0777/6688/5560/files/MESS_T-SHIRT_front_d682bb7b-5c0e-4d69-b1e0-04e6b0dbb5d4.png?v=1730303352",
    video: "https://cdn.shopify.com/videos/c/o/v/8513d7e22a454d54bc8d668240f1726d.mp4",
  },
  {
    title: "MESS vol.2",
    badge: "NEW",
    price: "₪260",
    description: "Round Neck T-shirt, Oversized Fit",
    url: "https://www.wooooof.com/product/mess-tee",
    image: "https://cdn.shopify.com/s/files/1/0777/6688/5560/files/MESS_T-SHIRT_front_1_7bb71ecf-733e-4e29-8130-b2b185b87003.png?v=1769117231",
    video: "https://cdn.shopify.com/videos/c/o/v/2584849c25364b5cb04190c0e1ddb188.mp4",
  },
  {
    title: "MESS Long Sleeve",
    badge: "NEW",
    price: "₪290",
    description: "Round Neck Long Sleeve, Oversized Fit",
    url: "https://www.wooooof.com/product/mess-long-sleeve",
    image: "https://cdn.shopify.com/s/files/1/0777/6688/5560/files/mess_new_shirt_-_Long_Shirt_Black_front_857107f5-4346-42e5-9b40-cde550337d3f.png?v=1769117245",
    video: "https://cdn.shopify.com/videos/c/o/v/5f07f7e7536e4513a27fab611cbb5822.mp4",
  },
];

interface ProductCardProps {
  p: typeof products[number];
}

function ProductCard({ p }: ProductCardProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay when card enters viewport (all devices)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(v);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group border-t border-[var(--border)] md:border-l first:md:border-l-0 md:border-t-0"
      style={{ textDecoration: "none", display: "block" }}
    >
      {/* Media container */}
      <div
        className="relative overflow-hidden w-full"
        style={{ background: "#111", aspectRatio: "3/4" }}
      >
        {/* Static image — hidden once video plays */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.image}
          alt={p.title}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "contain",
            padding: "24px",
            transition: "opacity 0.5s ease",
            opacity: playing ? 0 : 1,
          }}
        />

        {/* 360° video — always visible when loaded */}
        <video
          ref={videoRef}
          src={p.video}
          muted
          playsInline
          loop
          preload="auto"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            transition: "opacity 0.5s ease",
            opacity: playing ? 1 : 0,
          }}
        />

        {/* Badge */}
        <span style={{
          position: "absolute", top: 16, left: 16,
          fontFamily: "var(--font-display)",
          fontSize: "0.55rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: p.badge === "LIMITED" ? "var(--red)" : "var(--text-subtle)",
          border: `1px solid ${p.badge === "LIMITED" ? "var(--red)" : "var(--border)"}`,
          padding: "3px 8px",
          zIndex: 2,
        }}>
          {p.badge}
        </span>
      </div>

      {/* Info */}
      <div className="pt-7 pb-8 pr-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "-0.02em",
              color: "var(--text)",
              marginBottom: "4px",
            }}>
              {p.title}
            </h3>
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.72rem",
              fontWeight: 300,
              color: "var(--text-subtle)",
              letterSpacing: "0.04em",
              paddingLeft: "10px",
            }}>
              {p.description}
            </p>
          </div>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.9rem",
            fontWeight: 500,
            color: "var(--text)",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}>
            {p.price}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
          }}>
            Shop now
          </span>
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
            <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-subtle)" }}/>
          </svg>
        </div>
      </div>
    </a>
  );
}

export default function Merch() {
  const tagRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(tagRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: tagRef.current, start: "top 95%" } }
    );
    const cards = gridRef.current?.querySelectorAll("a");
    if (cards) {
      gsap.fromTo(cards,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: gridRef.current, start: "top 90%" } }
      );
    }
  }, []);

  return (
    <section className="px-6 md:px-14 lg:px-20 py-4 md:py-8 pb-16 md:pb-24">

      {/* Section tag */}
      <div ref={tagRef} className="flex items-center gap-3 pt-10 mb-12 border-t border-[var(--border)]">
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "var(--text-subtle)" }}>03</span>
        <span style={{ fontSize: "0.62rem", color: "var(--border-strong)" }}>—</span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-subtle)" }}>Merch</span>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {products.map((p) => (
          <ProductCard key={p.title} p={p} />
        ))}
      </div>
    </section>
  );
}
