"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { MapPin, ArrowRight, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { PdfArchivePagination } from "@/components/pdf-archive/PdfArchivePagination";
import { EventDetailsDialog } from "@/components/home/events/EventDetailsDialog";
import type {
  EventCardContent,
  EventsContent,
} from "@/lib/home/events/resolveEventsContent";
import { EVENTS_FALLBACK } from "@/lib/home/events/resolveEventsContent";
import {
  buildMonthCalendarCells,
  formatCalendarMonthLabel,
  getCurrentCalendarMonth,
  getEventDayNumbersInMonth,
  getTodayDayInMonth,
  isEventToday,
  shiftCalendarMonth,
} from "@/lib/home/events/eventDateUtils";
import {
  buildEventsSectionUrl,
  truncateEventDescription,
} from "@/lib/home/events/eventDescriptionUtils";
import { EVENTS_PAGE_SIZE, usePaginatedItems } from "@/lib/pagination";
import { scrollToHashSectionWhenReady } from "@/lib/shared/scrollToSection";

const HOME_EVENTS_DISPLAY_LIMIT = 3;
const EVENTS_PAGE_ACTION_LABEL = "View Event";

interface EventsSectionProps {
  content?: EventsContent;
  /** Max event cards to show without pagination (home page). Defaults to 3. */
  maxCards?: number;
  /** When set, paginate the full event list with this many cards per page. */
  cardsPageSize?: number;
  /** Hide the “View all events” link (used on the full events page). */
  hideViewAllLink?: boolean;
  /** Home: link to Events & Projects. Full page: open details dialog. */
  detailsBehavior?: "navigate" | "dialog";
  /** Scroll to this section when the URL hash matches (Events & Projects page). */
  focusHashOnMount?: boolean;
  sectionId?: string;
}

