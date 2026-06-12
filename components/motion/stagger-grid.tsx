"use client";

import { ProductCard } from "components/product/product-card";
import type { Product } from "lib/shopify/types";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const gridClass = "grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3";

const gridClassFour = "grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4";

export function AnimatedProductGrid({
  products,
  columns = 3,
}: {
  products: Product[];
  columns?: 3 | 4;
}) {
  const reduce = useReducedMotion();
  const className = columns === 4 ? gridClassFour : gridClass;

  if (reduce) {
    return (
      <div className={className}>
        {products.map((product) => (
          <ProductCard
            key={product.handle}
            product={product}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06 } },
      }}
    >
      {products.map((product) => (
        <motion.div
          key={product.handle}
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease },
            },
          }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
