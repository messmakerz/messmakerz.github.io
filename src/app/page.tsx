import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import Audience from "@/components/Audience";
import CoreEvents from "@/components/CoreEvents";
import PhotoBreak from "@/components/PhotoBreak";
import CommunityEvents from "@/components/CommunityEvents";
import InternationalEvents from "@/components/InternationalEvents";
import Vision from "@/components/Vision";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <WhoWeAre />
      <Audience />
      <Vision />
      <CoreEvents />
      <PhotoBreak />
      <InternationalEvents />
      <CommunityEvents />
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
