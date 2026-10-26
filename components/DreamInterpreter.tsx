"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Moon, Sparkles, BookOpen, Save } from "lucide-react"
import TextToSpeech from "@/components/TextToSpeech"
import SocialShare from "@/components/SocialShare"

interface Dream {
  id: string
  date: string
  dream: string
  interpretation: string
}

export default function DreamInterpreter() {
  const [dream, setDream] = useState("")
  const [interpretation, setInterpretation] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [savedDreams, setSavedDreams] = useState<Dream[]>([])
  const [showHistory, setShowHistory] = useState(false)

  const analyzeDream = async () => {
    if (!dream.trim()) return

    setIsAnalyzing(true)
    try {
      const userData = JSON.parse(localStorage.getItem("cosmicUserData") || "{}")

      const response = await fetch("/api/dream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dream, userData }),
      })

      const data = await response.json()

      if (data.interpretation) {
        setInterpretation(data.interpretation)
      } else if (data.error) {
        // Fallback interpretation
        setInterpretation(generateFallbackInterpretation(dream, userData))
      }
    } catch (error) {
      console.error("Dream analysis error:", error)
      const userData = JSON.parse(localStorage.getItem("cosmicUserData") || "{}")
      setInterpretation(generateFallbackInterpretation(dream, userData))
    } finally {
      setIsAnalyzing(false)
    }
  }

  const generateFallbackInterpretation = (dreamText: string, userData: any) => {
    const sign = userData.sign || "cosmic traveler"
    return `As a ${sign}, your dream reveals deep insights into your subconscious mind. The symbols and emotions in your dream connect to your current life journey and spiritual evolution. Consider how these dream elements relate to your waking life experiences and the cosmic energies influencing you right now. Your intuition is guiding you toward important realizations.`
  }

  const saveDream = () => {
    if (!dream || !interpretation) return

    const newDream: Dream = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      dream,
      interpretation,
    }

    const updated = [newDream, ...savedDreams]
    setSavedDreams(updated)
    localStorage.setItem("dreamJournal", JSON.stringify(updated))

    // Reset form
    setDream("")
    setInterpretation("")
  }

  // Load saved dreams on mount
  useState(() => {
    const saved = localStorage.getItem("dreamJournal")
    if (saved) {
      setSavedDreams(JSON.parse(saved))
    }
  })

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Moon className="w-12 h-12 text-purple-600" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          AI Dream Interpreter
        </h2>
        <p className="text-gray-600">Unlock the mysteries of your subconscious mind with personalized dream analysis</p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-purple-200">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Describe Your Dream</label>
            <Textarea
              value={dream}
              onChange={(e) => setDream(e.target.value)}
              placeholder="I was walking through a forest when I saw a golden door..."
              className="min-h-32 bg-white/80 backdrop-blur-sm"
              disabled={isAnalyzing}
            />
          </div>

          <Button
            onClick={analyzeDream}
            disabled={!dream.trim() || isAnalyzing}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Your Dream...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Interpret Dream
              </>
            )}
          </Button>
        </div>
      </Card>

      {interpretation && (
        <Card className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-indigo-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                Your Dream Interpretation
              </h3>
              <div className="flex gap-2">
                <TextToSpeech text={interpretation} />
                <SocialShare
                  title="My Dream Interpretation"
                  text="Check out my dream interpretation from Cosmic Astrology! 🌙✨"
                />
                {/* End of additions */}
                <Button
                  onClick={saveDream}
                  variant="outline"
                  size="sm"
                  className="text-purple-600 border-purple-300 bg-transparent"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save to Journal
                </Button>
              </div>
            </div>
            <div className="prose prose-purple max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{interpretation}</p>
            </div>
          </div>
        </Card>
      )}

      {savedDreams.length > 0 && (
        <div className="space-y-4">
          <Button
            onClick={() => setShowHistory(!showHistory)}
            variant="outline"
            className="w-full border-purple-300 text-purple-600 hover:bg-purple-50"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            {showHistory ? "Hide" : "View"} Dream Journal ({savedDreams.length})
          </Button>

          {showHistory && (
            <div className="space-y-4">
              {savedDreams.map((savedDream) => (
                <Card key={savedDream.id} className="p-4 bg-white/70 backdrop-blur-sm border-purple-100">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{savedDream.date}</span>
                    </div>
                    <p className="text-sm text-gray-700 italic">"{savedDream.dream.substring(0, 150)}..."</p>
                    <details className="text-sm">
                      <summary className="cursor-pointer text-purple-600 font-medium">View Interpretation</summary>
                      <p className="mt-2 text-gray-600">{savedDream.interpretation}</p>
                    </details>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
