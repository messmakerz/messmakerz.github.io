"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  index?: number;
}

export default function Accordion({ title, children, defaultOpen = false, index = 0 }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const toggle = () => {
    const el = contentRef.current;
    const arrow = arrowRef.current;
    if (!el) return;

    if (!open) {
      gsap.set(el, { height: "auto", overflow: "hidden" });
      const fullH = el.scrollHeight;
      // Hard punch open
      gsap.fromTo(el,
        { height: 0, opacity: 0, skewX: -2 },
        { height: fullH, opacity: 1, skewX: 0, duration: 0.45, ease: "expo.out",
          onComplete: () => {
            gsap.set(el, { height: "auto", overflow: "visible" });
            ScrollTrigger.refresh();
          } }
      );
      // Button scale punch
      if (btnRef.current) gsap.fromTo(btnRef.current, { scaleX: 0.98 }, { scaleX: 1, duration: 0.3, ease: "elastic.out(1,0.5)" });
      gsap.to(arrow, { rotate: 180, duration: 0.25, ease: "expo.out" });
    } else {
      gsap.set(el, { overflow: "hidden" });
      gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: "expo.in" });
      gsap.to(arrow, { rotate: 0, duration: 0.25, ease: "expo.out" });
    }

    setOpen(!open);
  };

  const titleRef = useRef<HTMLSpanElement>(null);
  const num = String(index + 1).padStart(2, "0");

  const onHoverEnter = () => {
    if (open) return;
    gsap.to(titleRef.current, { x: 10, skewX: -2, duration: 0.25, ease: "power2.out" });
    gsap.to(arrowRef.current, { y: 4, scale: 1.25, duration: 0.2, ease: "power2.out" });
    if (btnRef.current) gsap.to(btnRef.current, { backgroundColor: "rgba(200,40,40,0.07)", duration: 0.2 });
  };

  const onHoverLeave = () => {
    if (open) return;
    gsap.to(titleRef.current, { x: 0, skewX: 0, duration: 0.5, ease: "elastic.out(1,0.5)" });
    gsap.to(arrowRef.current, { y: 0, scale: 1, duration: 0.4, ease: "elastic.out(1,0.5)" });
    if (btnRef.current) gsap.to(btnRef.current, { backgroundColor: "var(--bg)", duration: 0.3 });
  };

  return (
    <div
      className="border-t border-[var(--border)]"
      style={{ borderTopWidth: "1px" }}
    >
      <button
        ref={btnRef}
        onClick={toggle}
        onMouseEnter={onHoverEnter}
        onMouseLeave={onHoverLeave}
        data-no-hover
        className="w-full flex items-center justify-between group"
        style={{
          background: open ? "var(--red)" : "var(--bg)",
          padding: "clamp(1.25rem, 3vw, 2.5rem) clamp(1.25rem, 5vw, 5rem)",
          transition: "background 0.2s ease",
          borderLeft: open ? "4px solid var(--red)" : "4px solid transparent",
        }}
      >
        <div className="flex items-baseline gap-4 md:gap-6 min-w-0">
          {/* Index number — outlined */}
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(0.65rem, 1.5vw, 0.9rem)",
              letterSpacing: "0.1em",
              color: open ? "rgba(255,255,255,0.5)" : "var(--text-subtle)",
              flexShrink: 0,
              transition: "color 0.2s",
            }}
          >
            {num}
          </span>

          {/* Title */}
          <span
            ref={titleRef}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(1.6rem, 4.5vw, 3.8rem)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: open ? "#fff" : "var(--text)",
              textTransform: "uppercase",
              transition: "color 0.2s",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </span>
        </div>

        {/* Arrow — rotates, hard style */}
        <svg
          ref={arrowRef}
          viewBox="0 0 24 24"
          fill="none"
          stroke={open ? "#fff" : "var(--red)"}
          strokeWidth={2.5}
          strokeLinecap="square"
          strokeLinejoin="miter"
          style={{
            width: "clamp(1.2rem, 2.5vw, 1.8rem)",
            height: "clamp(1.2rem, 2.5vw, 1.8rem)",
            flexShrink: 0,
            marginLeft: "1rem",
            rotate: open ? "180deg" : "0deg",
            transition: "stroke 0.2s",
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          height: defaultOpen ? "auto" : 0,
          overflow: defaultOpen ? "visible" : "hidden",
          opacity: defaultOpen ? 1 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
