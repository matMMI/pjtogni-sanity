import { client } from "@/sanity/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pages = await client.fetch(`*[_type == "page"]{
      title,
      "slug": slug.current
    }`);
    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching pages" },
      { status: 500 }
    );
  }
}
