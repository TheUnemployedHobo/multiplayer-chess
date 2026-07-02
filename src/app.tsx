import { Route, Switch } from "wouter"

import { ThemeProvider } from "@/components/theme-provider"

import { DefaultPage, ProtectedPage, PublicOnlyPage } from "./components/page-protection"
import ScreenSpinner from "./components/screen-spinner"
import { Toaster } from "./components/ui/sonner"
import useFetchFn from "./hooks/use-fetch-fn"
import { getCurrentUser } from "./lib/services"
import DashboardPage from "./pages/dashboard"
import EntrancePage from "./pages/entrance"

export default function App() {
  const { data, isLoading } = useFetchFn(getCurrentUser)

  if (isLoading) return <ScreenSpinner />

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Switch>
        <Route path="/entrance">
          <PublicOnlyPage isAuthenticated={Boolean(data)}>
            <EntrancePage />
          </PublicOnlyPage>
        </Route>
        <Route path="/dashboard">
          <ProtectedPage isAuthenticated={Boolean(data)}>
            <DashboardPage />
          </ProtectedPage>
        </Route>
        <Route>
          <DefaultPage isAuthenticated={Boolean(data)} />
        </Route>
      </Switch>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  )
}
