"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const CommunityHub: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-300">Community</h1>
      </div>

      <Card className="bg-indigo-900 bg-opacity-70 border-indigo-700 p-6 text-center">
        <h3 className="text-lg font-medium text-purple-300 mb-2">Connect with Like-Minded Souls</h3>
        <p className="text-blue-200 mb-4">
          Join Soul Circles, participate in discussions, and connect with others on a similar spiritual path.
        </p>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white mx-auto">Explore Communities</Button>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-indigo-900 bg-opacity-70 border-indigo-700 p-4">
          <h3 className="text-lg font-medium text-purple-300 mb-3">Soul Circles</h3>
          <p className="text-blue-200 text-sm mb-4">
            Join small, intimate groups for deeper connection and spiritual growth.
          </p>
          <Button variant="outline" className="w-full border-purple-500 text-purple-300">
            Find Your Circle
          </Button>
        </Card>

        <Card className="bg-indigo-900 bg-opacity-70 border-indigo-700 p-4">
          <h3 className="text-lg font-medium text-purple-300 mb-3">Wisdom Exchange</h3>
          <p className="text-blue-200 text-sm mb-4">
            Share knowledge and experiences with the broader Indigo Souls community.
          </p>
          <Button variant="outline" className="w-full border-purple-500 text-purple-300">
            Join Discussions
          </Button>
        </Card>

        <Card className="bg-indigo-900 bg-opacity-70 border-indigo-700 p-4">
          <h3 className="text-lg font-medium text-purple-300 mb-3">Events & Workshops</h3>
          <p className="text-blue-200 text-sm mb-4">Participate in virtual gatherings for learning and connection.</p>
          <Button variant="outline" className="w-full border-purple-500 text-purple-300">
            View Calendar
          </Button>
        </Card>

        <Card className="bg-indigo-900 bg-opacity-70 border-indigo-700 p-4">
          <h3 className="text-lg font-medium text-purple-300 mb-3">Mentorship</h3>
          <p className="text-blue-200 text-sm mb-4">Connect with spiritual mentors or offer your guidance to others.</p>
          <Button variant="outline" className="w-full border-purple-500 text-purple-300">
            Explore Mentorship
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default CommunityHub
