"use client"

import { useState, type React } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "../actions/auth"
import { BrandVideo } from "./brand-video"

export default function LoginForm() {
  const [error, setError] = useState("")
  const [attempts, setAttempts] = useState(0)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const result = await login(formData)

    if (!result.success) {
      setError(result.error)
      setAttempts((prev) => prev + 1)
    } else {
      // Store the access token
      sessionStorage.setItem("access_token", result.access_token)
      router.push("/dashboard")
    }
  }

  const showForgotPassword = attempts >= 3

  return (
    <div className="w-full max-w-[400px] space-y-6 p-4">
      <div className="text-center space-y-2">
        <BrandVideo />
        <h2 className="text-2xl font-semibold text-white">Welcome</h2>
        <p className="text-gray-400">Your AI automation assistant</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">
            Email
          </Label>
          <Input
            id="email"
            name="username"
            type="email"
            required
            className="h-12 bg-[#1a1f36] border-[#2e3650] text-white placeholder:text-gray-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-gray-300">
              Password
            </Label>
            {showForgotPassword && (
              <Link href="/reset-password" className="text-sm text-[#3538CD] hover:text-[#2a2ca8]">
                Forgot my password
              </Link>
            )}
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="h-12 bg-[#1a1f36] border-[#2e3650] text-white placeholder:text-gray-500"
            placeholder="Enter your password"
          />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <Button type="submit" className="w-full h-12 mt-2 bg-[#3538CD] hover:bg-[#2a2ca8] text-white font-medium">
          Sign In
        </Button>

        <p className="text-center text-gray-400 pt-2">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#3538CD] hover:text-[#2a2ca8]">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

