import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-9 w-9 items-center justify-center text-neutral-600 transition hover:text-neutral-950">
      <ShoppingCartIcon
        className={clsx("h-5", className)}
        strokeWidth={1.5}
      />

      {quantity ? (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-950 text-[10px] font-medium text-white">
          {quantity}
        </span>
      ) : null}
    </div>
  );
}
