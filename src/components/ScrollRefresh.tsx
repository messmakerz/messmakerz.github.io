"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollRefresh() {
  useEffect(() => {
    // Refresh after fonts + images settle
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 500);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 1500);
    const t3 = setTimeout(() => ScrollTrigger.refresh(), 3000);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
