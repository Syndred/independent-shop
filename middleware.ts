import { resolveOffer } from "lib/offer";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const prefix = "/offer/";
  const pathname = request.nextUrl.pathname;
  const slug = pathname.startsWith(prefix) ? pathname.slice(prefix.length) : "";
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
