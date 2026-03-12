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

  const [weekOffset, setWeekOffset] = useState(0);
  const [events, setEvents] = useState([]);
  const weekDates = getWeekDates(weekOffset);
  const monthLabel = weekDates[0].toLocaleDateString("en-US", { month: "long", year: "numeric" });

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
    <section className="pr-10 pb-10 min-h-screen bg-[#352D51] overflow-x-hidden">

      <h1 className="text-white text-7xl font-bold mb-14 -mt-3 ml-12">
        Welcome, User!
      </h1>

      <div className="flex gap-30">
        <VerticalTasks upcomingTasks={upcomingTasks} />
        <PanelBox style={{ width: "800px", height: "500px" }}>
          <CalendarGrid
            weekDates={weekDates}
            events={events}
            onPrev={() => setWeekOffset(w => w - 1)}
            onNext={() => setWeekOffset(w => w + 1)}
          monthLabel={monthLabel}
          />
      </PanelBox>
      </div>
      

      <HorizontalCourse courses={courses} />

    </section>
  )
}
