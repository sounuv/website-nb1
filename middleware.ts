import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the user is trying to access a protected route
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("token")?.value || ""

    // If there's no token, redirect to the login page
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/dashboard/:path*",
}

