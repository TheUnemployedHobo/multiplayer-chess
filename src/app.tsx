import { Route, Switch } from "wouter"

import { ThemeProvider } from "@/components/theme-provider"

import { Toaster } from "./components/ui/sonner"
import EntranceRegisterPage from "./pages/entrance/entrance-register"
import EntranceSignInPage from "./pages/entrance/entrance-sign-in"

const routes = [
  { component: EntranceRegisterPage, path: "/entrance/register" },
  { component: EntranceSignInPage, path: "/entrance/sign-in" },
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
      <Toaster position="bottom-right" />
    </ThemeProvider>
  )
}
