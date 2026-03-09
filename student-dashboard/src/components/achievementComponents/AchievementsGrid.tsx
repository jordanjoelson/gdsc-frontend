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
    <div className="grid gap-10 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
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