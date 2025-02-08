"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { translations, type Language } from "../translations"

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

type FormData = {
  // Basic Information
  name: string
  email: string
  phone: string
  password: string
  birthDate: string
  gender: string
  preferredCurrency: string
  preferredLanguage: Language

  // Address Information
  residentialAddress: {
    postalCode: string
    country: string
    state: string
    city: string
    street: string
    number: string
    complement: string
  }

  // Financial Information
  monthlyIncomeRange: string
  socialClass: string
  bankingInfo: {
    country: string
    bankName: string
    branch?: string
    accountNumber: string
    accountType: string
    routingNumber?: string
    sortCode?: string
    bsb?: string
    ifsc?: string
    swift?: string
  }

  // Cultural Information
  hobbies: string[]
  movieGenres: string[]
  seriesGenres: string[]
}

type FormContextType = {
  formData: FormData
  updateFormData: (newData: DeepPartial<FormData>) => void
  t: (key: string) => string
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    birthDate: "",
    gender: "",
    preferredCurrency: "USD",
    preferredLanguage: "en",
    residentialAddress: {
      postalCode: "",
      country: "",
      state: "",
      city: "",
      street: "",
      number: "",
      complement: "",
    },
    monthlyIncomeRange: "",
    socialClass: "",
    bankingInfo: {
      country: "",
      bankName: "",
      accountNumber: "",
      accountType: "",
    },
    hobbies: [],
    movieGenres: [],
    seriesGenres: [],
  })

  const updateFormData = (newData: DeepPartial<FormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
      residentialAddress: {
        ...prev.residentialAddress,
        ...newData.residentialAddress,
      },
      bankingInfo: {
        ...prev.bankingInfo,
        ...newData.bankingInfo,
      },
      hobbies: newData.hobbies !== undefined ? newData.hobbies : prev.hobbies,
      movieGenres: newData.movieGenres !== undefined ? newData.movieGenres : prev.movieGenres,
      seriesGenres: newData.seriesGenres !== undefined ? newData.seriesGenres : prev.seriesGenres,
    } as FormData));
  }

  const t = (key: string) => {
    const keys = key.split(".")
    let value: any = translations[formData.preferredLanguage]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return <FormContext.Provider value={{ formData, updateFormData, t }}>{children}</FormContext.Provider>
}

