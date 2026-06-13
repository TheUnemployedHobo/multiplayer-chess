import { ThemeProvider } from "@/components/theme-provider"

import EntrancePage from "./pages/entrance"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <EntrancePage />
    </ThemeProvider>
  )
}
