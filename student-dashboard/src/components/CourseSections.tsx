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
        <section className = "p-6 min-h-screen bg-[#352D51]">
            <h2 className = "text-[55px] font-semibold mb-4 text-white">Courses</h2>

            <div className = "flex flex-wrap justify-center mt-15 gap-18 ml-7">
                {demoCourses.map((c) => (
                    <div key={c.name} className="flex-1 min-w-83 max-w-83">
                    <CourseCard name={c.name} progress={c.progress} />
                </div>
            ))}
            </div>
        </section>
    )
}