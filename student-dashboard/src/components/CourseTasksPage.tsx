type Task = {
  id: string
  course: string
  title: string
  due: string
  done: boolean
}

const demoTasks: Task[] = [
  { id: "1", course: "Linear Algebra", title: "Homework #5", due: "03-19-2026", done: false },
  { id: "2", course: "Linear Algebra", title: "Read Module 3", due: "04-04-2026", done: false },
  { id: "3", course: "Linear Algebra", title: "Finish class assignment", due: "04-05-2026", done: true },
]

function TaskRow({ task }: { task: Task }) {
  return (
    <div className="relative w-full transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02]">
      {/* orange horizontal accent */}
      <div className="h-1.5 w-[90%] bg-orange-300 rounded-full mb-1.5 ml-6" />

      {/* orange vertical accent */}
      <div className="absolute h-2/3 w-1.5 bg-orange-300 rounded-full -left-3 top-4" />

      <div className="flex items-center justify-between px-6 py-4 rounded-xl border-[3px] border-[#FA706C] bg-[#2A2347]">
        <div className="flex items-center gap-4">
          <input type="checkbox" checked={task.done} readOnly className="h-4 w-4 accent-[#FA706C]" />
          <span className="text-white">{task.title}</span>
        </div>
        <span className="text-white/70">{task.due}</span>
      </div>
    </div>
  )
}

function ProgressMiniCard({ pct }: { pct: number }) {
  return (
    <div className="relative w-60 transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02]">
      <div className="absolute inset-0 translate-x-3 translate-y-3 border-3 border-orange-300 rounded-2xl z-0" />

      <div className="relative z-10 rounded-2xl border-3 border-[#FA706C] bg-[#2A2347] p-4">
        <p className="text-white/70 text-s mb-2">Overall Progress</p>
        <p className="text-white text-5xl font-semibold mb-3">{pct}%</p>

        <div className="h-4 bg-[#1F1C3D] rounded-full">
          <div className="h-4 bg-[#FA706C] rounded-full" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}

function Header({ courseId, pct }: { courseId: string; pct: number }) {
  return (
    <div className="relative w-full h-70 mb-15">

      {/* orange accents */}
      <div className="absolute -left-4 top-5 h-4/5 w-2 bg-orange-300 rounded-full" />
      <div className="absolute left-10 -top-4 h-2 w-7/8 bg-orange-300 rounded-full" />

      {/* shadow/back card */}
      <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-2xl border-[3px] border-[#FA706C]/70 bg-[#1F1C3D] z-0" />

      {/* main card */}
      <div className="relative z-10 h-full w-full rounded-2xl border-[3px] border-[#FA706C] bg-[#2A2347] flex items-center justify-between p-10">
        <h1 className="text-white text-7xl font-bold">{courseId}</h1>
        <ProgressMiniCard pct={pct} />
      </div>
    </div>
  )
}

export default function CourseTasksPage() {
  const pct = 75

  return (
    <section className="p-10 min-h-screen bg-[#352D51]">
      <Header courseId="Linear Algebra" pct={pct} />

      {/* Tasks header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-2xl font-semibold">Tasks</h2>
        <button className="text-white/80 hover:text-white transition hover:cursor-pointer">+ Add More</button>
      </div>

      {/* Tasks list */}
      <div className="flex flex-col gap-5 max-w-6xl">
        {demoTasks.map((t) => (
          <TaskRow key={t.id} task={t} />
        ))}
      </div>
    </section>
  )
}