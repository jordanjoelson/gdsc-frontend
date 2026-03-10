import lockIcon from "./icons/lock.svg"

type AvatarCardProps = {
  title: string
  description: string
  color: string
  unlocked: boolean
}

export default function AvatarCard({
  title,
  description,
  color,
  unlocked,
}: AvatarCardProps) {
  return (
    <div className="group relative w-45 transition-all duration-300 hover:-translate-y-2">

      {/* Coral offset card (only if unlocked) */}
      {unlocked && (
        <>
        <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border-[3px] border-[#FA706C] bg-[#FA706C]" />
        
        <div className="absolute -top-4 left-7 w-3/4 h-2 bg-orange-300 rounded-full z-0"/>

        <div className="absolute -left-4 top-4 w-2 h-4/5 bg-orange-300 rounded-full" />
        </>
      )}

      {/* Main card */}
      <div
        className={`relative z-10 p-6 rounded-2xl border-[3px] flex flex-col items-center text-center space-y-3 ${
          unlocked
            ? "border-[#FA706C] bg-[#1F1C3D]"
            : "border-gray-700 bg-[#1C1931]"
        }`}
      >
        {/* Avatar icon */}
        <div className="relative w-16 h-16 mb-4">

          {unlocked ? (
            <>
              {/* stacked squares */}
              <div className="absolute w-16 h-16 bg-white rounded-sm translate-x-1.5 translate-y-1.5" />

              {/* main colored square */}
              <div
                className="relative w-16 h-16 rounded-sm border-2 border-white"
                style={{ background: color }}
              />
            </>
          ) : (
            <div className="w-16 h-16 flex items-center justify-center bg-gray-600 rounded-sm">
              <img src={lockIcon} alt="Locked" className="w-8 h-8 opacity-80" />
            </div>
          )}
        </div>

        {/* Title */}
        <h3
          className={`font-semibold min-h-12 flex items-center justify-center ${
            unlocked ? "text-white" : "text-gray-400"
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/60 text-sm mt-1 line-clamp-2 min-h-10">
          {description}
        </p>

        {/* Status */}
        {unlocked ? (
          <p className="text-green-400 text-sm mt-3">✔ Unlocked</p>
        ) : (
          <p className="text-white/40 text-sm mt-3">Locked</p>
        )}
      </div>
    </div>
  )
}