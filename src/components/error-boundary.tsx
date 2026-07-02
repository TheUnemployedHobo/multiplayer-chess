import { CircleAlertIcon, RefreshCcwIcon } from "lucide-react"
import { Component, type ErrorInfo, type ReactNode } from "react"

import { Button } from "./ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty"

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Empty className="fixed inset-0">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CircleAlertIcon />
            </EmptyMedia>
            <EmptyTitle>Something went wrong</EmptyTitle>
            <EmptyDescription className="max-w-xs text-pretty">
              An unexpected error occurred. Please refresh the page to try again.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={() => location.reload()} variant="outline">
              <RefreshCcwIcon />
              <span>Refresh</span>
            </Button>
          </EmptyContent>
        </Empty>
      )
    }

    return this.props.children
  }
}
