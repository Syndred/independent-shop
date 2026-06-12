"use client";

import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Price from "components/price";
import { DEFAULT_OPTION } from "lib/constants";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { createCartAndSetCookie } from "./actions";
import { useCart } from "./cart-context";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal({ light = false }: { light?: boolean }) {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <button
        aria-label="Open cart"
        onClick={openCart}
      >
        <OpenCart
          quantity={cart?.totalQuantity}
          light={light}
        />
      </button>
      <Transition show={isOpen}>
        <Dialog
          onClose={closeCart}
          className="relative z-50"
        >
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black/20"
              aria-hidden="true"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col bg-white p-6 shadow-2xl md:w-[380px]">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                <p className="text-sm font-medium text-ink">Cart</p>
                <button
                  aria-label="Close cart"
                  onClick={closeCart}
                >
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center">
                  <ShoppingCartIcon
                    className="h-10 text-neutral-300"
                    strokeWidth={1}
                  />
                  <p className="mt-4 text-sm text-ink-muted">Your cart is empty</p>
                  <Link
                    href="/search/health-care"
                    onClick={closeCart}
                    className="btn-primary mt-6 px-5 py-2.5"
                  >
                    Shop
                  </Link>
                </div>
              ) : (
                <div className="flex h-full flex-col overflow-hidden pt-4">
                  <ul className="grow overflow-auto">
                    {cart.lines
                      .sort((a, b) =>
                        a.merchandise.product.title.localeCompare(b.merchandise.product.title),
                      )
                      .map((item, i) => {
                        const merchandiseSearchParams = {} as MerchandiseSearchParams;

                        item.merchandise.selectedOptions.forEach(({ name, value }) => {
                          if (value !== DEFAULT_OPTION) {
                            merchandiseSearchParams[name.toLowerCase()] = value;
                          }
                        });

                        const merchandiseUrl = createUrl(
                          `/product/${item.merchandise.product.handle}`,
                          new URLSearchParams(merchandiseSearchParams),
                        );

                        return (
                          <li
                            key={i}
                            className="border-b border-neutral-100 py-4 last:border-0"
                          >
                            <div className="relative flex gap-4">
                              <div className="absolute -left-1 -top-1">
                                <DeleteItemButton
                                  item={item}
                                  optimisticUpdate={updateCartItem}
                                />
                              </div>
                              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-accent-muted/50">
                                <Image
                                  className="h-full w-full object-cover"
                                  width={64}
                                  height={64}
                                  alt={
                                    item.merchandise.product.featuredImage.altText ||
                                    item.merchandise.product.title
                                  }
                                  src={item.merchandise.product.featuredImage.url}
                                />
                              </div>
                              <div className="flex min-w-0 flex-1 flex-col justify-between">
                                <Link
                                  href={merchandiseUrl}
                                  onClick={closeCart}
                                  className="truncate text-sm font-medium text-ink transition hover:text-accent"
                                >
                                  {item.merchandise.product.title}
                                </Link>
                                <div className="mt-2 flex items-center justify-between">
                                  <div className="flex h-8 items-center overflow-hidden rounded-full border border-neutral-200">
                                    <EditItemQuantityButton
                                      item={item}
                                      type="minus"
                                      optimisticUpdate={updateCartItem}
                                    />
                                    <span className="w-6 text-center text-xs">{item.quantity}</span>
                                    <EditItemQuantityButton
                                      item={item}
                                      type="plus"
                                      optimisticUpdate={updateCartItem}
                                    />
                                  </div>
                                  <Price
                                    className="text-sm text-ink"
                                    amount={item.cost.totalAmount.amount}
                                    currencyCode={item.cost.totalAmount.currencyCode}
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                  <div className="border-t border-neutral-200 pt-4">
                    <div className="mb-4 flex items-center justify-between text-sm">
                      <span className="text-ink-muted">Total</span>
                      <Price
                        className="font-medium text-ink"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>
                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="btn-primary block w-full py-3 text-center"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function CloseCart({ className }: { className?: string }) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition hover:text-ink active:scale-[0.98]">
      <XMarkIcon className={clsx("h-5", className)} />
    </div>
  );
}
