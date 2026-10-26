"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Bell, Calendar } from "lucide-react"

interface CosmicEvent {
  type: string
  date: string
  title: string
  description: string
  impact: string
}

export default function CosmicEvents() {
  const [events, setEvents] = useState<CosmicEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  useEffect(() => {
    fetchCosmicEvents()
    checkNotificationPermission()
  }, [])

  const fetchCosmicEvents = async () => {
    try {
      const response = await fetch("/api/cosmic-events")
      const data = await response.json()
      if (data.success) {
        setEvents(data.events)
      }
    } catch (error) {
      console.error("Failed to fetch cosmic events:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const checkNotificationPermission = () => {
    if ("Notification" in window) {
      setNotificationsEnabled(Notification.permission === "granted")
    }
  }

  const enableNotifications = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      setNotificationsEnabled(permission === "granted")

      if (permission === "granted") {
        new Notification("Cosmic Alerts Enabled!", {
          body: "You'll receive notifications for upcoming cosmic events.",
          icon: "/logo.png",
        })
      }
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "border-red-300 bg-red-50"
      case "medium":
        return "border-yellow-300 bg-yellow-50"
      default:
        return "border-blue-300 bg-blue-50"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  }

  const getDaysUntil = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  if (isLoading) {
    return (
      <Card className="p-6 bg-white">
        <div className="text-center">
          <Sparkles className="w-8 h-8 text-purple-600 animate-spin mx-auto mb-2" />
          <p className="text-gray-600">Loading cosmic events...</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Upcoming Cosmic Events</h2>
          <p className="text-gray-600 text-sm">Stay aligned with celestial rhythms</p>
        </div>
        <Button
          onClick={enableNotifications}
          disabled={notificationsEnabled}
          variant="outline"
          size="sm"
          className="border-purple-300 text-purple-600 bg-transparent"
        >
          <Bell className="w-4 h-4 mr-2" />
          {notificationsEnabled ? "Alerts On" : "Enable Alerts"}
        </Button>
      </div>

      <div className="space-y-4">
        {events.map((event, index) => {
          const daysUntil = getDaysUntil(event.date)
          return (
            <Card key={index} className={`p-4 border-2 ${getImpactColor(event.impact)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-gray-700" />
                    <h3 className="font-semibold text-gray-800">{event.title}</h3>
                    {daysUntil <= 7 && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">Soon</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{event.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span>{formatDate(event.date)}</span>
                    <span className="text-purple-600 font-medium">
                      {daysUntil === 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `in ${daysUntil} days`}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
