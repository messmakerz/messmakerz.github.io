"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EventCard from "./EventCard";

gsap.registerPlugin(ScrollTrigger);

const communityEvents = [
  {
    title: "MESSY SESSIONS",
    date: "5 sessions / year",
    tickets: "100 each",
    booking: "Jenia Tarso",
  },
  {
    title: "MESS GALA",
    date: "May 2025",
    tickets: "150",
    booking: "O.I, N.O.Y",
  },
  {
    title: "MESS BAKERY RAVE",
    date: "Sep 2025",
    tickets: "200",
    booking: "Mishell",
  },
];

export default function CommunityEvents() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".event-card");
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, skewY: -3 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          stagger: 0.1,
          duration: 0.55,
          ease: "expo.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 95%", toggleActions: "play reverse play reverse" },
        }
      );
    }
  }, []);

  return (
    <section className="px-8 md:px-16 lg:px-20 py-14 md:py-20">
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-14"
      >
        {communityEvents.map((event, i) => (
          <EventCard key={event.title} {...event} index={i} />
        ))}
      </div>
    </section>
  );
}
