import { useEffect, useMemo, useState } from "react"
import CourseCard from "@/components/CourseCard"

type Course = {
  id: string
  name: string
  progress: number
}

const seedCourses: Course[] = [
  { id: crypto.randomUUID(), name: "Linear Algebra", progress: 75 },
  { id: crypto.randomUUID(), name: "Calculus I", progress: 50 },
]

export default function CourseSections() {
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem("courses")
    if (!saved) return seedCourses
    return JSON.parse(saved)
  })

  const [isOpen, setIsOpen] = useState(false)
  const [newName, setNewName] = useState("")
  const [error, setError] = useState<string | null>(null)

  // save courses whenever they change
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses))
  }, [courses])

  // refresh courses when tasks update progress
  useEffect(() => {
    function refreshCourses() {
      const saved = localStorage.getItem("courses")
      if (!saved) return
      setCourses(JSON.parse(saved))
    }

    window.addEventListener("courses-updated", refreshCourses)
    window.addEventListener("storage", refreshCourses)

    return () => {
      window.removeEventListener("courses-updated", refreshCourses)
      window.removeEventListener("storage", refreshCourses)
    }
  }, [])

  const canSubmit = useMemo(() => newName.trim().length > 0, [newName])

  function addCourse() {
    const name = newName.trim()

    if (!name) {
      setError("Course name is required.")
      return
    }

    const updatedCourses = [
      ...courses,
      {
        id: crypto.randomUUID(),
        name,
        progress: 0,
      },
    ]

    setCourses(updatedCourses)
    localStorage.setItem("courses", JSON.stringify(updatedCourses))

    setNewName("")
    setError(null)
    setIsOpen(false)
  }

  // FIXED delete logic
  function deleteCourse(id: string) {
    if (!window.confirm("Are you sure you want to delete this course?")) return

    const updatedCourses = courses.filter((c) => c.id !== id)

    // update state
    setCourses(updatedCourses)

    // update localStorage immediately
    localStorage.setItem("courses", JSON.stringify(updatedCourses))

    // remove tasks tied to that course
    const raw = localStorage.getItem("tasksByCourse")
    if (raw) {
      const tasks = JSON.parse(raw)
      delete tasks[id]
      localStorage.setItem("tasksByCourse", JSON.stringify(tasks))
    }

    // notify other pages to refresh
    window.dispatchEvent(new Event("courses-updated"))
  }

  return (
    <section className="min-h-screen bg-[#352D51] px-10 py-6">
      <h2 className="text-6xl font-semibold mb-4 -mt-12 text-white">
        Courses
      </h2>

      <div className="mt-15 mb-12 grid gap-18 grid-cols-[repeat(auto-fit,minmax(360px,1fr))]">
        {courses.map((c) => (
          <CourseCard
            key={c.id}
            id={c.id}
            name={c.name}
            progress={c.progress}
            onDelete={deleteCourse}
          />
        ))}

        {/* Add Course Button */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center min-h-57.5 rounded-2xl bg-transparent"
        >
          <div className="w-28 h-28 rounded-full bg-[#2B214A] text-white text-6xl flex items-center justify-center shadow-lg hover:scale-110 transition">
            +
          </div>
        </button>
      </div>

      {/* Add Course Modal */}
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
              <h3 className="text-2xl font-semibold">Add a course</h3>
              <button onClick={() => setIsOpen(false)} className="text-2xl">
                ×
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full rounded-lg bg-white/85 px-4 py-2 text-[#2b2350] outline-none"
                placeholder="Course name (e.g., Physics)"
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
                  disabled={!canSubmit}
                  onClick={addCourse}
                  className="w-full rounded-xl bg-orange-400 py-2.5 font-semibold text-white disabled:opacity-50"
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