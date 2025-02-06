"use client"

import { useState } from "react"
import { useFormContext } from "./FormProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddressInformationProps {
  onNext: () => void
  onPrev: () => void
}

export function AddressInformation({ onNext, onPrev }: AddressInformationProps) {
  const { formData, updateFormData, t } = useFormContext()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const fetchAddressByCEP = async (cep: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()
      if (!data.erro) {
        updateFormData({
          residentialAddress: {
            ...formData.residentialAddress,
            postalCode: cep,
            street: data.logradouro,
            city: data.localidade,
            state: data.uf,
            country: "Brasil",
          },
        })
      }
    } catch (error) {
      console.error("Error fetching address:", error)
    }
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="postalCode">{t("address.postalCode")}</Label>
        <Input
          id="postalCode"
          value={formData.residentialAddress.postalCode}
          onChange={(e) => {
            const cep = e.target.value.replace(/\D/g, "")
            updateFormData({
              residentialAddress: { ...formData.residentialAddress, postalCode: cep },
            })
            if (cep.length === 8) {
              fetchAddressByCEP(cep)
            }
          }}
          required
          className="h-12 bg-[#1a1f36] border-[#2e3650] text-white"
          placeholder={t("address.postalCodePlaceholder")}
        />
      </div>
      <div>
        <Label htmlFor="country">{t("address.country")}</Label>
        <Input
          id="country"
          value={formData.residentialAddress.country}
          onChange={(e) =>
            updateFormData({
              residentialAddress: { ...formData.residentialAddress, country: e.target.value },
            })
          }
          required
          className="h-12 bg-[#1a1f36] border-[#2e3650] text-white"
        />
      </div>
      <div>
        <Label htmlFor="state">{t("address.state")}</Label>
        <Input
          id="state"
          value={formData.residentialAddress.state}
          onChange={(e) =>
            updateFormData({
              residentialAddress: { ...formData.residentialAddress, state: e.target.value },
            })
          }
          required
          className="h-12 bg-[#1a1f36] border-[#2e3650] text-white"
        />
      </div>
      <div>
        <Label htmlFor="city">{t("address.city")}</Label>
        <Input
          id="city"
          value={formData.residentialAddress.city}
          onChange={(e) =>
            updateFormData({
              residentialAddress: { ...formData.residentialAddress, city: e.target.value },
            })
          }
          required
          className="h-12 bg-[#1a1f36] border-[#2e3650] text-white"
        />
      </div>
      <div>
        <Label htmlFor="street">{t("address.street")}</Label>
        <Input
          id="street"
          value={formData.residentialAddress.street}
          onChange={(e) =>
            updateFormData({
              residentialAddress: { ...formData.residentialAddress, street: e.target.value },
            })
          }
          required
          className="h-12 bg-[#1a1f36] border-[#2e3650] text-white"
        />
      </div>
      <div>
        <Label htmlFor="number">{t("address.number")}</Label>
        <Input
          id="number"
          value={formData.residentialAddress.number}
          onChange={(e) =>
            updateFormData({
              residentialAddress: { ...formData.residentialAddress, number: e.target.value },
            })
          }
          required
          className="h-12 bg-[#1a1f36] border-[#2e3650] text-white"
        />
      </div>
      <div>
        <Label htmlFor="complement">{t("address.complement")}</Label>
        <Input
          id="complement"
          value={formData.residentialAddress.complement}
          onChange={(e) =>
            updateFormData({
              residentialAddress: { ...formData.residentialAddress, complement: e.target.value },
            })
          }
          className="h-12 bg-[#1a1f36] border-[#2e3650] text-white"
          placeholder={t("address.complementPlaceholder")}
        />
      </div>
      <div className="flex justify-between">
        <Button onClick={onPrev} className="bg-[#2a2d3e] hover:bg-[#3a3d4e] text-white">
          {t("buttons.previous")}
        </Button>
        <Button type="submit" className="bg-[#3538CD] hover:bg-[#2a2ca8] text-white">
          {t("buttons.next")}
        </Button>
      </div>
    </form>
  )
}

