"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Moon, Star, Heart } from "lucide-react"

interface DashboardHomeProps {
  userData: {
    name: string
    sign: string
    moonSign: string
    risingSign: string
    archetype: string
  }
}

export default function DashboardHome({ userData }: DashboardHomeProps) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const getArchetypeInsight = () => {
    const insights = {
      visionary: "Your innovative spirit sees possibilities others miss. Trust your unique perspective.",
      healer: "Your sensitivity is a gift that allows you to perceive what others cannot.",
      maverick: "Your courage to challenge the status quo opens new pathways for growth.",
      explorer: "Your curiosity leads you to discover hidden truths and new horizons.",
    }
    return insights[userData.archetype as keyof typeof insights] || "Your journey is uniquely yours to discover."
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10 backdrop-blur-sm rounded-xl p-8 border border-purple-200/30">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          {getGreeting()}, {userData.name || "Cosmic Explorer"}
        </h2>
        <p className="text-gray-600 text-lg">Welcome to your spiritual dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Daily Insight
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 italic">&ldquo;{getArchetypeInsight()}&rdquo;</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-indigo-600" />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Your Archetype
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-indigo-600 capitalize">{userData.archetype || "Not Set"}</p>
            <p className="text-gray-600 text-sm mt-2">Your spiritual essence and guiding energy</p>
          </CardContent>
        </Card>
      </div>

      {userData.sign && (
        <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-pink-600" />
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Your Cosmic Profile
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Sun Sign</p>
                <p className="text-lg font-semibold text-pink-600 capitalize">{userData.sign}</p>
              </div>
              {userData.moonSign && (
                <div>
                  <p className="text-sm text-gray-600">Moon Sign</p>
                  <p className="text-lg font-semibold text-purple-600 capitalize">{userData.moonSign}</p>
                </div>
              )}
              {userData.risingSign && (
                <div>
                  <p className="text-sm text-gray-600">Rising Sign</p>
                  <p className="text-lg font-semibold text-indigo-600 capitalize">{userData.risingSign}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200/50">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="w-full bg-white/50 hover:bg-white border-purple-200 hover:border-purple-400 text-purple-700"
          >
            📖 Record a Dream
          </Button>
          <Button
            variant="outline"
            className="w-full bg-white/50 hover:bg-white border-blue-200 hover:border-blue-400 text-blue-700"
          >
            🔮 Get Daily Reading
          </Button>
          <Button
            variant="outline"
            className="w-full bg-white/50 hover:bg-white border-indigo-200 hover:border-indigo-400 text-indigo-700"
          >
            ✨ Create Ritual
          </Button>
        </div>
      </div>
    </div>
  )
}
