import { useEffect, useState } from "react"
import HorizontalCourse from "@/components/HorizontalCourse"
import VerticalTasks from "@/components/VerticalTasks"
import { CalendarGrid, getWeekDates, PanelBox } from "@/pages/Calendar";

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

  const [weekOffset, setWeekOffset] = useState(0)

  const weekDates = getWeekDates(weekOffset)

  const monthLabel = weekDates[0].toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric" }
  )

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
    .filter(task => !task.done)
    .sort((a, b) =>
      new Date(a.due).getTime() - new Date(b.due).getTime()
    )

  /* ─────────────────────────────
     CONNECT TASKS TO CALENDAR
  ───────────────────────────── */

  const events = upcomingTasks.map(task => ({
    id: task.id,
    title: task.title,
    date: task.due,
    startH: 9,
    endH: 10,
    color: "#FA706C"
  }))

  return (
    <section className="pb-10 min-h-screen bg-[#352D51] overflow-x-hidden pl-8">

      <div className="w-full max-w-350 mx-auto px-6">

        <h1 className="text-white text-6xl font-bold mb-12 -ml-7">
          Welcome, User!
        </h1>

        {/* Tasks + Calendar */}

        <div className="flex gap-12 items-start">

          <div className="flex-1">
            <VerticalTasks upcomingTasks={upcomingTasks} />
          </div>

          <div className="flex-1">

            <PanelBox style={{ width: "100%", height: "500px" }}>

              <CalendarGrid
                weekDates={weekDates}
                events={events}
                onPrev={() => setWeekOffset(w => w - 1)}
                onNext={() => setWeekOffset(w => w + 1)}
                monthLabel={monthLabel}
              />

            </PanelBox>

          </div>

        </div>

        {/* Courses */}

        <HorizontalCourse courses={courses} />

      </div>

    </section>
  )
}
