"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { LogOut } from "lucide-react"

interface ProfileSectionProps {
  userData: {
    name: string
    sign: string
    moonSign: string
    risingSign: string
    archetype: string
  }
  onUpdateData: (data: any) => void
}

export function ProfileSection({ userData, onUpdateData }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: userData.name || "",
    sign: userData.sign || "",
    moonSign: userData.moonSign || "",
    risingSign: userData.risingSign || "",
    archetype: userData.archetype || "",
  })

  const handleSave = () => {
    const updatedData = { ...userData, ...formData }
    onUpdateData(updatedData)
    localStorage.setItem("userData", JSON.stringify(updatedData))
    setIsEditing(false)
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out? This will clear your profile data.")) {
      localStorage.removeItem("userData")
      window.location.reload()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Profile
        </h1>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 bg-transparent"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      <Card className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10 backdrop-blur-sm border-purple-300/20 p-6">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {userData.name ? userData.name[0].toUpperCase() : "C"}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Name"
                  className="w-full p-2 bg-white/50 backdrop-blur-sm border border-purple-300 rounded-lg text-gray-800 focus:border-purple-500 focus:outline-none"
                />
                <input
                  type="text"
                  value={formData.sign}
                  onChange={(e) => setFormData({ ...formData, sign: e.target.value })}
                  placeholder="Zodiac Sign"
                  className="w-full p-2 bg-white/50 backdrop-blur-sm border border-purple-300 rounded-lg text-gray-800 focus:border-purple-500 focus:outline-none"
                />
                <input
                  type="text"
                  value={formData.moonSign}
                  onChange={(e) => setFormData({ ...formData, moonSign: e.target.value })}
                  placeholder="Moon Sign"
                  className="w-full p-2 bg-white/50 backdrop-blur-sm border border-purple-300 rounded-lg text-gray-800 focus:border-purple-500 focus:outline-none"
                />
                <input
                  type="text"
                  value={formData.risingSign}
                  onChange={(e) => setFormData({ ...formData, risingSign: e.target.value })}
                  placeholder="Rising Sign"
                  className="w-full p-2 bg-white/50 backdrop-blur-sm border border-purple-300 rounded-lg text-gray-800 focus:border-purple-500 focus:outline-none"
                />
                <select
                  value={formData.archetype}
                  onChange={(e) => setFormData({ ...formData, archetype: e.target.value })}
                  className="w-full p-2 bg-white/50 backdrop-blur-sm border border-purple-300 rounded-lg text-gray-800 focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Select Archetype</option>
                  <option value="visionary">Visionary</option>
                  <option value="healer">Healer</option>
                  <option value="maverick">Maverick</option>
                  <option value="explorer">Explorer</option>
                </select>
                <div className="flex space-x-2 pt-2">
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    className="border-purple-300 text-gray-700 hover:bg-purple-50"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-medium text-gray-800">{userData.name || "Cosmic Explorer"}</h2>
                <p className="text-gray-600 text-sm">
                  {userData.sign && `${userData.sign} Sun`}
                  {userData.moonSign && ` • ${userData.moonSign} Moon`}
                  {userData.risingSign && ` • ${userData.risingSign} Rising`}
                </p>
                {userData.archetype && (
                  <p className="text-purple-600 text-sm font-medium mt-1 capitalize">Archetype: {userData.archetype}</p>
                )}
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="mt-3 border-purple-500 text-purple-600 hover:bg-purple-50"
                >
                  Edit Profile
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-300/20 p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-3">Your Cosmic Profile</h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-medium">Name:</span> {userData.name || "Not set"}
          </p>
          <p>
            <span className="font-medium">Zodiac Sign:</span> {userData.sign || "Not set"}
          </p>
          <p>
            <span className="font-medium">Moon Sign:</span> {userData.moonSign || "Not set"}
          </p>
          <p>
            <span className="font-medium">Rising Sign:</span> {userData.risingSign || "Not set"}
          </p>
          <p>
            <span className="font-medium">Archetype:</span>{" "}
            <span className="capitalize">{userData.archetype || "Not set"}</span>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default ProfileSection
