"use client";

import { useRef, type MutableRefObject } from "react";
import { Clock, MapPin, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { EventCardContent } from "@/lib/home/events/resolveEventsContent";
import { isEventToday } from "@/lib/home/events/eventDateUtils";
import { useDialogPageScrollLock } from "@/lib/shared/useDialogPageScrollLock";

interface EventDetailsDialogProps {
  event: EventCardContent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scrollYRef?: MutableRefObject<number>;
}

export function EventDetailsDialog({
  event,
  open,
  onOpenChange,
  scrollYRef: scrollYRefProp,
}: EventDetailsDialogProps) {
  const isOpen = open && !!event;
  const todayEvent = event ? isEventToday(event) : false;
  const internalScrollYRef = useRef(0);
  const scrollYRef = scrollYRefProp ?? internalScrollYRef;

  useDialogPageScrollLock(isOpen, scrollYRef);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} modal={false}>
      {event ? (
        <DialogContent
          showCloseButton={false}
          overlayClassName="bg-[#1a2e1f]/45 backdrop-blur-[2px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="sm:max-w-lg max-h-[90vh] !flex flex-col rounded-2xl border-[#3F7A4E]/15 p-0 overflow-hidden gap-0"
        >
          <div className="relative shrink-0 bg-gradient-to-br from-[#3F7A4E] to-[#1a2e1f] px-6 pt-6 pb-5">
            <DialogClose
              className="absolute top-4 right-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white opacity-100 transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#3F7A4E]"
              aria-label="Close event details"
            >
              <X className="h-4 w-4" />
            </DialogClose>

            <DialogHeader className="text-left gap-3 pr-10">
              <span
                className="inline-flex w-fit text-[10px] tracking-wider uppercase font-semibold px-2.5 py-0.5 rounded-full"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: `${event.categoryColor}30`,
                  color: "#fff",
                }}
              >
                {event.category}
              </span>
              <DialogTitle
                className="text-white leading-snug"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.35rem",
                  fontWeight: 700,
                }}
              >
                {event.title}
              </DialogTitle>
            </DialogHeader>

            <div className="mt-4 flex items-center gap-4">
              <div
                className={`flex-shrink-0 flex flex-col items-center justify-center w-14 h-16 rounded-xl ${
                  todayEvent ? "bg-white/20 text-white" : "bg-[#F2A93B] text-[#333A33]"
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

              <div className="min-w-0 space-y-1.5 text-white/85 text-sm">
                <p
                  className="flex items-center gap-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Clock className="w-4 h-4 shrink-0 text-[#F2A93B]" />
                  {event.time}
                </p>
                <p
                  className="flex items-start gap-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <MapPin className="w-4 h-4 shrink-0 text-[#F2A93B] mt-0.5" />
                  {event.location}
                </p>
              </div>
            </div>
          </div>

          <div
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-5"
            onWheel={(event) => event.stopPropagation()}
          >
            <DialogDescription
              asChild
              className="text-[#6b7769] text-sm leading-relaxed whitespace-pre-line"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <p>{event.description}</p>
            </DialogDescription>
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
