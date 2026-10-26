"use client"

import { useState } from "react"
import { useUser } from "@/context/UserContext"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const EnhancedJournal = () => {
  const { user, addJournalEntry, updateJournalEntry, deleteJournalEntry } = useUser()
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentEntry, setCurrentEntry] = useState(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mood, setMood] = useState("")
  const [tags, setTags] = useState("")
  const [type, setType] = useState("free")

  const handleCreateEntry = () => {
    const newEntry = addJournalEntry({
      title,
      content,
      mood,
      tags: tags.split(",").map((tag) => tag.trim()),
      type,
      isPrivate: true,
    })

    setTitle("")
    setContent("")
    setMood("")
    setTags("")
    setType("free")
    setIsCreating(false)
  }

  const handleUpdateEntry = () => {
    if (!currentEntry) return

    updateJournalEntry(currentEntry.id, {
      title,
      content,
      mood,
      tags: tags.split(",").map((tag) => tag.trim()),
      type,
    })

    setCurrentEntry(null)
    setTitle("")
    setContent("")
    setMood("")
    setTags("")
    setType("free")
    setIsEditing(false)
  }

  const handleEditEntry = (entry) => {
    setCurrentEntry(entry)
    setTitle(entry.title)
    setContent(entry.content)
    setMood(entry.mood || "")
    setTags(entry.tags.join(", "))
    setType(entry.type)
    setIsEditing(true)
    setIsCreating(false)
  }

  const handleDeleteEntry = (entryId) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      deleteJournalEntry(entryId)
    }
  }

  const resetForm = () => {
    setCurrentEntry(null)
    setTitle("")
    setContent("")
    setMood("")
    setTags("")
    setType("free")
    setIsCreating(false)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-300">Journal</h1>
        {!isCreating && !isEditing && (
          <Button onClick={() => setIsCreating(true)} className="bg-purple-600 hover:bg-purple-700 text-white">
            New Entry
          </Button>
        )}
      </div>

      {(isCreating || isEditing) && (
        <Card className="bg-indigo-900 bg-opacity-70 border-indigo-700 p-4">
          <h2 className="text-xl font-medium text-purple-300 mb-4">{isCreating ? "Create New Entry" : "Edit Entry"}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-blue-200 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 bg-indigo-800 border border-indigo-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-blue-200 mb-1">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full p-2 bg-indigo-800 border border-indigo-700 rounded-lg text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-blue-200 mb-1">Mood</label>
                <input
                  type="text"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full p-2 bg-indigo-800 border border-indigo-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-blue-200 mb-1">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-2 bg-indigo-800 border border-indigo-700 rounded-lg text-white"
                >
                  <option value="free">Free Writing</option>
                  <option value="dream">Dream Journal</option>
                  <option value="gratitude">Gratitude</option>
                  <option value="shadow">Shadow Work</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-blue-200 mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full p-2 bg-indigo-800 border border-indigo-700 rounded-lg text-white"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={isCreating ? handleCreateEntry : handleUpdateEntry}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isCreating ? "Create" : "Update"}
              </Button>
              <Button onClick={resetForm} variant="outline" className="border-indigo-700 text-blue-200">
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {user?.journalEntries?.length === 0 ? (
          <p className="text-blue-200">No journal entries yet. Create your first one!</p>
        ) : (
          user?.journalEntries?.map((entry) => (
            <Card key={entry.id} className="bg-indigo-900 bg-opacity-70 border-indigo-700 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-purple-300">{entry.title}</h3>
                  <p className="text-xs text-blue-200 opacity-70">
                    {new Date(entry.createdAt).toLocaleDateString()} • {entry.type}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleEditEntry(entry)}
                    variant="outline"
                    className="h-8 px-2 border-indigo-700 text-blue-200"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteEntry(entry.id)}
                    variant="outline"
                    className="h-8 px-2 border-red-700 text-red-400"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <p className="mt-2 text-blue-200 whitespace-pre-wrap">{entry.content}</p>
              {entry.tags?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-full bg-indigo-800 text-blue-200">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {entry.mood && (
                <div className="mt-2 text-sm text-blue-200">
                  <span className="opacity-70">Mood:</span> {entry.mood}
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default EnhancedJournal
