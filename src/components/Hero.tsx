"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const ADMIN_API = "https://mess-admin-seven.vercel.app";

const inputStyle = (err: boolean): React.CSSProperties => ({
  width: "100%",
  background: err ? "rgba(180,30,30,0.15)" : "rgba(255,255,255,0.12)",
  border: err ? "1px solid rgba(180,30,30,0.8)" : "1px solid rgba(255,255,255,0.5)",
  outline: "none",
  fontFamily: "var(--font-display)",
  fontWeight: 300,
  fontSize: "1rem",
  color: "var(--text)",
  padding: "14px 18px",
  letterSpacing: "0.02em",
  boxSizing: "border-box" as const,
  transition: "border-color 0.2s, background 0.2s",
});

function HeroNewsletter() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
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
      <div className="flex items-center gap-3" style={{ padding: "14px 0" }}>
        <span className="w-2 h-2 rounded-full bg-[var(--red)]" style={{ flexShrink: 0 }} />
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text)" }}>
          You&apos;re in. We&apos;ll be in touch.
        </span>
      </div>
    );
  }

  const hasErr = status === "error";
  const canSubmit = consent && status !== "loading";

  return (
    <div style={{ width: "min(100%, 620px)" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {/* Inputs row */}
        <div style={{ display: "flex" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (hasErr) setStatus("idle"); }}
            placeholder="your@email.com"
            required
            style={{ ...inputStyle(hasErr), flex: "1 1 0", minWidth: 0 }}
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => { setPhone(e.target.value); if (hasErr) setStatus("idle"); }}
            placeholder="+972 50 000 0000"
            required
            style={{ ...inputStyle(hasErr), flex: "0 1 160px", minWidth: 0, borderLeft: "none" }}
          />
          <button
            type="submit"
            disabled={!canSubmit}
            style={{
              flexShrink: 0,
              padding: "0 20px",
              fontFamily: "var(--font-display)",
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              color: "#fff",
              background: canSubmit ? "var(--red)" : "rgba(200,41,58,0.35)",
              border: `1px solid ${canSubmit ? "var(--red)" : "rgba(200,41,58,0.35)"}`,
              cursor: canSubmit ? "pointer" : "default",
              transition: "opacity 0.2s, background 0.2s, color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => { if (canSubmit) { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#0a0a0a"; e.currentTarget.style.borderColor = "#fff"; }}}
            onMouseLeave={(e) => { if (canSubmit) { e.currentTarget.style.background = "var(--red)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "var(--red)"; }}}
          >
            {status === "loading" ? (
              <span style={{ display: "inline-flex", gap: "3px", alignItems: "center" }}>
                <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "currentColor", animation: "pulse 1s ease-in-out infinite" }} />
                <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "currentColor", animation: "pulse 1s ease-in-out 0.2s infinite" }} />
                <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "currentColor", animation: "pulse 1s ease-in-out 0.4s infinite" }} />
              </span>
            ) : "Join"}
          </button>
        </div>

        {/* Consent checkbox */}
        <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginTop: "12px", cursor: "pointer" }}>
          <div style={{ position: "relative", flexShrink: 0, marginTop: "1px" }}>
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              style={{ position: "absolute", opacity: 0, width: "14px", height: "14px", cursor: "pointer" }}
            />
            <div style={{
              width: "14px",
              height: "14px",
              border: `1px solid ${consent ? "var(--red)" : "rgba(255,255,255,0.3)"}`,
              background: consent ? "var(--red)" : "transparent",
              transition: "background 0.15s, border-color 0.15s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              {consent && (
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                  <path d="M1 3L3 5L7 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          </div>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.6rem",
            letterSpacing: "0.08em",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.45)",
          }}>
            I agree to receive the newsletter, updates and marketing emails.{" "}
            <a href="/privacy" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "underline", textUnderlineOffset: "2px" }}>Privacy Policy</a>
            {" "}·{" "}
            <a href="/terms" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "underline", textUnderlineOffset: "2px" }}>Terms</a>
          </span>
        </label>
      </form>

      {hasErr && (
        <p style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(200,60,60,0.9)", margin: "8px 0 0" }}>
          Something went wrong — try again
        </p>
      )}
    </div>
  );
}

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

interface HeroProps {
  hideNewsletter?: boolean;
}

export default function Hero({ hideNewsletter = false }: HeroProps) {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = bgVideoRef.current;
    if (!v) return;

    const tryPlay = () => { v.play().catch(() => {}); };

    // Try immediately and on metadata loaded
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
    const els = [line1Ref.current, line2Ref.current, ctaRef.current];
    gsap.killTweensOf(els);
    gsap.set(els, { opacity: 0 });
    gsap.set([line1Ref.current, line2Ref.current], { y: 28 });
    gsap.set(ctaRef.current, { y: 16 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl
      .to(line1Ref.current, { opacity: 1, y: 0, duration: 1.1 }, 0.35)
      .to(line2Ref.current, { opacity: 1, y: 0, duration: 1.1 }, 0.5)
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.75);
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
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

      {/* MESS logo overlay — right side, behind content */}
      <img
        src={`${base}/mess-small-logo.svg`}
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{
          right: "40px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "clamp(280px, 55vw, 780px)",
          opacity: 0.18,
          zIndex: 5,
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg) 0%, transparent 20%, transparent 55%, var(--bg) 100%)",
        }}
      />



{/* Content */}
      <div className="relative z-10 px-6 md:px-14 lg:px-20 pt-28 md:pt-36 pb-14 md:pb-20">

        {/* Display type */}
        <div
          ref={line1Ref}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(3rem, 9.5vw, 10.5rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.04em",
            color: "var(--text)",
          }}
        >
          CONCEPT-DRIVEN
        </div>

        <div ref={line2Ref} className="relative">
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(3rem, 9.5vw, 10.5rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
              color: "var(--text)",
            }}
          >
            EVENTS.
          </div>

          {/* Tagline */}
          <p
            className="mt-4 md:mt-0 md:absolute md:bottom-[0.4em] md:right-0"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(0.72rem, 1.1vw, 0.88rem)",
              lineHeight: 1.65,
              letterSpacing: "0.01em",
              color: "var(--text-subtle)",
              maxWidth: "24ch",
              textAlign: "right",
            }}
          >
            Bold, sexy, uncompromising.
            <br />
            Production based in Tel Aviv.
          </p>
        </div>

        {/* Newsletter CTA */}
        <div ref={ctaRef} className="mt-12 md:mt-16">
          {!hideNewsletter && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "28px", display: "inline-block" }}>
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.82rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "18px",
              fontWeight: 400,
            }}>
              Sign up here to be the first to know
            </p>
            <HeroNewsletter />
          </div>
          )}
        </div>

      </div>
    </section>
  );
}
