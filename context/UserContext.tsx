"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define types
type JournalEntry = {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  tags: string[]
  mood?: string
  isPrivate: boolean
  type: string
}

type SpiritualProfile = {
  archetypeResults: any | null
  shadowWorkResults: any | null
  purposeResults: any | null
  spiritualGifts: any | null
  interests: string[]
}

type User = {
  id: string
  name: string
  email: string
  profileImage?: string
  spiritualProfile: SpiritualProfile
  journalEntries: JournalEntry[]
  createdAt: string
  preferences: {
    theme: string
    notificationsEnabled: boolean
    privacySettings: {
      shareJournalEntries: boolean
      shareQuizResults: boolean
      publicProfile: boolean
    }
  }
  quizResults: any[]
}

type UserContextType = {
  user: User
  updateUser: (updates: any) => void
  isLoading: boolean
  addJournalEntry: (entry: Partial<JournalEntry>) => JournalEntry
  updateJournalEntry: (entryId: string, updates: Partial<JournalEntry>) => void
  deleteJournalEntry: (entryId: string) => void
}

// Mock data for initial setup
const mockJournalEntries: JournalEntry[] = [
  {
    id: "1",
    title: "First Spiritual Insight",
    content: "Today I experienced a profound connection with the universe during meditation.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ["meditation", "insight", "connection"],
    mood: "Peaceful",
    isPrivate: true,
    type: "free",
  },
  {
    id: "2",
    title: "Dream of Flying",
    content: "Last night I dreamed I was flying over mountains and oceans. The feeling of freedom was incredible.",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["dream", "flying", "freedom"],
    mood: "Inspired",
    isPrivate: true,
    type: "dream",
  },
]

// Create a default user - this will always be used
const defaultUser: User = {
  id: "user-123",
  name: "Cosmic Explorer",
  email: "explorer@quantum-astrology.com",
  profileImage: "",
  spiritualProfile: {
    archetypeResults: {
      primary: "visionary",
      secondary: "healer",
    },
    shadowWorkResults: null,
    purposeResults: null,
    spiritualGifts: null,
    interests: ["meditation", "astrology", "quantum physics"],
  },
  journalEntries: mockJournalEntries,
  createdAt: new Date().toISOString(),
  preferences: {
    theme: "cosmic",
    notificationsEnabled: true,
    privacySettings: {
      shareJournalEntries: false,
      shareQuizResults: false,
      publicProfile: false,
    },
  },
  quizResults: [],
}

// Create context with default values
const UserContext = createContext<UserContextType>({
  user: defaultUser,
  updateUser: () => {},
  isLoading: true,
  addJournalEntry: () => ({ ...mockJournalEntries[0] }),
  updateJournalEntry: () => {},
  deleteJournalEntry: () => {},
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser)
  const [isLoading, setIsLoading] = useState(true)

  // Load user data on mount
  useEffect(() => {
    const loadUserData = () => {
      setIsLoading(true)
      try {
        // Check if user data exists in localStorage
        const savedUserData = localStorage.getItem("userData")

        if (savedUserData) {
          setUser(JSON.parse(savedUserData))
        } else {
          // Use default user
          setUser(defaultUser)
          // Save to localStorage
          localStorage.setItem("userData", JSON.stringify(defaultUser))
        }
      } catch (error) {
        console.error("Error loading user data:", error)
        // Fallback to default user
        setUser(defaultUser)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [])

  const updateUser = (updates: any) => {
    try {
      // Create updated user object
      const updatedUser = { ...user, ...updates }

      if (updates.spiritualProfile) {
        updatedUser.spiritualProfile = {
          ...user.spiritualProfile,
          ...updates.spiritualProfile,
        }
      }

      if (updates.preferences) {
        updatedUser.preferences = {
          ...user.preferences,
          ...updates.preferences,
        }
      }

      if (updates.quizResults) {
        updatedUser.quizResults = updates.quizResults
      }

      // Update local state
      setUser(updatedUser)

      // Save to localStorage
      localStorage.setItem("userData", JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  const addJournalEntry = (entry: Partial<JournalEntry>): JournalEntry => {
    try {
      const now = new Date().toISOString()
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        title: entry.title || "Untitled Entry",
        content: entry.content || "",
        createdAt: now,
        updatedAt: now,
        tags: entry.tags || [],
        mood: entry.mood,
        isPrivate: entry.isPrivate !== undefined ? entry.isPrivate : true,
        type: entry.type || "free",
      }

      // Update local state
      const updatedUser = {
        ...user,
        journalEntries: [newEntry, ...user.journalEntries],
      }

      setUser(updatedUser)

      // Save to localStorage
      localStorage.setItem("userData", JSON.stringify(updatedUser))

      return newEntry
    } catch (error) {
      console.error("Error adding journal entry:", error)
      return {
        id: "error",
        title: "Error Entry",
        content: "An error occurred while saving this entry.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: [],
        isPrivate: true,
        type: "free",
      }
    }
  }

  const updateJournalEntry = (entryId: string, updates: Partial<JournalEntry>) => {
    try {
      // Update local state
      const updatedEntries = user.journalEntries.map((entry) =>
        entry.id === entryId ? { ...entry, ...updates, updatedAt: new Date().toISOString() } : entry,
      )

      const updatedUser = {
        ...user,
        journalEntries: updatedEntries,
      }

      setUser(updatedUser)

      // Save to localStorage
      localStorage.setItem("userData", JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Error updating journal entry:", error)
    }
  }

  const deleteJournalEntry = (entryId: string) => {
    try {
      // Update local state
      const updatedEntries = user.journalEntries.filter((entry) => entry.id !== entryId)

      const updatedUser = {
        ...user,
        journalEntries: updatedEntries,
      }

      setUser(updatedUser)

      // Save to localStorage
      localStorage.setItem("userData", JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Error deleting journal entry:", error)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        isLoading,
        addJournalEntry,
        updateJournalEntry,
        deleteJournalEntry,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
