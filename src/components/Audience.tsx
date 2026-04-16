"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DonutChart from "./DonutChart";
import LineChart from "./LineChart";

gsap.registerPlugin(ScrollTrigger);

const bars = [
  { label: "2023", value: 8, color: "var(--border-strong)" },
  { label: "2024", value: 12, color: "var(--red)" },
  { label: "2025", value: 18, color: "var(--text)" },
];
const MAX = Math.max(...bars.map((b) => b.value));

export default function Audience() {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const valuesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      gsap.fromTo(
        bar,
        { scaleY: 0, transformOrigin: "bottom" },
        {
          scaleY: 1,
          duration: 1.0,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play reverse play reverse" },
        }
      );
      const obj = { val: 0 };
      gsap.to(obj, {
        val: bars[i].value,
        duration: 0.9,
        delay: i * 0.15 + 0.2,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play reverse play reverse" },
        onUpdate() {
          if (valuesRef.current[i])
            valuesRef.current[i]!.textContent = Math.round(obj.val).toString();
        },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-8 md:px-16 lg:px-20 py-14 md:py-20"
    >
      {/* ── Two columns side by side ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 items-start">

        {/* LEFT — Gender Breakdown */}
        <div className="border-r-0 md:border-r border-[var(--border)] md:pr-12">
          <h3
            className="text-3xl font-bold mb-10 text-[var(--red)]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            GENDER
          </h3>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <DonutChart female={55} male={45} />
            <p className="text-xs font-light text-[var(--text-subtle)] mt-2 leading-relaxed max-w-[16rem]" style={{ fontFamily: "var(--font-display)" }}>
              Majority female — rare in the electronic music scene.
            </p>
          </div>
        </div>

        {/* RIGHT — Events Per Year */}
        <div className="md:pl-12">
          <h3
            className="text-3xl font-bold mb-10 text-[var(--red)]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            EVENTS / YEAR
          </h3>

          <div className="flex items-end gap-6 h-52 max-w-xs">
            {bars.map((bar, i) => (
              <div key={bar.label} className="flex flex-col items-center flex-1 h-full justify-end gap-2">
                <span
                  className="text-lg font-bold"
                  style={{ fontFamily: "var(--font-display)", color: bar.color }}
                >
                  <span ref={(el) => { valuesRef.current[i] = el; }}>0</span>
                </span>
                <div
                  ref={(el) => { barsRef.current[i] = el; }}
                  className="w-full rounded-sm"
                  style={{
                    height: `${(bar.value / MAX) * 100}%`,
                    backgroundColor: bar.color,
                    transformOrigin: "bottom",
                  }}
                />
                <span
                  className="text-xs font-light text-[var(--text-muted)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {bar.label}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs font-light text-[var(--text-subtle)] max-w-xs" style={{ fontFamily: "var(--font-display)" }}>
            Consistent growth — from local roots to a full production calendar.
          </p>
        </div>
      </div>

      {/* Avg Age — full width below */}
      <div className="mt-16 pt-12 border-t border-[var(--border)]">
        <h3
          className="text-3xl font-bold mb-10 text-[var(--red)]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          AVG. AGE
        </h3>
        <LineChart />
      </div>
    </section>
  );
}
