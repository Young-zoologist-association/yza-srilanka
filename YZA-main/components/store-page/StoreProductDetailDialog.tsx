"use client";

import { useRef, type MutableRefObject } from "react";
import { motion } from "motion/react";
import { Leaf, ShoppingBag, Sparkles, Tag } from "lucide-react";
import type { StoreProductData } from "@/lib/api/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialogPageScrollLock } from "@/lib/shared/useDialogPageScrollLock";
import { STORE_THEME } from "@/lib/store-page/storeTheme";

interface StoreProductDetailDialogProps {
  product: StoreProductData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scrollYRef?: MutableRefObject<number>;
}

function ProductImage({ product }: { product: StoreProductData }) {
  const hasImage = Boolean(product.image.url?.trim());

  return (
    <div
      className="relative aspect-square overflow-hidden rounded-2xl sm:aspect-[4/5]"
      style={{ backgroundColor: STORE_THEME.sand }}
    >
      {hasImage ? (
        <img
          src={product.image.url}
          alt={product.image.alt || product.title}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
          <Leaf className="h-12 w-12" style={{ color: STORE_THEME.sage }} strokeWidth={1.25} />
          <p
            className="text-sm font-medium"
            style={{ fontFamily: "'DM Sans', sans-serif", color: STORE_THEME.sage }}
          >
            {product.title}
          </p>
        </div>
      )}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t to-transparent"
        style={{ backgroundImage: `linear-gradient(to top, ${STORE_THEME.forest}55, transparent)` }}
      />
    </div>
  );
}

export function StoreProductDetailDialog({
  product,
  open,
  onOpenChange,
  scrollYRef: scrollYRefProp,
}: StoreProductDetailDialogProps) {
  const isOpen = open && !!product;
  const internalScrollYRef = useRef(0);
  const scrollYRef = scrollYRefProp ?? internalScrollYRef;

  useDialogPageScrollLock(isOpen, scrollYRef);

  if (!product) return null;

  const prominentFields = product.detailFields.filter((field) => field.prominent);
  const secondaryFields = product.detailFields.filter((field) => !field.prominent);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} modal={false}>
      <DialogContent
        showCloseButton
        overlayClassName="bg-[#1B3A2D]/60 backdrop-blur-sm"
        onOpenAutoFocus={(event) => event.preventDefault()}
        onCloseAutoFocus={(event) => event.preventDefault()}
        className="max-h-[92vh] overflow-y-auto rounded-[1.75rem] border-0 p-0 sm:max-w-3xl"
        style={{ backgroundColor: STORE_THEME.cream }}
      >
        <div className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="p-5 sm:p-6 sm:pr-3">
            <ProductImage product={product} />
          </div>

          <div className="flex flex-col p-5 pt-2 sm:p-6 sm:pl-3 sm:pt-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  backgroundColor: `${STORE_THEME.amber}22`,
                  color: STORE_THEME.bark,
                }}
              >
                <Sparkles className="h-3 w-3" style={{ color: STORE_THEME.amber }} />
                YZA Wildlife Store
              </span>

              <DialogTitle
                className="mt-4 text-left leading-tight"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  color: STORE_THEME.forest,
                  fontWeight: 700,
                }}
              >
                {product.title}
              </DialogTitle>

              <DialogDescription className="sr-only">
                Product details for {product.title}
              </DialogDescription>

              <p
                className="mt-4 text-2xl font-bold"
                style={{ fontFamily: "'DM Sans', sans-serif", color: STORE_THEME.terracotta }}
              >
                {product.priceLabel}
              </p>
            </motion.div>

            <div className="mt-6 space-y-4">
              {prominentFields
                .filter((field) => field.key !== "price")
                .map((field, index) => (
                  <motion.div
                    key={field.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + index * 0.06, duration: 0.35 }}
                    className="rounded-2xl border p-4"
                    style={{
                      borderColor: `${STORE_THEME.sage}33`,
                      backgroundColor: "white",
                    }}
                  >
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.18em]"
                      style={{ fontFamily: "'DM Sans', sans-serif", color: STORE_THEME.sage }}
                    >
                      {field.label}
                    </p>
                    <p
                      className="mt-2 text-sm leading-relaxed md:text-base"
                      style={{ fontFamily: "'DM Sans', sans-serif", color: STORE_THEME.ink }}
                    >
                      {field.value}
                    </p>
                  </motion.div>
                ))}
            </div>

            {secondaryFields.length > 0 ? (
              <div
                className="mt-5 rounded-2xl border p-4"
                style={{
                  borderColor: `${STORE_THEME.amber}33`,
                  backgroundColor: `${STORE_THEME.amber}11`,
                }}
              >
                <p
                  className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: STORE_THEME.bark }}
                >
                  Product Information
                </p>
                <dl className="space-y-2">
                  {secondaryFields.map((field) => (
                    <div key={field.key} className="flex items-start justify-between gap-4 text-sm">
                      <dt
                        className="shrink-0 font-medium"
                        style={{ fontFamily: "'DM Sans', sans-serif", color: STORE_THEME.sage }}
                      >
                        {field.label}
                      </dt>
                      <dd
                        className="text-right"
                        style={{ fontFamily: "'DM Sans', sans-serif", color: STORE_THEME.ink }}
                      >
                        {field.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.35 }}
              className="mt-auto pt-6"
            >
              <div
                className="flex items-start gap-3 rounded-2xl p-4"
                style={{ backgroundColor: `${STORE_THEME.forest}0D` }}
              >
                <Tag className="mt-0.5 h-4 w-4 shrink-0" style={{ color: STORE_THEME.forestMid }} />
                <p
                  className="text-xs leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: STORE_THEME.sage }}
                >
                  Visit the YZA office or contact us to purchase. Product availability and pricing
                  may vary.
                </p>
              </div>

              <a
                href="/contact"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.01]"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: `linear-gradient(135deg, ${STORE_THEME.forest} 0%, ${STORE_THEME.forestMid} 100%)`,
                }}
              >
                <ShoppingBag className="h-4 w-4" />
                Enquire About This Item
              </a>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
