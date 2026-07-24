import DashboardFriends from "./dashboard-friends"
import DashboardMatchHistory from "./dashboard-match-history"
import DashboardMultiplayer from "./dashboard-multiplayer"
import DashboardPlayVsBot from "./dashboard-play-vs-bot"
import DashboardProfile from "./dashboard-profile"
import DashboardUserStatistics from "./dashboard-user-statistics"

export default function DashboardPage() {
  return (
    <section className="flex h-full flex-col gap-3 p-3 lg:max-h-250 lg:flex-row">
      <main className="flex size-full flex-col gap-y-3">
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
