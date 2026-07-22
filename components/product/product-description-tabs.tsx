"use client";

import clsx from "clsx";
import type { Product } from "lib/shopify/types";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const tabs = [
  { id: "description", label: "Description" },
  { id: "specification", label: "Specification" },
] as const;

export function ProductDescriptionTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]["id"]>("description");
  const reduce = useReducedMotion();

  return (
    <section>
      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "relative px-5 py-3 text-sm font-medium transition",
              activeTab === tab.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
            {activeTab === tab.id ? (
              <motion.span
                layoutId="product-tab-indicator"
                className="absolute inset-x-0 -bottom-px h-0.5 bg-accent"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            ) : null}
          </button>
        ))}
      </div>

      <div className="py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === "description" ? (
              <div className="space-y-8">
                {product.media.detail ? (
                  <div className="border border-border bg-card p-4 sm:p-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.media.detail.url}
                      alt={product.media.detail.altText}
                      className="mx-auto w-full h-auto max-w-full object-contain"
                    />
                  </div>
                ) : null}
                <div
                  className="prose prose-neutral max-w-none text-sm prose-p:text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              </div>
            ) : (
              <dl className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Product", value: product.title },
                  {
                    label: "SKU options",
                    value: product.variants.map((v) => v.sku).join(", "),
                  },
                  {
                    label: "Main images",
                    value: String(product.media.main.length),
                  },
                  {
                    label: "Style variants",
                    value: String(product.media.sku.length),
                  },
                ].map((spec) => (
                  <div
                    key={spec.label}
                    className="border border-border bg-card p-5"
                  >
                    <dt className="text-sm text-muted-foreground">
                      {spec.label}
                    </dt>
                    <dd className="mt-2 text-base font-medium text-foreground">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
