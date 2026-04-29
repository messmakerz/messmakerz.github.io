import Link from "next/link";
import Image from "next/image";
import { EVENTS } from "@/lib/events";

export default function GalleryIndex() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <main className="min-h-[100dvh]" style={{ background: "var(--bg)" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 md:px-14 lg:px-20 pt-8 pb-6 border-b border-[var(--border)]">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${base}/mess-small-logo.svg`}
            alt="MESS Production"
            style={{ width: "clamp(52px, 5vw, 72px)", height: "auto" }}
            draggable={false}
          />
        </Link>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.6rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
          }}
        >
          Gallery
        </span>
      </div>

      {/* Section tag */}
      <div className="px-6 md:px-14 lg:px-20 pt-12 pb-10">
        <div className="flex items-center gap-3">
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "var(--text-subtle)" }}>All</span>
          <span style={{ fontSize: "0.62rem", color: "var(--border-strong)" }}>—</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
            Events
          </span>
        </div>
      </div>

      {/* Events list */}
      <div className="px-6 md:px-14 lg:px-20">
        {EVENTS.map((event, i) => (
          <Link
            key={event.slug}
            href={`/gallery/${event.slug}`}
            className="group block border-t border-[var(--border)] py-0 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Cover image */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "16/9" }}
              >
                <Image
                  src={`${base}/events/${event.slug}/${event.coverPhoto}.jpg`}
                  alt={event.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-[filter,transform] duration-700 group-hover:scale-[1.03]"
                  style={{ objectPosition: "50% 30%" }}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
              </div>

              {/* Info */}
              <div className="flex flex-col justify-between p-8 md:p-12">
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.22em",
                      color: "var(--text-subtle)",
                      display: "block",
                      marginBottom: "1.2rem",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 300,
                      fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1.0,
                      color: "var(--text)",
                    }}
                  >
                    {event.title}
                  </h2>
                </div>

                <div className="mt-8 flex items-end justify-between border-t border-[var(--border)] pt-5">
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.3rem" }}>Date</div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "0.88rem", color: "var(--text-muted)" }}>{event.date}</div>
                  </div>
                  <div className="text-right">
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.3rem" }}>Photos</div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "0.88rem", color: "var(--text-muted)" }}>{event.photos.length}</div>
                  </div>
                  <span
                    className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                    style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", color: "var(--text-subtle)" }}
                  >
                    View all ↗
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {EVENTS.length === 0 && (
          <p style={{ fontFamily: "var(--font-display)", color: "var(--text-subtle)", fontSize: "0.85rem" }}>
            No events yet.
          </p>
        )}
      </div>

      {/* Footer strip */}
      <div className="border-t border-[var(--border)] px-6 md:px-14 lg:px-20 py-5 mt-20 flex items-center justify-between">
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
          © 2026 MESS Production
        </span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
          Tel Aviv, Israel
        </span>
      </div>
    </main>
  );
}
