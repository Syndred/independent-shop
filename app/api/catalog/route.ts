import { products } from "lib/data/products";
import { baseUrl } from "lib/utils";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Cache-Control": "public, max-age=300, s-maxage=900",
};

export async function GET() {
  const catalog = products.map((product) => ({
    id: product.id,
    handle: product.handle,
    title: product.title,
    url: `${baseUrl}/product/${product.handle}`,
  }));

  return NextResponse.json({ products: catalog }, { headers: corsHeaders });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
