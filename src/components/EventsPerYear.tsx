"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bars = [
  { label: "2023", value: 8, color: "var(--border-strong)", display: "8" },
  { label: "2024", value: 12, color: "var(--red)", display: "12" },
  { label: "2025", value: 18, color: "var(--text)", display: "18" },
];

const MAX = Math.max(...bars.map((b) => b.value));

export default function EventsPerYear() {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const valuesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );
    }

    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      const targetH = (bars[i].value / MAX) * 100;

      gsap.fromTo(
        bar,
        { scaleY: 0, transformOrigin: "bottom" },
        {
          scaleY: 1,
          duration: 1.0,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      // Count up
      const obj = { val: 0 };
      gsap.to(obj, {
        val: bars[i].value,
        duration: 0.9,
        delay: i * 0.15 + 0.2,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        onUpdate() {
          if (valuesRef.current[i])
            valuesRef.current[i]!.textContent = Math.round(obj.val).toString();
        },
      });

      void targetH; // suppress lint
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-8 md:px-16 lg:px-20 pt-0 pb-14 md:pb-20 border-t border-[var(--border)]"
    >
      <h3
        ref={headingRef}
        className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-[var(--red)] pt-14 md:pt-20"
        style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
      >
        EVENTS PER YEAR
      </h3>

      <div className="flex items-end gap-6 md:gap-10 h-72 max-w-sm">
        {bars.map((bar, i) => (
          <div key={bar.label} className="flex flex-col items-center flex-1 h-full justify-end gap-3">
            {/* Value label */}
            <span
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-data)", color: bar.color }}
            >
              <span ref={(el) => { valuesRef.current[i] = el; }}>0</span>
            </span>

            {/* Bar */}
            <div
              ref={(el) => { barsRef.current[i] = el; }}
              className="w-full rounded-sm"
              style={{
                height: `${(bar.value / MAX) * 100}%`,
                backgroundColor: bar.color,
                transformOrigin: "bottom",
              }}
            />

            {/* Year label */}
            <span
              className="text-sm font-light text-[var(--text-muted)]"
              style={{ fontFamily: "var(--font-data)" }}
            >
              {bar.label}
            </span>
          </div>
        ))}
      </div>

      <p
        className="mt-12 text-sm font-light text-[var(--text-subtle)] max-w-xs"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Consistent growth year over year — from local roots to a full production
        calendar.
      </p>
    </section>
  );
}
