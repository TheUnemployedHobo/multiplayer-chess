import { useEffect } from "react"
import { Route, Switch } from "wouter"

import { ThemeProvider } from "@/components/theme-provider"

import { DefaultPage, ProtectedPage, PublicOnlyPage } from "./components/page-protection"
import ScreenSpinner from "./components/screen-spinner"
import { Toaster } from "./components/ui/sonner"
import useAuthStore from "./hooks/use-auth-store"
import DashboardPage from "./pages/dashboard"
import EntrancePage from "./pages/entrance"

export default function App() {
  const { hydrate, status } = useAuthStore()

  useEffect(() => {
    hydrate()
  }, [hydrate])

  if (status === "loading") return <ScreenSpinner />

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Switch>
        <Route path="/entrance">
          <PublicOnlyPage isAuthenticated={status === "authenticated"}>
            <EntrancePage />
          </PublicOnlyPage>
        </Route>
        <Route path="/dashboard">
          <ProtectedPage isAuthenticated={status === "authenticated"}>
            <DashboardPage />
          </ProtectedPage>
        </Route>
        <Route>
          <DefaultPage isAuthenticated={status === "authenticated"} />
        </Route>
      </Switch>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  )
}
