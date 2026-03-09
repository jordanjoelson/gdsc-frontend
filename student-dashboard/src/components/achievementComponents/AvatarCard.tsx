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
    <div className="group relative w-full transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]">

      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border-[3px] border-orange-300 z-0" />

      <div
        className={`relative z-10 p-6 rounded-2xl border-[3px] ${
          unlocked ? "border-[#FA706C] bg-[#2A2347]" : "border-gray-700 bg-[#1F1C3D]"
        }`}
      >
        <div
          className="w-16 h-16 rounded-md mb-4"
          style={{ background: color }}
        />

        <h3 className="text-white font-semibold">{title}</h3>

        <p className="text-white/60 text-sm mt-1">{description}</p>

        {unlocked ? (
          <p className="text-green-400 text-sm mt-3">✔ Unlocked</p>
        ) : (
          <p className="text-white/40 text-sm mt-3">🔒 Locked</p>
        )}
      </div>
    </div>
  )
}