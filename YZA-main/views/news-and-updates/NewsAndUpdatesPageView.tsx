import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageScrollSnap } from "@/components/shared/PageScrollSnap";
import { NewsAndUpdatesPageContainer } from "@/components/news-and-updates-page/NewsAndUpdatesPageContainer";

export default function NewsAndUpdatesPageView() {
  return (
    <div
      className="min-h-screen bg-white overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif", color: "#333A33" }}
    >
      <PageScrollSnap />
      <Navbar />
      <NewsAndUpdatesPageContainer />
      <Footer />
    </div>
  );
}
