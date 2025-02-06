"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { register } from "../actions/auth"
import { BrandSphere } from "./brand-sphere"

export default function RegisterForm() {
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const result = await register(formData)

    if (result.error) {
      setError(result.error)
    } else {
      if (result.userData) {
        localStorage.setItem("userData", JSON.stringify(result.userData))
      }
      router.push("/dashboard")
    }
  }

  return (
    <div className="w-full max-w-[400px] space-y-6 p-4">
      <div className="text-center space-y-2">
        <BrandSphere />
        <h2 className="text-2xl font-semibold text-white">Create Account</h2>
        <p className="text-gray-400">Join and increase your productivity</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-300">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            className="h-12 bg-[#1a1f36] border-[#2e3650] text-white placeholder:text-gray-500"
            placeholder="Enter your name"
          />
        </div>

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

        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-300">
            Password
          </Label>
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
          Create Account
        </Button>

        <p className="text-center text-gray-400 pt-2">
          Already have an account?{" "}
          <Link href="/" className="text-[#3538CD] hover:text-[#2a2ca8]">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  )
}

