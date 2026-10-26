"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

const CosmicWeather = () => {
  const [cosmicData, setCosmicData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching cosmic weather data
    const fetchCosmicWeather = () => {
      setIsLoading(true)

      // Mock data - in a real app, this would come from an API
      const mockData = {
        date: new Date().toLocaleDateString(),
        moonPhase: "Waxing Crescent",
        moonSign: "Gemini",
        moonIllumination: "23%",
        planetaryTransits: [
          { planet: "Mercury", status: "Direct", sign: "Aries" },
          { planet: "Venus", status: "Direct", sign: "Taurus" },
          { planet: "Mars", status: "Direct", sign: "Aquarius" },
        ],
        significantAspects: [
          { aspect: "Venus trine Jupiter", influence: "Positive", intensity: "Moderate" },
          { aspect: "Mars square Saturn", influence: "Challenging", intensity: "Strong" },
        ],
        energyQuality: "Dynamic & Intellectual",
        dailyFocus: "Communication & Learning",
      }

      setTimeout(() => {
        setCosmicData(mockData)
        setIsLoading(false)
      }, 800)
    }

    fetchCosmicWeather()
  }, [])

  const getMoonPhaseIcon = (phase) => {
    const phaseLower = phase.toLowerCase()
    if (phaseLower.includes("new")) return "🌑"
    if (phaseLower.includes("waxing crescent")) return "🌒"
    if (phaseLower.includes("first quarter")) return "🌓"
    if (phaseLower.includes("waxing gibbous")) return "🌔"
    if (phaseLower.includes("full")) return "🌕"
    if (phaseLower.includes("waning gibbous")) return "🌖"
    if (phaseLower.includes("last quarter")) return "🌗"
    if (phaseLower.includes("waning crescent")) return "🌘"
    return "🌙" // Default moon icon
  }

  const getInfluenceColor = (influence) => {
    if (influence === "Positive") return "text-green-400"
    if (influence === "Challenging") return "text-orange-400"
    if (influence === "Neutral") return "text-blue-300"
    return "text-blue-200"
  }

  return (
    <Card className="bg-indigo-900 bg-opacity-70 border-indigo-700 p-4">
      <h2 className="text-lg font-medium text-purple-300 mb-3">Cosmic Weather</h2>

      {isLoading ? (
        <div className="space-y-3">
          <div className="animate-pulse h-4 bg-indigo-800 rounded w-1/2"></div>
          <div className="animate-pulse h-4 bg-indigo-800 rounded w-3/4"></div>
          <div className="animate-pulse h-4 bg-indigo-800 rounded w-2/3"></div>
          <div className="animate-pulse h-4 bg-indigo-800 rounded w-1/2"></div>
        </div>
      ) : cosmicData ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-blue-300 text-sm">Moon Phase</span>
              <div className="flex items-center">
                <span className="text-white mr-2">{cosmicData.moonPhase}</span>
                <span className="text-2xl">{getMoonPhaseIcon(cosmicData.moonPhase)}</span>
              </div>
              <span className="text-blue-200 text-xs">
                {cosmicData.moonSign} • {cosmicData.moonIllumination}
              </span>
            </div>

            <div>
              <span className="text-blue-300 text-sm">Energy Quality</span>
              <p className="text-white">{cosmicData.energyQuality}</p>
              <span className="text-blue-200 text-xs">Focus: {cosmicData.dailyFocus}</span>
            </div>
          </div>

          <div>
            <span className="text-blue-300 text-sm">Significant Aspects</span>
            <div className="space-y-1 mt-1">
              {cosmicData.significantAspects.map((aspect, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex justify-between items-center"
                >
                  <span className="text-white text-sm">{aspect.aspect}</span>
                  <span className={`text-sm ${getInfluenceColor(aspect.influence)}`}>
                    {aspect.influence} ({aspect.intensity})
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-blue-300 text-sm">Planetary Positions</span>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {cosmicData.planetaryTransits.map((transit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-indigo-800/50 p-2 rounded text-center"
                >
                  <span className="text-white text-sm">{transit.planet}</span>
                  <div className="text-blue-200 text-xs">
                    {transit.sign} ({transit.status})
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-blue-200">Unable to load cosmic weather data.</p>
      )}
    </Card>
  )
}

export default CosmicWeather
