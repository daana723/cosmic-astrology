"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { RefreshCw } from "lucide-react"
import TextToSpeech from "@/components/TextToSpeech"
import SocialShare from "@/components/SocialShare"

const DailyAffirmation = ({ user }) => {
  const [affirmation, setAffirmation] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Generate affirmation based on user's quiz results
  useEffect(() => {
    generateAffirmation()
  }, [user])

  const generateAffirmation = () => {
    setIsLoading(true)

    // Get user's primary archetype if available
    const archetype = user?.spiritualProfile?.archetypeResults?.primary || ""

    // Affirmations based on archetype
    const archetypeAffirmations = {
      visionary: [
        "I am a visionary who sees possibilities beyond the current reality.",
        "My creative vision brings new worlds into being.",
        "I trust my ability to see what others cannot yet perceive.",
        "My imagination is a powerful tool for transformation.",
        "I am a bridge between what is and what could be.",
      ],
      healer: [
        "My presence brings healing energy to all I encounter.",
        "I am a vessel for compassion and healing light.",
        "My empathy is a gift that helps others transform.",
        "I honor my sensitivity as a pathway to deeper healing.",
        "I balance giving to others with nurturing myself.",
      ],
      maverick: [
        "I courageously challenge outdated paradigms.",
        "My unique perspective creates positive change.",
        "I transform limitations into opportunities.",
        "I trust my inner guidance even when it defies convention.",
        "My authenticity inspires others to break free.",
      ],
      explorer: [
        "I embrace the journey of continuous discovery.",
        "Each experience expands my consciousness.",
        "I integrate wisdom from many sources into my unique path.",
        "My curiosity opens doorways to new dimensions of understanding.",
        "I navigate the unknown with courage and wonder.",
      ],
      // Default affirmations if no archetype is available
      default: [
        "I am aligned with my highest purpose and potential.",
        "Divine wisdom flows through me in perfect timing.",
        "I am connected to the infinite intelligence of the cosmos.",
        "My consciousness expands beyond previous limitations.",
        "I embrace both light and shadow as part of my wholeness.",
        "I am a being of light having a human experience.",
        "My energy field vibrates in harmony with universal love.",
        "I trust the unfolding of my spiritual journey.",
        "My intuition guides me to exactly where I need to be.",
        "I am a co-creator with the universe.",
      ],
    }

    // Select affirmations based on archetype or use default
    const affirmations = archetypeAffirmations[archetype] || archetypeAffirmations.default

    // Randomly select an affirmation
    const randomIndex = Math.floor(Math.random() * affirmations.length)

    // Simulate loading
    setTimeout(() => {
      setAffirmation(affirmations[randomIndex])
      setIsLoading(false)
    }, 600)
  }

  return (
    <Card className="bg-white border-purple-200 p-4 shadow-md">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-semibold text-gray-900">Daily Affirmation</h2>
        <div className="flex gap-2">
          {affirmation && !isLoading && (
            <>
              <TextToSpeech text={affirmation} />
              <SocialShare
                title="My Daily Affirmation"
                text={`"${affirmation}" - My affirmation from Cosmic Astrology 🌟`}
              />
            </>
          )}
          {/* </CHANGE> */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-purple-600 hover:text-purple-800 hover:bg-purple-100"
            onClick={generateAffirmation}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </div>

      <div className="min-h-[60px] flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
        {isLoading ? (
          <div className="animate-pulse h-4 bg-purple-200 rounded w-3/4 mx-auto"></div>
        ) : (
          <motion.p
            key={affirmation}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gray-900 text-center italic font-medium leading-relaxed"
          >
            "{affirmation}"
          </motion.p>
        )}
      </div>
    </Card>
  )
}

export default DailyAffirmation
