type CourseCardProps = {
  id: string
  name: string
  progress: number // 0 to 100
  onDelete?: (id: string) => void
}

export default function CourseCard({ id, name, progress, onDelete }: CourseCardProps) {
  const pct = Math.max(0, Math.min(100, progress))

  return (
    <div
      className="group relative w-full transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:cursor-pointer"
    >
      {/* background layer 1 */}
      <div className="absolute top-4 left-4 w-full h-full bg-[#1F1C3D] rounded-2xl z-0"></div>

      {/* orange line horizontal */}
      <div className="absolute -top-4 left-7 w-4/5 h-2 bg-orange-300 rounded-full z-0"></div>

      {/* orange line vertical */}
      <div className="absolute -left-4 top-4 w-2 h-4/5 bg-orange-300 rounded-full" />

      {/* MAIN CARD */}
      <div className="relative z-10 h-60 bg-[#362A5A] p-10 rounded-2xl border-3 border-[#1F1C3D] group-hover:bg-orange-300 transition-colors duration-300">
        {/* delete button */}
        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(id)
            }}
            className="absolute right-4 top-4 h-9 w-9 rounded-full bg-[#1F1C3D]/70 text-white text-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-[#1F1C3D]"
            aria-label="Delete course"
            title="Delete"
          >
            ×
          </button>
        )}

        <h2 className="text-white text-3xl font-semibold mb-6">{name}</h2>

        <div className="mt-20 h-3 bg-[#1F1C3D] rounded-full">
          <div
            className="h-3 bg-[#FA706C] rounded-full"
            style={{ width: `${pct}%` }}
          />
        </div>

        <p className="text-right text-white mt-2">{pct}%</p>
      </div>
    </div>
  )
}


