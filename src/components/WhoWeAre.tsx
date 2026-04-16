"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (heading) {
      const text = heading.textContent ?? "";
      heading.innerHTML = text
        .split("")
        .map((ch) =>
          ch === " "
            ? "<span style='display:inline-block'>&nbsp;</span>"
            : `<span style='display:inline-block;overflow:hidden'><span class='char' style='display:inline-block'>${ch}</span></span>`
        )
        .join("");

      const chars = heading.querySelectorAll(".char");
      // Punk entrance: slam in from below with skew
      gsap.fromTo(
        chars,
        { y: "120%", skewX: -15, opacity: 0 },
        {
          y: "0%",
          skewX: 0,
          opacity: 1,
          stagger: 0.025,
          duration: 0.5,
          ease: "expo.out",
          scrollTrigger: { trigger: heading, start: "top 95%", toggleActions: "play reverse play reverse" },
        }
      );
    }

    // Body text: lines fly in with hard ease
    gsap.fromTo(
      bodyRef.current,
      { x: -40, opacity: 0, skewX: -4 },
      {
        x: 0,
        opacity: 1,
        skewX: 0,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: { trigger: bodyRef.current, start: "top 95%", toggleActions: "play reverse play reverse" },
      }
    );

    // Image: hard clip reveal from left
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: { trigger: imgRef.current, start: "top 95%", toggleActions: "play reverse play reverse" },
        }
      );
    }

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-8 md:px-16 lg:px-20 py-20 md:py-28 lg:py-36"
    >
      <div className="max-w-6xl">
        <h2
          ref={headingRef}
          className="text-6xl md:text-8xl lg:text-[7rem] font-bold leading-none mb-12 md:mb-16"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.04em" }}
        >
          WHO ARE WE?
        </h2>

        <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
          {/* Square image — clip reveal */}
          <div
            ref={imgRef}
            className="w-full md:w-[42%] shrink-0 overflow-hidden"
            style={{ aspectRatio: "1 / 1", clipPath: "inset(0 100% 0 0)" }}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/mishell.jpg`}
              alt="Mishell"
              width={600}
              height={600}
              className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center">
            <p
              ref={bodyRef}
              className="text-base md:text-lg font-light leading-relaxed text-[var(--text-muted)]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              Mess Makers is Mishell&apos;s core community. Supported by his local
              team, Mishell has built a unique brand that brings a fresh style to
              the local and international scene.
              <br /><br />
              Mess is dedicated to producing{" "}
              <span className="text-[var(--red)]">concept-driven events, fashion, music, and more</span>{" "}
              — always with a bold, sexy, naughty and uncompromising approach,
              fully committed to pure art.
              <br /><br />
              The brand allows Mishell to form a direct connection with his
              audience and add a new dimension to his journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
