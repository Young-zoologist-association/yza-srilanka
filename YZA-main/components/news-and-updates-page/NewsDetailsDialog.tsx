"use client";

import { useRef, type MutableRefObject } from "react";
import { Newspaper, User, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { NewsItemData } from "@/lib/api/types";
import { splitNewsParagraphs } from "@/lib/news-and-updates-page/newsDescriptionUtils";
import { useDialogPageScrollLock } from "@/lib/shared/useDialogPageScrollLock";

interface NewsDetailsDialogProps {
  item: NewsItemData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scrollYRef?: MutableRefObject<number>;
}

function getAuthorInitials(author: string): string {
  return author
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function NewsDetailsDialog({
  item,
  open,
  onOpenChange,
  scrollYRef: scrollYRefProp,
}: NewsDetailsDialogProps) {
  const isOpen = open && !!item;
  const internalScrollYRef = useRef(0);
  const scrollYRef = scrollYRefProp ?? internalScrollYRef;

  useDialogPageScrollLock(isOpen, scrollYRef);

  const paragraphs = item ? splitNewsParagraphs(item.description) : [];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} modal={false}>
      {item ? (
        <DialogContent
          showCloseButton={false}
          overlayClassName="bg-[#1a2e1f]/45 backdrop-blur-[2px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="w-[calc(100%-1.5rem)] sm:max-w-3xl max-h-[92vh] !flex flex-col rounded-2xl border border-[#3F7A4E]/10 p-0 overflow-hidden gap-0 shadow-[0_40px_100px_-24px_rgba(26,46,31,0.45)]"
        >
          <DialogClose
            className="absolute top-4 right-4 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#1a2e1f] shadow-lg ring-1 ring-black/5 transition-all hover:bg-white hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3F7A4E]/40"
            aria-label="Close article"
          >
            <X className="h-4 w-4" />
          </DialogClose>

          <div
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[#fafaf8]"
            onWheel={(event) => event.stopPropagation()}
          >
            {item.image.url ? (
              <figure className="relative w-full aspect-[21/9] min-h-[11rem] max-h-[22rem] overflow-hidden">
                <img
                  src={item.image.url}
                  alt={item.image.alt || item.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1f]/85 via-[#1a2e1f]/25 to-[#1a2e1f]/10" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fafaf8] to-transparent" />
              </figure>
            ) : (
              <div className="relative h-28 sm:h-32 bg-gradient-to-br from-[#3F7A4E] to-[#1a2e1f]">
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#fafaf8] to-transparent" />
              </div>
            )}

            <article className={`relative px-4 sm:px-8 pb-8 ${item.image.url ? "-mt-10 sm:-mt-14" : "-mt-8"}`}>
              <div className="rounded-2xl border border-[#e8efe9] bg-white shadow-[0_20px_60px_-28px_rgba(26,46,31,0.18)] overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-[#3F7A4E] via-[#F2A93B] to-[#3F7A4E]" />

                <div className="px-5 sm:px-8 pt-7 sm:pt-9 pb-8 sm:pb-10">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3F7A4E]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#3F7A4E]">
                      <Newspaper className="h-3 w-3" />
                      News & Updates
                    </span>
                  </div>

                  <DialogTitle
                    className="text-[#1a2e1f] leading-[1.15] text-balance"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                      fontWeight: 700,
                    }}
                  >
                    {item.title}
                  </DialogTitle>

                  {item.author ? (
                    <div className="mt-5 flex items-center gap-3 border-b border-[#e8efe9] pb-5">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3F7A4E] to-[#1a2e1f] text-sm font-bold text-white shadow-md"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                        aria-hidden
                      >
                        {getAuthorInitials(item.author)}
                      </div>
                      <div>
                        <p
                          className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5C7A63]"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          Written by
                        </p>
                        <p
                          className="flex items-center gap-1.5 text-[#1a2e1f] text-sm font-semibold"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          <User className="h-3.5 w-3.5 text-[#F2A93B]" />
                          {item.author}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-5 border-b border-[#e8efe9] pb-5" />
                  )}

                  <DialogDescription asChild className="mt-6">
                    <div className="space-y-5">
                      {(paragraphs.length > 0 ? paragraphs : ["Full article content is not available."]).map(
                        (paragraph, index) => (
                        <p
                          key={`${index}-${paragraph.slice(0, 24)}`}
                          className={`text-[#4a5548] leading-[1.85] ${
                            index === 0
                              ? "first-letter:float-left first-letter:mr-2 first-letter:mt-0.5 first-letter:text-4xl first-letter:font-bold first-letter:leading-none first-letter:text-[#3F7A4E]"
                              : ""
                          }`}
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.0625rem",
                          }}
                        >
                          {paragraph}
                        </p>
                      ),
                      )}
                    </div>
                  </DialogDescription>

                  <div className="mt-10 flex items-center justify-center gap-3 pt-2">
                    <span className="h-px w-12 bg-[#3F7A4E]/20" />
                    <span
                      className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#5C7A63]"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      YZA Sri Lanka
                    </span>
                    <span className="h-px w-12 bg-[#3F7A4E]/20" />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
