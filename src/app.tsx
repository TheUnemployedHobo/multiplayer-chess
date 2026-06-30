import { Route, Switch } from "wouter"

import { ThemeProvider } from "@/components/theme-provider"

import { Toaster } from "./components/ui/sonner"
import DashboardPage from "./pages/dashboard"
import EntrancePage from "./pages/entrance"

const routes = [
  { component: EntrancePage, path: "/entrance" },
  { component: DashboardPage, path: "/dashboard" },
]

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Switch>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Switch>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  )
}
