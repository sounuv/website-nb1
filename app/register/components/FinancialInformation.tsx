"use client"

import { useFormContext } from "./FormProvider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { BANK_FIELD_LIMITS, BANK_FIELD_PATTERNS } from "../constants/bankValidation"

interface FinancialInformationProps {
  onNext: () => void
  onPrev: () => void
}

const BANK_COUNTRIES = {
  BR: {
    name: "Brazil",
    banks: ["Banco do Brasil", "Itaú", "Bradesco", "Caixa", "Santander", "Nubank", "Inter"],
    fields: ["branch", "accountNumber", "accountType"],
  },
  US: {
    name: "United States",
    banks: ["Bank of America", "Chase", "Wells Fargo", "Citibank", "Capital One"],
    fields: ["routingNumber", "accountNumber", "accountType"],
  },
  UK: {
    name: "United Kingdom",
    banks: ["HSBC", "Barclays", "Lloyds", "NatWest", "Santander UK"],
    fields: ["sortCode", "accountNumber", "accountType"],
  },
  AU: {
    name: "Australia",
    banks: ["Commonwealth Bank", "NAB", "ANZ", "Westpac"],
    fields: ["bsb", "accountNumber", "accountType"],
  },
  IN: {
    name: "India",
    banks: ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank"],
    fields: ["ifsc", "accountNumber", "accountType"],
  },
}

