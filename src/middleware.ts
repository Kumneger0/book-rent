import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verify } from "./lib/utils";
import { UserType } from "./types";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  const user = await verify<UserType>(token?.value);

  if (!user) return NextResponse.redirect(new URL("/login", req.url));

  const pathname = req.nextUrl.pathname;

  if (!pathname.startsWith(`/${user.role}`)) {
    return NextResponse.redirect(new URL(`/${user?.role}/dashboard`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/owner/:path*", "/user/:path*"],
};
