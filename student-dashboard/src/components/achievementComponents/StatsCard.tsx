type StatsCardProps = {
  title: string
  value: string | number
  subtitle?: string
  children?: React.ReactNode
}

export default function StatsCard({
  title,
  value,
  subtitle,
  children,
}: StatsCardProps) {
  return (
    <div className="relative w-full transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02]">

      <div className="absolute inset-0 translate-x-4 translate-y-4 border-[3px] border-orange-300 rounded-2xl z-0" />

      <div className="relative z-10 rounded-2xl border-[3px] border-[#FA706C] bg-[#2A2347] p-8">
        <p className="text-white/70 mb-1">{title}</p>

        <p className="text-white text-5xl font-semibold mb-4">{value}</p>

        {subtitle && (
          <p className="text-white/70 text-sm mb-3">{subtitle}</p>
        )}

        {children}
      </div>
    </div>
  )
}