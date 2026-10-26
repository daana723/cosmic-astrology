"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sparkles, Flame, Heart, Briefcase, Smile, Save } from "lucide-react"
import TextToSpeech from "@/components/TextToSpeech"
import SocialShare from "@/components/SocialShare"

const INTENTIONS = [
  { id: "love", label: "Love & Relationships", icon: Heart },
  { id: "career", label: "Career & Success", icon: Briefcase },
  { id: "healing", label: "Healing & Peace", icon: Smile },
  { id: "manifestation", label: "Manifestation", icon: Sparkles },
]

const MOON_PHASES = [
  "New Moon",
  "Waxing Crescent",
  "First Quarter",
  "Waxing Gibbous",
  "Full Moon",
  "Waning Gibbous",
  "Last Quarter",
  "Waning Crescent",
]

export default function Rituals() {
  const [customIntention, setCustomIntention] = useState("")
  const [selectedIntention, setSelectedIntention] = useState("")
  const [moonPhase, setMoonPhase] = useState("Full Moon")
  const [ritual, setRitual] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [savedRituals, setSavedRituals] = useState<any[]>([])

  const generateRitual = async (intention: string) => {
    setIsGenerating(true)
    setSelectedIntention(intention)

    try {
      const userData = JSON.parse(localStorage.getItem("cosmicUserData") || "{}")

      const response = await fetch("/api/ritual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intention,
          userData,
          moonPhase,
        }),
      })

      const data = await response.json()

      if (data.ritual) {
        setRitual(data.ritual)
      } else if (data.error) {
        setRitual(generateFallbackRitual(intention, userData, moonPhase))
      }
    } catch (error) {
      console.error("Ritual generation error:", error)
      const userData = JSON.parse(localStorage.getItem("cosmicUserData") || "{}")
      setRitual(generateFallbackRitual(intention, userData, moonPhase))
    } finally {
      setIsGenerating(false)
    }
  }

  const generateFallbackRitual = (intention: string, userData: any, phase: string) => {
    return `🌙 Personalized ${intention} Ritual for ${userData.sign || "You"}

**Moon Phase:** ${phase}

**Materials Needed:**
- White or purple candle
- Crystals aligned with your intention
- Incense (lavender or sandalwood)
- Journal and pen
- Comfortable meditation space

**Step-by-Step Instructions:**

1. **Prepare Your Space** (5 minutes)
   - Cleanse your space with incense
   - Arrange your crystals in a circle
   - Light your candle

2. **Ground Yourself** (5 minutes)
   - Sit comfortably and close your eyes
   - Take 10 deep breaths
   - Visualize roots growing from your body into the earth

3. **Set Your Intention** (10 minutes)
   - Write your intention clearly in your journal
   - Speak it aloud three times
   - Feel the emotion of already having it

4. **Meditation & Visualization** (15 minutes)
   - Hold your crystals
   - Visualize your intention manifesting
   - Feel gratitude for what's coming

5. **Closing** (5 minutes)
   - Thank the universe and your guides
   - Blow out the candle
   - Keep your journal nearby to track signs

**Affirmations:**
"I am aligned with my highest purpose."
"The universe supports my ${intention}."
"I am open to receiving abundance."

**Best Timing:**
Perform during ${phase} for maximum potency. Repeat for 3-7 consecutive days.`
  }

  const saveRitual = () => {
    if (!ritual) return

    const newRitual = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      intention: selectedIntention,
      moonPhase,
      ritual,
    }

    const updated = [newRitual, ...savedRituals]
    setSavedRituals(updated)
    localStorage.setItem("savedRituals", JSON.stringify(updated))
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-orange-50/50 via-purple-50/50 to-pink-50/50 p-6 rounded-xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Flame className="w-12 h-12 text-orange-500" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          AI-Generated Personalized Rituals
        </h2>
        <p className="text-gray-600">Create sacred practices aligned with your cosmic energy and intentions</p>
      </div>

      <Card className="p-6 bg-white border-orange-200 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Current Moon Phase</label>
            <select
              value={moonPhase}
              onChange={(e) => setMoonPhase(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-purple-200 bg-white/80 backdrop-blur-sm"
            >
              {MOON_PHASES.map((phase) => (
                <option key={phase} value={phase}>
                  {phase}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Choose Your Intention</label>
            <div className="grid grid-cols-2 gap-3">
              {INTENTIONS.map((intent) => {
                const Icon = intent.icon
                return (
                  <Button
                    key={intent.id}
                    onClick={() => generateRitual(intent.label)}
                    disabled={isGenerating}
                    variant="outline"
                    className="h-auto py-4 flex-col gap-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50"
                  >
                    <Icon className="w-6 h-6 text-purple-600" />
                    <span className="text-sm">{intent.label}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Or Create Custom Intention</label>
            <div className="flex gap-2">
              <Input
                value={customIntention}
                onChange={(e) => setCustomIntention(e.target.value)}
                placeholder="e.g., Finding my purpose"
                className="bg-white/80 backdrop-blur-sm"
              />
              <Button
                onClick={() => {
                  if (customIntention.trim()) {
                    generateRitual(customIntention)
                  }
                }}
                disabled={!customIntention.trim() || isGenerating}
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                Generate
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {isGenerating && (
        <Card className="p-8 bg-white border-purple-200 shadow-sm">
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-700 font-medium">Creating your personalized ritual...</p>
          </div>
        </Card>
      )}

      {ritual && !isGenerating && (
        <Card className="p-6 bg-white border-purple-200 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <Flame className="w-5 h-5 mr-2 text-orange-500" />
                Your Sacred Ritual
              </h3>
              <div className="flex gap-2">
                <TextToSpeech text={ritual} />
                <SocialShare
                  title="My Personalized Ritual"
                  text="I created a personalized spiritual ritual with Cosmic Astrology! 🔥✨"
                />
                <Button
                  onClick={saveRitual}
                  variant="outline"
                  size="sm"
                  className="text-purple-600 border-purple-300 bg-transparent"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Ritual
                </Button>
              </div>
            </div>
            <div className="prose prose-purple max-w-none">
              <pre className="whitespace-pre-wrap text-gray-700 font-sans text-sm leading-relaxed">{ritual}</pre>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
