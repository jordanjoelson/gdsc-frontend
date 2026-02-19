import CourseCard from "@/components/CourseCard"

const demoCourses = [
    {name: "Linear Algebra", progress: 75},
    {name: "Calculus I", progress: 50},
    {name: "Data Structures", progress: 20},
    {name: "Algorithms", progress: 10},
    {name: "Machine Learning", progress: 5},
]

export default function CourseSections() {
    return (
        <section className = "p-6">
            <h2 className = "text-[55px] font-semibold mb-4">Courses</h2>

            <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {demoCourses.map((c) => (
                    <CourseCard name={c.name} progress={c.progress} />
                ))}
            </div>
        </section>
    )
}