import { useEffect, useState } from "react"

type Task = {
  id: string
  course: string
  title: string
  due: string
  done: boolean
}

type Course = {
  id: string
  name: string
  progress: number
}

type TasksByCourse = Record<string, Task[]>

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([])
  const [tasksByCourse, setTasksByCourse] = useState<TasksByCourse>({})

  function loadData() {
    const savedCourses = localStorage.getItem("courses")
    const savedTasks = localStorage.getItem("tasksByCourse")

    if (savedCourses) setCourses(JSON.parse(savedCourses))
    if (savedTasks) setTasksByCourse(JSON.parse(savedTasks))
  }

  useEffect(() => {
    loadData()

    window.addEventListener("courses-updated", loadData)
    window.addEventListener("storage", loadData)

    return () => {
      window.removeEventListener("courses-updated", loadData)
      window.removeEventListener("storage", loadData)
    }
  }, [])

  // Flatten tasks
  const allTasks = Object.values(tasksByCourse).flat()

  // Upcoming tasks
  const upcomingTasks = allTasks
    .filter((task) => !task.done)
    .sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime())
    .slice(0, 5)

  return (
    <section className="p-10 bg-[#352D51] min-h-screen">

      {/* Welcome */}
      <h1 className="text-white text-6xl font-bold mb-10 -mt-10">
        Welcome, User!
      </h1>

      {/* Upcoming Tasks */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-3xl font-semibold">Upcoming Tasks</h2>
        </div>

        <div className="relative group max-w-xl">

          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl bg-[#FA706C]/40" />

          <div className="relative z-10 rounded-xl border-[3px] border-[#FA706C]/40 bg-[#1F1C3D] overflow-hidden">

            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between px-6 py-4 border-b border-white/10 last:border-none"
              >
                <span className="text-white">{task.title}</span>
                <span className="text-white/60">{task.due}</span>
              </div>
            ))}

            {upcomingTasks.length === 0 && (
              <div className="px-6 py-4 text-white/60">
                No upcoming tasks
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Courses */}
      <div>
        <h2 className="text-white text-3xl font-semibold mb-8">Courses</h2>

        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">

          {courses.map((course) => (
            <div
              key={course.id}
              className="relative group"
            >
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl bg-[#1F1C3D]" />

              <div className="relative z-10 rounded-xl bg-[#3B3260] p-6 shadow-lg">

                <h3 className="text-white text-xl mb-4">
                  {course.name}
                </h3>

                <div className="w-full h-4 rounded-full bg-[#1F1C3D] overflow-hidden">
                  <div
                    className="h-full bg-[#FA706C]"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <p className="text-right text-white/70 mt-2">
                  {course.progress}%
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}
