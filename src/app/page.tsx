import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
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
      <Audience />
      <CoreEvents />
      <CommunityEvents />
      <Gallery />
      <Vision />
      <Footer />
    </main>
  );
}
