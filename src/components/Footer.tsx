"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "SoundCloud", href: "https://soundcloud.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Contact", href: "mailto:mess@mishell.com" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(contentRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: footerRef.current, start: "top 95%" } }
    );
  }, []);

  return (
    <footer ref={footerRef} className="border-t border-[var(--border)] px-6 md:px-14 lg:px-20">
      <div ref={contentRef} className="py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">

          {/* Logo + tagline */}
          <div className="md:col-span-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/mess-small-logo.svg`}
              alt="MESS Production"
              width={222}
              height={99}
              className="w-28 md:w-36 mb-6"
            />
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "0.85rem", color: "var(--text-subtle)", lineHeight: 1.7, maxWidth: "36ch" }}>
              Concept-driven events, fashion, music. Bold, sexy, uncompromising.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-[var(--border)] pb-3"
              >
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "0.82rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  {s.label}
                </span>
                <span style={{ color: "var(--text-subtle)", fontSize: "0.75rem" }}>↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
