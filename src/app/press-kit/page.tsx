import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import Audience from "@/components/Audience";
import CoreEvents from "@/components/CoreEvents";
import PhotoBreak from "@/components/PhotoBreak";
import CommunityEvents from "@/components/CommunityEvents";
import InternationalEvents from "@/components/InternationalEvents";
import Vision from "@/components/Vision";
import Mixes from "@/components/Mixes";
import Merch from "@/components/Merch";
import Footer from "@/components/Footer";

export const metadata = {
  title: "MESS Press Kit",
  description: "Official press kit for MESS — concept-driven events. Bold, sexy, uncompromising. Production based in Tel Aviv.",
  openGraph: {
    title: "MESS Press Kit",
    description: "Official press kit for MESS — concept-driven events. Bold, sexy, uncompromising. Production based in Tel Aviv.",
    url: "https://messmakerz.com/press-kit",
    siteName: "MESS",
    type: "website",
    images: [{ url: "https://messmakerz.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MESS Press Kit",
    description: "Official press kit for MESS — concept-driven events. Bold, sexy, uncompromising. Production based in Tel Aviv.",
  },
};

export default function PressKit() {
  return (
    <main>
      <Header />

      {/* Press Kit label */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          pointerEvents: "none",
          display: "flex",
          justifyContent: "center",
          paddingTop: "18px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.55rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
            background: "var(--bg)",
            padding: "4px 14px",
            border: "1px solid var(--border)",
          }}
        >
          Mess Press Kit
        </span>
      </div>

      <Hero hideNewsletter />
      <WhoWeAre />
      <Audience />
      <Vision />
      <CoreEvents showDetails />
      <PhotoBreak />
      <InternationalEvents showDetails />
      <CommunityEvents showDetails />
      <Mixes />
      <Merch />
      <Footer />
      <div className="border-t border-[var(--border)] px-6 md:px-14 lg:px-20 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
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
