"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { HomeStoreContent } from "@/lib/home/store/resolveHomeStoreContent";
import { HOME_STORE_FALLBACK } from "@/lib/home/store/resolveHomeStoreContent";
import { StoreProductCard } from "@/components/store-page/StoreProductCard";
import { StoreProductDetailDialog } from "@/components/store-page/StoreProductDetailDialog";
import type { StoreProductData } from "@/lib/api/types";

const HOME_STORE_DISPLAY_LIMIT = 8;

interface StoreSectionProps {
  content?: HomeStoreContent;
}

export function StoreSection({ content = HOME_STORE_FALLBACK }: StoreSectionProps) {
  const { eyebrow, titlePlain, titleHighlight, products } = content;

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const dialogScrollYRef = useRef(0);
  const [selectedProduct, setSelectedProduct] = useState<StoreProductData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const visibleProducts = products.slice(0, HOME_STORE_DISPLAY_LIMIT);

  const handleViewProduct = useCallback((product: StoreProductData) => {
    dialogScrollYRef.current = window.scrollY;
    setSelectedProduct(product);
    setDialogOpen(true);
  }, []);

  const handleDialogOpenChange = useCallback((nextOpen: boolean) => {
    if (nextOpen) {
      dialogScrollYRef.current = window.scrollY;
      setDialogOpen(true);
      return;
    }

    setDialogOpen(false);
    setSelectedProduct(null);
  }, []);

  return (
    <section id="store" className="page-snap-section py-16 sm:py-24 bg-[#f4f7f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={ref}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
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
              className="text-[#333A33] leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
              }}
            >
              {titlePlain} <span className="text-[#3F7A4E]">{titleHighlight}</span>
            </motion.h2>
          </div>

          <motion.a
            href="/store"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 text-[#3F7A4E] font-semibold hover:text-[#F2A93B] transition-colors duration-200 whitespace-nowrap"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            View Store <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {visibleProducts.map((product, index) => (
            <StoreProductCard
              key={product.id}
              product={product}
              index={index}
              onView={handleViewProduct}
              staggerCycle={4}
            />
          ))}
        </div>
      </div>

      <StoreProductDetailDialog
        product={selectedProduct}
        open={dialogOpen}
        onOpenChange={handleDialogOpenChange}
        scrollYRef={dialogScrollYRef}
      />
    </section>
  );
}
