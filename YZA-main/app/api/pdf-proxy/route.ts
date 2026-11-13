import { NextRequest, NextResponse } from "next/server";

function getAllowedOrigin(): string | null {
  const wpUrl = process.env.WORDPRESS_API_URL?.trim();
  if (!wpUrl) return null;

  try {
    return new URL(wpUrl).origin;
  } catch {
    return null;
  }
}

function isAllowedPdfUrl(url: string, allowedOrigin: string): boolean {
  try {
    const target = new URL(url);
    if (target.protocol !== "http:" && target.protocol !== "https:") return false;
    if (target.origin !== allowedOrigin) return false;
    return target.pathname.toLowerCase().endsWith(".pdf");
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const allowedOrigin = getAllowedOrigin();
  if (!allowedOrigin) {
    return NextResponse.json({ error: "WordPress API is not configured." }, { status: 503 });
  }

  const pdfUrl = request.nextUrl.searchParams.get("url");
  if (!pdfUrl || !isAllowedPdfUrl(pdfUrl, allowedOrigin)) {
    return NextResponse.json({ error: "Invalid PDF URL." }, { status: 400 });
  }

  try {
    const response = await fetch(pdfUrl, {
      headers: { Accept: "application/pdf" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "PDF not found." }, { status: response.status });
    }

    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch PDF." }, { status: 502 });
  }
}
