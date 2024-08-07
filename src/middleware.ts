import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  //TODO: check if user is logged in and check if user is admin for now user query params for testing
  const role = req.nextUrl.searchParams.get("role");

  if (role === "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (role === "owner") {
    return NextResponse.redirect(new URL("/owner/dashboard", req.url));
  }

  return NextResponse.next();
}
