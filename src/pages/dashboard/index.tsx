import DashboardFriends from "./dashboard-friends"
import DashboardMatchHistory from "./dashboard-match-history"
import DashboardMultiplayer from "./dashboard-multiplayer"
import DashboardPlayVsBot from "./dashboard-play-vs-bot"
import DashboardProfile from "./dashboard-profile"
import DashboardUserStatistics from "./dashboard-user-statistics"

export default function DashboardPage() {
  return (
    <section className="z-10 container mx-auto h-dvh p-3 md:flex md:items-center md:justify-center md:p-0">
      <div className="grid w-full auto-rows-min grid-cols-1 gap-3 md:grid-cols-3">
        <DashboardProfile />
        <DashboardMultiplayer />
        <DashboardPlayVsBot />
        <DashboardFriends />
        <DashboardMatchHistory />
        <DashboardUserStatistics />
      </div>
    </section>
  )
}
