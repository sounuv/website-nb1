interface StatsCardProps {
  title: string
  value: string
  subtitle?: string
  progress?: number
}

export function StatsCard({ title, value, subtitle, progress }: StatsCardProps) {
  return (
    <div className="rounded-lg border border-[#2e3650] bg-[#1a1f36] p-6">
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-semibold text-white">{value}</p>
        {subtitle && <p className="ml-2 text-sm text-gray-400">{subtitle}</p>}
      </div>
      {progress !== undefined && (
        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-[#2a2d3e]">
            <div className="h-2 rounded-full bg-[#3538CD]" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
    </div>
  )
}

