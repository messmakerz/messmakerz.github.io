"use client";

import { useEffect } from "react";

// Global iOS autoplay fix: on first scroll or touch, play all muted videos
export default function VideoAutoplay() {
  useEffect(() => {
    const playAll = () => {
      document.querySelectorAll<HTMLVideoElement>("video[muted]").forEach((v) => {
        if (v.paused) v.play().catch(() => {});
      });
    };

    // Try immediately
    playAll();

    // On first user gesture (iOS Low Power Mode / Safari restrictions)
    document.addEventListener("touchstart", playAll, { once: false, passive: true });
    document.addEventListener("scroll", playAll, { once: true, passive: true });
    document.addEventListener("click", playAll, { once: true });

    return () => {
      document.removeEventListener("touchstart", playAll);
      document.removeEventListener("scroll", playAll);
      document.removeEventListener("click", playAll);
    };
  }, []);

  return null;
}
