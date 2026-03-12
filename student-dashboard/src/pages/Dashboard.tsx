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
  // Sample tasks data
  const sampleTasks: TasksByCourse = {
    "Web Development": [
      { id: "1", course: "Web Development", title: "Complete HTML project", due: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], done: false },
      { id: "2", course: "Web Development", title: "Submit CSS assignment", due: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], done: false },
    ],
    "Data Science": [
      { id: "3", course: "Data Science", title: "Prepare analysis report", due: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], done: false },
      { id: "4", course: "Data Science", title: "Review ML algorithms", due: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], done: false },
    ],
    "Database Design": [
      { id: "5", course: "Database Design", title: "Design schema", due: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], done: false },
    ],
  };

  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "Web Development", progress: 65 },
    { id: "2", name: "Data Science", progress: 45 },
    { id: "3", name: "Database Design", progress: 80 },
  ])
  const [tasksByCourse, setTasksByCourse] = useState<TasksByCourse>(sampleTasks)

  const [weekOffset, setWeekOffset] = useState(0);
  const weekDates = getWeekDates(weekOffset);
  
  // Sample events for the calendar
  const sampleEvents = [
    { id: 1, date: weekDates[1].toISOString().split('T')[0], startH: 9, endH: 11, title: "Web Development", color: "#FA706C" },
    { id: 2, date: weekDates[2].toISOString().split('T')[0], startH: 13, endH: 15, title: "Database Design", color: "#71D277" },
    { id: 3, date: weekDates[3].toISOString().split('T')[0], startH: 10, endH: 12, title: "Project Meeting", color: "#4DB3DD" },
    { id: 4, date: weekDates[4].toISOString().split('T')[0], startH: 14, endH: 16, title: "React Workshop", color: "#F5C542" },
    { id: 5, date: weekDates[5].toISOString().split('T')[0], startH: 10, endH: 11, title: "Team Standup", color: "#a78bfa" },
  ];
  
  const [events, setEvents] = useState(sampleEvents);
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
    <section className="min-h-screen bg-[#352D51] flex flex-col">

      <h1 className="text-white text-7xl font-bold mb-14 -mt-3 ml-12">
        Welcome, User!
      </h1>

      <div className="flex gap-30 flex-1 min-h-0 px-10 overflow-hidden">
        <VerticalTasks upcomingTasks={upcomingTasks} />
        <PanelBox style={{ flex: 1, minWidth: "300px" }}>
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
