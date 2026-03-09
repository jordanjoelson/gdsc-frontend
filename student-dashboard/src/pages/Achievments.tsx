import StatsCard from "../components/achievementComponents/StatsCard"
import XPProgressBar from "../components/achievementComponents/XPProgressBar"
import AchievementsGrid from "../components/achievementComponents/AchievementsGrid"
const achievements = [
  {
    id: "1",
    title: "Baby Steps",
    description: "Complete your first task",
    color: "#F56C6C",
    unlocked: true,
  },
  {
    id: "2",
    title: "Task Master",
    description: "Complete 10 tasks",
    color: "#F0B27A",
    unlocked: true,
  },
  {
    id: "3",
    title: "Focused",
    description: "Use Pomodoro 5 times",
    color: "#D4E157",
    unlocked: true,
  },
  {
    id: "4",
    title: "Consistency",
    description: "Complete tasks for 5 days",
    color: "#7ED957",
    unlocked: false,
  },
]

export default function Achievements() {
  return (
    <section className="p-10 min-h-screen bg-[#352D51]">

      <h1 className="text-white text-6xl font-bold mb-10">
        Achievements
      </h1>

      <div className="flex flex-col gap-8 mb-16 max-w-4xl">

        <StatsCard title="Current level" value="37">
          <XPProgressBar current={3000} max={5000} />
        </StatsCard>

        <StatsCard
          title="Tasks completed"
          value="113"
          subtitle="23 tasks left until level 38"
        />

      </div>

      <h2 className="text-white text-4xl font-semibold mb-8">
        Avatars Earned
      </h2>

      <AchievementsGrid achievements={achievements} />

    </section>
  )
}
