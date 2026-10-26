"use client"

import { useState } from "react"
import { useUser } from "@/context/UserContext"
import BottomNavigation from "./navigation/BottomNavigation"
import QuizzesSection from "./quizzes/QuizzesSection"
import EnhancedDashboard from "./dashboard/EnhancedDashboard"
import EnhancedJournal from "./journal/EnhancedJournal"
import ProfileSection from "./profile/ProfileSection"
import GuidedMeditation from "./meditation/GuidedMeditation"
import LunarPhaseTracker from "./LunarPhaseTracker"

const Dashboard = () => {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState("home")

  // Mock data for LunarPhaseTracker
  const mockAstrologyData = {
    sunSign:
      user?.spiritualProfile?.archetypeResults?.primary === "visionary"
        ? "Aquarius"
        : user?.spiritualProfile?.archetypeResults?.primary === "healer"
          ? "Pisces"
          : user?.spiritualProfile?.archetypeResults?.primary === "maverick"
            ? "Aries"
            : user?.spiritualProfile?.archetypeResults?.primary === "explorer"
              ? "Sagittarius"
              : "Taurus",
    moonSign: "Cancer",
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow p-4 pb-20">
        {activeTab === "home" && <EnhancedDashboard />}
        {activeTab === "journal" && <EnhancedJournal />}
        {activeTab === "quizzes" && <QuizzesSection />}
        {activeTab === "profile" && <ProfileSection />}
        {activeTab === "meditation" && <GuidedMeditation />}
        {activeTab === "lunar" && <LunarPhaseTracker astrologyData={mockAstrologyData} />}
      </div>

      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default Dashboard
