"use client"

import { useFormContext } from "./FormProvider"

interface ProgressProps {
  currentStep: number
  totalSteps: number
}

export function Progress({ currentStep, totalSteps }: ProgressProps) {
  const { t } = useFormContext()

  const steps = [
    { number: 1, name: t("steps.basic") },
    { number: 2, name: t("steps.address") },
    { number: 3, name: t("steps.financial") },
    { number: 4, name: t("steps.cultural") },
  ]

  return (
    <div className="relative">
      {/* Progress bar background */}
      <div className="absolute top-[2.125rem] left-0 w-full h-[1px] bg-[#2a2d3e]" />

      {/* Active progress bar */}
      <div
        className="absolute top-[2.125rem] left-0 h-[1px] bg-[#3538CD] transition-all duration-300 ease-in-out"
        style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
      />

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center">
            <div
              className={`w-[68px] h-[68px] rounded-full flex items-center justify-center text-2xl font-medium mb-3
                ${index <= currentStep ? "bg-[#3538CD] text-white" : "bg-[#1a1f36] text-gray-400"}`}
            >
              {step.number}
            </div>
            <span className={`text-base ${index <= currentStep ? "text-[#3538CD]" : "text-gray-400"}`}>
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

