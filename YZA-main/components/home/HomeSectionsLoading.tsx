import { AboutLoading } from "@/components/home/about-section/AboutLoading";
import { EventsLoading } from "@/components/home/events/EventsLoading";
import { HeroLoading } from "@/components/home/hero/HeroLoading";
import { StoreLoading } from "@/components/home/store/StoreLoading";
import { StudyGroupsLoading } from "@/components/home/study-groups/StudyGroupsLoading";

export function HomeSectionsLoading() {
  return (
    <>
      <HeroLoading />
      <AboutLoading />
      <StudyGroupsLoading />
      <EventsLoading />
      <StoreLoading />
    </>
  );
}
