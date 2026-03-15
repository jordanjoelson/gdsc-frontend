import { Link } from "react-router-dom"
import CourseCard from "@/components/CourseCard"

type Course = {
  id: string
  name: string
  progress: number
}

type Props = {
  courses: Course[]
}

export default function HorizontalCourse({ courses }: Props) {
  return (
    <div className="mt-5 w-full -ml-5">

      <div className="flex items-baseline justify-between mb-6">
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

      <div className="relative w-full">

        <div className="relative z-10">

          <div className="scrollbar flex gap-17 overflow-x-auto pb-10 pt-8 px-5 w-full">

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
  )
}