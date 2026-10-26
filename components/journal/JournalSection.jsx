"use client"

import { useState } from "react"
import { useUser } from "@/context/UserContext"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const JournalSection = () => {
  const { user } = useUser()
  const [showNewEntry, setShowNewEntry] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-300">Journal</h1>
        <Button onClick={() => setShowNewEntry(!showNewEntry)} className="bg-purple-600 hover:bg-purple-700 text-white">
          {showNewEntry ? "Cancel" : "New Entry"}
        </Button>
      </div>

      <Card className="bg-indigo-900 bg-opacity-70 border-indigo-700 p-6 text-center">
        <h3 className="text-lg font-medium text-purple-300 mb-2">Your Journal is Empty</h3>
        <p className="text-blue-200 mb-4">Start documenting your spiritual journey by creating your first entry.</p>
        <Button onClick={() => setShowNewEntry(true)} className="bg-purple-600 hover:bg-purple-700 text-white mx-auto">
          Create First Entry
        </Button>
      </Card>
    </div>
  )
}

export default JournalSection
