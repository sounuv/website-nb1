"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useFormContext } from "./FormProvider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface CulturalInformationProps {
  onPrev: () => void
}

const CULTURAL_KEYS = {
  hobbies: ["reading", "traveling", "sports", "cooking", "music", "art", "technology", "gaming"],
  movieGenres: ["action", "comedy", "drama", "sciFi", "horror", "romance", "documentary"],
  seriesGenres: ["drama", "comedy", "sciFi", "thriller", "fantasy", "crime", "animation"],
} as const

export function CulturalInformation({ onPrev }: CulturalInformationProps) {
  const router = useRouter()
  const { formData, updateFormData, t } = useFormContext()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openPopover, setOpenPopover] = useState<{
    hobbies: boolean
    movieGenres: boolean
    seriesGenres: boolean
  }>({
    hobbies: false,
    movieGenres: false,
    seriesGenres: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(
        "https://n8n-webhooks.bluenacional.com/webhook/45404344-29a6-4b8f-84ab-bdc3ca8c9281",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            step: "cultural",
            completed: true,
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Form submission failed")
      }

      toast.success(t("messages.registrationSuccess"))

      router.push("/register/choose-plan")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error(error instanceof Error ? error.message : t("messages.genericError"))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSelect = (category: "hobbies" | "movieGenres" | "seriesGenres", item: string) => {
    const currentItems = formData[category]
    if (!currentItems.includes(item)) {
      updateFormData({ [category]: [...currentItems, item] })
    }
    setOpenPopover((prev) => ({ ...prev, [category]: false }))
  }

  const handleRemove = (category: "hobbies" | "movieGenres" | "seriesGenres", item: string) => {
    const currentItems = formData[category]
    updateFormData({ [category]: currentItems.filter((i) => i !== item) })
  }

  const getTranslatedOption = (category: keyof typeof CULTURAL_KEYS, key: string) => {
    return t(`cultural.options.${category}.${key}`)
  }

  const renderMultiSelect = (category: "hobbies" | "movieGenres" | "seriesGenres", label: string) => {
    const selectedItems = formData[category]
    const availableOptions = CULTURAL_KEYS[category].filter((item) => !selectedItems.includes(item))

    return (
      <div className="space-y-2">
        <Label className="text-lg font-semibold">{label}</Label>

        <div className="space-y-2">
          <Popover
            open={openPopover[category]}
            onOpenChange={(open) => setOpenPopover((prev) => ({ ...prev, [category]: open }))}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between bg-[#1a1f36] border-[#2e3650] text-white hover:bg-[#2a2d3e] hover:text-white"
              >
                {t(`cultural.${category}`)}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-[#1a1f36] border-[#2e3650]">
              <Command>
                <CommandInput placeholder={`${t(`cultural.${category}`)}...`} className="h-9 text-white" />
                <CommandList>
                  <CommandEmpty>No item found.</CommandEmpty>
                  <CommandGroup className="max-h-[200px] overflow-auto">
                    {availableOptions.map((item) => (
                      <CommandItem
                        key={item}
                        onSelect={() => handleSelect(category, item)}
                        className="text-white hover:bg-[#2a2d3e]"
                      >
                        <Check
                          className={cn("mr-2 h-4 w-4", selectedItems.includes(item) ? "opacity-100" : "opacity-0")}
                        />
                        {getTranslatedOption(category, item)}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <div className="flex flex-wrap gap-2">
            {selectedItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-full bg-[#2a2d3e] px-3 py-1 text-sm text-white"
              >
                {getTranslatedOption(category, item)}
                <button onClick={() => handleRemove(category, item)} className="text-gray-400 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {renderMultiSelect("hobbies", t("cultural.hobbies"))}
      {renderMultiSelect("movieGenres", t("cultural.movieGenres"))}
      {renderMultiSelect("seriesGenres", t("cultural.seriesGenres"))}

      <div className="flex justify-between">
        <Button onClick={onPrev} className="bg-[#2a2d3e] hover:bg-[#3a3d4e] text-white">
          {t("buttons.previous")}
        </Button>
        <Button type="submit" className="bg-[#3538CD] hover:bg-[#2a2ca8] text-white" disabled={isSubmitting}>
          {isSubmitting ? t("buttons.submitting") : t("buttons.submit")}
        </Button>
      </div>
    </form>
  )
}

