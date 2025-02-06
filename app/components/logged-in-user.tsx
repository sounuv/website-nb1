"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BrandVideo } from "./brand-video"

export default function LoggedInUser() {
  const [userName, setUserName] = useState("")
  const router = useRouter()

  useEffect(() => {
    const token = sessionStorage.getItem("access_token")
    if (!token) {
      router.push("/")
    } else {
      setUserName("User")
    }
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem("access_token")
    router.push("/")
  }

  return (
    <div className="w-full max-w-md space-y-8 text-center">
      <BrandVideo />
      <h2 className="text-3xl font-bold text-white mb-2">Welcome, {userName}!</h2>
      <p className="text-gray-400 mb-8">Your automation assistant is ready to help</p>
      <Button onClick={handleLogout} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6">
        Sign Out
      </Button>
    </div>
  )
}

