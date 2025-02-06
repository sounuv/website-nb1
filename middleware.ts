import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value || ""

  // Se o usuário acessa "/" e já tem token, redirecionar para /dashboard
  if (request.nextUrl.pathname === "/") {
    if (token) {
      // Valida token no endpoint /me
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
        if (validationResponse.status) {
          return NextResponse.redirect(new URL("/dashboard", request.url))
        }
      } catch (error) {
        console.error("Token validation error:", error)
      }
    }
  }

  // Se o usuário acessa "/dashboard" e não tem token, redireciona para "/"
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url))
    }

    // Valida token no endpoint /me
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
      console.error("Token validation error:", error)
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  // Se não for "/" ou "/dashboard" (ou a verificação passou), segue normalmente.
  return NextResponse.next()
}

// É importante ajustar o matcher:
export const config = {
  // Agora vamos interceptar também a rota "/"
  matcher: ["/", "/dashboard/:path*"],
}

