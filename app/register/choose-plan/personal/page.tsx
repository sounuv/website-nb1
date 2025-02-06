"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import { useRouter } from "next/navigation"

type BillingPeriod = "monthly" | "annually"

interface PlanFeature {
  text: string
}

interface Plan {
  name: string
  monthlyPrice: number
  monthlyLink: string
  annualLink: string
  features: PlanFeature[]
}

const plans: Plan[] = [
  {
    name: "Starter",
    monthlyPrice: 29,
    monthlyLink: "https://buy.stripe.com/test_fZe14vgw5fEq3RKdQR",
    annualLink: "https://buy.stripe.com/test_28o8wX0x7boadskdQQ",
    features: [
      { text: "Basic AI automation" },
      { text: "5 automated tasks per day" },
      { text: "Email support" },
      { text: "Chrome extension" },
    ],
  },
  {
    name: "Pro",
    monthlyPrice: 49,
    monthlyLink: "https://buy.stripe.com/test_00g00ra7Hcsedsk7sv",
    annualLink: "https://buy.stripe.com/test_eVa14v4Nn4ZMag88wy",
    features: [
      { text: "Advanced AI automation" },
      { text: "Unlimited automated tasks" },
      { text: "Priority support" },
      { text: "Chrome extension" },
      { text: "Custom workflows" },
    ],
  },
  {
    name: "Premium",
    monthlyPrice: 79,
    monthlyLink: "https://buy.stripe.com/test_fZe9B15Rr4ZMcog149",
    annualLink: "https://buy.stripe.com/test_7sI6oP0x78bY0FybIM",
    features: [
      { text: "Everything in Pro" },
      { text: "API access" },
      { text: "24/7 priority support" },
      { text: "Custom integrations" },
      { text: "Advanced analytics" },
      { text: "Team collaboration" },
    ],
  },
]

export default function PersonalPlan() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly")
  const router = useRouter()

  const handleClose = () => {
    router.push("/dashboard")
  }

  const calculatePrice = (monthlyPrice: number, period: BillingPeriod) => {
    if (period === "annually") {
      const annualPrice = monthlyPrice * 0.8 // 20% discount
      return {
        price: annualPrice,
        billing: `$${(annualPrice * 12).toFixed(2)} billed annually (Save $${(
          monthlyPrice * 12 - annualPrice * 12
        ).toFixed(2)})`,
      }
    }
    return {
      price: monthlyPrice,
      billing: "",
    }
  }

  const handleSelectPlan = (plan: Plan) => {
    const checkoutLink = billingPeriod === "monthly" ? plan.monthlyLink : plan.annualLink
    window.location.href = checkoutLink
  }

  return (
    <div className="min-h-screen bg-[#0f1729] p-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-end mb-8">
          <Button variant="ghost" size="icon" onClick={handleClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Personal Plan</h1>
          <p className="text-lg text-gray-400">Select a plan that works best for you</p>
        </div>

        <div className="mb-12 flex justify-center gap-4">
          <Button
            variant={billingPeriod === "monthly" ? "secondary" : "ghost"}
            onClick={() => setBillingPeriod("monthly")}
            className={
              billingPeriod === "monthly"
                ? "bg-[#3538CD] text-white"
                : "text-gray-400 hover:text-white hover:bg-[#2a2d3e]"
            }
          >
            Monthly
          </Button>
          <Button
            variant={billingPeriod === "annually" ? "secondary" : "ghost"}
            onClick={() => setBillingPeriod("annually")}
            className={
              billingPeriod === "annually"
                ? "bg-[#3538CD] text-white"
                : "text-gray-400 hover:text-white hover:bg-[#2a2d3e]"
            }
          >
            Annually
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const { price, billing } = calculatePrice(plan.monthlyPrice, billingPeriod)
            return (
              <Card key={plan.name} className="bg-[#1a1f36] border-[#2e3650]">
                <CardHeader>
                  <CardTitle>
                    <div className="text-xl font-bold text-white">{plan.name}</div>
                    <div className="mt-2">
                      <span className="text-4xl font-bold text-white">$23.2</span>
                      <span className="text-gray-400">/month</span>
                    </div>
                    {billing && <div className="text-sm text-gray-400 mt-1">{billing}</div>}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => handleSelectPlan(plan)}
                    className="w-full mb-6 bg-[#3538CD] hover:bg-[#2a2ca8] text-white"
                  >
                    {`Select ${billingPeriod === "monthly" ? "Monthly" : "Annual"}`}
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#3538CD] shrink-0" />
                        <span className="text-gray-400">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="link" className="mt-4 w-full text-[#3538CD] hover:text-[#2a2ca8]">
                    View plan details
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

