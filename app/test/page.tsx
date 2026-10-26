"use client"

import ProtectedRoute from "@/components/ProtectedRoute"
import SupabaseTest from "@/components/SupabaseTest"

export default function TestPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-purple-300 mb-6">Supabase Integration Test</h1>
        <SupabaseTest />
      </div>
    </ProtectedRoute>
  )
}
