import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageScrollSnap } from "@/components/shared/PageScrollSnap";
import { EventsAndProjectsPageContainer } from "@/components/events-and-projects-page/EventsAndProjectsPageContainer";
import { EventsPageHashScroll } from "@/components/events-and-projects-page/EventsPageHashScroll";

export default function EventsAndProjectsPageView() {
  return (
    <div
      className="min-h-screen bg-white overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif", color: "#333A33" }}
    >
      <PageScrollSnap />
      <EventsPageHashScroll targetId="events" />
      <Navbar />
      <EventsAndProjectsPageContainer />
      <Footer />
    </div>
  );
}
