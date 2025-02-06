"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { resetPassword } from "../actions/auth"
import { BrandVideo } from "./brand-video"

export default function ResetPasswordForm() {
  const [status, setStatus] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const result = await resetPassword(formData)

    if (result.error) {
      setStatus({ type: "error", message: result.error })
    } else {
      setStatus({
        type: "success",
        message: "If the email exists in our database, you will receive password reset instructions.",
      })
    }
  }

  return (
    <div className="w-full max-w-[400px] space-y-6 p-4">
      <div className="text-center space-y-2">
        <BrandVideo />
        <h2 className="text-2xl font-semibold text-white">Forgot your password?</h2>
        <p className="text-gray-400">Enter your email to receive reset instructions</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="h-12 bg-[#1a1f36] border-[#2e3650] text-white placeholder:text-gray-500"
            placeholder="Enter your email"
          />
        </div>

        {status && (
          <p className={`text-center ${status.type === "success" ? "text-green-500" : "text-red-500"}`}>
            {status.message}
          </p>
        )}

        <Button type="submit" className="w-full h-12 mt-2 bg-[#3538CD] hover:bg-[#2a2ca8] text-white font-medium">
          Send Instructions
        </Button>

        <p className="text-center text-gray-400 pt-2">
          Remembered your password?{" "}
          <Link href="/" className="text-[#3538CD] hover:text-[#2a2ca8]">
            Back to login
          </Link>
        </p>
      </form>
    </div>
  )
}