function EventCard({
  event,
  index,
  inView,
  detailsButtonLabel,
  descriptionPreview,
  detailsBehavior,
  onOpenDetails,
  compact = false,
}: {
  event: EventCardContent;
  index: number;
  inView: boolean;
  detailsButtonLabel: string;
  descriptionPreview: string;
  detailsBehavior: "navigate" | "dialog";
  onOpenDetails?: () => void;
  compact?: boolean;
}) {
  const todayEvent = isEventToday(event);

  const detailsControl =
    detailsBehavior === "navigate" ? (
      <Link
        href={buildEventsSectionUrl()}
        scroll={false}
        className="inline-flex items-center gap-1 text-[#3F7A4E] hover:text-[#1F8A7B] text-sm font-medium transition-colors duration-200 whitespace-nowrap"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {detailsButtonLabel} <ChevronRight className="w-3.5 h-3.5" />
      </Link>
    ) : (
      <button
        type="button"
        onClick={onOpenDetails}
        className="inline-flex items-center gap-1.5 text-[#3F7A4E] hover:text-[#1F8A7B] text-sm font-medium transition-colors duration-200 whitespace-nowrap"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {EVENTS_PAGE_ACTION_LABEL} <ChevronRight className="w-3.5 h-3.5" />
      </button>
    );

  if (!compact) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`group relative bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:shadow-[#3F7A4E]/10 ${
          event.featured ? "border-[#F2A93B]/50 shadow-md" : "border-[#3F7A4E]/10 shadow-sm"
        }`}
      >
        {event.featured && (
          <div className="absolute top-4 right-4 bg-[#F2A93B] text-[#333A33] text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">
            Featured
          </div>
        )}

        <div className="p-4 sm:p-6">
          <div className="flex gap-3 sm:gap-5">
            <div
              className={`flex-shrink-0 flex flex-col items-center justify-center w-12 h-14 sm:w-14 sm:h-16 rounded-xl ${
                todayEvent ? "bg-[#3F7A4E] text-white" : "bg-[#F2A93B] text-[#333A33]"
              }`}
            >
              <span
                className="text-[10px] tracking-widest uppercase opacity-80"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {event.month}
              </span>
              <span
                className="text-2xl font-bold leading-none"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {event.day}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <span
                className="inline-block text-[10px] tracking-wider uppercase font-semibold px-2.5 py-0.5 rounded-full mb-2"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: `${event.categoryColor}18`,
                  color: event.categoryColor,
                }}
              >
                {event.category}
              </span>

              <h3
                className="text-[#333A33] mb-2 leading-snug group-hover:text-[#3F7A4E] transition-colors duration-200"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                }}
              >
                {event.title}
              </h3>

              <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
                <span
                  className="flex items-center gap-1.5 text-[#6b7769] text-xs"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Clock className="w-3.5 h-3.5 text-[#3F7A4E]/60" />
                  {event.time}
                </span>
                <span
                  className="flex items-center gap-1.5 text-[#6b7769] text-xs"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <MapPin className="w-3.5 h-3.5 text-[#3F7A4E]/60" />
                  {event.location}
                </span>
              </div>

              <p
                className="text-[#6b7769] text-sm leading-relaxed mb-4"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {descriptionPreview}
              </p>

              {detailsControl}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:shadow-[#3F7A4E]/10 ${
        event.featured ? "border-[#F2A93B]/50 shadow-md" : "border-[#3F7A4E]/10 shadow-sm"
      }`}
    >
      {event.featured && (
        <div className="absolute top-3 right-3 bg-[#F2A93B] text-[#333A33] text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">
          Featured
        </div>
      )}

      <div className="p-4 sm:p-5">
        <div className="flex gap-3 sm:gap-4">
          <div
            className={`flex-shrink-0 flex flex-col items-center justify-center w-12 h-14 sm:w-14 sm:h-16 rounded-xl ${
              todayEvent ? "bg-[#3F7A4E] text-white" : "bg-[#F2A93B] text-[#333A33]"
            }`}
          >
            <span
              className="text-[10px] tracking-widest uppercase opacity-80"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {event.month}
            </span>
            <span
              className="text-2xl font-bold leading-none"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {event.day}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <span
              className="mb-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: `${event.categoryColor}18`,
                color: event.categoryColor,
              }}
            >
              {event.category}
            </span>

            <h3
              className="mb-2 line-clamp-2 leading-snug text-[#333A33] transition-colors duration-200 group-hover:text-[#3F7A4E]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.05rem",
                fontWeight: 700,
              }}
            >
              {event.title}
            </h3>

            <div className="mb-2.5 flex flex-wrap gap-x-3 gap-y-1">
              <span
                className="flex items-center gap-1.5 text-xs text-[#6b7769]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <Clock className="h-3.5 w-3.5 shrink-0 text-[#3F7A4E]/60" />
                {event.time}
              </span>
              <span
                className="flex items-center gap-1.5 text-xs text-[#6b7769]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#3F7A4E]/60" />
                <span className="line-clamp-1">{event.location}</span>
              </span>
            </div>

            <p
              className="mb-3 line-clamp-2 text-sm leading-relaxed text-[#6b7769]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {descriptionPreview}
            </p>

            {detailsControl}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function EventsSection({
  content = EVENTS_FALLBACK,
  maxCards = HOME_EVENTS_DISPLAY_LIMIT,
  cardsPageSize,
  hideViewAllLink = false,
  detailsBehavior = "navigate",
  focusHashOnMount = false,
  sectionId = "events",
}: EventsSectionProps) {
  const {
    eyebrow,
    titlePlain,
    titleHighlight,
    description,
    detailsButtonLabel,
    cards,
  } = content;

  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isPaginated = cardsPageSize !== undefined;
  const pagination = usePaginatedItems(
    cards,
    cardsPageSize ?? EVENTS_PAGE_SIZE,
    cards.length,
  );
  const visibleCards =
    isPaginated ? pagination.paginatedItems : cards.slice(0, maxCards);
  const [viewDate, setViewDate] = useState(() => getCurrentCalendarMonth());
  const [selectedEvent, setSelectedEvent] = useState<EventCardContent | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dialogScrollYRef = useRef(0);

  const openEventDetails = (event: EventCardContent) => {
    dialogScrollYRef.current = window.scrollY;
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  const handleDialogOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      dialogScrollYRef.current = window.scrollY;
      setDialogOpen(true);
      return;
    }

    setDialogOpen(false);
  };

  useEffect(() => {
    if (!focusHashOnMount) return;

    const hash = `#${sectionId}`;
    if (window.location.hash !== hash) return;

    let cancelPending = scrollToHashSectionWhenReady(hash, "smooth");

    const onHashChange = () => {
      cancelPending();
      if (window.location.hash === hash) {
        cancelPending = scrollToHashSectionWhenReady(hash, "smooth");
      }
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      cancelPending();
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [focusHashOnMount, sectionId]);

  const getDescriptionPreview = (event: EventCardContent): string =>
    truncateEventDescription(event.description);

  const { calendarCells, eventDays, todayDay, calendarLabel } = useMemo(() => {
    const { year, month } = viewDate;
    return {
      calendarCells: buildMonthCalendarCells(year, month),
      eventDays: getEventDayNumbersInMonth(cards, year, month),
      todayDay: getTodayDayInMonth(year, month),
      calendarLabel: formatCalendarMonthLabel(year, month),
    };
  }, [viewDate, cards]);

  const todayMonth = getCurrentCalendarMonth();
  const isViewingCurrentMonth =
    viewDate.year === todayMonth.year && viewDate.month === todayMonth.month;

  const goToPreviousMonth = () => {
    setViewDate((current) => shiftCalendarMonth(current.year, current.month, -1));
  };

  const goToNextMonth = () => {
    setViewDate((current) => shiftCalendarMonth(current.year, current.month, 1));
  };

  const goToToday = () => {
    setViewDate(getCurrentCalendarMonth());
  };

  const getCalendarDayClassName = (day: number | null): string => {
    if (day === null) return "";

    const isToday = todayDay === day;
    const isEventDay = eventDays.has(day);

    if (isToday) {
      return "bg-[#3F7A4E] text-white font-semibold";
    }
    if (isEventDay) {
      return "bg-[#F2A93B] text-[#333A33] font-bold";
    }
    return "text-[#333A33] hover:bg-[#f4f7f4] cursor-pointer";
  };

  return (
    <section
      id={sectionId}
      className={`page-snap-section bg-white ${
        isPaginated ? "py-10 sm:py-12" : "py-16 sm:py-24"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={
            isPaginated
              ? "grid items-stretch gap-8 sm:gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-12 lg:min-h-[38rem]"
              : "grid items-start gap-10 sm:gap-16 lg:grid-cols-[1fr_1.6fr]"
          }
        >
          <div ref={ref} className={isPaginated ? "lg:h-full" : undefined}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className={`flex items-center gap-3 ${isPaginated ? "mb-3" : "mb-4"}`}
            >
              <div className="h-px w-8 bg-[#F2A93B]" />
              <span
                className="text-[#F2A93B] text-xs tracking-[0.25em] uppercase font-semibold"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {eyebrow}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-[#333A33] leading-tight ${isPaginated ? "mb-3" : "mb-5"}`}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: isPaginated
                  ? "clamp(1.75rem, 3.5vw, 2.5rem)"
                  : "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
              }}
            >
              {titlePlain} <span className="text-[#3F7A4E]">{titleHighlight}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 }}
              className={`text-[#6b7769] leading-relaxed ${
                isPaginated ? "mb-5 text-sm" : "mb-8"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className={`rounded-2xl overflow-hidden shadow-xl shadow-[#3F7A4E]/15 ${
                isPaginated ? "mb-0" : "mb-8"
              }`}
            >
              <div className="bg-[#3F7A4E] px-3 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  aria-label="Previous month"
                  className="flex-shrink-0 p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex-1 min-w-0 text-center min-h-[3rem] flex flex-col items-center justify-center">
                  <span
                    className="text-white font-semibold block truncate max-w-full"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {calendarLabel}
                  </span>
                  <button
                    type="button"
                    onClick={goToToday}
                    disabled={isViewingCurrentMonth}
                    tabIndex={isViewingCurrentMonth ? -1 : 0}
                    aria-hidden={isViewingCurrentMonth}
                    className={`mt-0.5 text-[10px] sm:text-xs transition-colors ${
                      isViewingCurrentMonth
                        ? "invisible pointer-events-none"
                        : "text-white/70 hover:text-[#F2A93B]"
                    }`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Back to today
                  </button>
                </div>

                <button
                  type="button"
                  onClick={goToNextMonth}
                  aria-label="Next month"
                  className="flex-shrink-0 p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-white px-5 py-4">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <div
                      key={i}
                      className="text-center text-[#6b7769] text-xs py-1"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {d}
                    </div>
                  ))}
                </div>
                <div
                  className={`grid grid-cols-7 gap-1 ${
                    isPaginated ? "min-h-[10rem]" : "min-h-[11.25rem]"
                  }`}
                >
                  {calendarCells.map((day, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-center min-h-[1.75rem] text-center text-xs py-1.5 rounded-lg transition-colors ${getCalendarDayClassName(day)}`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {day ?? ""}
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-sm bg-[#F2A93B]" />
                    <span className="text-xs text-[#6b7769]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Event dates
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-sm bg-[#3F7A4E]" />
                    <span className="text-xs text-[#6b7769]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Today
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {!hideViewAllLink ? (
              <motion.a
                href="/events-and-projects#events"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="inline-flex items-center gap-2 text-[#3F7A4E] font-semibold hover:text-[#F2A93B] transition-colors duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                View All the Events <ArrowRight className="w-4 h-4" />
              </motion.a>
            ) : null}
          </div>

          {isPaginated ? (
            <div ref={listRef} className="flex w-full flex-col lg:h-full lg:min-h-[38rem]">
              <div className="flex-1 space-y-4">
                {visibleCards.map((event, i) => (
                  <EventCard
                    key={`${pagination.currentPage}-${event.id}`}
                    event={event}
                    index={i}
                    inView={inView}
                    detailsButtonLabel={detailsButtonLabel}
                    descriptionPreview={getDescriptionPreview(event)}
                    detailsBehavior={detailsBehavior}
                    onOpenDetails={() => openEventDetails(event)}
                    compact
                  />
                ))}
              </div>

              <div className="mt-auto shrink-0 border-t border-[#3F7A4E]/10 pt-3">
                <PdfArchivePagination
                  pagination={pagination}
                  variant="compact"
                  hideRangeSummary
                  className="pt-0"
                />
              </div>
            </div>
          ) : (
            <div ref={listRef} className="space-y-4">
              {visibleCards.map((event, i) => (
                <EventCard
                  key={event.id}
                  event={event}
                  index={i}
                  inView={inView}
                  detailsButtonLabel={detailsButtonLabel}
                  descriptionPreview={getDescriptionPreview(event)}
                  detailsBehavior={detailsBehavior}
                  onOpenDetails={() => openEventDetails(event)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {detailsBehavior === "dialog" ? (
        <EventDetailsDialog
          event={selectedEvent}
          open={dialogOpen}
          onOpenChange={handleDialogOpenChange}
          scrollYRef={dialogScrollYRef}
        />
      ) : null}
    </section>
  );
}
