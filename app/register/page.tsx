"use client"

import { useState } from "react"
import { FormProvider } from "./components/FormProvider"
import { Progress } from "./components/Progress"
import { BasicInformation } from "./components/BasicInformation"
import { AddressInformation } from "./components/AddressInformation"
import { FinancialInformation } from "./components/FinancialInformation"
import { CulturalInformation } from "./components/CulturalInformation"
import { Logo } from "@/components/logo"

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  return (
    <FormProvider>
      <div className="min-h-screen bg-[#0f1729] text-white p-8">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-16">
            <Logo />
          </div>

          {/* Progress and Form Content */}
          <div className="space-y-16">
            <Progress currentStep={currentStep} totalSteps={4} />

            <div className="bg-[#1a1f36] rounded-xl p-8">
              {currentStep === 0 && <BasicInformation onNext={nextStep} />}
              {currentStep === 1 && <AddressInformation onNext={nextStep} onPrev={prevStep} />}
              {currentStep === 2 && <FinancialInformation onNext={nextStep} onPrev={prevStep} />}
              {currentStep === 3 && <CulturalInformation onPrev={prevStep} />}
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  )
}

