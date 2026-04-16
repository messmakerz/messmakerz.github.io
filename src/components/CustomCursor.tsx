"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0;
    let mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.15, ease: "power2.out" });
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.04 });
    };

    const onEnterLink = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      // Turn logo pink
      gsap.to(cursor, {
        scale: 1.35,
        filter: "brightness(0) saturate(100%) invert(55%) sepia(80%) saturate(600%) hue-rotate(285deg) brightness(1.1)",
        duration: 0.18,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0, duration: 0.12 });
      // Punch the element itself — skip Accordion buttons (handled separately)
      if (!target.closest("[data-no-hover]")) {
        gsap.to(target, { scale: 1.04, skewX: -2, duration: 0.14, ease: "power2.out" });
      }
    };

    const onLeaveLink = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(cursor, {
        scale: 1,
        filter: "none",
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.12 });
      if (!target.closest("[data-no-hover]")) {
        gsap.to(target, { scale: 1, skewX: 0, duration: 0.45, ease: "elastic.out(1, 0.5)" });
      }
    };

    window.addEventListener("mousemove", onMove);

    // Use MutationObserver to catch dynamically added elements
    const attachListeners = () => {
      const interactives = document.querySelectorAll("a, button, [role='button'], [data-clickable]");
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink as EventListener);
        el.removeEventListener("mouseleave", onLeaveLink as EventListener);
        el.addEventListener("mouseenter", onEnterLink as EventListener);
        el.addEventListener("mouseleave", onLeaveLink as EventListener);
      });

      // Section hover — subtle left-border flash + bg lift
      const sections = document.querySelectorAll("section, footer");
      sections.forEach((el) => {
        const s = el as HTMLElement;
        if (s.dataset.sectionHover) return; // already attached
        s.dataset.sectionHover = "1";

        s.addEventListener("mouseenter", () => {
          gsap.to(s, {
            boxShadow: "inset 3px 0 0 var(--red)",
            duration: 0.2,
            ease: "power2.out",
          });
        });
        s.addEventListener("mouseleave", () => {
          gsap.to(s, {
            boxShadow: "inset 0px 0 0 var(--red)",
            duration: 0.35,
            ease: "power2.out",
          });
        });
      });
    };

    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Logo cursor — trails the mouse */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          willChange: "transform",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "normal",
        }}
      >
        <Image
          src="/mess-small-logo.svg"
          alt=""
          width={56}
          height={25}
          draggable={false}
          className="select-none opacity-90"
          style={{ filter: "none" }}
        />
      </div>

      {/* Tiny red dot — snaps exactly to pointer */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[var(--red)] pointer-events-none z-[10000]"
        style={{ willChange: "transform", transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}
