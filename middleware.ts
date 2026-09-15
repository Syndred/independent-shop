import { resolveOffer } from "lib/offer";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const prefix = "/offer/";
  const pathname = request.nextUrl.pathname;
  const slug = pathname.startsWith(prefix) ? pathname.slice(prefix.length) : "";
  const legacy = [
    ["premium-pulse-oximeter", "/product/sy108-mesh-nebulizer"],
    ["kids-pulse-oximeter", "/product/zs101-mesh-nebulizer"],
    ["mini-speaker", "/search/mesh-nebulizers"],
    ["advanced-pulse-oximeter", "/search/mesh-nebulizers"],
  ].find(([prefix]) => slug === prefix || slug.startsWith(`${prefix}-`));
  if (legacy) {
    const target = request.nextUrl.clone();
    target.pathname = legacy[1]!;
    return NextResponse.redirect(target, 308);
  }
  const offer = resolveOffer(slug);

  if (!offer) {
    return new NextResponse("Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  if (!offer.isCanonical) {
    const canonical = request.nextUrl.clone();
    canonical.pathname = `${prefix}${offer.slug}`;
    return NextResponse.redirect(canonical, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/offer/:path*"],
};
