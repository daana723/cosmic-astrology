"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import TextToSpeech from "@/components/TextToSpeech"
import SocialShare from "@/components/SocialShare"

const CosmicInsightGenerator = ({ user }) => {
  const [insight, setInsight] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showInsight, setShowInsight] = useState(false)

  const generateInsight = () => {
    setIsGenerating(true)
    setShowInsight(false)

    // Get user profile data to personalize insights
    const archetype = user?.spiritualProfile?.archetypeResults?.primary || ""
    const shadowAreas = user?.spiritualProfile?.shadowWorkResults?.shadowAreas || []
    const primaryGift = user?.spiritualProfile?.spiritualGifts?.primaryGift || ""

    // Base insights that work for anyone
    const baseInsights = [
      "The universe speaks to you through synchronicities. Pay attention to repeating patterns today.",
      "Your consciousness creates your reality. Focus on what you wish to manifest.",
      "The present moment is your point of power. Center yourself in the now.",
      "Your spiritual growth follows a spiral path, revisiting lessons with deeper understanding each time.",
      "Balance your cosmic awareness with grounded action for optimal manifestation.",
    ]

    // Personalized insights based on user's quiz results
    const personalizedInsights = []

    if (archetype === "visionary") {
      personalizedInsights.push(
        "Your visionary nature sees beyond current limitations. Trust the future you perceive.",
        "Balance your forward-looking perspective with appreciation of the present moment.",
        "Your creative imagination is a powerful tool for manifesting new realities.",
      )
    } else if (archetype === "healer") {
      personalizedInsights.push(
        "Your healing energy flows most freely when you've attended to your own needs first.",
        "Notice where you might be absorbing others' energies and practice healthy boundaries.",
        "Your compassion is a gift, but remember that others must walk their own healing path.",
      )
    } else if (archetype === "maverick") {
      personalizedInsights.push(
        "Your revolutionary spirit serves the evolution of consciousness. Trust your unique path.",
        "The resistance you encounter is often a sign you're challenging necessary paradigms.",
        "Balance your desire for change with patience for those who aren't ready for transformation.",
      )
    } else if (archetype === "explorer") {
      personalizedInsights.push(
        "Your journey through diverse spiritual territories enriches your unique wisdom.",
        "Integration is as important as exploration. Take time to synthesize your discoveries.",
        "The connections you see between different wisdom traditions offer valuable insights to others.",
      )
    }

    if (shadowAreas.includes("Suppressed Anger")) {
      personalizedInsights.push(
        "Notice where anger arises today and welcome it as information rather than pushing it away.",
        "Your anger often masks deeper needs. Ask yourself what you truly need when irritation surfaces.",
      )
    } else if (shadowAreas.includes("Unprocessed Grief")) {
      personalizedInsights.push(
        "Allow space for sadness without judgment. It carries wisdom about what you value.",
        "Small rituals of release can help process grief that's been stored in your energy field.",
      )
    }

    if (primaryGift === "intuition") {
      personalizedInsights.push(
        "Your intuitive insights deserve your attention. Note them down before the logical mind dismisses them.",
        "Practice distinguishing between intuition and fear by noticing which feels expansive versus contractive.",
      )
    } else if (primaryGift === "empathy") {
      personalizedInsights.push(
        "Your empathic nature perceives subtle energies. Regular energy clearing helps maintain clarity.",
        "Notice the difference between empathy (feeling with others) and taking on their emotions as your own.",
      )
    }

    // Combine base and personalized insights
    const allInsights = [...baseInsights, ...personalizedInsights]

    // Randomly select an insight
    const randomIndex = Math.floor(Math.random() * allInsights.length)

    // Simulate API call delay
    setTimeout(() => {
      setInsight(allInsights[randomIndex])
      setIsGenerating(false)
      setShowInsight(true)
    }, 1500)
  }

  return (
    <Card className="bg-white border-purple-200 p-4 shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Cosmic Insight</h2>

      {!showInsight ? (
        <div className="text-center py-4">
          <p className="text-gray-700 mb-4 font-medium">
            Receive a personalized cosmic insight based on your spiritual profile.
          </p>
          <Button
            onClick={generateInsight}
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            {isGenerating ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                Connecting to cosmic wisdom...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Insight
              </>
            )}
          </Button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200"
        >
          <div className="flex">
            <div className="mr-3 text-2xl">✨</div>
            <p className="text-gray-900 font-medium leading-relaxed">{insight}</p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              <TextToSpeech text={insight} />
              <SocialShare title="My Cosmic Insight" text={`"${insight}" - From Cosmic Astrology ✨`} />
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowInsight(false)}
                className="text-gray-700 hover:text-gray-900 hover:bg-purple-100"
              >
                Close
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={generateInsight}
                className="border-purple-500 text-purple-700 hover:bg-purple-50 font-medium bg-transparent"
              >
                New Insight
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </Card>
  )
}

export default CosmicInsightGenerator
