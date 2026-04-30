"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VIDEOS = [
  {
    id: "mess-roldain",
    title: "MESS × ROLDAIN",
    file: "mess-roldain.mp4",
    duration: "0:51",
  },
  {
    id: "messy-sessions",
    title: "MESSY SESSIONS",
    file: "messy-sessions.mp4",
    duration: "1:47",
  },
];

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

interface VideoCardProps {
  video: (typeof VIDEOS)[0];
  index: number;
  onOpen: () => void;
}

function VideoCard({ video, index, onOpen }: VideoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    const v = previewRef.current;
    if (v) { v.currentTime = 0; v.play().catch(() => {}); }
  };
  const handleMouseLeave = () => {
    const v = previewRef.current;
    if (v) { v.pause(); v.currentTime = 0; }
  };

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 95%" },
        delay: index * 0.12,
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative cursor-none overflow-hidden"
      style={{ opacity: 0 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onOpen}
    >
      {/* Preview video — muted, plays on hover */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "9/16", maxHeight: "70vh" }}>
        <video
          ref={previewRef}
          src={`${base}/videos/${video.file}`}
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-500"
          muted
          playsInline
          loop
          preload="metadata"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />

        {/* Play icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/40 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M5 3l10 6-10 6V3z" fill="rgba(255,255,255,0.8)" />
            </svg>
          </div>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
          <div className="flex items-end justify-between">
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(1.1rem, 2.2vw, 1.8rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "#fff",
              }}
            >
              {video.title}
            </h3>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              {video.duration}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LightboxProps {
  video: (typeof VIDEOS)[0];
  onClose: () => void;
}

function VideoLightbox({ video, onClose }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    videoRef.current?.play().catch(() => {});

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => {
    videoRef.current?.pause();
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, onComplete: onClose });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] bg-black/95 flex flex-col items-center justify-center p-4"
      onClick={close}
    >
      <div className="w-full max-w-sm relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={close}
          className="absolute -top-10 right-0 text-white/50 hover:text-white transition-colors text-xs tracking-widest uppercase"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ESC / CLOSE ×
        </button>
        <video
          ref={videoRef}
          src={`${base}/videos/${video.file}`}
          className="w-full rounded-sm"
          controls
          playsInline
          style={{ maxHeight: "85vh", objectFit: "contain" }}
        />
        <p
          className="mt-3 text-center"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          {video.title}
        </p>
      </div>
    </div>
  );
}

export default function Videos() {
  const tagRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<(typeof VIDEOS)[0] | null>(null);

  useEffect(() => {
    gsap.fromTo(tagRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.7, scrollTrigger: { trigger: tagRef.current, start: "top 95%" } }
    );
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeVideo ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeVideo]);

  return (
    <>
      <section className="px-6 md:px-14 lg:px-20 py-4 md:py-8">
        <div ref={tagRef} className="flex items-center gap-3 pt-10 mb-14 border-t border-[var(--border)]">
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "var(--text-subtle)" }}>06</span>
          <span style={{ fontSize: "0.62rem", color: "var(--border-strong)" }}>—</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-subtle)" }}>Videos</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2">
          {VIDEOS.map((v, i) => (
            <VideoCard
              key={v.id}
              video={v}
              index={i}
              onOpen={() => setActiveVideo(v)}
            />
          ))}
        </div>
      </section>

      {activeVideo && (
        <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </>
  );
}
