"use client"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupabaseTest() {
  const { user } = useAuth()
  const [testResult, setTestResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userData, setUserData] = useState<any>(null)

  const testConnection = async () => {
    setIsLoading(true)
    setError(null)
    setTestResult(null)

    try {
      // Test query to check connection
      const { data, error } = await supabase.from("profiles").select("count(*)").limit(1)

      if (error) throw error

      setTestResult(`Connection successful! Found ${data[0]?.count || 0} profiles.`)
    } catch (err: any) {
      setError(`Error: ${err.message || "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  const getUserData = async () => {
    setIsLoading(true)
    setError(null)
    setUserData(null)

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError("No authenticated user found")
        return
      }

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (profileError) throw profileError

      setUserData({
        auth: user,
        profile,
      })
    } catch (err: any) {
      setError(`Error: ${err.message || "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-indigo-900 bg-opacity-70 border-indigo-700 p-4">
      <CardHeader>
        <CardTitle className="text-purple-300">Supabase Integration Test</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-blue-200">{user ? `Logged in as: ${user.email}` : "Not logged in"}</p>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={testConnection}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isLoading ? "Testing..." : "Test Database Connection"}
            </Button>

            <Button
              onClick={getUserData}
              disabled={isLoading || !user}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? "Loading..." : "Get User Data"}
            </Button>
          </div>

          {testResult && (
            <div className="p-3 bg-green-900/50 border border-green-700 rounded-md">
              <p className="text-green-200">{testResult}</p>
            </div>
          )}

          {userData && (
            <div className="p-3 bg-blue-900/50 border border-blue-700 rounded-md">
              <h3 className="text-blue-200 font-medium mb-2">User Data:</h3>
              <pre className="text-blue-200 text-sm overflow-auto max-h-40">{JSON.stringify(userData, null, 2)}</pre>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-900/50 border border-red-700 rounded-md">
              <p className="text-red-200">{error}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
