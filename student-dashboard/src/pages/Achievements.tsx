import StatsCard from "../components/achievementComponents/StatsCard"
import XPProgressBar from "../components/achievementComponents/XPProgressBar"
import AchievementsGrid from "../components/achievementComponents/AchievementsGrid"

import flower1 from "../components/achievementComponents/icons/flower1.svg"
import flower2 from "../components/achievementComponents/icons/flower2.svg"
import flower3 from "../components/achievementComponents/icons/flower3.svg"
import flower4 from "../components/achievementComponents/icons/flower4.svg"
import flower5 from "../components/achievementComponents/icons/flower5.svg"

const achievements = [
  {
    id: "1",
    title: "Baby Steps",
    description: "Complete your first task",
    color: "#FF4444",
    unlocked: true,
    icon: flower1,
  },
  {
    id: "2",
    title: "Getting the hang of it",
    description: "Complete 10 tasks",
    color: "#FF9244",
    unlocked: true,
    icon: flower2,
  },
  {
    id: "3",
    title: "Focused",
    description: "Use Pomodoro timer 5 times",
    color: "#FFE65B",
    unlocked: true,
    icon: flower3,
  },
  {
    id: "4",
    title: "On a roll",
    description: "Complete 20 tasks",
    color: "#7FFF79",
    unlocked: true,
    icon: flower4,
  },
  {
    id: "5",
    title: "Consistency",
    description: "Complete tasks for 5 days in a row",
    color: "#79F4FF",
    unlocked: true,
    icon: flower5,
  },
  {
    id: "6",
    title: "Deep Focus",
    description: "Use the Pomodoro timer for 20 times",
    color: "#5BFFA2",
    unlocked: false,
  },
  {
    id: "7",
    title: "Momentum",
    description: "Complete 3 tasks in one day",
    color: "#44FF88",
    unlocked: false,
  },
  {
    id: "8",
    title: "Focus Master",
    description: "Complete 5 tasks in one session",
    color: "#44ECFF",
    unlocked: false,
  },
  {
    id: "9",
    title: "Task crusher",
    description: "Complete 50 tasks",
    color: "#4479FF",
    unlocked: false,
  },
  {
    id: "10",
    title: "Streak Builder",
    description: "Complete tasks for 10 days in a row",
    color: "#2E1BFF",
    unlocked: false,
  },
  {
    id: "11",
    title: "Marathon runner",
    description: "Complete 100 tasks",
    color: "#BF1BFF",
    unlocked: false,
  },
  {
    id: "12",
    title: "Legend",
    description: "Complete 200 tasks",
    color: "#FFA7AD",
    unlocked: false
  }
]

export default function Achievements() {
  return (
    <section className="p-10 min-h-screen bg-[#352D51]">

      <h1 className="text-white text-6xl font-bold -mt-15 mb-13">
        Achievements
      </h1>

      <div className="flex flex-col items-center gap-8 mb-16">

        <StatsCard title="Current level" value="37">
          <XPProgressBar current={3000} max={5000} />
        </StatsCard>

        <StatsCard
          layout="split"
          title="Tasks completed"
          value="113"
          subtitle={
            <div className="text-white text-right space-y-1">
              <p className="text-sm font-semibold">Next level goal:</p>

              <p className="text-2xl font-bold">
                <span className="text-red-400">23</span> tasks left
              </p>

              <p className="text-sm text-white/70">
                Complete more tasks to reach level 38
              </p>
            </div>
          }
        />

      </div>

      <h2 className="text-white text-5xl font-semibold mb-15 -mt-8">
        Avatars Earned:
      </h2>

      <AchievementsGrid achievements={achievements} />

    </section>
  )
}
