import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import Mixes from "@/components/Mixes";
import Merch from "@/components/Merch";
import CoreEvents from "@/components/CoreEvents";
import PhotoBreak from "@/components/PhotoBreak";
import CommunityEvents from "@/components/CommunityEvents";
import InternationalEvents from "@/components/InternationalEvents";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <WhoWeAre />
      <Mixes />
      <Merch />
      <CoreEvents sectionNumber="04" />
      <PhotoBreak />
      <InternationalEvents sectionNumber="05" />
      <CommunityEvents sectionNumber="06" />
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
