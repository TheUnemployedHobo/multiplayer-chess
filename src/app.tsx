import { useEffect } from "react"
import { Route, Switch } from "wouter"

import { ThemeProvider } from "@/components/theme-provider"

import { DefaultPage, ProtectedPage, PublicOnlyPage } from "./components/page-protection"
import ScreenSpinner from "./components/screen-spinner"
import { Toaster } from "./components/ui/sonner"
import useAuthStore from "./hooks/use-auth-store"
import DashboardPage from "./pages/dashboard"
import EntrancePage from "./pages/entrance"

const routes = [
  { component: () => <PublicOnlyPage page={<EntrancePage />} />, path: "/entrance" },
  { component: () => <ProtectedPage page={<DashboardPage />} />, path: "/dashboard" },
]

export default function App() {
  const { hydrate, status } = useAuthStore()

  useEffect(() => {
    hydrate()
  }, [hydrate])

  if (status === "loading") return <ScreenSpinner />

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Switch>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
        <Route component={() => <DefaultPage />} />
      </Switch>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  )
}
