import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"

import "./styles.css"

import ErrorBoundary from "@/components/error-boundary"

import App from "./app"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<p>Shit happens bro...</p>}>
      <Suspense fallback={<p>Loading...</p>}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
)