export function FinancialInformation({ onNext, onPrev }: FinancialInformationProps) {
  const { formData, updateFormData, t } = useFormContext()
  const [selectedCountry, setSelectedCountry] = useState("")
  const [customCountry, setCustomCountry] = useState("")
  const [customBank, setCustomBank] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const validateBankField = (field: string, value: string, country: string) => {
    if (!country || country === "other") return true
    const pattern =
      BANK_FIELD_PATTERNS[country as keyof typeof BANK_FIELD_PATTERNS]?.[
        field as keyof (typeof BANK_FIELD_PATTERNS)[keyof typeof BANK_FIELD_PATTERNS]
      ]
    return pattern ? pattern.test(value) : true
  }

  const renderBankFields = () => {
    const country = BANK_COUNTRIES[selectedCountry as keyof typeof BANK_COUNTRIES] || {
      fields: ["accountNumber", "accountType"],
    }

    return (
      <>
        <div>
          <Label htmlFor="bankName">{t("financial.bankingInfo.bankName")}</Label>
          <Select
            value={formData.bankName}
            onValueChange={(value) => {
              updateFormData({ bankName: value })
              if (value === "other") {
                setCustomBank("")
              }
            }}
          >
            <SelectTrigger className="h-12 bg-[#1a1f36] border-[#2e3650] text-white">
              <SelectValue placeholder={t("financial.bankingInfo.bankNamePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {(selectedCountry in BANK_COUNTRIES
                ? BANK_COUNTRIES[selectedCountry as keyof typeof BANK_COUNTRIES].banks
                : []
              ).map((bank) => (
                <SelectItem key={bank} value={bank}>
                  {bank}
                </SelectItem>
              ))}
              <SelectItem value="other">{t("financial.bankingInfo.other")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.bankName === "other" && (
          <div>
            <Label htmlFor="customBank">{t("financial.bankingInfo.otherBankName")}</Label>
            <Input
              id="customBank"
              value={customBank}
              onChange={(e) => setCustomBank(e.target.value)}
              className="h-12 bg-[#1a1f36] border-[#2e3650] text-white"
            />
          </div>
        )}

        {country.fields.includes("branch") && (
          <div>
            <Label htmlFor="branch">{t("financial.bankingInfo.branch")}</Label>
            <Input
              id="branch"
              placeholder={t("financial.bankingInfo.branchPlaceholder")}
              className="h-12 bg-[#1a1f36] border-[#2e3650] text-white"
              value={formData.branch || ""}
              onChange={(e) => {
                const value = e.target.value
                if (validateBankField("branch", value, selectedCountry)) {
                  updateFormData({ branch: value })
                }
              }}
              maxLength={BANK_FIELD_LIMITS[selectedCountry as keyof typeof BANK_FIELD_LIMITS]?.branch || undefined}
            />
          </div>
        )}

        {country.fields.includes("routingNumber") && (
          <div>
            <Label htmlFor="routingNumber">{t("financial.bankingInfo.routingNumber")}</Label>
            <Input
              id="routingNumber"
              className="h-12 bg-[#1a1f36] border-[#2e3650] text-white"
              value={formData.routingNumber || ""}
              onChange={(e) => {
                const value = e.target.value
                if (validateBankField("routingNumber", value, selectedCountry)) {
                  updateFormData({ routingNumber: value })
                }
              }}
              maxLength={
                BANK_FIELD_LIMITS[selectedCountry as keyof typeof BANK_FIELD_LIMITS]?.routingNumber || undefined
              }
            />
          </div>
        )}

        {country.fields.includes("sortCode") && (
          <div>
            <Label htmlFor="sortCode">{t("financial.bankingInfo.sortCode")}</Label>
            <Input
              id="sortCode"
              className="h-12 bg-[#1a1f36] border-[#2e3650] text-white"
              value={formData.sortCode || ""}
              onChange={(e) => {
                const value = e.target.value
                if (validateBankField("sortCode", value, selectedCountry)) {
                  updateFormData({ sortCode: value })
                }
              }}
              maxLength={BANK_FIELD_LIMITS[selectedCountry as keyof typeof BANK_FIELD_LIMITS]?.sortCode || undefined}
            />
          </div>
        )}

        {country.fields.includes("bsb") && (
          <div>
            <Label htmlFor="bsb">{t("financial.bankingInfo.bsb")}</Label>
            <Input
              id="bsb"
              className="h-12 bg-[#1a1f36] border-[#2e3650] text-white"
              value={formData.bsb || ""}
              onChange={(e) => {
                const value = e.target.value
                if (validateBankField("bsb", value, selectedCountry)) {
                  updateFormData({ bsb: value })
                }
              }}
              maxLength={BANK_FIELD_LIMITS[selectedCountry as keyof typeof BANK_FIELD_LIMITS]?.bsb || undefined}
            />
          </div>
        )}

        {country.fields.includes("ifsc") && (
          <div>
            <Label htmlFor="ifsc">{t("financial.bankingInfo.ifsc")}</Label>
            <Input
              id="ifsc"
              className="h-12 bg-[#1a1f36] border-[#2e3650] text-white"
              value={formData.ifsc || ""}
              onChange={(e) => {
                const value = e.target.value.toUpperCase()
                if (validateBankField("ifsc", value, selectedCountry)) {
                  updateFormData({ ifsc: value })
                }
              }}
              maxLength={BANK_FIELD_LIMITS[selectedCountry as keyof typeof BANK_FIELD_LIMITS]?.ifsc || undefined}
            />
          </div>
        )}

        <div>
          <Label htmlFor="accountNumber">{t("financial.bankingInfo.accountNumber")}</Label>
          <Input
            id="accountNumber"
            placeholder={t("financial.bankingInfo.accountNumberPlaceholder")}
            className="h-12 bg-[#1a1f36] border-[#2e3650] text-white"
            value={formData.accountNumber || ""}
            onChange={(e) => {
              const value = e.target.value
              if (validateBankField("accountNumber", value, selectedCountry)) {
                updateFormData({ accountNumber: value })
              }
            }}
            maxLength={BANK_FIELD_LIMITS[selectedCountry as keyof typeof BANK_FIELD_LIMITS]?.accountNumber || undefined}
          />
        </div>

        <div>
          <Label htmlFor="accountType">{t("financial.bankingInfo.accountType")}</Label>
          <Select value={formData.accountType} onValueChange={(value) => updateFormData({ accountType: value })}>
            <SelectTrigger className="h-12 bg-[#1a1f36] border-[#2e3650] text-white">
              <SelectValue placeholder={t("financial.bankingInfo.accountType")} />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(t("financial.bankingInfo.accountTypes")).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="monthlyIncomeRange">{t("financial.monthlyIncomeRange")}</Label>
        <Select
          value={formData.monthlyIncomeRange}
          onValueChange={(value) => updateFormData({ monthlyIncomeRange: value })}
        >
          <SelectTrigger className="h-12 bg-[#1a1f36] border-[#2e3650] text-white">
            <SelectValue placeholder={t("financial.monthlyIncomeRange")} />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(t(`financial.incomeRanges.${formData.preferredCurrency}`)).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="socialClass">{t("financial.socialClass")}</Label>
        <Select value={formData.socialClass} onValueChange={(value) => updateFormData({ socialClass: value })}>
          <SelectTrigger className="h-12 bg-[#1a1f36] border-[#2e3650] text-white">
            <SelectValue placeholder={t("financial.socialClass")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A">A</SelectItem>
            <SelectItem value="B">B</SelectItem>
            <SelectItem value="C">C</SelectItem>
            <SelectItem value="D">D</SelectItem>
            <SelectItem value="E">E</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="bankCountry">{t("financial.bankingInfo.country")}</Label>
        <Select
          value={selectedCountry}
          onValueChange={(value) => {
            setSelectedCountry(value)
            if (value === "other") {
              setCustomCountry("")
            }
          }}
        >
          <SelectTrigger className="h-12 bg-[#1a1f36] border-[#2e3650] text-white">
            <SelectValue placeholder={t("financial.bankingInfo.country")} />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(BANK_COUNTRIES).map(([code, { name }]) => (
              <SelectItem key={code} value={code}>
                {name}
              </SelectItem>
            ))}
            <SelectItem value="other">{t("financial.bankingInfo.other")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedCountry === "other" && (
        <div>
          <Label htmlFor="customCountry">{t("financial.bankingInfo.otherCountry")}</Label>
          <Input
            id="customCountry"
            value={customCountry}
            onChange={(e) => setCustomCountry(e.target.value)}
            className="h-12 bg-[#1a1f36] border-[#2e3650] text-white"
          />
        </div>
      )}

      {renderBankFields()}

      <div className="flex justify-between pt-4">
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

