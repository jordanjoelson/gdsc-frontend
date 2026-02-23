import CourseCard from "@/components/CourseCard"

const demoCourses = [
    {name: "Linear Algebra", progress: 75},
    {name: "Calculus I", progress: 50},
    {name: "Data Structures", progress: 20},
    {name: "Algorithms", progress: 10},
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

            {/* Add button */}
            <div className = "flex-1 min-w-83 max-w-83 flex justify-center items-center">
                <button
                    className="
                        w-28 h-28
                        rounded-full
                        bg-[#2B214A]
                        text-white
                        text-6xl
                        flex items-center justify-center
                        shadow-lg
                        hover:scale-110
                        transition
                    "
                    aria-label="Add course"
                    onClick={() => {
                        console.log("Add course clicked")
                    }}
                >
                    +
                </button>
            </div>
            </div>
        </section>
    )
}