import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
  light = false,
}: {
  className?: string;
  quantity?: number;
  light?: boolean;
}) {
  return (
    <div
      className={clsx(
        "relative flex h-9 w-9 items-center justify-center transition",
        light
          ? "text-white/90 hover:text-white"
          : "text-foreground/80 hover:text-primary",
      )}
    >
      <ShoppingCartIcon
        className={clsx("h-5", className)}
        strokeWidth={1.5}
      />

      {quantity ? (
        <span
          className={clsx(
            "absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full text-[10px]",
            light
              ? "bg-white text-foreground"
              : "bg-primary text-primary-foreground",
          )}
        >
          {quantity}
        </span>
      ) : null}
    </div>
  );
}
