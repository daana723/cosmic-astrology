"use client"

import { useState, useEffect, useRef } from "react"
import { useUser } from "@/context/UserContext"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, Volume2 } from "lucide-react"
import { motion } from "framer-motion"

const GuidedMeditation = () => {
  const { user } = useUser()
  const [meditations, setMeditations] = useState([])
  const [selectedMeditation, setSelectedMeditation] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [showVolumeControl, setShowVolumeControl] = useState(false)
  const audioRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    // Generate meditations based on user profile
    generateMeditations()
  }, [user])

  useEffect(() => {
    // Cleanup animation frame on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const generateMeditations = () => {
    const archetype = user?.spiritualProfile?.archetypeResults?.primary || ""
    const shadowAreas = user?.spiritualProfile?.shadowWorkResults?.shadowAreas || []
    const primaryGift = user?.spiritualProfile?.spiritualGifts?.primaryGift || ""

    // Base meditations for everyone
    const baseMeditations = [
      {
        id: "cosmic-connection",
        title: "Cosmic Connection Meditation",
        description: "Connect with the universal consciousness and your higher self.",
        duration: "10:00",
        durationSeconds: 600,
        backgroundImage: "cosmic-nebula",
        frequency: "432 Hz",
        audioSrc: "", // In a real app, this would be a URL to an audio file
      },
      {
        id: "energy-cleansing",
        title: "Energy Field Cleansing",
        description: "Clear your energy field of accumulated stress and external influences.",
        duration: "8:00",
        durationSeconds: 480,
        backgroundImage: "light-rays",
        frequency: "528 Hz",
        audioSrc: "",
      },
    ]

    // Personalized meditations based on user profile
    const personalizedMeditations = []

    if (archetype === "visionary") {
      personalizedMeditations.push({
        id: "future-vision",
        title: "Future Vision Activation",
        description: "Enhance your ability to perceive future possibilities and potentials.",
        duration: "12:00",
        durationSeconds: 720,
        backgroundImage: "cosmic-portal",
        frequency: "852 Hz",
        audioSrc: "",
      })
    } else if (archetype === "healer") {
      personalizedMeditations.push({
        id: "healing-channel",
        title: "Healing Channel Activation",
        description: "Open and strengthen your healing channels to enhance your healing abilities.",
        duration: "15:00",
        durationSeconds: 900,
        backgroundImage: "healing-light",
        frequency: "639 Hz",
        audioSrc: "",
      })
    } else if (archetype === "maverick") {
      personalizedMeditations.push({
        id: "paradigm-shift",
        title: "Paradigm Shift Meditation",
        description: "Break through limiting beliefs and access revolutionary consciousness.",
        duration: "11:00",
        durationSeconds: 660,
        backgroundImage: "quantum-field",
        frequency: "741 Hz",
        audioSrc: "",
      })
    } else if (archetype === "explorer") {
      personalizedMeditations.push({
        id: "consciousness-expansion",
        title: "Consciousness Expansion Journey",
        description: "Explore new dimensions of awareness and integrate diverse wisdom.",
        duration: "14:00",
        durationSeconds: 840,
        backgroundImage: "cosmic-journey",
        frequency: "963 Hz",
        audioSrc: "",
      })
    }

    if (shadowAreas.includes("Suppressed Anger")) {
      personalizedMeditations.push({
        id: "anger-integration",
        title: "Anger Integration Practice",
        description: "Safely connect with and transmute suppressed anger into constructive energy.",
        duration: "9:00",
        durationSeconds: 540,
        backgroundImage: "fire-transformation",
        frequency: "396 Hz",
        audioSrc: "",
      })
    } else if (shadowAreas.includes("Unprocessed Grief")) {
      personalizedMeditations.push({
        id: "grief-release",
        title: "Grief Release Meditation",
        description: "Create sacred space to honor and release unprocessed grief.",
        duration: "13:00",
        durationSeconds: 780,
        backgroundImage: "ocean-waves",
        frequency: "417 Hz",
        audioSrc: "",
      })
    }

    if (primaryGift === "intuition") {
      personalizedMeditations.push({
        id: "intuition-enhancement",
        title: "Intuition Enhancement",
        description: "Strengthen your connection to your intuitive guidance system.",
        duration: "10:00",
        durationSeconds: 600,
        backgroundImage: "third-eye",
        frequency: "852 Hz",
        audioSrc: "",
      })
    } else if (primaryGift === "empathy") {
      personalizedMeditations.push({
        id: "empathic-balance",
        title: "Empathic Balance Meditation",
        description: "Maintain clear boundaries while accessing your empathic gifts.",
        duration: "12:00",
        durationSeconds: 720,
        backgroundImage: "heart-center",
        frequency: "639 Hz",
        audioSrc: "",
      })
    }

    // Combine all meditations
    setMeditations([...baseMeditations, ...personalizedMeditations])
  }

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const handlePlayPause = () => {
    if (!selectedMeditation) return

    if (isPlaying) {
      audioRef.current?.pause()
      cancelAnimationFrame(animationRef.current)
    } else {
      audioRef.current?.play()
      animationRef.current = requestAnimationFrame(updateProgress)
    }

    setIsPlaying(!isPlaying)
  }

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      animationRef.current = requestAnimationFrame(updateProgress)
    }
  }

  const handleTimeUpdate = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = e[0]
      setCurrentTime(e[0])
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = e[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleMeditationSelect = (meditation) => {
    setSelectedMeditation(meditation)
    setIsPlaying(false)
    setCurrentTime(0)

    // In a real app, we would load the audio file here
    // For now, we'll simulate it
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = volume
        setDuration(meditation.durationSeconds)
      }
    }, 100)
  }

  const handleReset = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)

      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }

  const getBackgroundStyle = (backgroundImage) => {
    // In a real app, these would be actual image URLs
    const backgrounds = {
      "cosmic-nebula": "bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900",
      "light-rays": "bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900",
      "cosmic-portal": "bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-900",
      "healing-light": "bg-gradient-to-br from-purple-900 via-blue-800 to-purple-900",
      "quantum-field": "bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900",
      "cosmic-journey": "bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900",
      "fire-transformation": "bg-gradient-to-br from-orange-900 via-red-800 to-purple-900",
      "ocean-waves": "bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900",
      "third-eye": "bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900",
      "heart-center": "bg-gradient-to-br from-pink-900 via-purple-800 to-indigo-900",
    }

    return backgrounds[backgroundImage] || backgrounds["cosmic-nebula"]
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-300">Guided Meditations</h1>
      </div>

      {selectedMeditation && (
        <Card
          className={`p-0 overflow-hidden border-indigo-700 ${getBackgroundStyle(selectedMeditation.backgroundImage)}`}
        >
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-1">{selectedMeditation.title}</h2>
            <p className="text-blue-200 mb-4">{selectedMeditation.description}</p>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-blue-200 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <Slider
                value={[currentTime]}
                min={0}
                max={duration}
                step={1}
                onValueChange={handleTimeUpdate}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleReset}
                  className="h-10 w-10 rounded-full border-blue-400 text-blue-400 hover:bg-blue-900/30"
                >
                  <SkipBack className="h-5 w-5" />
                  <span className="sr-only">Restart</span>
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePlayPause}
                  className="h-14 w-14 rounded-full border-purple-400 text-purple-400 hover:bg-purple-900/30"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                  <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
                </Button>
              </div>

              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowVolumeControl(!showVolumeControl)}
                  className="h-10 w-10 rounded-full text-blue-400 hover:bg-blue-900/30"
                >
                  <Volume2 className="h-5 w-5" />
                  <span className="sr-only">Volume</span>
                </Button>

                {showVolumeControl && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 bottom-12 bg-indigo-900 p-4 rounded-lg border border-indigo-700 w-40"
                  >
                    <Slider
                      value={[volume]}
                      min={0}
                      max={1}
                      step={0.01}
                      onValueChange={handleVolumeChange}
                      className="w-full"
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Audio element (hidden) */}
          <audio
            ref={audioRef}
            src={selectedMeditation.audioSrc}
            onEnded={() => setIsPlaying(false)}
            onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
            onLoadedMetadata={() => setDuration(audioRef.current?.duration || selectedMeditation.durationSeconds)}
          />
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meditations.map((meditation) => (
          <Card key={meditation.id} className="bg-indigo-900 bg-opacity-70 border-indigo-700 overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-medium text-purple-300">{meditation.title}</h2>
                  <p className="text-blue-200 text-xs">{meditation.duration}</p>
                </div>
                <Button
                  onClick={() => handleMeditationSelect(meditation)}
                  className="h-8 w-8 p-0 rounded-full bg-purple-600 hover:bg-purple-700"
                >
                  <Play size={16} />
                </Button>
              </div>
              <p className="text-blue-200 text-sm mt-2">{meditation.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default GuidedMeditation
