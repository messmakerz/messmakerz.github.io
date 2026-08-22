"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const ADMIN_API = "https://mess-admin-seven.vercel.app";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

/* Minimal, editorial newsletter: one hairline rule carries the whole form.
   Transparent fields, a thin divider, and the CTA as micro-type at the end —
   no boxes, no fills. The rule brightens on focus-within. */
const fieldStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  outline: "none",
  fontFamily: "var(--font-display)",
  fontWeight: 300,
  fontSize: "0.95rem",
  color: "var(--text)",
  padding: "16px 4px",
  letterSpacing: "0.01em",
  minWidth: 0,
  boxSizing: "border-box",
};

function HeroNewsletter() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [focused, setFocused] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || !phone.trim() || !consent) return;
    setStatus("loading");
    try {
      const res = await fetch(`${ADMIN_API}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone: phone.trim() }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) { setEmail(""); setPhone(""); setConsent(false); }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center justify-center gap-3" style={{ minHeight: "108px" }}>
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]" style={{ flexShrink: 0 }} />
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.7rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          You&apos;re in. We&apos;ll be in touch.
        </span>
      </div>
    );
  }

  const hasErr = status === "error";
  const canSubmit = consent && status !== "loading";
  const rule = `1px solid ${hasErr ? "rgba(200,60,60,0.85)" : focused ? "rgba(255,255,255,0.62)" : "rgba(255,255,255,0.28)"}`;

  return (
    <div style={{ width: "min(100%, 520px)", margin: "0 auto" }}>
      <form onSubmit={handleSubmit}>
        {/* One rule, three fields */}
        <div
          className="flex flex-wrap items-stretch"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          {/* Two rule-groups: side by side they read as one continuous line;
              on mobile they wrap into two rules so the email stays readable. */}
          <div style={{ flex: "3 1 220px", display: "flex", borderBottom: rule, transition: "border-color 0.3s ease" }}>
            <input
              type="email"
              aria-label="Email address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (hasErr) setStatus("idle"); }}
              placeholder="Email"
              required
              style={{ ...fieldStyle, flex: "1 1 0" }}
            />
          </div>
          <div style={{ flex: "1 1 240px", display: "flex", alignItems: "stretch", borderBottom: rule, transition: "border-color 0.3s ease" }}>
            <span aria-hidden="true" className="hidden md:block" style={{ width: "1px", background: "rgba(255,255,255,0.16)", margin: "14px 16px", flexShrink: 0 }} />
            <input
              type="tel"
              aria-label="Phone number"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); if (hasErr) setStatus("idle"); }}
              placeholder="Phone"
              required
              style={{ ...fieldStyle, flex: "1 1 auto" }}
            />
            <button
            type="submit"
            disabled={!canSubmit}
            className="group/join"
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "0 2px 0 20px",
              background: "transparent",
              border: "none",
              fontFamily: "var(--font-display)",
              fontSize: "0.62rem",
              fontWeight: 500,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              color: canSubmit ? "var(--red)" : "rgba(255,255,255,0.25)",
              cursor: canSubmit ? "pointer" : "default",
              transition: "color 0.25s",
            }}
            onMouseEnter={(e) => { if (canSubmit) e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={(e) => { if (canSubmit) e.currentTarget.style.color = "var(--red)"; }}
          >
            {status === "loading" ? (
              <span style={{ display: "inline-flex", gap: "3px", alignItems: "center" }}>
                <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "currentColor", animation: "pulse 1s ease-in-out infinite" }} />
                <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "currentColor", animation: "pulse 1s ease-in-out 0.2s infinite" }} />
                <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "currentColor", animation: "pulse 1s ease-in-out 0.4s infinite" }} />
              </span>
            ) : (
              "Join"
            )}
            </button>
          </div>
        </div>

        {/* Consent — quiet, but a real 44px-tall target */}
        <label className="flex items-start justify-center gap-2.5 cursor-pointer" style={{ marginTop: "16px", padding: "6px 0" }}>
          <span style={{ position: "relative", flexShrink: 0, marginTop: "2px", display: "block" }}>
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              style={{ position: "absolute", opacity: 0, width: "13px", height: "13px", cursor: "pointer" }}
            />
            <span style={{
              width: "13px",
              height: "13px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${consent ? "var(--red)" : "rgba(255,255,255,0.28)"}`,
              background: consent ? "var(--red)" : "transparent",
              transition: "background 0.18s, border-color 0.18s",
            }}>
              {consent && (
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
                  <path d="M1 3L3 5L7 1" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
          </span>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.58rem",
            letterSpacing: "0.06em",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.38)",
            textAlign: "left",
          }}>
            I agree to receive the newsletter, updates and marketing emails.{" "}
            <a href="/privacy" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "underline", textUnderlineOffset: "2px" }}>Privacy Policy</a>
            {" "}·{" "}
            <a href="/terms" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "underline", textUnderlineOffset: "2px" }}>Terms</a>
          </span>
        </label>
      </form>

      {hasErr && (
        <p style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(200,60,60,0.9)", margin: "10px 0 0" }}>
          Something went wrong — try again
        </p>
      )}
    </div>
  );
}

interface HeroProps {
  hideNewsletter?: boolean;
}

export default function Hero({ hideNewsletter = false }: HeroProps) {
  const logoRef = useRef<HTMLImageElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = bgVideoRef.current;
    if (!v) return;

    const tryPlay = () => { v.play().catch(() => {}); };

    tryPlay();
    v.addEventListener("loadedmetadata", tryPlay);
    v.addEventListener("canplay", tryPlay);

    // Fallback: play on first user interaction (iOS Low Power Mode, etc.)
    document.addEventListener("touchstart", tryPlay, { once: true, passive: true });
    document.addEventListener("click", tryPlay, { once: true });

    return () => {
      v.removeEventListener("loadedmetadata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("click", tryPlay);
    };
  }, []);

  useEffect(() => {
    // fromTo (not set + to) so the markup stays visible if JS never runs
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(logoRef.current,
      { opacity: 0, y: 18, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2 }, 0.25
    );
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9 }, 0.75);
    }
    return () => { tl.kill(); };
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Video bg */}
      <video
        ref={bgVideoRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.25 }}
        src={`${base}/hero-bg.mp4`}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Vignette + top/bottom fade for legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 85% at 50% 45%, transparent 30%, rgba(0,0,0,0.45) 100%), linear-gradient(to bottom, var(--bg) 0%, transparent 22%, transparent 62%, var(--bg) 100%)",
        }}
      />

      {/* Content — centered stack */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-14 pt-28 md:pt-32 pb-8 md:pb-20 min-h-[80dvh] md:min-h-[100dvh]"
      >
        {/* MESS logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={logoRef}
          src={`${base}/mess-small-logo.svg`}
          alt="MESS"
          draggable={false}
          className="select-none"
          style={{ width: "clamp(280px, 48vw, 620px)", height: "auto" }}
        />


        {/* Newsletter */}
        {!hideNewsletter && (
          <div ref={ctaRef} className="w-full" style={{ marginTop: "clamp(48px, 8vh, 96px)" }}>
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.58rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "20px",
            }}>
              Be the first to know
            </p>
            <HeroNewsletter />
          </div>
        )}
      </div>
    </section>
  );
}
