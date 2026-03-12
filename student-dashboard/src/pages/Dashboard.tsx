import { useEffect, useState } from "react"
import HorizontalCourse from "@/components/HorizontalCourse"
import VerticalTasks from "@/components/VerticalTasks"

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
    <section className="pt-10 pr-10 pb-10 min-h-screen bg-[#352D51] overflow-x-hidden">

      <h1 className="text-white text-6xl font-bold mb-12 -mt-12">
        Welcome, User!
      </h1>

      <VerticalTasks upcomingTasks={upcomingTasks} />

      <HorizontalCourse courses={courses} />

    </section>
  )
}
