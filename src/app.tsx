import { Redirect, Route, Switch } from "wouter"

import { ThemeProvider } from "@/components/theme-provider"

import { ProtectedRoute, PublicOnlyRoute } from "./components/route-protection"
import { Toaster } from "./components/ui/sonner"
import { isAuthenticated } from "./lib/utils"
import DashboardPage from "./pages/dashboard"
import EntrancePage from "./pages/entrance"

const routes = [
  { component: () => <PublicOnlyRoute component={EntrancePage} />, path: "/entrance" },
  { component: () => <ProtectedRoute component={DashboardPage} />, path: "/dashboard" },
]

export default function App() {
  const loggedIn = isAuthenticated()

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Switch>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
        <Route component={() => <Redirect replace to={loggedIn ? "/dashboard" : "/entrance"} />} />
      </Switch>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  )
}
