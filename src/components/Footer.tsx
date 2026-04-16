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
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Logo: slam up from below
    gsap.fromTo(
      logoRef.current,
      { y: 50, opacity: 0, skewX: -5 },
      {
        y: 0, opacity: 1, skewX: 0,
        duration: 0.6, ease: "expo.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 92%", toggleActions: "play reverse play reverse" },
      }
    );

    // Links: stagger slam in
    const items = linksRef.current?.querySelectorAll("a");
    if (items) {
      gsap.fromTo(
        items,
        { x: 30, opacity: 0 },
        {
          x: 0, opacity: 1,
          stagger: 0.06,
          duration: 0.45,
          ease: "expo.out",
          scrollTrigger: { trigger: linksRef.current, start: "top 93%", toggleActions: "play reverse play reverse" },
          delay: 0.1,
        }
      );

      // Hover: punch each link
      items.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(el, { x: 6, skewX: -3, duration: 0.12, ease: "power2.out" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { x: 0, skewX: 0, duration: 0.4, ease: "elastic.out(1, 0.5)" });
        });
      });
    }
  }, []);

  return (
    <footer ref={footerRef} className="border-t border-[var(--border)] px-8 md:px-16 lg:px-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 py-14 md:py-16">
        <div ref={logoRef}>
          <Image
            src="/mess-small-logo.svg"
            alt="MESS Production"
            width={222}
            height={99}
            className="w-32 md:w-40 opacity-90"
          />
        </div>

        <div ref={linksRef} className="flex flex-col gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center gap-3"
              style={{ willChange: "transform" }}
            >
              <span className="w-1 h-1 rounded-full bg-[var(--red)]" />
              <span
                className="text-sm font-light tracking-[0.12em] uppercase text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors duration-150"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--border)] py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="text-xs font-light text-[var(--text-subtle)] tracking-widest uppercase" style={{ fontFamily: "var(--font-display)" }}>
          © 2026 MESS Production
        </span>
        <span className="text-xs font-light text-[var(--text-subtle)] tracking-widest uppercase" style={{ fontFamily: "var(--font-display)" }}>
          Tel Aviv, Israel
        </span>
      </div>
    </footer>
  );
}
