import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageScrollSnap } from "@/components/shared/PageScrollSnap";
import { NaturalistGuidelinesPageContainer } from "@/components/naturalist-guidelines-page/NaturalistGuidelinesPageContainer";

export default function NaturalistGuidelinesPageView() {
  return (
    <div
      className="min-h-screen bg-[#f4f7f4] overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif", color: "#333A33" }}
    >
      <PageScrollSnap />
      <Navbar />
      <NaturalistGuidelinesPageContainer />
      <Footer />
    </div>
  );
}
