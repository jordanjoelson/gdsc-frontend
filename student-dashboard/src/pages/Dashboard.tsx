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

  const allTasks = Object.values(tasksByCourse).flat()

  const upcomingTasks = allTasks
    .filter((task) => !task.done)
    .sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime())

  return (
    <section className="p-10 min-h-screen bg-[#352D51]">

      {/* Welcome */}
      <h1 className="text-white text-6xl font-bold mb-12 -mt-15">
        Welcome, User!
      </h1>

      {/* UPCOMING TASKS */}
      <div className="mb-16">
        <h2 className="text-white text-4xl font-semibold mb-14">
          Upcoming Tasks
        </h2>

        <div className="relative group w-115 ml-8">

          {/* orange line horizontal */}
          <div className="absolute -top-8 left-7 w-4/5 h-2 bg-orange-300 rounded-full z-0"></div>

          {/* orange line vertical */}
          <div className="absolute -left-8 top-4 w-2 h-4/5 bg-orange-300 rounded-full" />
          
          {/* Back card */}
          <div className="absolute inset-0 -translate-x-4 -translate-y-4 rounded-xl bg-[#1F1C3D]" />

          {/* Scrollable card */}
          <div className="scrollbar relative z-10 h-72 overflow-y-auto rounded-xl bg-[#140D2A]">

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

      {/* COURSES */}
      <div>
        <h2 className="text-white text-4xl font-semibold mb-8">
          Courses
        </h2>

        <div className="grid gap-10 grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">

          {courses.map((course) => (
            <div key={course.id} className="relative group">

              {/* back shadow */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl bg-[#1F1C3D]" />

              {/* main card */}
              <div className="relative z-10 rounded-xl bg-[#3B3260] p-6 shadow-lg">

                <h3 className="text-white text-2xl mb-4">
                  {course.name}
                </h3>

                {/* progress bar */}
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
