import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"

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

const demoTasks: Task[] = [
  { id: "1", course: "Linear Algebra", title: "Homework #5", due: "2026-03-19", done: false },
  { id: "2", course: "Linear Algebra", title: "Read Module 3", due: "2026-04-04", done: false },
  { id: "3", course: "Linear Algebra", title: "Finish class assignment", due: "2026-04-05", done: true },
]

function TaskRow({
  task,
  onToggleDone,
}: {
  task: Task
  onToggleDone: (id: string) => void
}) {
  return (
    <div className="relative w-full transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#1e1835]">
      <div className="h-1.5 w-[90%] bg-orange-300 rounded-full mb-1.5 ml-6" />
      <div className="absolute h-2/3 w-1.5 bg-orange-300 rounded-full -left-3 top-4" />

      <div className="flex items-center justify-between px-6 py-4 rounded-xl border-[3px] border-[#FA706C] bg-[#2A2347]">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onToggleDone(task.id)}
            className="h-4 w-4 accent-[#FA706C]"
          />
          <span className={`text-white ${task.done ? "line-through opacity-70" : ""}`}>
            {task.title}
          </span>
        </div>
        <span className="text-white/70">{task.due}</span>
      </div>
    </div>
  )
}

function ProgressMiniCard({ pct }: { pct: number }) {
  const clamped = Math.max(0, Math.min(100, pct))

  const bar = useSpring(0, { stiffness: 120, damping: 25 })
  const barWidth = useTransform(bar, (v) => `${v}%`)

  const mv = useMotionValue(clamped)
  const count = useSpring(mv, { stiffness: 120, damping: 25 })
  const [displayPct, setDisplayPct] = useState(clamped)

  useEffect(() => {
    bar.set(clamped)
    mv.set(clamped)
  }, [clamped, bar, mv])

  useEffect(() => {
    const unsub = count.on("change", (latest) => {
      setDisplayPct(Math.round(latest))
    })
    return () => unsub()
  }, [count])

  return (
    <div className="relative w-60 transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] ">
      <div className="absolute inset-0 translate-x-3 translate-y-3 border-3 border-orange-300 rounded-2xl z-0" />

      <div className="relative z-10 rounded-2xl border-3 border-[#FA706C] bg-[#2A2347] p-4">
        <p className="text-white/70 text-s mb-2">Overall Progress</p>
        <p className="text-white text-5xl font-semibold mb-3">
          {displayPct}%
        </p>

        <div className="h-4 bg-[#1F1C3D] rounded-full overflow-hidden">
          <motion.div
            className="h-4 bg-[#FA706C] rounded-full"
            style={{ width: barWidth }}
          />
        </div>
      </div>
    </div>
  )
}

