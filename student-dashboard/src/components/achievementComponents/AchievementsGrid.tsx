import AvatarCard from "./AvatarCard"

type Achievement = {
  id: string
  title: string
  description: string
  color: string
  unlocked: boolean
}

type AchievementsGridProps = {
  achievements: Achievement[]
}

export default function AchievementsGrid({ achievements }: AchievementsGridProps) {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-[repeat(auto-fit,220px)] justify-center gap-x-8 gap-y-15 -mr-8">
      {achievements.map((a) => (
        <AvatarCard
          key={a.id}
          title={a.title}
          description={a.description}
          color={a.color}
          unlocked={a.unlocked}
        />
      ))}
    </div>
  )
}