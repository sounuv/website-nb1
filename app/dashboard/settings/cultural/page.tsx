"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CulturalProfilePage() {
  const [hobbies, setHobbies] = useState(["Reading", "Sports", "Traveling"])

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-[#2e3650] bg-[#1a1f36] p-6">
        <h2 className="text-lg font-medium text-white">Cultural Profile</h2>

        <div className="mt-6">
          <h3 className="text-base font-medium text-white">Hobbies & Interests</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {hobbies.map((hobby) => (
              <div
                key={hobby}
                className="flex items-center gap-2 rounded-full bg-[#2a2d3e] px-3 py-1 text-sm text-white"
              >
                {hobby}
                <button
                  onClick={() => setHobbies(hobbies.filter((h) => h !== hobby))}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
            ))}
            <Button
              className="bg-[#3538CD] hover:bg-[#2a2ca8] text-white"
              size="sm"
              onClick={() => setHobbies([...hobbies, "New Hobby"])}
            >
              + Add Hobby
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-base font-medium text-white">Entertainment Preferences</h3>

          <div className="mt-4 grid gap-4">
            <div>
              <label className="text-sm text-gray-400">Favorite Movie Genres</label>
              <Select defaultValue="action">
                <SelectTrigger className="bg-[#2a2d3e] border-[#2e3650] text-white">
                  <SelectValue placeholder="Select genres" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1f36] border-[#2e3650] text-white">
                  <SelectItem value="action">Action, Drama, Sci-Fi</SelectItem>
                  <SelectItem value="comedy">Comedy, Romance</SelectItem>
                  <SelectItem value="thriller">Thriller, Horror</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-400">Favorite Series Genres</label>
              <Select defaultValue="comedy">
                <SelectTrigger className="bg-[#2a2d3e] border-[#2e3650] text-white">
                  <SelectValue placeholder="Select genres" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1f36] border-[#2e3650] text-white">
                  <SelectItem value="comedy">Comedy, Thriller</SelectItem>
                  <SelectItem value="drama">Drama, Mystery</SelectItem>
                  <SelectItem value="scifi">Sci-Fi, Fantasy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-400">Favorite Artists/Bands</label>
              <Input
                placeholder="Click to add artists"
                className="bg-[#2a2d3e] border-[#2e3650] text-white placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        <Button className="mt-8 bg-[#3538CD] hover:bg-[#2a2ca8] text-white">Save Changes</Button>
      </div>
    </div>
  )
}

