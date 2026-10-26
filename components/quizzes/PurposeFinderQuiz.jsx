"use client"

import { useState } from "react"
import { useUser } from "@/context/UserContext"

const PurposeFinderQuiz = ({ onComplete }) => {
  const { updateUser } = useUser()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState(null)

  const questions = [
    {
      id: "p1",
      text: "Which activities make you lose track of time because you're so absorbed in them?",
      options: [
        "Creating or appreciating art, music, or beauty",
        "Helping others heal or grow",
        "Learning, researching, or analyzing information",
        "Building, organizing, or improving systems",
        "Connecting with or leading others",
      ],
    },
    {
      id: "p2",
      text: "What do others consistently recognize or appreciate about you?",
      options: [
        "Your creativity and imagination",
        "Your compassion and supportiveness",
        "Your intelligence and insight",
        "Your reliability and problem-solving abilities",
        "Your charisma and leadership",
      ],
    },
    {
      id: "p3",
      text: "Which of these values is most important to you?",
      options: [
        "Beauty and harmony",
        "Compassion and connection",
        "Truth and wisdom",
        "Order and excellence",
        "Freedom and authenticity",
      ],
    },
    {
      id: "p4",
      text: "What type of injustice or suffering in the world most deeply affects you?",
      options: [
        "Lack of beauty, creativity, or cultural expression",
        "Emotional suffering and disconnection",
        "Ignorance and misinformation",
        "Inefficiency and waste",
        "Oppression and limitation of potential",
      ],
    },
    {
      id: "p5",
      text: "If you could leave any legacy, what would it be?",
      options: [
        "Creating beauty that inspires others",
        "Helping others heal and connect more deeply",
        "Expanding knowledge and consciousness",
        "Building systems that improve lives",
        "Empowering others to reach their potential",
      ],
    },
  ]

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleOptionSelect = (optionIndex) => {
    // Save the response
    setResponses({
      ...responses,
      [currentQuestion.id]: optionIndex,
    })

    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Calculate results
      calculateResults()
    }
  }

  const calculateResults = () => {
    // Count responses for each purpose category
    const counts = [0, 0, 0, 0, 0]

    Object.values(responses).forEach((optionIndex) => {
      counts[optionIndex]++
    })

    // Find the highest scoring purpose
    const maxCount = Math.max(...counts)
    const primaryPurposeIndex = counts.indexOf(maxCount)

    // Find the second highest scoring purpose
    counts[primaryPurposeIndex] = -1 // Remove the primary purpose
    const secondaryPurposeIndex = counts.indexOf(Math.max(...counts))

    const purposeTypes = [
      {
        name: "The Creator",
        description:
          "Your cosmic purpose centers around bringing beauty, inspiration, and creative expression into the world. You're here to manifest divine creativity and help others connect with the aesthetic and artistic dimensions of existence.",
        gifts: ["Artistic expression", "Aesthetic sensitivity", "Imagination", "Innovation"],
        practices: [
          "Regular creative rituals",
          "Artistic meditation",
          "Beauty appreciation practices",
          "Creative collaboration",
        ],
      },
      {
        name: "The Healer",
        description:
          "Your cosmic purpose revolves around fostering healing, connection, and emotional wholeness. You're here to help others process their wounds, connect with their hearts, and experience deeper levels of love and compassion.",
        gifts: ["Empathy", "Compassion", "Emotional intelligence", "Nurturing presence"],
        practices: [
          "Energy healing modalities",
          "Heart-centered meditation",
          "Compassionate listening",
          "Self-care rituals",
        ],
      },
      {
        name: "The Teacher",
        description:
          "Your cosmic purpose involves expanding consciousness through knowledge, wisdom, and insight. You're here to help others understand deeper truths, develop their minds, and see beyond limited perspectives.",
        gifts: ["Clear communication", "Analytical thinking", "Wisdom integration", "Pattern recognition"],
        practices: ["Knowledge sharing", "Contemplative study", "Teaching and mentoring", "Truth-seeking meditation"],
      },
      {
        name: "The Builder",
        description:
          "Your cosmic purpose centers around creating systems, structures, and solutions that improve life on Earth. You're here to manifest practical changes that bring greater order, efficiency, and functionality to our world.",
        gifts: [
          "Practical problem-solving",
          "Organizational skills",
          "Attention to detail",
          "Implementation abilities",
        ],
        practices: [
          "Systems thinking",
          "Strategic planning",
          "Incremental improvement processes",
          "Manifestation techniques",
        ],
      },
      {
        name: "The Catalyst",
        description:
          "Your cosmic purpose involves inspiring, empowering, and activating others to reach their potential. You're here to spark transformation, lead movements, and help others break free from limitations.",
        gifts: ["Inspirational presence", "Leadership abilities", "Motivational energy", "Vision casting"],
        practices: ["Visioning exercises", "Leadership development", "Community building", "Transformational coaching"],
      },
    ]

    const results = {
      primaryPurpose: purposeTypes[primaryPurposeIndex],
      secondaryPurpose: purposeTypes[secondaryPurposeIndex],
      purposeStatement: `I am here to ${getPurposeVerb(primaryPurposeIndex)} through ${getPurposeMethod(secondaryPurposeIndex)}.`,
      timestamp: new Date().toISOString(),
    }

    setResults(results)
    setShowResults(true)

    // Update user context with results
    updateUser({
      spiritualProfile: {
        purposeResults: results,
      },
    })
  }

  const getPurposeVerb = (index) => {
    const verbs = [
      "create beauty and inspiration",
      "foster healing and connection",
      "expand consciousness and wisdom",
      "build systems and solutions",
      "catalyze transformation and empowerment",
    ]
    return verbs[index]
  }

  const getPurposeMethod = (index) => {
    const methods = [
      "creative expression and aesthetic awareness",
      "compassion and emotional intelligence",
      "teaching and sharing wisdom",
      "practical implementation and organization",
      "leadership and inspirational presence",
    ]
    return methods[index]
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-indigo-900 bg-opacity-70 border border-indigo-700 rounded-lg p-8">
        {!showResults ? (
          <>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-purple-300">Cosmic Purpose Finder</h2>
                <span className="text-blue-200 text-sm">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
              <div className="h-2 bg-indigo-800 rounded-full">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg text-white mb-4">{currentQuestion.text}</h3>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className="w-full text-left p-3 bg-indigo-800 hover:bg-indigo-700 rounded-lg border border-indigo-600 transition-colors"
                  >
                    <span className="text-blue-200">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-purple-300 mb-2">Your Cosmic Purpose</h2>
              <p className="text-blue-200">Illuminating your unique contribution to the universe</p>
            </div>

            <div className="bg-indigo-900 p-6 rounded-lg border border-indigo-700 mb-6">
              <div className="mb-4">
                <div className="h-24 w-24 rounded-full bg-indigo-800 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">⭐</span>
                </div>
                <h3 className="text-xl font-medium text-purple-300 mb-2">Primary Purpose Archetype</h3>
                <h4 className="text-lg font-bold text-blue-300 mb-3">{results.primaryPurpose.name}</h4>
                <p className="text-blue-200 mb-6">{results.primaryPurpose.description}</p>

                <h3 className="text-xl font-medium text-purple-300 mb-2">Secondary Purpose Archetype</h3>
                <h4 className="text-lg font-bold text-blue-300 mb-3">{results.secondaryPurpose.name}</h4>
                <p className="text-blue-200 mb-6">{results.secondaryPurpose.description}</p>

                <h3 className="text-xl font-medium text-purple-300 mb-2">Your Purpose Statement</h3>
                <div className="bg-indigo-800/50 p-4 rounded-lg border border-indigo-700 mb-6">
                  <p className="text-blue-200 italic">{results.purposeStatement}</p>
                </div>

                <h3 className="text-xl font-medium text-purple-300 mb-2">Your Cosmic Gifts</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {results.primaryPurpose.gifts.map((gift, index) => (
                    <span key={index} className="bg-purple-800/50 px-3 py-1 rounded-full text-blue-200 text-sm">
                      {gift}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-medium text-purple-300 mb-2">Recommended Practices</h3>
                <div className="space-y-2 text-left">
                  {results.primaryPurpose.practices.map((practice, index) => (
                    <p key={index} className="text-blue-200">
                      • {practice}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={onComplete} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PurposeFinderQuiz