function Header({ courseId, pct }: { courseId: string; pct: number }) {
  return (
    <div className="relative w-full h-70 mb-15">
      <div className="absolute -left-4 top-5 h-4/5 w-2 bg-orange-300 rounded-full" />
      <div className="absolute left-10 -top-4 h-2 w-7/8 bg-orange-300 rounded-full" />
      <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-2xl border-[3px] border-[#FA706C]/70 bg-[#1F1C3D] z-0" />

      <div className="relative z-10 h-full w-full rounded-2xl border-[3px] border-[#FA706C] bg-[#2A2347] flex items-center justify-between p-10">
        <h1 className="text-white text-7xl font-bold">{courseId}</h1>
        <ProgressMiniCard pct={pct} />
      </div>
    </div>
  )
}

export default function CourseTasksPage() {
  const { courseId } = useParams()
  const safeCourseId = courseId ?? ""

  // Use the actual course NAME for the header (keep prop name "courseId" so UI stays identical)
  const courseName = useMemo(() => {
    try {
      const raw = localStorage.getItem("courses")
      if (!raw) return safeCourseId || "Course"
      const courses: Course[] = JSON.parse(raw)
      const found = courses.find((c) => c.id === safeCourseId)
      return (found?.name ?? safeCourseId) || "Course"
    } catch {
      return safeCourseId || "Course"
    }
  }, [safeCourseId])

  // Load tasks for this course from localStorage, otherwise fall back to demoTasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const raw = localStorage.getItem("tasksByCourse")
      if (raw) {
        const map: TasksByCourse = JSON.parse(raw)
        return map[safeCourseId] ?? []
      }
    } catch {
      // ignore
    }
    return demoTasks.filter((t) => t.course === courseName)
  })

  // When route changes to a different course, load that course's tasks
  useEffect(() => {
    try {
      const raw = localStorage.getItem("tasksByCourse")
      if (raw) {
        const map: TasksByCourse = JSON.parse(raw)
        setTasks(map[safeCourseId] ?? [])
        return
      }
    } catch {
      // ignore
    }

    setTasks(demoTasks.filter((t) => t.course === courseName))
  }, [safeCourseId, courseName])

  // Save tasks for this course
  useEffect(() => {
    if (!safeCourseId) return
    try {
      const raw = localStorage.getItem("tasksByCourse")
      const map: TasksByCourse = raw ? JSON.parse(raw) : {}
      map[safeCourseId] = tasks
      localStorage.setItem("tasksByCourse", JSON.stringify(map))
    } catch {
      // ignore
    }
  }, [tasks, safeCourseId])

  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [due, setDue] = useState("")
  const [error, setError] = useState<string | null>(null)

  const pct = useMemo(() => {
    if (tasks.length === 0) return 0
    const doneCount = tasks.filter((t) => t.done).length
    return Math.round((doneCount / tasks.length) * 100)
  }, [tasks])

  // ✅ NEW: write pct into the matching course.progress so CourseCard updates
  useEffect(() => {
    if (!safeCourseId) return

    try {
      const raw = localStorage.getItem("courses")
      if (!raw) return

      const courses: Course[] = JSON.parse(raw)
      const next = courses.map((c) =>
        c.id === safeCourseId ? { ...c, progress: pct } : c
      )

      localStorage.setItem("courses", JSON.stringify(next))

      // notify the Classes/CourseSections page to refresh (same tab)
      window.dispatchEvent(new Event("courses-updated"))
    } catch {
      // ignore
    }
  }, [pct, safeCourseId])

  function toggleDone(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  function addTask() {
    const cleanTitle = title.trim()
    if (!cleanTitle) {
      setError("Task title is required.")
      return
    }
    if (!due) {
      setError("Due date is required.")
      return
    }

    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        course: courseName,
        title: cleanTitle,
        due,
        done: false,
      },
    ])

    setTitle("")
    setDue("")
    setError(null)
    setIsOpen(false)
  }

  const sortedTasks = useMemo(() => {
    const copy = [...tasks]
    copy.sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1
      return a.due.localeCompare(b.due)
    })
    return copy
  }, [tasks])

  return (
    <section className="p-10 min-h-screen bg-[#352D51]">
      <Header courseId={courseName} pct={pct} />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-2xl font-semibold">Tasks</h2>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="text-white/80 hover:text-white transition hover:cursor-pointer"
        >
          + Add More
        </button>
      </div>

      <motion.div layout className="flex flex-col gap-5 max-w-6xl">
        <AnimatePresence initial={false}>
          {sortedTasks.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            >
              <TaskRow task={t} onToggleDone={toggleDone} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-[#2B214A] p-6 text-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Add a task</h3>
              <button onClick={() => setIsOpen(false)} className="text-2xl">
                ×
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg bg-white/85 px-4 py-2 text-[#2b2350] outline-none"
                placeholder="Task title"
              />

              <input
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className="w-full rounded-lg bg-white/85 px-4 py-2 text-[#2b2350] outline-none"
              />

              {error && <p className="text-orange-200">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-xl bg-white/10 py-2.5 font-semibold"
                >
                  Cancel
                </button>

                <button
                  onClick={addTask}
                  className="w-full rounded-xl bg-orange-400 py-2.5 font-semibold text-white"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}