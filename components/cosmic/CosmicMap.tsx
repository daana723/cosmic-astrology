"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUser } from "@/context/UserContext"
import { motion } from "framer-motion"

const CosmicMap: React.FC = () => {
  const { user } = useUser()
  const [celestialBodies, setCelestialBodies] = useState<any[]>([])
  const [selectedBody, setSelectedBody] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading celestial data
    const loadCelestialData = () => {
      setLoading(true)

      // Mock data for celestial bodies
      const mockData = [
        {
          id: "sun",
          name: "Sun",
          sign: "Taurus",
          degree: 15,
          position: { x: 50, y: 50 },
          size: 20,
          color: "#FFD700",
          description:
            "The Sun represents your core essence and life purpose. In Taurus, you express yourself with patience, determination, and a practical approach to life.",
        },
        {
          id: "moon",
          name: "Moon",
          sign: "Cancer",
          degree: 8,
          position: { x: 70, y: 30 },
          size: 15,
          color: "#SILVER",
          description:
            "The Moon represents your emotional nature and subconscious patterns. In Cancer, your emotions run deep, and you have a strong need for emotional security and nurturing connections.",
        },
        {
          id: "mercury",
          name: "Mercury",
          sign: "Gemini",
          degree: 22,
          position: { x: 30, y: 60 },
          size: 10,
          color: "#B5B8B1",
          description:
            "Mercury represents your communication style and thought processes. In Gemini, you have a curious, adaptable mind and express yourself with versatility and wit.",
        },
        {
          id: "venus",
          name: "Venus",
          sign: "Aries",
          degree: 5,
          position: { x: 80, y: 70 },
          size: 12,
          color: "#COPPER",
          description:
            "Venus represents your values, attractions, and approach to relationships. In Aries, you are passionate and direct in love, valuing excitement and independence in relationships.",
        },
        {
          id: "mars",
          name: "Mars",
          sign: "Capricorn",
          degree: 18,
          position: { x: 20, y: 40 },
          size: 11,
          color: "#FF4500",
          description:
            "Mars represents your drive, ambition, and how you assert yourself. In Capricorn, you pursue your goals with discipline, strategy, and determination.",
        },
        {
          id: "jupiter",
          name: "Jupiter",
          sign: "Pisces",
          degree: 10,
          position: { x: 60, y: 80 },
          size: 18,
          color: "#DAA520",
          description:
            "Jupiter represents expansion, growth, and your philosophical outlook. In Pisces, you find meaning through spiritual connection, compassion, and transcending boundaries.",
        },
        {
          id: "saturn",
          name: "Saturn",
          sign: "Aquarius",
          degree: 25,
          position: { x: 40, y: 20 },
          size: 16,
          color: "#708090",
          description:
            "Saturn represents structure, responsibility, and life lessons. In Aquarius, your challenges involve balancing individuality with collective responsibility and creating innovative structures.",
        },
      ]

      setTimeout(() => {
        setCelestialBodies(mockData)
        setLoading(false)
      }, 1500)
    }

    loadCelestialData()
  }, [])

  const handleBodyClick = (body: any) => {
    setSelectedBody(body)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-turquoise">Cosmic Map</h1>
        <Button className="btn-primary">Today's Transit</Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Card className="cosmic-card p-4">
          <h2 className="text-lg font-medium text-turquoise mb-4">Your Celestial Blueprint</h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-16 h-16 border-4 border-t-turquoise rounded-full animate-spin mb-4"></div>
              <p className="text-lavender">Aligning with cosmic energies...</p>
            </div>
          ) : (
            <div className="relative h-[300px] bg-indigo-950/70 rounded-lg border border-indigo-800/50 overflow-hidden">
              {/* Cosmic map background with stars */}
              <div className="absolute inset-0 opacity-30">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                      width: `${Math.random() * 2 + 1}px`,
                      height: `${Math.random() * 2 + 1}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: Math.random() * 0.8 + 0.2,
                    }}
                  ></div>
                ))}
              </div>

              {/* Celestial bodies */}
              {celestialBodies.map((body) => (
                <motion.div
                  key={body.id}
                  className="absolute cursor-pointer"
                  style={{
                    top: `${body.position.y}%`,
                    left: `${body.position.x}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => handleBodyClick(body)}
                >
                  <div
                    className="rounded-full flex items-center justify-center text-center"
                    style={{
                      width: `${body.size * 2}px`,
                      height: `${body.size * 2}px`,
                      backgroundColor: body.color,
                      boxShadow: `0 0 10px ${body.color}`,
                    }}
                  >
                    <span className="sr-only">{body.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {selectedBody && (
            <div className="mt-4 p-3 bg-indigo-900/50 rounded-lg border border-indigo-700/50">
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: selectedBody.color }}></div>
                <h3 className="text-turquoise font-medium">
                  {selectedBody.name} in {selectedBody.sign} {selectedBody.degree}°
                </h3>
              </div>
              <p className="text-lavender text-sm">{selectedBody.description}</p>
            </div>
          )}
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Card className="cosmic-card p-4">
          <h2 className="text-lg font-medium text-turquoise mb-3">Current Cosmic Weather</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-lavender">Moon Phase</span>
              <span className="text-white">Waxing Crescent</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lavender">Mercury Status</span>
              <span className="text-white">Direct</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lavender">Current Transits</span>
              <span className="text-orange">Venus square Mars</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lavender">Energy Quality</span>
              <span className="text-turquoise">Dynamic & Transformative</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default CosmicMap
