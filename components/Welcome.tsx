"use client"

import { useState } from "react"
import { Sparkles, Moon, Stars, Compass, ArrowRight } from "lucide-react"

interface WelcomeProps {
  onComplete: (name: string, archetype: string) => void
}

export default function Welcome({ onComplete }: WelcomeProps) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [selectedArchetype, setSelectedArchetype] = useState("")

  const archetypes = [
    {
      id: "visionary",
      name: "Visionary",
      icon: Sparkles,
      description: "You see possibilities others miss",
      color: "from-purple-500 to-indigo-600",
    },
    {
      id: "healer",
      name: "Healer",
      icon: Moon,
      description: "You bring comfort and transformation",
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: "maverick",
      name: "Maverick",
      icon: Stars,
      description: "You forge your own path",
      color: "from-orange-500 to-pink-600",
    },
    {
      id: "explorer",
      name: "Explorer",
      icon: Compass,
      description: "You seek truth and adventure",
      color: "from-green-500 to-teal-600",
    },
  ]

  const handleContinue = () => {
    if (step === 1 && name.trim()) {
      setStep(2)
    } else if (step === 2 && selectedArchetype) {
      onComplete(name, selectedArchetype)
    }
  }

  const handleQuickEntry = () => {
    // Set default data for quick entry
    onComplete("Cosmic Explorer", "explorer")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 cosmic-bg relative overflow-hidden">
      {/* Sacred Geometry Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <svg width="600" height="600" viewBox="0 0 600 600" className="animate-pulse">
          <defs>
            <linearGradient id="sacred-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {/* Flower of Life Pattern */}
          <circle cx="300" cy="300" r="80" fill="none" stroke="url(#sacred-gradient)" strokeWidth="2" />
          <circle cx="300" cy="220" r="80" fill="none" stroke="url(#sacred-gradient)" strokeWidth="2" />
          <circle cx="369.28" cy="260" r="80" fill="none" stroke="url(#sacred-gradient)" strokeWidth="2" />
          <circle cx="369.28" cy="340" r="80" fill="none" stroke="url(#sacred-gradient)" strokeWidth="2" />
          <circle cx="300" cy="380" r="80" fill="none" stroke="url(#sacred-gradient)" strokeWidth="2" />
          <circle cx="230.72" cy="340" r="80" fill="none" stroke="url(#sacred-gradient)" strokeWidth="2" />
          <circle cx="230.72" cy="260" r="80" fill="none" stroke="url(#sacred-gradient)" strokeWidth="2" />
          <circle
            cx="300"
            cy="300"
            r="160"
            fill="none"
            stroke="url(#sacred-gradient)"
            strokeWidth="1.5"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-2xl w-full relative z-10 text-center">
        {/* Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <Moon className="w-20 h-20 text-purple-300 animate-pulse" />
            <Sparkles className="w-8 h-8 text-blue-300 absolute -top-2 -right-2 animate-bounce" />
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
            Indigo Souls
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-xl text-blue-200 mb-2">Your journey of spiritual self-discovery begins here</p>
        <p className="text-purple-300 text-sm mb-8">Unlock cosmic wisdom tailored to your unique energy</p>

        {/* Enter Button */}
        <button
          onClick={handleQuickEntry}
          className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white text-lg font-semibold rounded-full shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
        >
          Enter the Cosmic Dashboard
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
