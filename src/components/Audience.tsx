"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DonutChart from "./DonutChart";
import LineChart from "./LineChart";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "55%", label: "Female audience" },
  { value: "26", label: "Events produced" },
  { value: "3,800+", label: "Tickets sold" },
  { value: "29.7", label: "Average age" },
];

const bars = [
  { label: "2023", value: 6, color: "var(--border-strong)" },
  { label: "2024", value: 8, color: "var(--red)" },
  { label: "2025", value: 12, color: "var(--text)" },
];
const MAX = Math.max(...bars.map((b) => b.value));

export default function Audience() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const valuesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const mkST = (trigger: Element | null) => ({
      trigger,
      start: "top 95%",
      toggleActions: "play reverse play reverse" as const,
    });

    gsap.fromTo(tagRef.current, { opacity: 0 }, { opacity: 1, duration: 0.7, scrollTrigger: mkST(tagRef.current) });

    const statEls = statsRef.current?.querySelectorAll(".stat-item");
    if (statEls) {
      gsap.fromTo(statEls, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: "power3.out",
        scrollTrigger: mkST(statsRef.current),
      });
    }

    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      gsap.fromTo(bar, { scaleY: 0, transformOrigin: "bottom" }, {
        scaleY: 1, duration: 0.9, delay: i * 0.12, ease: "power3.out",
        scrollTrigger: mkST(sectionRef.current),
      });
      const obj = { val: 0 };
      gsap.to(obj, {
        val: bars[i].value, duration: 0.9, delay: i * 0.12, ease: "power2.out",
        scrollTrigger: mkST(sectionRef.current),
        onUpdate() { if (valuesRef.current[i]) valuesRef.current[i]!.textContent = Math.round(obj.val).toString(); },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="px-6 md:px-14 lg:px-20 py-4 md:py-8">
      <div ref={tagRef} className="flex items-center gap-3 mb-16 pt-10 border-t border-[var(--border)]">
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "var(--text-subtle)" }}>02</span>
        <span style={{ fontSize: "0.62rem", color: "var(--border-strong)" }}>—</span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-subtle)" }}>The Numbers</span>
      </div>

      {/* Key stats */}
      <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-20" style={{ background: "var(--border)" }}>
        {stats.map((s) => (
          <div key={s.label} className="stat-item py-6 px-4 sm:py-10 sm:px-6 md:px-8" style={{ background: "var(--bg)" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(1.8rem, 4.5vw, 4rem)", letterSpacing: "-0.04em", lineHeight: 1, color: "var(--text)", marginBottom: "0" }} className="sm:mb-2">
              {s.value}
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
        <div>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "2rem" }}>Gender breakdown</p>
          <DonutChart female={55} male={45} />
        </div>
        <div>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "2rem" }}>Events per year</p>
          <div className="flex items-end gap-6 h-48">
            {bars.map((bar, i) => (
              <div key={bar.label} className="flex flex-col items-center flex-1 h-full justify-end gap-2">
                <span style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", fontWeight: 300, color: "var(--text-muted)" }}>
                  <span ref={(el) => { valuesRef.current[i] = el; }}>0</span>
                </span>
                <div ref={(el) => { barsRef.current[i] = el; }} style={{ width: "100%", height: `${(bar.value / MAX) * 100}%`, backgroundColor: bar.color, transformOrigin: "bottom" }} />
                <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.1em", color: "var(--text-subtle)" }}>{bar.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 pt-12 border-t border-[var(--border)]">
        <p style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "2rem" }}>Average audience age</p>
        <LineChart />
      </div>
    </section>
  );
}
