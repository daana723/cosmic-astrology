"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

interface LunarPhaseTrackerProps {
  astrologyData: {
    sunSign: string
    moonSign: string
  }
}

interface LunarPhase {
  date: string
  time: string
  gmtTime: string
  localTime: string
  phase: string
  illumination: string
  sign: string
  position: {
    rising: string
    setting: string
  }
  interpretation: string
  recommendations: string[]
}

interface LunarCalendar {
  currentPhase: LunarPhase
  upcomingPhases: LunarPhase[]
  dailyPhases: {
    date: string
    phase: string
    illumination: string
  }[]
}

const LunarPhaseTracker: React.FC<LunarPhaseTrackerProps> = ({ astrologyData }) => {
  const [lunarCalendar, setLunarCalendar] = useState<LunarCalendar | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedPhase, setSelectedPhase] = useState<LunarPhase | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showDailyView, setShowDailyView] = useState<boolean>(false)

  const fetchLunarData = async () => {
    setLoading(true)
    setError(null)

    try {
      // In a real implementation, this would call an API
      // For now, we'll use mock data
      const mockLunarData: LunarCalendar = {
        currentPhase: {
          date: "April 13, 2025",
          time: "00:22",
          gmtTime: "00:22 GMT",
          localTime: "20:22 EDT (April 12)",
          phase: "Full Moon",
          illumination: "100%",
          sign: "Libra",
          position: {
            rising: "19:32",
            setting: "06:45",
          },
          interpretation: `This Full Moon in Libra brings balance and harmony to your emotional landscape. With your ${astrologyData.sunSign} Sun and ${astrologyData.moonSign} Moon, you may feel a strong pull toward relationship matters and finding equilibrium in your connections.`,
          recommendations: [
            "Practice meditation focused on balance and harmony",
            "Perform a relationship healing ritual",
            "Release emotional patterns that no longer serve you",
            "Connect with loved ones for meaningful conversations",
          ],
        },
        upcomingPhases: [
          {
            date: "April 21, 2025",
            time: "01:35",
            gmtTime: "01:35 GMT",
            localTime: "21:35 EDT (April 20)",
            phase: "Last Quarter",
            illumination: "50%",
            sign: "Capricorn",
            position: {
              rising: "01:15",
              setting: "11:30",
            },
            interpretation: `The Last Quarter Moon in Capricorn brings a time of reflection and release. For someone with your ${astrologyData.sunSign} Sun and ${astrologyData.moonSign} Moon, this is an excellent time to let go of structures and limitations that have been holding you back.`,
            recommendations: [
              "Review your goals and release what's no longer aligned",
              "Practice forgiveness meditation",
              "Clear your physical space of clutter",
              "Journal about lessons learned in the past month",
            ],
          },
          {
            date: "April 27, 2025",
            time: "19:31",
            gmtTime: "19:31 GMT",
            localTime: "15:31 EDT",
            phase: "New Moon",
            illumination: "0%",
            sign: "Taurus",
            position: {
              rising: "06:20",
              setting: "20:15",
            },
            interpretation: `The New Moon in Taurus offers a fresh start in matters of resources, values, and security. With your ${astrologyData.sunSign} Sun and ${astrologyData.moonSign} Moon, this is a powerful time to set intentions related to material abundance and self-worth.`,
            recommendations: [
              "Create a new moon intention setting ritual",
              "Plant seeds literally or metaphorically",
              "Connect with nature to ground your energy",
              "Start a new financial plan or budget",
            ],
          },
          {
            date: "May 5, 2025",
            time: "02:15",
            gmtTime: "02:15 GMT",
            localTime: "22:15 EDT (May 4)",
            phase: "First Quarter",
            illumination: "50%",
            sign: "Leo",
            position: {
              rising: "11:45",
              setting: "01:20",
            },
            interpretation: `The First Quarter Moon in Leo brings creative energy and momentum to your intentions. For someone with your ${astrologyData.sunSign} Sun and ${astrologyData.moonSign} Moon, this is a time to take bold action on the seeds planted during the New Moon.`,
            recommendations: [
              "Take decisive action on your new moon intentions",
              "Express yourself creatively through art or performance",
              "Step into leadership in an area of passion",
              "Celebrate small victories with joy and enthusiasm",
            ],
          },
        ],
        dailyPhases: Array.from({ length: 30 }, (_, i) => {
          const date = new Date(2025, 3, i + 1) // April 2025
          const dayOfMonth = i + 1
          let phase = ""
          let illumination = ""

          if (dayOfMonth === 13) {
            phase = "Full Moon"
            illumination = "100%"
          } else if (dayOfMonth === 21) {
            phase = "Last Quarter"
            illumination = "50%"
          } else if (dayOfMonth === 27) {
            phase = "New Moon"
            illumination = "0%"
          } else if (dayOfMonth === 5) {
            phase = "First Quarter"
            illumination = "50%"
          } else if (dayOfMonth < 13) {
            phase = "Waxing Gibbous"
            illumination = `${80 + dayOfMonth * 1.5}%`
          } else if (dayOfMonth < 21) {
            phase = "Waning Gibbous"
            illumination = `${90 - (dayOfMonth - 13) * 5}%`
          } else if (dayOfMonth < 27) {
            phase = "Waning Crescent"
            illumination = `${40 - (dayOfMonth - 21) * 6}%`
          } else {
            phase = "Waxing Crescent"
            illumination = `${(dayOfMonth - 27) * 10}%`
          }

          return {
            date: date.toISOString(),
            phase,
            illumination,
          }
        }),
      }

      setLunarCalendar(mockLunarData)
      setSelectedPhase(mockLunarData.currentPhase)
    } catch (err) {
      console.error("Error fetching lunar data:", err)
      setError("Failed to generate lunar phase information. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Fetch lunar data on component mount
  useEffect(() => {
    if (astrologyData) {
      fetchLunarData()
    }
  }, [astrologyData])

  const getMoonPhaseIcon = (phase: string, illumination?: string): string => {
    const phaseLower = phase.toLowerCase()
    const illum = illumination ? Number.parseFloat(illumination.replace("%", "")) : null

    if (phaseLower.includes("new") || (illum !== null && illum <= 5)) return "🌑"
    if (phaseLower.includes("waxing crescent") || (illum !== null && illum > 5 && illum < 45)) return "🌒"
    if (phaseLower.includes("first quarter") || (illum !== null && illum >= 45 && illum <= 55)) return "🌓"
    if (phaseLower.includes("waxing gibbous") || (illum !== null && illum > 55 && illum < 95)) return "🌔"
    if (phaseLower.includes("full") || (illum !== null && illum >= 95)) return "🌕"
    if (phaseLower.includes("waning gibbous") || (illum !== null && illum < 95 && illum > 55)) return "🌖"
    if (phaseLower.includes("last quarter") || (illum !== null && illum <= 55 && illum >= 45)) return "🌗"
    if (phaseLower.includes("waning crescent") || (illum !== null && illum < 45 && illum > 5)) return "🌘"
    return "🌙" // Default moon icon
  }

  const formatDate = (dateStr: string): string => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (e) {
      return dateStr
    }
  }

  const getDayOfMonth = (dateStr: string): number => {
    try {
      const date = new Date(dateStr)
      return date.getDate()
    } catch (e) {
      return 0
    }
  }

  const isToday = (dateStr: string): boolean => {
    try {
      const date = new Date(dateStr)
      const today = new Date()
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      )
    } catch (e) {
      return false
    }
  }

  const isSelectedDate = (dateStr: string): boolean => {
    try {
      const date = new Date(dateStr)
      return (
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      )
    } catch (e) {
      return false
    }
  }

  const getDailyPhaseForDate = (date: Date): any => {
    if (!lunarCalendar || !lunarCalendar.dailyPhases) return null

    const dateStr = date.toISOString().split("T")[0]
    return lunarCalendar.dailyPhases.find((phase) => {
      try {
        const phaseDate = new Date(phase.date)
        return phaseDate.toISOString().split("T")[0] === dateStr
      } catch (e) {
        return false
      }
    })
  }

  const getMajorPhaseForDate = (date: Date): any => {
    if (!lunarCalendar) return null

    const dateStr = date.toISOString().split("T")[0]

    // Check current phase
    if (new Date(lunarCalendar.currentPhase.date).toISOString().split("T")[0] === dateStr) {
      return lunarCalendar.currentPhase
    }

    // Check upcoming phases
    return lunarCalendar.upcomingPhases.find((phase) => {
      try {
        const phaseDate = new Date(phase.date)
        return phaseDate.toISOString().split("T")[0] === dateStr
      } catch (e) {
        return false
      }
    })
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)

    const majorPhase = getMajorPhaseForDate(date)
    if (majorPhase) {
      setSelectedPhase(majorPhase)
    } else {
      const dailyPhase = getDailyPhaseForDate(date)
      if (dailyPhase) {
        // Create a simplified phase object for the selected date
        setSelectedPhase({
          date: dailyPhase.date,
          time: "",
          gmtTime: "",
          localTime: "",
          phase: dailyPhase.phase,
          illumination: dailyPhase.illumination,
          sign: lunarCalendar?.currentPhase.sign || "",
          position: {
            rising: "",
            setting: "",
          },
          interpretation: `The Moon is in its ${dailyPhase.phase} phase with ${dailyPhase.illumination} illumination.`,
          recommendations: [],
        })
      }
    }
  }

  // Generate calendar for April 2025
  const generateCalendar = () => {
    const year = 2025
    const month = 3 // 0-indexed, so 3 is April

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Day of week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay()
    // Total days in month
    const daysInMonth = lastDay.getDate()

    // Create array for calendar grid
    const calendarDays = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(new Date(year, month, day))
    }

    return calendarDays
  }

  const calendarDays = generateCalendar()
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Mock data for cosmic events
  const upcomingEvents = [
    {
      id: 1,
      title: "Mercury Retrograde",
      date: "May 10 - June 3, 2025",
      description: "A time for reflection and revisiting past projects.",
    },
    {
      id: 2,
      title: "Full Moon in Scorpio",
      date: "May 15, 2025",
      description: "Powerful energies for transformation and release.",
    },
    {
      id: 3,
      title: "Venus enters Cancer",
      date: "May 20, 2025",
      description: "A nurturing time for relationships and creativity.",
    },
  ]

  if (!astrologyData) return null

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-purple-300">Lunar Phase Tracker</h1>

      <Card className="bg-indigo-900 bg-opacity-70 border-indigo-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-purple-300">Current Moon Phase</h2>
            <p className="text-blue-200 text-2xl font-bold mt-1">{lunarCalendar?.currentPhase.phase}</p>
            <p className="text-blue-200 text-sm mt-1">{lunarCalendar?.currentPhase.illumination}</p>
            <p className="text-blue-200 text-sm mt-1">
              {calendarDays.filter((day) => day && getMajorPhaseForDate(day)?.phase === "Full Moon").length} days until
              Full Moon
            </p>
          </div>
          <div className="h-24 w-24 rounded-full bg-indigo-800 border-4 border-indigo-700 flex items-center justify-center">
            <div
              className="h-20 w-20 rounded-full bg-blue-200"
              style={{
                clipPath: `inset(0 ${100 - Number.parseFloat(lunarCalendar?.currentPhase.illumination.replace("%", ""))}% 0 0)`,
              }}
            ></div>
          </div>
        </div>
      </Card>

      <Card className="bg-indigo-900 bg-opacity-70 border-indigo-700 p-4">
        <h2 className="text-lg font-medium text-purple-300 mb-3">Your Astrological Profile</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-indigo-800 bg-opacity-50 p-3 rounded-lg">
            <p className="text-blue-200 text-sm">Sun Sign</p>
            <p className="text-purple-300 text-lg font-medium">{astrologyData.sunSign}</p>
          </div>
          <div className="bg-indigo-800 bg-opacity-50 p-3 rounded-lg">
            <p className="text-blue-200 text-sm">Moon Sign</p>
            <p className="text-purple-300 text-lg font-medium">{astrologyData.moonSign}</p>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-purple-300">Upcoming Cosmic Events</h2>
        {upcomingEvents.map((event) => (
          <Card key={event.id} className="bg-indigo-900 bg-opacity-70 border-indigo-700 p-4">
            <h3 className="text-md font-medium text-purple-300">{event.title}</h3>
            <p className="text-blue-200 text-sm">{event.date}</p>
            <p className="text-blue-200 text-sm mt-2">{event.description}</p>
          </Card>
        ))}
      </div>

      <div className="bg-indigo-800 bg-opacity-70 rounded-lg p-4 border border-purple-500">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-purple-300">Lunar Phase Tracker</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowDailyView(!showDailyView)}
              className="px-3 py-1 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-white text-sm"
            >
              {showDailyView ? "Show Major Phases" : "Show Daily View"}
            </button>
            <button
              onClick={fetchLunarData}
              className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm"
            >
              Refresh Data
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            <span className="ml-2 text-purple-300">Aligning with lunar energies...</span>
          </div>
        ) : error ? (
          <div className="bg-red-900 bg-opacity-50 p-4 rounded-lg text-white">
            <p>{error}</p>
            <button
              onClick={fetchLunarData}
              className="mt-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded-lg text-white text-sm"
            >
              Try Again
            </button>
          </div>
        ) : lunarCalendar ? (
          <div className="space-y-6">
            {/* Calendar View */}
            <div className="bg-indigo-900 bg-opacity-70 p-4 rounded-lg border border-indigo-700">
              <h3 className="font-medium text-purple-300 mb-3 text-center">April 2025</h3>

              <div className="mb-4 grid grid-cols-7 gap-1 text-center">
                {weekdays.map((day) => (
                  <div key={day} className="py-1 text-blue-300 font-medium">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  if (!day) {
                    return <div key={`empty-${index}`} className="h-16 p-1"></div>
                  }

                  const dailyPhase = getDailyPhaseForDate(day)
                  const isMajorPhase = getMajorPhaseForDate(day) !== null
                  const isCurrentDay = isToday(day.toISOString())
                  const isSelected = isSelectedDate(day.toISOString())

                  return (
                    <div
                      key={day.toISOString()}
                      onClick={() => handleDateClick(day)}
                      className={`h-16 p-1 rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-purple-700 bg-opacity-70"
                          : isCurrentDay
                            ? "bg-indigo-700 bg-opacity-70"
                            : isMajorPhase
                              ? "bg-indigo-800 bg-opacity-70 hover:bg-indigo-700"
                              : "bg-indigo-900 bg-opacity-50 hover:bg-indigo-800"
                      } border ${isSelected ? "border-purple-500" : "border-indigo-700"}`}
                    >
                      <div className="text-right text-sm text-blue-300 mb-1">{day.getDate()}</div>
                      {dailyPhase && (
                        <div className="flex justify-center">
                          <div className="text-2xl" title={`${dailyPhase.phase} - ${dailyPhase.illumination}`}>
                            {getMoonPhaseIcon(dailyPhase.phase, dailyPhase.illumination)}
                          </div>
                        </div>
                      )}
                      {isMajorPhase && (
                        <div className="text-center text-xs text-purple-300 mt-1">
                          {getMajorPhaseForDate(day)?.phase}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <div className="flex items-center">
                  <span className="text-xl mr-1">🌑</span>
                  <span className="text-blue-200 text-sm">New Moon</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-1">🌓</span>
                  <span className="text-blue-200 text-sm">First Quarter</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-1">🌕</span>
                  <span className="text-blue-200 text-sm">Full Moon</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-1">🌗</span>
                  <span className="text-blue-200 text-sm">Last Quarter</span>
                </div>
              </div>
            </div>

            {/* Selected Phase Details */}
            {selectedPhase && (
              <div className="bg-indigo-900 bg-opacity-70 p-4 rounded-lg border border-indigo-700">
                <div className="flex items-center mb-3">
                  <span className="text-4xl mr-3">
                    {getMoonPhaseIcon(selectedPhase.phase, selectedPhase.illumination)}
                  </span>
                  <div>
                    <h3 className="font-medium text-xl text-purple-300">{selectedPhase.phase}</h3>
                    <p className="text-blue-200">
                      {formatDate(selectedPhase.date)}
                      {selectedPhase.time && ` at ${selectedPhase.time}`}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="mb-3">
                      <h4 className="font-medium text-blue-300 mb-1">Illumination</h4>
                      <p className="text-blue-100">{selectedPhase.illumination}</p>
                    </div>

                    <div className="mb-3">
                      <h4 className="font-medium text-blue-300 mb-1">Moon Sign</h4>
                      <p className="text-blue-100">{selectedPhase.sign}</p>
                    </div>

                    {selectedPhase.position && (selectedPhase.position.rising || selectedPhase.position.setting) && (
                      <div>
                        <h4 className="font-medium text-blue-300 mb-1">Moon Position</h4>
                        {selectedPhase.position.rising && (
                          <p className="text-blue-100">Rising: {selectedPhase.position.rising}</p>
                        )}
                        {selectedPhase.position.setting && (
                          <p className="text-blue-100">Setting: {selectedPhase.position.setting}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="mb-3">
                      <h4 className="font-medium text-blue-300 mb-1">Exact Time</h4>
                      {selectedPhase.gmtTime && <p className="text-blue-100">GMT: {selectedPhase.gmtTime}</p>}
                      {selectedPhase.localTime && <p className="text-blue-100">Local: {selectedPhase.localTime}</p>}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-blue-300 mb-1">Interpretation</h4>
                  <p className="text-blue-100">{selectedPhase.interpretation}</p>
                </div>

                {selectedPhase.recommendations && selectedPhase.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-medium text-blue-300 mb-1">Recommendations</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedPhase.recommendations.map((recommendation, index) => (
                        <li key={index} className="text-blue-100">
                          {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center py-8">
            <button
              onClick={fetchLunarData}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium"
            >
              Generate Lunar Phase Data
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LunarPhaseTracker
