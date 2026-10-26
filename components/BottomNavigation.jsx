"use client"

import { Moon, Sparkles, BookOpen, Home, User2, Brain } from "lucide-react"

const BottomNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-indigo-900/80 border-t border-indigo-700/50 backdrop-blur-lg">
      <div className="flex justify-around items-center h-16">
        <button
          className="flex flex-col items-center justify-center w-full h-full"
          onClick={() => setActiveTab("home")}
        >
          <div className={activeTab === "home" ? "text-purple-300" : "text-blue-300"}>
            <Home className="h-5 w-5" />
          </div>
          <span className={`text-xs mt-1 ${activeTab === "home" ? "text-purple-300" : "text-blue-300"}`}>Home</span>
        </button>

        <button
          className="flex flex-col items-center justify-center w-full h-full"
          onClick={() => setActiveTab("journal")}
        >
          <div className={activeTab === "journal" ? "text-purple-300" : "text-blue-300"}>
            <BookOpen className="h-5 w-5" />
          </div>
          <span className={`text-xs mt-1 ${activeTab === "journal" ? "text-purple-300" : "text-blue-300"}`}>
            Journal
          </span>
        </button>

        <button
          className="flex flex-col items-center justify-center w-full h-full"
          onClick={() => setActiveTab("quizzes")}
        >
          <div className={activeTab === "quizzes" ? "text-purple-300" : "text-blue-300"}>
            <Sparkles className="h-5 w-5" />
          </div>
          <span className={`text-xs mt-1 ${activeTab === "quizzes" ? "text-purple-300" : "text-blue-300"}`}>
            Quizzes
          </span>
        </button>

        <button
          className="flex flex-col items-center justify-center w-full h-full"
          onClick={() => setActiveTab("meditation")}
        >
          <div className={activeTab === "meditation" ? "text-purple-300" : "text-blue-300"}>
            <Brain className="h-5 w-5" />
          </div>
          <span className={`text-xs mt-1 ${activeTab === "meditation" ? "text-purple-300" : "text-blue-300"}`}>
            Meditate
          </span>
        </button>

        <button
          className="flex flex-col items-center justify-center w-full h-full"
          onClick={() => setActiveTab("lunar")}
        >
          <div className={activeTab === "lunar" ? "text-purple-300" : "text-blue-300"}>
            <Moon className="h-5 w-5" />
          </div>
          <span className={`text-xs mt-1 ${activeTab === "lunar" ? "text-purple-300" : "text-blue-300"}`}>Lunar</span>
        </button>

        <button
          className="flex flex-col items-center justify-center w-full h-full"
          onClick={() => setActiveTab("profile")}
        >
          <div className={activeTab === "profile" ? "text-purple-300" : "text-blue-300"}>
            <User2 className="h-5 w-5" />
          </div>
          <span className={`text-xs mt-1 ${activeTab === "profile" ? "text-purple-300" : "text-blue-300"}`}>
            Profile
          </span>
        </button>
      </div>
    </div>
  )
}

export default BottomNavigation
