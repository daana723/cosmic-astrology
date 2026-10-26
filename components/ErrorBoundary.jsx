"use client"

import { Component } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo)
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Card className="bg-indigo-900 bg-opacity-70 border-indigo-700 p-6 m-4">
          <h2 className="text-xl font-bold text-purple-300 mb-4">Something went wrong</h2>
          <div className="bg-indigo-800/50 p-4 rounded-lg border border-indigo-700 mb-4 overflow-auto max-h-[300px]">
            <p className="text-blue-200 mb-2">Error: {this.state.error?.toString()}</p>
            {this.state.errorInfo && (
              <details className="text-blue-200 text-sm">
                <summary className="cursor-pointer mb-2">Stack trace</summary>
                <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
              </details>
            )}
          </div>
          <Button onClick={() => window.location.reload()} className="bg-purple-600 hover:bg-purple-700 text-white">
            Reload Page
          </Button>
        </Card>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
