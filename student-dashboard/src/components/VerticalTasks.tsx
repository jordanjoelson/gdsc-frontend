import { Link } from "react-router-dom"

type Task = {
  id: string
  course: string
  title: string
  due: string
  done: boolean
}

type Props = {
  upcomingTasks: Task[]
}

export default function VerticalTasks({ upcomingTasks }: Props) {
  return (
    <div className="mb-16">

      <div className="flex items-center justify-between w-120 ml-10 mb-13">
        <h2 className="text-white text-4xl font-semibold">
          Upcoming Tasks
        </h2>

        <Link
          to="/allTasks"
          className="text-white/60 hover:text-orange-300 transition"
        >
          View all
        </Link>
      </div>

      <div className="relative group w-120 ml-10">

        <div className="absolute -top-8 left-7 w-4/5 h-2 bg-orange-300 rounded-full z-0"></div>

        <div className="absolute -left-8 top-4 w-2 h-4/5 bg-orange-300 rounded-full" />

        <div className="absolute inset-0 -translate-x-4 -translate-y-4 rounded-xl bg-[#1F1C3D]" />

        <div className="relative z-10 rounded-xl bg-[#140D2A] p-3">

          <div className="scrollbar h-64 overflow-y-auto rounded-lg">

            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between px-8 py-5 border-b border-white/10 last:border-none"
              >
                <span className="text-white text-lg">
                  {task.title}
                </span>

                <span className="text-white/60">
                  {task.due}
                </span>
              </div>
            ))}

            {upcomingTasks.length === 0 && (
              <div className="px-8 py-6 text-white/60">
                No upcoming tasks
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}