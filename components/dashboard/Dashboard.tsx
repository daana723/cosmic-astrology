"use client"

import { useState } from "react"
import DashboardHome from "./DashboardHome"
import BottomNavigation from "@/components/navigation/BottomNavigation"
import JournalSection from "@/components/journal/JournalSection"
import ProfileSection from "@/components/profile/ProfileSection"

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow p-4 pb-20">
        {activeTab === "home" && <DashboardHome />}
        {activeTab === "journal" && <JournalSection />}
        {activeTab === "profile" && <ProfileSection />}
      </div>

      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default Dashboard
