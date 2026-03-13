type StatsCardProps = {
  title: string
  value: string | number
  subtitle?: React.ReactNode
  children?: React.ReactNode
  layout?: "default" | "split"
}

export default function StatsCard({
  title,
  value,
  subtitle,
  children,
  layout = "default",
}: StatsCardProps) {
  return (
    <div className="relative w-full mx-auto transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] mb-10">

      <div className="absolute -top-4 left-7 w-4/5 h-1.5 bg-orange-300 rounded-full z-0"></div>
      <div className="absolute -left-4 top-4 w-1.5 h-4/5 bg-orange-300 rounded-full" />

      <div className="absolute inset-0 translate-x-4 translate-y-4 border-[3px] border-orange-300/50 rounded-2xl z-0 bg-[#1F1C3D]" />

      <div className="relative z-10 rounded-2xl border-[3px] border-[#FA706C] bg-[#2A2347] p-8">

        {layout === "split" ? (

          <div className="flex justify-between items-center">
            
            <div>
              <p className="text-white/70 mb-1">{title}</p>
              <p className="text-white text-5xl font-semibold">{value}</p>
            </div>

            <div className="text-right">
              {subtitle && (
                <p className="text-white/70 text-sm">{subtitle}</p>
              )}
              {children}
            </div>

          </div>

        ) : (

          <>
            <p className="text-white/70 mb-1">{title}</p>
            <p className="text-white text-5xl font-semibold mb-5">{value}</p>

            {subtitle && (
              <p className="text-white/70 text-sm mb-3">{subtitle}</p>
            )}

            {children}
          </>

        )}

      </div>
    </div>
  )
}