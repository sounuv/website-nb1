"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UserData {
  id: string
  nome_completo: string
  nome_social: string | null
  email: string
  telefone: string
  data_nascimento: string
  genero: string
  moeda_preferida: string
  lingua_preferida: string
  codigo_postal: string
  pais: string
  estado: string
  cidade: string
  logradouro: string
  numero: string
  faixa_renda_mensal: string
  classe_social: string
  hobbies: string
  estilo_favorito_filmes: string
  estilo_favorito_series: string
  empresa_id: string | null
  status: string | null
  plano: string | null
  tipo_plano: string | null
  data_pagamento: string | null
  complemento: string
  banco: string | null
  agencia: string | null
  conta: string | null
  tipo_conta: string | null
}

export default function PersonalProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData")
    if (storedUserData) {
      const data = JSON.parse(storedUserData)
      // Clean up template syntax from values
      const cleanedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
          if (typeof value === "string" && value.includes("{{")) {
            // Return empty string for template values
            return [key, ""]
          }
          return [key, value]
        }),
      )
      setUserData(cleanedData as UserData)
    }
  }, [])

  const formatDate = (dateString: string) => {
    if (!dateString || dateString.includes("{{")) return ""
    // Convert date to YYYY-MM-DD format for input type="date"
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  }

  const handleSaveChanges = async () => {
    // TODO: Implement save changes functionality
    console.log("Saving changes:", userData)
  }

  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-[#2e3650] bg-[#1a1f36] p-6">
        <h2 className="text-lg font-medium text-white">Personal Profile</h2>

        <div className="mt-4 flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-[#2a2d3e]" />
          <Button className="bg-[#3538CD] hover:bg-[#2a2ca8] text-white">Change Photo</Button>
        </div>

        <div className="mt-6">
          <h3 className="text-base font-medium text-white">Basic Information</h3>

          <div className="mt-4 grid gap-4">
            <div>
              <Label htmlFor="fullName" className="text-gray-400">
                Full Name
              </Label>
              <Input
                id="fullName"
                defaultValue={userData.nome_completo}
                className="bg-[#2a2d3e] border-[#2e3650] text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label htmlFor="socialName" className="text-gray-400">
                Social Name
              </Label>
              <Input
                id="socialName"
                defaultValue={userData.nome_social || ""}
                className="bg-[#2a2d3e] border-[#2e3650] text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label htmlFor="birthDate" className="text-gray-400">
                Birth Date
              </Label>
              <Input
                id="birthDate"
                type="date"
                defaultValue={formatDate(userData.data_nascimento)}
                className="bg-[#2a2d3e] border-[#2e3650] text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label htmlFor="language" className="text-gray-400">
                Preferred Language
              </Label>
              <Select defaultValue={userData.lingua_preferida?.toLowerCase() || "en"}>
                <SelectTrigger className="bg-[#2a2d3e] border-[#2e3650] text-white">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1f36] border-[#2e3650] text-white">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="pt">Portuguese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="currency" className="text-gray-400">
                Preferred Currency
              </Label>
              <Select defaultValue={userData.moeda_preferida || "USD"}>
                <SelectTrigger className="bg-[#2a2d3e] border-[#2e3650] text-white">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1f36] border-[#2e3650] text-white">
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="BRL">BRL (R$)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-base font-medium text-white">Current Address</h3>
          <div className="mt-4 grid gap-4">
            <div>
              <Label htmlFor="postalCode" className="text-gray-400">
                Postal Code
              </Label>
              <Input
                id="postalCode"
                defaultValue={userData.codigo_postal}
                className="bg-[#2a2d3e] border-[#2e3650] text-white placeholder:text-gray-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country" className="text-gray-400">
                  Country
                </Label>
                <Input
                  id="country"
                  defaultValue={userData.pais}
                  className="bg-[#2a2d3e] border-[#2e3650] text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-gray-400">
                  State
                </Label>
                <Input
                  id="state"
                  defaultValue={userData.estado}
                  className="bg-[#2a2d3e] border-[#2e3650] text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="city" className="text-gray-400">
                City
              </Label>
              <Input
                id="city"
                defaultValue={userData.cidade}
                className="bg-[#2a2d3e] border-[#2e3650] text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label htmlFor="street" className="text-gray-400">
                Street
              </Label>
              <Input
                id="street"
                defaultValue={userData.logradouro}
                className="bg-[#2a2d3e] border-[#2e3650] text-white placeholder:text-gray-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="number" className="text-gray-400">
                  Number
                </Label>
                <Input
                  id="number"
                  defaultValue={userData.numero}
                  className="bg-[#2a2d3e] border-[#2e3650] text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <Label htmlFor="complement" className="text-gray-400">
                  Complement
                </Label>
                <Input
                  id="complement"
                  defaultValue={userData.complemento}
                  className="bg-[#2a2d3e] border-[#2e3650] text-white placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-base font-medium text-white">Financial Information</h3>
          {userData.banco && !userData.banco.includes("{{") ? (
            <div className="mt-4 grid gap-4">
              <div>
                <Label htmlFor="bank" className="text-gray-400">
                  Bank
                </Label>
                <Input
                  id="bank"
                  defaultValue={userData.banco}
                  className="bg-[#2a2d3e] border-[#2e3650] text-white placeholder:text-gray-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="branch" className="text-gray-400">
                    Branch
                  </Label>
                  <Input
                    id="branch"
                    defaultValue={userData.agencia}
                    className="bg-[#2a2d3e] border-[#2e3650] text-white placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <Label htmlFor="accountNumber" className="text-gray-400">
                    Account Number
                  </Label>
                  <Input
                    id="accountNumber"
                    defaultValue={userData.conta}
                    className="bg-[#2a2d3e] border-[#2e3650] text-white placeholder:text-gray-500"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="accountType" className="text-gray-400">
                  Account Type
                </Label>
                <Input
                  id="accountType"
                  defaultValue={userData.tipo_conta}
                  className="bg-[#2a2d3e] border-[#2e3650] text-white placeholder:text-gray-500"
                />
              </div>
            </div>
          ) : (
            <Button className="mt-2 bg-[#3538CD] hover:bg-[#2a2ca8] text-white">Add Payment Method</Button>
          )}
        </div>

        <Button onClick={handleSaveChanges} className="mt-8 bg-[#3538CD] hover:bg-[#2a2ca8] text-white">
          Save Changes
        </Button>
      </div>
    </div>
  )
}

