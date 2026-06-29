import { Route, Switch } from "wouter"

import { ThemeProvider } from "@/components/theme-provider"

import EntranceAvatarChoosingPage from "./pages/entrance/entrance-avatar-choosing"
import EntranceEnterPage from "./pages/entrance/entrance-enter"
import EntranceRegisterPage from "./pages/entrance/entrance-register"

const routes = [
  { component: EntranceRegisterPage, path: "/entrance/register" },
  { component: EntranceAvatarChoosingPage, path: "/entrance/avatar-choosing" },
  { component: EntranceEnterPage, path: "/entrance/enter" },
  { component: () => <>404: Page not found</>, path: undefined },
]

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Switch>
        {routes.map(({ component, path }) => (
          <Route key={path} {...{ component, path }} />
        ))}
      </Switch>
    </ThemeProvider>
  )
}
