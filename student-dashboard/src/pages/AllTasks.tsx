import { useEffect, useMemo, useState } from "react"

type Task = {
  id: string
  course: string
  title: string
  due: string
  done: boolean
}

type TasksByCourse = Record<string, Task[]>

export default function AllTasks() {
  const [tasksByCourse, setTasksByCourse] = useState<TasksByCourse>({})

  useEffect(() => {
    const raw = localStorage.getItem("tasksByCourse")
    if (!raw) return
    setTasksByCourse(JSON.parse(raw))
  }, [])

  const allCourses = useMemo(() => Object.keys(tasksByCourse), [tasksByCourse])

  function toggleDone(courseId: string, taskId: string) {
    setTasksByCourse((prev) => {
      const updated = { ...prev }

      updated[courseId] = updated[courseId].map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )

      localStorage.setItem("tasksByCourse", JSON.stringify(updated))

      return updated
    })

    window.dispatchEvent(new Event("courses-updated"))
  }

  return (
    <section className="p-10 min-h-screen bg-[#352D51]">
      <h1 className="text-white text-6xl font-bold mb-12 -mt-15">All tasks</h1>

      <div className="flex flex-col gap-12 max-w-6xl">
        {allCourses.map((courseId) => {
          const tasks = tasksByCourse[courseId] ?? []

          return (
            <div key={courseId} className="flex flex-col gap-4">
              <h2 className="text-white text-4xl font-semibold">
                {tasks[0]?.course ?? "Course"}
              </h2>

              <div className="rounded-xl border-[3px] border-[#FA706C] bg-[#1F1C3D] overflow-hidden">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between px-6 py-4 border-b border-white/10 last:border-none"
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleDone(courseId, task.id)}
                        className="h-4 w-4 accent-[#FA706C]"
                      />
                      <span
                        className={`text-white ${
                          task.done ? "line-through opacity-70" : ""
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>

                    <span className="text-white/60">{task.due}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}