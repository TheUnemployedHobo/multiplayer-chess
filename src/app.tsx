import { ThemeProvider } from "@/components/theme-provider"

// import DashboardPage from "./pages/dashboard"
import PlayBoardPage from "./pages/playboard"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <PlayBoardPage />
    </ThemeProvider>
  )
}
