import { useEffect } from "react"
import { Route, Switch } from "wouter"

import { DefaultPage, ProtectedPage, PublicOnlyPage, SuperProtectedPage } from "./components/page-protection"
import ScreenSpinner from "./components/screen-spinner"
import { Toaster } from "./components/ui/sonner"
import useAuthStore from "./hooks/use-auth-store"
import DashboardPage from "./pages/dashboard"
import EntrancePage from "./pages/entrance"
import PlayBoardPage from "./pages/playboard"

const routes = [
  { component: () => <PublicOnlyPage page={<EntrancePage />} />, path: "/entrance" },
  { component: () => <ProtectedPage page={<DashboardPage />} />, path: "/dashboard" },
  { component: () => <SuperProtectedPage page={<PlayBoardPage />} />, path: "/playboard" },
]

export default function App() {
  const status = useAuthStore((state) => state.status)
  const hydrate = useAuthStore((state) => state.hydrate)

  useEffect(() => {
    hydrate()
  }, [hydrate])

  if (status === "loading") return <ScreenSpinner />

  return (
    <div className="container mx-auto min-h-dvh md:h-dvh">
      <Switch>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
        <Route component={() => <DefaultPage />} />
      </Switch>
      <Toaster expand position="bottom-right" visibleToasts={6} />
    </div>
  )
}
