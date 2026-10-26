"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Copy, ExternalLink } from "lucide-react"

export default function FirebaseSetupGuide() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(`
// Replace these with your actual Firebase project config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
    `)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="bg-indigo-900 bg-opacity-70 border-indigo-700">
      <CardHeader>
        <CardTitle className="text-purple-300">Firebase Setup Guide</CardTitle>
        <CardDescription className="text-blue-200">Follow these steps to set up your Firebase project</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="create">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="create">Create Project</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="deploy">Deploy</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-purple-300">1. Create a Firebase Project</h3>
              <p className="text-blue-200">Go to the Firebase Console and create a new project.</p>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-purple-500 text-purple-300"
                onClick={() => window.open("https://console.firebase.google.com/", "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
                Open Firebase Console
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium text-purple-300">2. Enable Authentication</h3>
              <p className="text-blue-200">
                In your Firebase project, go to Authentication and enable Email/Password authentication.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium text-purple-300">3. Create Firestore Database</h3>
              <p className="text-blue-200">
                Go to Firestore Database and create a new database. Start in test mode for development.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="config" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-purple-300">1. Register Web App</h3>
              <p className="text-blue-200">
                In your Firebase project, click on the web icon ({"</>"}) to register a web app.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium text-purple-300">2. Copy Configuration</h3>
              <p className="text-blue-200">
                After registering, you'll get a configuration object. Copy it and replace the placeholder in
                lib/firebase.ts.
              </p>
              <div className="relative">
                <pre className="bg-indigo-950 p-4 rounded-md text-blue-200 text-sm overflow-x-auto">
                  {`// Replace these with your actual Firebase project config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};`}
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0 text-blue-300"
                  onClick={handleCopy}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium text-purple-300">3. Install Firebase</h3>
              <p className="text-blue-200">Install the Firebase packages:</p>
              <pre className="bg-indigo-950 p-4 rounded-md text-blue-200 text-sm overflow-x-auto">
                npm install firebase
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="deploy" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-purple-300">1. Install Firebase CLI</h3>
              <p className="text-blue-200">Install the Firebase CLI globally:</p>
              <pre className="bg-indigo-950 p-4 rounded-md text-blue-200 text-sm overflow-x-auto">
                npm install -g firebase-tools
              </pre>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium text-purple-300">2. Login and Initialize</h3>
              <p className="text-blue-200">Login to Firebase and initialize your project:</p>
              <pre className="bg-indigo-950 p-4 rounded-md text-blue-200 text-sm overflow-x-auto">
                {`firebase login
firebase init`}
              </pre>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium text-purple-300">3. Build and Deploy</h3>
              <p className="text-blue-200">Build your Next.js app and deploy to Firebase:</p>
              <pre className="bg-indigo-950 p-4 rounded-md text-blue-200 text-sm overflow-x-auto">
                {`npm run build
firebase deploy`}
              </pre>
            </div>

            <div className="mt-4">
              <p className="text-blue-200">Alternatively, you can deploy to Vercel which is optimized for Next.js:</p>
              <Button
                className="mt-2 bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => window.open("https://vercel.com/new", "_blank")}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Deploy to Vercel
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
