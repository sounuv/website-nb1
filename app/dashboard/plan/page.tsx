import { Button } from "@/components/ui/button"
import { StatsCard } from "../components/stats-card"

export default function PlanPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">My Plan</h1>
      </div>

      <div className="rounded-lg border border-[#2e3650] bg-[#1a1f36] p-6">
        <h2 className="text-xl font-semibold text-white">Personal Pro</h2>
        <p className="text-sm text-gray-400">Active until May 30, 2025</p>

        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-400">Credits Remaining</h3>
          <div className="mt-2">
            <p className="text-3xl font-semibold text-white">347/500</p>
            <div className="mt-2 h-2 w-full rounded-full bg-[#2a2d3e]">
              <div className="h-2 w-[69.4%] rounded-full bg-[#3538CD]" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-medium text-white">Usage This Period</h2>
        <div className="grid grid-cols-2 gap-4">
          <StatsCard title="Content Analysis" value="65" subtitle="credits used" />
          <StatsCard title="Generation" value="48" subtitle="credits used" />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-medium text-white">Plan Options</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-[#2e3650] bg-[#1a1f36] p-6">
            <h3 className="text-lg font-medium text-white">Upgrade to Premium</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li>• Unlimited credits</li>
              <li>• Priority support</li>
            </ul>
            <Button className="mt-4 bg-[#3538CD] hover:bg-[#2a2ca8] text-white">Upgrade Now</Button>
          </div>
          <div className="rounded-lg border border-[#2e3650] bg-[#1a1f36] p-6">
            <h3 className="text-lg font-medium text-white">Auto-Renewal</h3>
            <p className="mt-2 text-sm text-gray-400">Next billing: May 30, 2025</p>
            <Button className="mt-4 bg-[#3538CD] hover:bg-[#2a2ca8] text-white">Manage</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

