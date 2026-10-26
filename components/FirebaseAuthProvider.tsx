"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { AuthProvider } from "@/context/AuthContext"
import { UserProvider } from "@/context/UserContext"

export default function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only render the children when the component is mounted on the client
  if (!mounted) {
    return null
  }

  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  )
}
