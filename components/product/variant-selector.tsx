"use client";

import clsx from "clsx";
import { ProductOption, ProductVariant } from "lib/shopify/types";
import { useRouter, useSearchParams } from "next/navigation";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {},
    ),
  }));

  const updateOption = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-5">
      {options.map((option) => (
        <div key={option.id}>
          <p className="mb-3 text-sm text-neutral-800">
            <span className="text-red-500">*</span> {option.name}
          </p>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const optionNameLowerCase = option.name.toLowerCase();

              const optionParams: Record<string, string> = {};
              searchParams.forEach((v, k) => (optionParams[k] = v));
              optionParams[optionNameLowerCase] = value;

              const filtered = Object.entries(optionParams).filter(([key, val]) =>
                options.find((opt) => opt.name.toLowerCase() === key && opt.values.includes(val)),
              );
              const isAvailableForSale = combinations.find((combination) =>
                filtered.every(
                  ([key, val]) => combination[key] === val && combination.availableForSale,
                ),
              );

              const isActive = searchParams.get(optionNameLowerCase) === value;
              const variant = variants.find((v) =>
                v.selectedOptions.some(
                  (opt) => opt.name.toLowerCase() === optionNameLowerCase && opt.value === value,
                ),
              );

              return (
                <button
                  type="button"
                  onClick={() => updateOption(optionNameLowerCase, value)}
                  key={value}
                  aria-disabled={!isAvailableForSale}
                  disabled={!isAvailableForSale}
                  title={`${option.name} ${value}${!isAvailableForSale ? " (Out of Stock)" : ""}`}
                  className={clsx("transition", {
                    "min-h-10 min-w-10 border px-4 py-2 text-sm": !variant?.image,
                    "h-14 w-14 overflow-hidden border p-1": variant?.image,
                    "border-neutral-900 ring-1 ring-neutral-900": isActive,
                    "border-neutral-300 hover:border-neutral-500": !isActive && isAvailableForSale,
                    "cursor-not-allowed border-neutral-200 opacity-40 line-through":
                      !isAvailableForSale,
                  })}
                >
                  {variant?.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={variant.image.url}
                      alt={variant.image.altText}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    value
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
