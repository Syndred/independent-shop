"use client";

import clsx from "clsx";
import type { Product } from "lib/shopify/types";
import { useState } from "react";

const tabs = [
  { id: "description", label: "Description" },
  { id: "specification", label: "Specification" },
] as const;

export function ProductDescriptionTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("description");

  return (
    <section className="mt-12">
      <div className="flex border-b border-neutral-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "border-b-2 px-6 py-3 text-sm transition",
              activeTab === tab.id
                ? "border-neutral-900 text-neutral-900"
                : "border-transparent text-neutral-500 hover:text-neutral-700",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="py-8">
        {activeTab === "description" ? (
          <div className="space-y-8">
            {product.media.detail ? (
              <div className="overflow-hidden border border-neutral-200 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.media.detail.url}
                  alt={product.media.detail.altText}
                  className="w-full object-contain"
                />
              </div>
            ) : null}
            <div
              className="prose prose-neutral max-w-none text-sm prose-p:text-neutral-600"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
        ) : (
          <dl className="grid max-w-xl gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-neutral-500">Product</dt>
              <dd className="mt-1 text-neutral-900">{product.title}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">SKU options</dt>
              <dd className="mt-1 text-neutral-900">
                {product.variants.map((v) => v.sku).join(", ")}
              </dd>
            </div>
            <div>
              <dt className="text-neutral-500">Main images</dt>
              <dd className="mt-1 text-neutral-900">{product.media.main.length}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Style variants</dt>
              <dd className="mt-1 text-neutral-900">{product.media.sku.length}</dd>
            </div>
          </dl>
        )}
      </div>
    </section>
  );
}
