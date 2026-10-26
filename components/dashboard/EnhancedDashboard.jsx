"use client"

import { useUser } from "@/context/UserContext"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const EnhancedDashboard = () => {
  const { user } = useUser()
  const router = useRouter()

  // Get the most recent journal entry
  const latestJournalEntry = user?.journalEntries?.[0]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-purple-300">Welcome, {user?.name || "Cosmic Explorer"}</h1>

      <Card className="bg-indigo-900 bg-opacity-70 border-indigo-700 p-4">
        <h2 className="text-lg font-medium text-purple-300 mb-3">Your Cosmic Journey</h2>
        <p className="text-blue-200 text-sm">
          Explore your spiritual path through journaling, quizzes, and guided meditations.
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-indigo-900 bg-opacity-70 border-indigo-700 p-4">
          <h2 className="text-lg font-medium text-purple-300 mb-3">Journal</h2>
          {latestJournalEntry ? (
            <div>
              <h3 className="text-md font-medium text-blue-200">{latestJournalEntry.title}</h3>
              <p className="text-blue-200 text-sm line-clamp-3">{latestJournalEntry.content}</p>
              <Button
                onClick={() => router.push("/journal")}
                variant="outline"
                className="mt-3 border-purple-500 text-purple-300"
              >
                View Journal
              </Button>
            </div>
          ) : (
            <div>
              <p className="text-blue-200 text-sm">Start your spiritual journal today.</p>
              <Button
                onClick={() => router.push("/journal")}
                variant="outline"
                className="mt-3 border-purple-500 text-purple-300"
              >
                Create Entry
              </Button>
            </div>
          )}
        </Card>

        <Card className="bg-indigo-900 bg-opacity-70 border-indigo-700 p-4">
          <h2 className="text-lg font-medium text-purple-300 mb-3">Quizzes</h2>
          <p className="text-blue-200 text-sm">Discover your spiritual archetype and purpose.</p>
          <Button
            onClick={() => router.push("/quizzes")}
            variant="outline"
            className="mt-3 border-purple-500 text-purple-300"
          >
            Take a Quiz
          </Button>
        </Card>
      </div>

      <Card className="bg-indigo-900 bg-opacity-70 border-indigo-700 p-4">
        <h2 className="text-lg font-medium text-purple-300 mb-3">Daily Affirmation</h2>
        <p className="text-blue-200 italic">
          "I am connected to the cosmic energy that flows through all things. My intuition guides me on my spiritual
          path."
        </p>
      </Card>
    </div>
  )
}

export default EnhancedDashboard
