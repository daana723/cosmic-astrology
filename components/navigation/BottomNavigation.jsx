"use client"

import { Home, BookOpen, ListChecks, User, Moon, Headphones } from "lucide-react"

const BottomNavigation = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "journal", label: "Journal", icon: BookOpen },
    { id: "quizzes", label: "Quizzes", icon: ListChecks },
    { id: "meditation", label: "Meditate", icon: Headphones },
    { id: "lunar", label: "Lunar", icon: Moon },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-indigo-950 border-t border-indigo-900 p-2 z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg ${
                activeTab === item.id
                  ? "text-purple-400 bg-indigo-900 bg-opacity-50"
                  : "text-blue-300 hover:text-purple-300"
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavigation
