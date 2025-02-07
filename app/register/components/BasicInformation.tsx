"use client"

import { useState } from "react"
import { useFormContext } from "./FormProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PhoneInput from "react-phone-number-input"
import "../styles/phone-input.css"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface BasicInformationProps {
  onNext: () => void
}

export function BasicInformation({ onNext }: BasicInformationProps) {
  const { formData, updateFormData, t } = useFormContext()
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== confirmPassword) {
      setPasswordError(
        formData.preferredLanguage === "pt"
          ? "As senhas não coincidem"
          : formData.preferredLanguage === "es"
            ? "Las contraseñas no coinciden"
            : "Passwords do not match",
      )
      return
    }

    try {
      const response = await fetch(
        "https://n8n-webhooks.bluenacional.com/webhook/nb1/api/user/check",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
        },
      )

      const data = await response.json()

      if (data.status) {
        setEmailVerified(false)
        toast.error(data.mensagem)
      } else {
        setEmailVerified(true)
        onNext()
      }
    } catch (error) {
      console.error("Error verifying email:", error)
      toast.error("An error occurred while verifying your email. Please try again.")
    }
  }

  const handleLoginRedirect = () => {
    router.push("/")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">{t("basicInfo.name")}</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          required
          className="h-12 bg-[#1a1f36] border-[#2e3650] text-white"
        />
      </div>
      <div>
        <Label htmlFor="email">{t("basicInfo.email")}</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          required
          className="h-12 bg-[#1a1f36] border-[#2e3650] text-white"
        />
      </div>
      <div>
        <Label htmlFor="phone">{t("basicInfo.phone")}</Label>
        <PhoneInput
          international
          defaultCountry="BR"
          value={formData.phone}
          onChange={(value) => updateFormData({ phone: value || "" })}
          className="h-12"
        />
      </div>
      <div>
        <Label htmlFor="password">{t("basicInfo.password")}</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => updateFormData({ password: e.target.value })}
          required
          className="h-12 bg-[#1a1f36] border-[#2e3650] text-white"
        />
      </div>
      <div>
        <Label htmlFor="confirmPassword">{t("basicInfo.confirmPassword")}</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="h-12 bg-[#1a1f36] border-[#2e3650] text-white"
        />
        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
      </div>
      <div>
        <Label htmlFor="birthDate">{t("basicInfo.birthDate")}</Label>
        <Input
          id="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={(e) => updateFormData({ birthDate: e.target.value })}
          required
          className="h-12 bg-[#1a1f36] border-[#2e3650] text-white"
        />
      </div>
      <div>
        <Label htmlFor="gender">{t("basicInfo.gender")}</Label>
        <Select value={formData.gender} onValueChange={(value) => updateFormData({ gender: value })}>
          <SelectTrigger className="h-12 bg-[#1a1f36] border-[#2e3650] text-white">
            <SelectValue placeholder={t("basicInfo.gender")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">{t("basicInfo.genderOptions.male")}</SelectItem>
            <SelectItem value="female">{t("basicInfo.genderOptions.female")}</SelectItem>
            <SelectItem value="other">{t("basicInfo.genderOptions.other")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="preferredCurrency">{t("basicInfo.preferredCurrency")}</Label>
        <Select
          value={formData.preferredCurrency}
          onValueChange={(value) => updateFormData({ preferredCurrency: value })}
        >
          <SelectTrigger className="h-12 bg-[#1a1f36] border-[#2e3650] text-white">
            <SelectValue placeholder={t("basicInfo.preferredCurrency")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD ($)</SelectItem>
            <SelectItem value="EUR">EUR (€)</SelectItem>
            <SelectItem value="BRL">BRL (R$)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="preferredLanguage">{t("basicInfo.preferredLanguage")}</Label>
        <Select
          value={formData.preferredLanguage}
          onValueChange={(value: "en" | "es" | "pt") => updateFormData({ preferredLanguage: value })}
        >
          <SelectTrigger className="h-12 bg-[#1a1f36] border-[#2e3650] text-white">
            <SelectValue placeholder={t("basicInfo.preferredLanguage")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="pt">Português</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {emailVerified === false && (
        <div className="space-y-4">
          <p className="text-red-500">{t("messages.emailAlreadyRegistered")}</p>
          <Button
            type="button"
            onClick={handleLoginRedirect}
            className="w-full bg-[#3538CD] hover:bg-[#2a2ca8] text-white"
          >
            {t("buttons.goToLogin")}
          </Button>
        </div>
      )}

      {emailVerified !== false && (
        <Button type="submit" className="w-full bg-[#3538CD] hover:bg-[#2a2ca8] text-white">
          {t("buttons.next")}
        </Button>
      )}
    </form>
  )
}

