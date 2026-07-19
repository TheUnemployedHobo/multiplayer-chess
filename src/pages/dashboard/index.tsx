import DashboardFriends from "./dashboard-friends"
import DashboardMatchHistory from "./dashboard-match-history"
import DashboardMultiplayer from "./dashboard-multiplayer"
import DashboardPlayVsBot from "./dashboard-play-vs-bot"
import DashboardProfile from "./dashboard-profile"
import DashboardUserStatistics from "./dashboard-user-statistics"

export default function DashboardPage() {
  return (
    <section className="container mx-auto flex h-dvh flex-col gap-3 p-3 lg:flex-row lg:items-center">
      <main className="w-full min-w-0 space-y-3">
        <DashboardProfile />
        <div className="flex flex-col gap-3 sm:flex-row">
          <DashboardMultiplayer />
          <DashboardPlayVsBot />
        </div>
        <DashboardMatchHistory />
        <DashboardUserStatistics />
      </main>
      <DashboardFriends />
    </section>
  )
}
