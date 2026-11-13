import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageScrollSnap } from "@/components/shared/PageScrollSnap";
import { SponsorshipPageContainer } from "@/components/sponsorship-page/SponsorshipPageContainer";

export default function SponsorshipPageView() {
  return (
    <div
      className="min-h-screen bg-[#f4f7f4] overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif", color: "#333A33" }}
    >
      <PageScrollSnap />
      <Navbar />
      <SponsorshipPageContainer />
      <Footer />
    </div>
  );
}
