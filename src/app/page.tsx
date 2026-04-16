import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import Accordion from "@/components/Accordion";
import Audience from "@/components/Audience";
import CoreEvents from "@/components/CoreEvents";
import CommunityEvents from "@/components/CommunityEvents";
import Gallery from "@/components/Gallery";
import Vision from "@/components/Vision";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhoWeAre />

      <Accordion title="THE NUMBERS" index={0}>
        <Audience />
      </Accordion>

      <Accordion title="CORE EVENTS RECAP" index={1}>
        <CoreEvents />
      </Accordion>

      <Accordion title="COMMUNITY EVENTS RECAP" index={2}>
        <CommunityEvents />
      </Accordion>

      <Accordion title="GALLERY" index={3}>
        <Gallery />
      </Accordion>

      <Accordion title="VISION" index={4}>
        <Vision />
      </Accordion>

      <Footer />
    </main>
  );
}
