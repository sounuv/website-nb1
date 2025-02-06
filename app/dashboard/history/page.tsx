"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ActivityItem } from "../components/activity-item"

export default function HistoryPage() {
  const [period, setPeriod] = useState("30")
  const [type, setType] = useState("all")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">History</h1>
      </div>

      <div className="flex gap-4">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px] bg-[#1a1f36] border-[#2e3650] text-white">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1f36] border-[#2e3650] text-white">
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>

        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-[180px] bg-[#1a1f36] border-[#2e3650] text-white">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1f36] border-[#2e3650] text-white">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="analysis">Analysis</SelectItem>
            <SelectItem value="generation">Generation</SelectItem>
            <SelectItem value="editing">Editing</SelectItem>
          </SelectContent>
        </Select>

        <Input
          className="flex-1 bg-[#1a1f36] border-[#2e3650] text-white placeholder-gray-500"
          placeholder="Search history..."
          type="search"
        />
      </div>

      <div className="space-y-4">
        <ActivityItem
          title="Content Analysis"
          description="Analyzed article about AI trends"
          credits={5}
          date={new Date(Date.now() - 30 * 60000)}
          onView={() => {}}
        />
        <ActivityItem
          title="Content Generation"
          description="Generated product description"
          credits={8}
          date={new Date(Date.now() - 2 * 3600000)}
          onView={() => {}}
        />
        <ActivityItem
          title="Text Editing"
          description="Grammar and style corrections"
          credits={3}
          date={new Date(Date.now() - 5 * 3600000)}
          onView={() => {}}
        />
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" size="sm" className="bg-[#1a1f36] border-[#2e3650] text-white hover:bg-[#2a2d3e]">
          1
        </Button>
        <Button variant="outline" size="sm" className="bg-[#1a1f36] border-[#2e3650] text-white hover:bg-[#2a2d3e]">
          2
        </Button>
        <Button variant="outline" size="sm" className="bg-[#1a1f36] border-[#2e3650] text-white hover:bg-[#2a2d3e]">
          3
        </Button>
        <span className="text-sm text-gray-500">...</span>
        <Button variant="outline" size="sm" className="bg-[#1a1f36] border-[#2e3650] text-white hover:bg-[#2a2d3e]">
          10
        </Button>
      </div>
    </div>
  )
}

