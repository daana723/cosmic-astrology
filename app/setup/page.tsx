"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import FirebaseSetupGuide from "@/components/FirebaseSetupGuide"

export default function SetupPage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-purple-300 mb-6">Firebase Setup</h1>

      <div className="space-y-6">
        <Card className="bg-indigo-900 bg-opacity-70 border-indigo-700">
          <CardHeader>
            <CardTitle className="text-purple-300">Welcome to Quantum Astrology</CardTitle>
            <CardDescription className="text-blue-200">
              Follow this guide to set up your Firebase project and get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-blue-200 mb-4">
              This template uses Firebase for authentication and data storage. Before you can use the app, you'll need
              to set up a Firebase project and configure it.
            </p>

            <div className="bg-indigo-800/50 p-4 rounded-lg border border-indigo-700 mb-4">
              <h3 className="text-lg font-medium text-purple-300 mb-2">What's Included</h3>
              <ul className="list-disc pl-5 space-y-1 text-blue-200">
                <li>Firebase Authentication for user login/signup</li>
                <li>Firestore Database for storing user data and journal entries</li>
                <li>Complete user profile management</li>
                <li>Journal entry creation, editing, and deletion</li>
                <li>Spiritual quizzes and assessments</li>
                <li>Cosmic dashboard with personalized insights</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <FirebaseSetupGuide />

        <Card className="bg-indigo-900 bg-opacity-70 border-indigo-700">
          <CardHeader>
            <CardTitle className="text-purple-300">Firestore Database Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-200 mb-4">This app uses the following Firestore collections:</p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-purple-300 mb-2">users</h3>
                <p className="text-blue-200 mb-2">Stores user profile information and preferences.</p>
                <pre className="bg-indigo-950 p-4 rounded-md text-blue-200 text-sm overflow-x-auto">
                  {`{
  id: string, // Same as Firebase Auth UID
  name: string,
  email: string,
  profileImage: string,
  spiritualProfile: {
    archetypeResults: object | null,
    shadowWorkResults: object | null,
    purposeResults: object | null,
    spiritualGifts: object | null,
    interests: string[]
  },
  preferences: {
    theme: string,
    notificationsEnabled: boolean,
    privacySettings: object
  },
  createdAt: timestamp
}`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-medium text-purple-300 mb-2">journalEntries</h3>
                <p className="text-blue-200 mb-2">Stores user journal entries.</p>
                <pre className="bg-indigo-950 p-4 rounded-md text-blue-200 text-sm overflow-x-auto">
                  {`{
  id: string, // Document ID
  userId: string, // Reference to user
  title: string,
  content: string,
  type: string, // "free", "dream", "synchronicity", etc.
  tags: string[],
  mood: string,
  isPrivate: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-medium text-purple-300 mb-2">quizResults</h3>
                <p className="text-blue-200 mb-2">Stores results from various spiritual assessments.</p>
                <pre className="bg-indigo-950 p-4 rounded-md text-blue-200 text-sm overflow-x-auto">
                  {`{
  id: string, // Document ID
  userId: string, // Reference to user
  quizType: string, // "archetype", "shadowWork", etc.
  results: object, // Quiz-specific results
  completedAt: timestamp
}`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
