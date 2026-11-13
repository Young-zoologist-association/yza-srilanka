import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageScrollSnap } from "@/components/shared/PageScrollSnap";
import { JuniorYzaPageContainer } from "@/components/junior-yza-page/JuniorYzaPageContainer";

export default function JuniorYzaPageView() {
  return (
    <div
      className="min-h-screen bg-white overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif", color: "#333A33" }}
    >
      <PageScrollSnap />
      <Navbar />
      <JuniorYzaPageContainer />
      <Footer />
    </div>
  );
}
