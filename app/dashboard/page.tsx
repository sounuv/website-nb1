"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { BrandSphere } from "../components/brand-sphere"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { ArrowUpRight } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()

  const handleSignOut = () => {
    document.cookie = "authToken=; path=/; max-age=0; Secure; SameSite=Lax"
    router.push("/")
  }

  const handleUpgradePlan = () => {
    router.push("/register/choose-plan")
  }

  return (
    <div className="min-h-screen bg-[#0f1729] text-white">
      <header className="border-b border-[#2e3650] bg-[#1a1f36]">
        <div className="flex h-14 items-center justify-between gap-4 px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Logo />
          </Link>
          <Button onClick={handleUpgradePlan} className="bg-[#3538CD] hover:bg-[#2a2ca8] text-white">
            Upgrade Plan
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center px-4 py-16">
        <h1 className="mb-8 text-4xl font-bold">Welcome</h1>
        <div className="mb-8">
          <BrandSphere />
        </div>
        <h2 className="mb-4 text-3xl font-bold">Welcome to Your Dashboard!</h2>
        <p className="mb-8 text-gray-400">Your automation assistant is ready to help</p>
        <Button onClick={handleSignOut} className="bg-[#3538CD] hover:bg-[#2a2ca8] text-white px-8 py-6">
          Sign Out
        </Button>
      </main>
    </div>
  )
}

