import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import CourseCard from "@/components/CourseCard"

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

        {/* Title + View All */}
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

          {/* orange line horizontal */}
          <div className="absolute -top-8 left-7 w-4/5 h-2 bg-orange-300 rounded-full z-0"></div>

          {/* orange line vertical */}
          <div className="absolute -left-8 top-4 w-2 h-4/5 bg-orange-300 rounded-full" />

          {/* Back card */}
          <div className="absolute inset-0 -translate-x-4 -translate-y-4 rounded-xl bg-[#1F1C3D]" />

          {/* Outer card */}
          <div className="relative z-10 rounded-xl bg-[#140D2A] p-3">

            {/* Scroll container */}
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

      {/* COURSES */}
      <div className="mt-10">

        {/* Title + View all */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-4xl font-semibold">
            Courses
          </h2>

          <Link
            to="/classes"
            className="text-white/60 hover:text-orange-300 transition"
          >
            View all
          </Link>
        </div>

        {/* CARD WRAPPER */}
        <div className="relative w-full max-w-300">
          
          {/* main container */}
          <div className="relative z-10">

            {/* HORIZONTAL SCROLL AREA */}
            <div className="scrollbar flex gap-14 overflow-x-auto pb-10 px-6 pt-8 pr-70">

              {courses.map((course) => (
                <div key={course.id} className="shrink-0 w-100">
                  <CourseCard
                    id={course.id}
                    name={course.name}
                    progress={course.progress}
                  />
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}
