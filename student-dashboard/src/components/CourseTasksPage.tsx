type Task = {
  id: string
  title: string
  due: string
  done: boolean
}

const demoTasks: Task[] = [
  { id: "1", title: "Task", due: "Due date", done: false },
  { id: "2", title: "Task", due: "Due date", done: false },
  { id: "3", title: "Task", due: "Due date", done: false },
]

function TaskRow({ task }: { task: Task }) {
  return (
    <div className = "relative w-full transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:cursor-pointer ">   
        {/* orange horizontal accent */}
        <div className = "h-1.5 w-9/10 bg-orange-300 rounded-full mb-1.5 ml-6"/>
        
        {/* orange vertical accent */}
        <div className = "absolute h-2/3 w-1.5 bg-orange-300 rounded-full -left-3 top-4"/>
        
        <div className="flex items-center justify-between px-6 py-4 rounded-xl border-3 border-[#FA706C] bg-[#2A2347]">
            <div className="flex items-center gap-4">
                <input
                type="checkbox"
                checked={task.done}
                readOnly
                className="h-4 w-4 accent-[#FA706C]"
                />
                <span className="text-white">{task.title}</span>
            </div>
            <span className="text-white/70">{task.due}</span>
        </div>
    </div> 
  )
}

function ProgressMiniCard({ pct }: { pct: number }) {
  return (
    <div className="w-[180px] rounded-xl border border-[#FA706C]/60 bg-[#2A2347] p-4">
      <p className="text-white/70 text-xs mb-2">Overall Progress</p>
      <p className="text-white text-3xl font-semibold mb-3">{pct}%</p>
      <div className="h-2 bg-[#1F1C3D] rounded-full">
        <div className="h-2 bg-[#FA706C] rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function CourseTasksPage() {
  const pct = 75

  return (
    <section className="p-10 min-h-screen bg-[#352D51]">
      {/* Header row */}
      <div className="flex items-start justify-between gap-8 mb-10">
        <h1 className="text-white text-[64px] font-semibold leading-none">
          Linear Algebra
        </h1>
        <ProgressMiniCard pct={pct} />
      </div>

      {/* Tasks header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-2xl font-semibold">Tasks</h2>
        <button className="text-white/80 hover:text-white transition">
          Add More
        </button>
      </div>

      {/* Tasks list */}
      <div className="flex flex-col gap-4 max-w-5xl">
        {demoTasks.map((t) => (
          <TaskRow key={t.id} task={t} />
        ))}
      </div>
    </section>
  )
}