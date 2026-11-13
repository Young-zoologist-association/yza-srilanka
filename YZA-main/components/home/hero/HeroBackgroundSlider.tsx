"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import type { HeroBackgroundSlide } from "@/lib/home/hero/resolveHeroContent";

const SLIDE_INTERVAL_MS = 7000;
const FADE_DURATION_S = 1.35;

interface HeroBackgroundSliderProps {
  slides: HeroBackgroundSlide[];
}

function slidesKey(slides: HeroBackgroundSlide[]): string {
  return slides
    .map((slide) => slide.url.trim())
    .filter(Boolean)
    .join("|");
}

function HeroBackgroundSliderInner({ slides }: HeroBackgroundSliderProps) {
  const urlsKey = slidesKey(slides);
  const safeSlides = useMemo(
    () => slides.filter((slide) => slide.url.trim()),
    [urlsKey],
  );
  const slideCount = safeSlides.length;
  const slideCountRef = useRef(slideCount);
  slideCountRef.current = slideCount;

  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    setIndex(0);
  }, [urlsKey]);

  useEffect(() => {
    if (slideCount <= 1 || reduceMotion) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slideCountRef.current);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [urlsKey, slideCount, reduceMotion]);

  if (slideCount === 0) {
    return null;
  }

  if (slideCount === 1 || reduceMotion) {
    const slide = safeSlides[0];
    return (
      <img
        src={slide.url}
        alt={slide.alt}
        className="absolute inset-0 w-full h-[115%] object-cover"
      />
    );
  }

  return (
    <div className="absolute inset-0">
      {safeSlides.map((slide, slideIndex) => (
        <motion.img
          key={`${urlsKey}-${slideIndex}`}
          src={slide.url}
          alt={slideIndex === index ? slide.alt : ""}
          aria-hidden={slideIndex !== index}
          initial={false}
          animate={{ opacity: slideIndex === index ? 1 : 0 }}
          transition={{ duration: FADE_DURATION_S, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-[115%] object-cover"
        />
      ))}
    </div>
  );
}

/** Isolated from hero scroll/parallax re-renders so the slide index is not reset. */
export const HeroBackgroundSlider = memo(
  HeroBackgroundSliderInner,
  (prev, next) => slidesKey(prev.slides) === slidesKey(next.slides),
);
