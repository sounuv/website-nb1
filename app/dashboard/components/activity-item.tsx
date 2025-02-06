import { formatDistanceToNow } from "date-fns"
import { Button } from "@/components/ui/button"

interface ActivityItemProps {
  title: string
  description: string
  credits: number
  date: Date
  onView?: () => void
}

export function ActivityItem({ title, description, credits, date, onView }: ActivityItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#2e3650] bg-[#1a1f36] p-4">
      <div className="flex-1">
        <h4 className="text-sm font-medium text-white">{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
        <p className="mt-1 text-xs text-gray-500">
          Used {credits} credits • {formatDistanceToNow(date, { addSuffix: true })}
        </p>
      </div>
      {onView && (
        <Button
          variant="outline"
          size="sm"
          onClick={onView}
          className="border-[#2e3650] text-white hover:bg-[#2a2d3e] hover:text-white"
        >
          View
        </Button>
      )}
    </div>
  )
}

