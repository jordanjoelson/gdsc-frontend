type XPProgressBarProps = {
  current: number
  max: number
}

export default function XPProgressBar({ current, max }: XPProgressBarProps) {
  const pct = Math.min(100, Math.round((current / max) * 100))

  return (
    <div className="w-full">
      <div className="h-4 bg-[#1F1C3D] rounded-full overflow-hidden">
        <div
          className="h-4 bg-gradient-to-r from-orange-300 to-[#FA706C] rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="text-right text-white/70 mt-2 text-sm">
        {current}/{max} XP
      </p>
    </div>
  )
}