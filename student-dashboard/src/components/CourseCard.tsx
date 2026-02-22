type CourseCardProps = {
  name: string
  progress: number //0 to 100
}

function CourseCard({ name, progress }: CourseCardProps) {
  const pct = Math.max(0, Math.min(100, progress)) // clamp to [0, 100]
  
  return (
    <div className="group relative w-full
      transform transition-all duration-300 ease-in-out hover:-translate-y-2
      hover:scale-[1.02] hover:cursor-pointer ">

      {/* background layer 1 */}
      <div className="absolute -top-4 -left-4 w-full h-full bg-[#1F1C3D] rounded-2xl z-0"></div>

      {/* orange line horizontal */}
      <div className="absolute -top-8 left-6 w-4/5 h-2 bg-orange-300 rounded-full z-0"></div>

      {/* orange line vertical */}
      <div className = "absolute -left-8 w-2 h-4/5 bg-orange-300 rounded-full"/>

      {/* MAIN CARD */}
      <div className="relative z-10 bg-[#362A5A] p-10 rounded-2xl border-3 border-[#1F1C3D]
        group-hover:bg-orange-300 transition-colors duration-300">
        <h2 className="text-white text-xl font-semibold mb-6">
          {name}
        </h2>

        <div className="h-3 bg-[#1F1C3D] rounded-full">
          <div className="h-3 w-3/4 bg-[#FA706C] rounded-full"
             style = {{width: `${pct}%`}}
          ></div>
        </div>

        <p className="text-right text-white mt-2">{pct}%</p>
      </div>

    </div>
 
  )
}

export default CourseCard;


