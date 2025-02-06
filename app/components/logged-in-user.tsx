"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BrandSphere } from "./brand-sphere"

export default function LoggedInUser() {
  const [userName, setUserName] = useState("")
  const router = useRouter()

  useEffect(() => {
    const validateToken = async () => {
      const token = document.cookie.split("; ").find(row => row.startsWith("authToken="))?.split("=")[1]
      if (!token) {
        router.push("/")
      } else {
        try {
          const response = await fetch("https://n8n-webhooks.bluenacional.com/webhook/nb1/api/auth/me", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "Cookie": `authToken=${token}`,
            },
          })

          if (!response.ok) throw new Error("Token inválido ou expirado")

          const validationResponse = await response.json()
          if (validationResponse.status) {
            setUserName("User")
          } else {
            router.push("/")
          }
        } catch (error) {
          router.push("/")
        }
      }
    }

    validateToken()
  }, [router])

  const handleLogout = () => {
    document.cookie = "authToken=; path=/; max-age=0; Secure; SameSite=Lax"
    router.push("/")
  }

  return (
    <div className="w-full max-w-md space-y-8 text-center">
      <BrandSphere />
      <h2 className="text-3xl font-bold text-white mb-2">Welcome, {userName}!</h2>
      <p className="text-gray-400 mb-8">Your automation assistant is ready to help</p>
      <Button onClick={handleLogout} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6">
        Sign Out
      </Button>
    </div>
  )
}

