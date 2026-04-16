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
  const introRef = useRef<HTMLParagraphElement>(null);
  const goalsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // Intro text slams in from right
    if (introRef.current) {
      gsap.fromTo(
        introRef.current,
        { x: 60, opacity: 0, skewX: 4 },
        {
          x: 0, opacity: 1, skewX: 0,
          duration: 0.65, ease: "expo.out",
          scrollTrigger: { trigger: introRef.current, start: "top 95%", toggleActions: "play reverse play reverse" },
        }
      );
    }

    // Goals: staggered hard slam from left
    const goalEls = goalsRef.current.filter(Boolean);
    gsap.fromTo(
      goalEls,
      { x: -60, opacity: 0, skewX: -6 },
      {
        x: 0, opacity: 1, skewX: 0,
        stagger: 0.07,
        duration: 0.5,
        ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 95%", toggleActions: "play reverse play reverse" },
      }
    );

    // Each goal row: hover skew punch
    goalEls.forEach((el) => {
      if (!el) return;
      el.addEventListener("mouseenter", () => {
        gsap.to(el, { x: 8, skewX: -2, duration: 0.15, ease: "power2.out" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { x: 0, skewX: 0, duration: 0.35, ease: "elastic.out(1, 0.5)" });
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="px-8 md:px-16 lg:px-20 py-14 md:py-20">
      <div className="max-w-6xl">
        <p
          ref={introRef}
          className="text-base md:text-lg font-light leading-relaxed text-[var(--text-muted)] max-w-xl mb-12 ml-0 md:ml-[45%]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
        >
          With Mishell&apos;s high-profile releases and growing crowd, we aim to
          strengthen the bond between the artist and the brand on an
          international stage.
        </p>

        <ul className="space-y-0">
          {goals.map((goal, i) => (
            <li
              key={i}
              ref={(el) => { goalsRef.current[i] = el; }}
              className="flex items-start gap-4 py-5 border-b border-[var(--border)] group"
              style={{ willChange: "transform" }}
            >
              <span
                className="text-[var(--red)] font-bold text-sm mt-0.5 shrink-0"
                style={{ fontFamily: "var(--font-display)" }}
              >
                0{i + 1}
              </span>
              <span
                className="text-[var(--text-muted)] font-light text-base md:text-lg group-hover:text-[var(--text)] transition-colors duration-150"
                style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
              >
                {goal}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
