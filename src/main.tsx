import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./styles.css"

import ErrorBoundary from "@/components/error-boundary"

import App from "./app"
import { ThemeProvider } from "./components/theme-provider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
)
