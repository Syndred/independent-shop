"use client";

import type { Collection } from "lib/shopify/types";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

export function CollectionPills({
  collections,
  activePath,
}: {
  collections: Collection[];
  activePath?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="flex flex-wrap gap-2"
      initial={reduce ? false : "hidden"}
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.04 } },
      }}
    >
      {collections.map((collection) => {
        const isActive = activePath === collection.path;
        return (
          <motion.div
            key={collection.handle || collection.path}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.25 } },
            }}
          >
            <Link
              href={collection.path}
              className={
                isActive
                  ? "inline-flex rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground"
                  : "inline-flex rounded-lg border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground transition hover:text-foreground"
              }
            >
              {collection.title}
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
