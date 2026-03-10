import StatsCard from "../components/achievementComponents/StatsCard"
import XPProgressBar from "../components/achievementComponents/XPProgressBar"
import AchievementsGrid from "../components/achievementComponents/AchievementsGrid"
const achievements = [
  {
    id: "1",
    title: "Baby Steps",
    description: "Complete your first task",
    color: "#FF848D",
    unlocked: true,
  },
  {
    id: "2",
    title: "Getting the hang of it",
    description: "Complete 10 tasks",
    color: "#F0B27A",
    unlocked: true,
  },
  {
    id: "3",
    title: "Focused",
    description: "Use Pomodoro timer 5 times",
    color: "#F9FF84",
    unlocked: true,
  },
  {
    id: "4",
    title: "On a roll",
    description: "Complete 20 tasks",
    color: "#86FF84",
    unlocked: true,
  },
  {
    id: "5",
    title: "Consistency",
    description: "Complete tasks for 5 days in a row",
    color: "#84C2FF",
    unlocked: true,
  },
  {
    id: "6",
    title: "Deep Focus",
    description: "Use the Pomodoro timer for 20 times",
    color: "#7ED957",
    unlocked: false,
  },
  {
    id: "7",
    title: "Momentum",
    description: "Complete 3 tasks in one day",
    color: "#7ED957",
    unlocked: false,
  },
  {
    id: "8",
    title: "Focus Master",
    description: "Complete 5 tasks in one session",
    color: "#7ED957",
    unlocked: false,
  },
  {
    id: "9",
    title: "Task crusher",
    description: "Complete 50 tasks",
    color: "#7ED957",
    unlocked: false,
  },
  {
    id: "10",
    title: "Streak Builder",
    description: "Complete tasks for 10 days in a row",
    color: "#7ED957",
    unlocked: false,
  },
  {
    id: "11",
    title: "Marathon runner",
    description: "Complete 100 tasks",
    color: "#7ED957",
    unlocked: false,
  },
  {
    id: "12",
    title: "Legend",
    description: "Complete 200 tasks",
    color: "#7ED957",
    unlocked: false
  }
]

export default function Achievements() {
  return (
    <section className="p-10 min-h-screen bg-[#352D51]">

      <h1 className="text-white text-6xl font-bold mb-13">
        Achievements
      </h1>

      <div className="flex flex-col items-center gap-8 mb-16">

        <StatsCard title="Current level" value="37">
          <XPProgressBar current={3000} max={5000} />
        </StatsCard>

        <StatsCard
          title="Tasks completed"
          value="113"
          subtitle="23 tasks left until level 38"
        />

      </div>

      <h2 className="text-white text-5xl font-semibold mb-13">
        Avatars Earned:
      </h2>

      <AchievementsGrid achievements={achievements} />

    </section>
  )
}
