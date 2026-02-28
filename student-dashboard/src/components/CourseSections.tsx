import CourseCard from "@/components/CourseCard"

const demoCourses = [
    {name: "Linear Algebra", progress: 75},
    {name: "Calculus I", progress: 50},
    {name: "Data Structures", progress: 20},
    {name: "Algorithms", progress: 10},
    { name: "Machine Learning", progress: 5 },
    {name: "Linear Algebra", progress: 75},
    {name: "Calculus I", progress: 50},
    {name: "Data Structures", progress: 20},
    {name: "Algorithms", progress: 10},
    { name: "Machine Learning", progress: 5 },
    { name: "Machine Learning", progress: 5 },
]

export default function CourseSections() {
    return (
        <section className = "min-h-screen bg-[#352D51] px-10 py-6">
            <h2 className = "text-6xl font-semibold mb-4 text-white">Courses</h2>

            <div className = "mt-15 mb-12 grid gap-18 grid-cols-[repeat(auto-fit,minmax(360px,1fr))]">
                {demoCourses.map((c) => (
                    <CourseCard key={c.name} name={c.name} progress={c.progress} />
            ))}

            <button
            className="
                flex items-center justify-center
                min-h-57.5
                rounded-2xl
                bg-transparent"
            >

            {/* Add button */}
            <div 
                className = "w-28 h-28 rounded-full bg-[#2B214A] text-white text-6xl flex items-center justify-center shadow-lg hover:scale-110 transition"
            >
                +
            </div>
            </button>
            </div>
        </section>
    )
}