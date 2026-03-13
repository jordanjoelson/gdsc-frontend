import AvatarCard from "./AvatarCard"

type Achievement = {
  id: string
  title: string
  description: string
  color: string
  unlocked: boolean
  icon?: string
}

type AchievementsGridProps = {
  achievements: Achievement[]
}

export default function AchievementsGrid({ achievements }: AchievementsGridProps) {
  return (
    <div className="mx-auto grid grid-cols-[repeat(auto-fit,220px)] justify-center gap-x-20 gap-y-20 -mr-8">
      {achievements.map((a) => (
        <AvatarCard
          key={a.id}
          title={a.title}
          description={a.description}
          color={a.color}
          unlocked={a.unlocked}
          icon={a.icon}
        />
      ))}
    </div>
  )
}