"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type React from "react"

const navigation = [
  { name: "Personal Profile", href: "/dashboard/settings" },
  { name: "Cultural Profile", href: "/dashboard/settings/cultural" },
  { name: "Extension Settings", href: "/dashboard/settings/extension" },
  { name: "Notifications", href: "/dashboard/settings/notifications" },
  { name: "Privacy", href: "/dashboard/settings/privacy" },
]

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
      </div>

      <div className="flex gap-8">
        <div className="w-64 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm font-medium",
                  isActive ? "bg-[#3538CD] text-white" : "text-gray-400 hover:bg-[#2a2d3e] hover:text-white",
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

