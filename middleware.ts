import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("authToken")?.value || ""

    if (!token) {
      return NextResponse.redirect(new URL("/", request.url))
    }

    // Validate the token with the /me endpoint
    try {
      const validateToken = await fetch("https://n8n-webhooks.bluenacional.com/webhook/nb1/api/auth/me", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Cookie": `authToken=${token}`,
        },
      })

      if (!validateToken.ok) throw new Error("Token inválido ou expirado")

      const validationResponse = await validateToken.json()
      if (!validationResponse.status) {
        return NextResponse.redirect(new URL("/", request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/dashboard/:path*",
}

