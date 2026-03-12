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
    <div className="mt-10">

      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-white text-4xl font-semibold ml-15">
          Courses
        </h2>

        <Link
          to="/classes"
          className="text-white/60 hover:text-orange-300 transition mr-20"
        >
          View all
        </Link>
      </div>

      <div className="relative w-full max-w-246">

        <div className="relative z-10 pl-9">

          <div className="scrollbar flex gap-17 overflow-x-auto pb-10 pt-8 pl-5 max-w-full">

            {courses.map((course) => (
              <div key={course.id} className="shrink-0 w-90 last:mr-20">
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