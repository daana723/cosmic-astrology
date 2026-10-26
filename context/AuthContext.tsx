"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Define types for our context
type User = {
  uid: string
  email: string
  displayName: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
}

// Create auth context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for user in localStorage on mount
  useEffect(() => {
    const checkUser = () => {
      try {
        // Check if we have a user in localStorage
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()
  }, [])

  // Simple sign in function using localStorage
  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, you would validate credentials against a database
      // For now, we'll just check if the user exists in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const user = users.find((u: any) => u.email === email && u.password === password)

      if (!user) {
        throw new Error("Invalid email or password")
      }

      // Create user object without password
      const authUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      }

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(authUser))
      setUser(authUser)
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Error signing in:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Simple sign up function
  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      if (users.some((u: any) => u.email === email)) {
        throw new Error("User already exists")
      }

      // Create a new user
      const newUser = {
        uid: `user-${Date.now()}`,
        email,
        password, // In a real app, you would hash this password
        displayName: name,
      }

      // Add to users array
      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))

      // Create auth user object without password
      const authUser = {
        uid: newUser.uid,
        email: newUser.email,
        displayName: newUser.displayName,
      }

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(authUser))
      setUser(authUser)
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Error signing up:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Simple sign out function
  const signOut = async () => {
    try {
      localStorage.removeItem("user")
      setUser(null)
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
