"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const ADMIN_API = "https://mess-admin-prod.vercel.app";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/mess.makerz/" },
  { label: "SoundCloud", href: "https://soundcloud.com/messmakerz" },
  { label: "YouTube", href: "https://www.youtube.com/@MessRecordings" },
  { label: "Contact", href: "mailto:mess@mishell.com" },
];

function ArrowUpRight() {
  return (
    <svg width="10" height="10" viewBox="0 0 9 9" fill="none" aria-hidden="true">
      <path d="M1.5 7.5L7.5 1.5M7.5 1.5H2.5M7.5 1.5V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStatus("loading");
    try {
      const res = await fetch(`${ADMIN_API}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p style={{ fontFamily: "var(--font-display)", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
        You&apos;re in.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <p style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.5rem" }}>
        Stay in the loop
      </p>
      <div className="flex gap-0 border-b border-[var(--border)]">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "0.82rem",
            color: "var(--text)",
            padding: "8px 0",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-display)",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: status === "loading" ? "var(--text-subtle)" : "var(--text)",
            padding: "8px 0 8px 12px",
            transition: "color 0.2s",
          }}
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", color: "var(--text-subtle)" }}>
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}

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
          <div className="md:col-span-1">
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

          {/* Newsletter */}
          <div className="flex flex-col justify-start">
            <NewsletterForm />
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
                <span style={{ color: "var(--text-subtle)" }}><ArrowUpRight /></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
