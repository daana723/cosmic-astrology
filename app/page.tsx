"use client"

import { useState, useEffect } from "react"
import Welcome from "@/components/Welcome"
import DreamInterpreter from "@/components/DreamInterpreter"
import Rituals from "@/components/Rituals"
import GrowthDashboard from "@/components/GrowthDashboard"
import DashboardHome from "@/components/dashboard/DashboardHome"
import CosmicEvents from "@/components/CosmicEvents"
import { Horoscope } from "@/components/Horoscope"
import { ProfileSection } from "@/components/profile/ProfileSection"
import QuizzesSection from "@/components/quizzes/QuizzesSection"
import CosmicInsightGenerator from "@/components/cosmic/CosmicInsightGenerator"
import DailyAffirmation from "@/components/cosmic/DailyAffirmation"

export default function CosmicJourneyApp() {
  const [isClient, setIsClient] = useState(false)
  const [userData, setUserData] = useState({
    name: "",
    sign: "",
    moonSign: "",
    risingSign: "",
    archetype: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null)
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const storedData = localStorage.getItem("userData")
    if (!storedData) {
      setShowWelcome(true)
      setIsLoading(false)
    } else {
      const parsed = JSON.parse(storedData)
      // Show welcome screen if name or archetype is missing
      if (!parsed.name || !parsed.archetype) {
        setShowWelcome(true)
        setIsLoading(false)
      } else {
        setUserData(parsed)
        setIsLoading(false)
      }
    }
  }, [])

  const handleWelcomeComplete = (name: string, archetype: string) => {
    const newUserData = {
      ...userData,
      name,
      archetype,
    }
    setUserData(newUserData)
    localStorage.setItem("userData", JSON.stringify(newUserData))
    setShowWelcome(false)
  }

  const HomeSection = () => <DashboardHome userData={userData} />

  const HoroscopeSection = () => <Horoscope userData={userData} />

  const PersonalInsightsSection = () => (
    <div className="space-y-6">
      <CosmicInsightGenerator user={userData} />
      <DailyAffirmation user={userData} />
    </div>
  )

  const AIGuideSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Spiritual Guide</h2>
        <p className="text-gray-700 mb-4">
          Connect with your cosmic guide for personalized spiritual insights and wisdom.
        </p>
      </div>
      <CosmicInsightGenerator user={userData} />
    </div>
  )

  if (showWelcome) {
    return <Welcome onComplete={handleWelcomeComplete} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-4">
        <header className="mb-8 text-center py-6">
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            <h1 className="text-4xl font-bold mb-2">Cosmic Astrology</h1>
          </div>
          <p className="text-gray-800 text-lg font-medium">Welcome, {userData.name || "Indigo Soul"}</p>
        </header>

        <nav className="mb-8 flex justify-center space-x-2 flex-wrap">
          {[
            { id: "home", label: "Home" },
            { id: "horoscope", label: "Horoscopes" },
            { id: "insights", label: "Personal Insights" },
            { id: "guide", label: "AI Guide" },
            { id: "events", label: "Cosmic Events" },
            { id: "dreams", label: "Dream Journal" },
            { id: "rituals", label: "Rituals" },
            { id: "growth", label: "Growth" },
            { id: "quizzes", label: "Quizzes" },
            { id: "profile", label: "Profile" },
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg mb-2 transition-all font-medium ${
                activeSection === section.id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-800 hover:bg-gray-50 border border-gray-200 shadow-sm"
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          {activeSection === "home" && <HomeSection />}
          {activeSection === "horoscope" && <HoroscopeSection />}
          {activeSection === "insights" && <PersonalInsightsSection />}
          {activeSection === "guide" && <AIGuideSection />}
          {activeSection === "events" && <CosmicEvents />}
          {activeSection === "dreams" && <DreamInterpreter />}
          {activeSection === "rituals" && <Rituals />}
          {activeSection === "growth" && <GrowthDashboard />}
          {activeSection === "quizzes" && <QuizzesSection onStartQuiz={setActiveQuiz} userData={userData} />}
          {activeSection === "profile" && <ProfileSection userData={userData} onUpdateData={setUserData} />}
        </div>
      </div>
    </div>
  )
}
