import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageScrollSnap } from "@/components/shared/PageScrollSnap";
import { WildlifeArtPageContainer } from "@/components/wildlife-art-page/WildlifeArtPageContainer";

export default function WildlifeArtPageView() {
  return (
    <div
      className="min-h-screen bg-white overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif", color: "#333A33" }}
    >
      <PageScrollSnap />
      <Navbar />
      <WildlifeArtPageContainer />
      <Footer />
    </div>
  );
}
