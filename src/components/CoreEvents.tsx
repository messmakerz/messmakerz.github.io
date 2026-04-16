"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EventCard from "./EventCard";

gsap.registerPlugin(ScrollTrigger);

const coreEvents = [
  {
    title: "MESS PLANET",
    date: "December 2024",
    tickets: "600",
    booking: "Mita Gami",
  },
  {
    title: "LIVE FROM HELL",
    date: "March 2025",
    tickets: "1,000",
    booking: "Omri, Garden City Movement",
  },
  {
    title: "A TRIBE CALLED MESS",
    date: "Aug 2025",
    tickets: "800",
    booking: "Darco Genish",
  },
  {
    title: "MESS JUNGLE TRIP",
    date: "Oct 2025",
    tickets: "1,200",
    booking: "Cour T, Kino Todo",
  },
];

export default function CoreEvents() {
  const sectionRef = useRef<HTMLElement>(null);
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
    <section
      ref={sectionRef}
      className="px-8 md:px-16 lg:px-20 py-14 md:py-20"
    >
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-14"
      >
        {coreEvents.map((event, i) => (
          <EventCard key={event.title} {...event} index={i} />
        ))}
      </div>
    </section>
  );
}
