import { cookies } from "next/headers";

export const CART_COOKIE = "local-cart";

export type StoredCartLine = {
  variantId: string;
  quantity: number;
};

export async function getStoredCartLines(): Promise<StoredCartLine[]> {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get(CART_COOKIE);

  if (!cartCookie?.value) return [];

  try {
    const parsed = JSON.parse(cartCookie.value) as StoredCartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function setStoredCartLines(
  lines: StoredCartLine[],
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE, JSON.stringify(lines), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}

export async function clearStoredCart(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(CART_COOKIE);
}
