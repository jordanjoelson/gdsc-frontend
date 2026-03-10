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
    <div className="grid gap-15 grid-cols-[repeat(auto-fit,minmax(220px,max-content))] justify-center gap-x-10">
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