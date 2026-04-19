"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const goals = [
  "Export the brand to European & American markets",
  "Book international artists",
  "Grow and expand local & international community",
  "Use Mishell's international growth to bring the vision to the next level",
  "Strengthen the bond between the artist and the brand",
];

export default function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const goalsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const st = (trigger: Element | null) => ({
      trigger, start: "top 95%", toggleActions: "play reverse play reverse" as const,
    });

    gsap.fromTo(tagRef.current, { opacity: 0 }, { opacity: 1, duration: 0.7, scrollTrigger: st(tagRef.current) });
    gsap.fromTo(introRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: st(introRef.current) });

    const goalEls = goalsRef.current.filter(Boolean) as HTMLLIElement[];
    gsap.fromTo(goalEls,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: "power3.out", scrollTrigger: st(sectionRef.current) }
    );
  }, []);

  return (
    <section ref={sectionRef} className="px-6 md:px-14 lg:px-20 py-4 md:py-8 pb-16 md:pb-24">
      <div ref={tagRef} className="flex items-center gap-3 mb-16 pt-10 border-t border-[var(--border)]">
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "var(--text-subtle)" }}>03</span>
        <span style={{ fontSize: "0.62rem", color: "var(--border-strong)" }}>—</span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-subtle)" }}>Vision</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24">
        <p
          ref={introRef}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
            lineHeight: 1.65,
            letterSpacing: "-0.01em",
            color: "var(--text-muted)",
            maxWidth: "44ch",
          }}
        >
          With Mishell&apos;s high-profile releases and growing crowd, we aim to
          strengthen the bond between the artist and the brand on an
          international stage.
        </p>

        <ul>
          {goals.map((goal, i) => (
            <li
              key={i}
              ref={(el) => { goalsRef.current[i] = el; }}
              className="flex items-start gap-5 py-5 border-b border-[var(--border)]"
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--text-subtle)", marginTop: "0.3rem", flexShrink: 0 }}>
                0{i + 1}
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text-muted)" }}>
                {goal}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
