import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { StorePageContainer } from "@/components/store-page/StorePageContainer";

export default function StorePageView() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif", color: "#1E2A24", backgroundColor: "#F7F3EB" }}
    >
      <Navbar />
      <StorePageContainer />
      <Footer />
    </div>
  );
}
