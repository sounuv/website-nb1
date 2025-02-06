"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, X } from "lucide-react"

export default function ChoosePlanType() {
  const router = useRouter()

  const handleClose = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-[#0f1729] p-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex justify-end mb-8">
          <Button variant="ghost" size="icon" onClick={handleClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Plan Type</h1>
          <p className="text-lg text-gray-400">Select the plan type that best fits your needs</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-[#1a1f36] border-[#2e3650] hover:bg-[#2a2d3e] transition-colors">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-white">Personal</CardTitle>
              <CardDescription className="text-gray-400">
                Perfect for individuals looking to automate their daily tasks and boost productivity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => router.push("/register/choose-plan/personal")}
                className="w-full bg-[#3538CD] hover:bg-[#2a2ca8] text-white"
              >
                View plans <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1f36]/50 border-[#2e3650] backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-white">Teams</CardTitle>
              <CardDescription className="text-gray-400">
                Coming soon. Enterprise-grade automation for teams and organizations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button disabled className="w-full bg-white/10 text-white cursor-not-allowed">
                Unavailable
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

