"use client"

import { useState } from "react"
import { useUser } from "@/context/UserContext"

const GiftsAssessmentQuiz = ({ onComplete }) => {
  const { updateUser } = useUser()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState(null)

  const questions = [
    {
      id: "g1",
      text: "How often do you receive intuitive insights that later prove accurate?",
      options: ["Very frequently", "Often", "Sometimes", "Rarely", "Almost never"],
    },
    {
      id: "g2",
      text: "How easily can you sense the emotions of others, even when they try to hide them?",
      options: ["Extremely easily", "Quite easily", "Moderately", "With some difficulty", "Very difficult"],
    },
    {
      id: "g3",
      text: "How often do you experience meaningful synchronicities or 'signs' from the universe?",
      options: ["Daily", "Several times a week", "A few times a month", "Rarely", "Almost never"],
    },
    {
      id: "g4",
      text: "How strongly can you sense the energy of places or objects?",
      options: ["Very strongly", "Quite strongly", "Moderately", "Slightly", "Not at all"],
    },
    {
      id: "g5",
      text: "How often do your dreams contain symbolic guidance or precognitive elements?",
      options: ["Very frequently", "Often", "Sometimes", "Rarely", "Almost never"],
    },
  ]

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleOptionSelect = (optionIndex) => {
    // Save the response (reverse score since 0 is "Very frequently" and should be highest)
    setResponses({
      ...responses,
      [currentQuestion.id]: 4 - optionIndex, // Convert to 4, 3, 2, 1, 0 where 4 is highest
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
    // Calculate scores for each gift category
    const giftScores = {
      intuition: (responses.g1 + responses.g3 + responses.g5) / 3, // Average of questions 1, 3, 5
      empathy: (responses.g2 + responses.g4) / 2, // Average of questions 2, 4
      manifestation: responses.g3, // Just from question 3 for simplicity
      healing: responses.g4, // Just from question 4 for simplicity
      communication: (responses.g1 + responses.g2) / 2, // Average of questions 1, 2
    }

    // Convert scores to percentages (0-4 scale to 0-100%)
    Object.keys(giftScores).forEach((key) => {
      giftScores[key] = Math.round((giftScores[key] / 4) * 100)
    })

    // Sort gifts by score to find strongest
    const sortedGifts = Object.entries(giftScores)
      .sort((a, b) => b[1] - a[1])
      .map((entry) => entry[0])

    const giftDescriptions = {
      intuition:
        "Your intuitive abilities allow you to receive insights, guidance, and information beyond the five senses. You have a natural connection to higher wisdom and can access knowledge that transcends logical understanding.",
      empathy:
        "Your empathic gifts enable you to sense, feel, and understand the emotions and energies of others. This allows you to connect deeply with people and provide meaningful support and understanding.",
      manifestation:
        "Your manifestation abilities help you bring your intentions into physical reality. You have a natural talent for aligning your energy with your desires and creating tangible results.",
      healing:
        "Your healing gifts allow you to channel and direct energy for the benefit of yourself and others. You can help restore balance, release blockages, and facilitate wholeness on multiple levels.",
      communication:
        "Your communication gifts enable you to express spiritual concepts clearly and connect with others authentically. You can bridge different perspectives and help others understand complex ideas.",
    }

    const giftPractices = {
      intuition: [
        "Daily meditation to quiet the mind and enhance receptivity",
        "Intuitive journaling to record insights and track accuracy",
        "Working with divination tools like tarot or oracle cards",
        "Practicing remote viewing or psychic development exercises",
      ],
      empathy: [
        "Energy shielding and grounding practices",
        "Compassion meditation to strengthen healthy empathic connections",
        "Regular energy clearing to release absorbed emotions",
        "Boundary-setting exercises to prevent empathic overwhelm",
      ],
      manifestation: [
        "Vision boarding and visual manifestation practices",
        "Energy alignment meditation focused on desired outcomes",
        "Gratitude journaling to enhance manifestation power",
        "Quantum field programming through visualization",
      ],
      healing: [
        "Energy channeling meditation",
        "Study of energy healing modalities like Reiki",
        "Self-healing practices to strengthen your healing channel",
        "Working with healing crystals or sound frequencies",
      ],
      communication: [
        "Channeled writing or speaking practices",
        "Study of spiritual communication methods",
        "Teaching or sharing your knowledge with others",
        "Developing clear expression of complex spiritual concepts",
      ],
    }

    const results = {
      giftScores,
      primaryGift: sortedGifts[0],
      secondaryGift: sortedGifts[1],
      giftDescriptions,
      giftPractices,
      timestamp: new Date().toISOString(),
    }

    setResults(results)
    setShowResults(true)

    // Update user context with results
    updateUser({
      spiritualProfile: {
        spiritualGifts: results,
      },
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-indigo-900 bg-opacity-70 border border-indigo-700 rounded-lg p-8">
        {!showResults ? (
          <>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-purple-300">Quantum Gifts Assessment</h2>
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
              <h2 className="text-2xl font-bold text-purple-300 mb-2">Your Quantum Gifts</h2>
              <p className="text-blue-200">Discover your innate spiritual abilities</p>
            </div>

            <div className="bg-indigo-900 p-6 rounded-lg border border-indigo-700 mb-6">
              <div className="mb-4">
                <div className="h-24 w-24 rounded-full bg-indigo-800 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-xl font-medium text-purple-300 mb-2">Primary Gift</h3>
                <h4 className="text-lg font-bold text-blue-300 mb-3">
                  {results.primaryGift.charAt(0).toUpperCase() + results.primaryGift.slice(1)}
                </h4>
                <p className="text-blue-200 mb-6">{results.giftDescriptions[results.primaryGift]}</p>

                <h3 className="text-xl font-medium text-purple-300 mb-2">Secondary Gift</h3>
                <h4 className="text-lg font-bold text-blue-300 mb-3">
                  {results.secondaryGift.charAt(0).toUpperCase() + results.secondaryGift.slice(1)}
                </h4>
                <p className="text-blue-200 mb-6">{results.giftDescriptions[results.secondaryGift]}</p>

                <h3 className="text-xl font-medium text-purple-300 mb-3">Your Gift Profile</h3>
                <div className="space-y-3 mb-6">
                  {Object.entries(results.giftScores).map(([gift, score]) => (
                    <div key={gift}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-blue-300">{gift.charAt(0).toUpperCase() + gift.slice(1)}</span>
                        <span className="text-blue-200">{score}%</span>
                      </div>
                      <div className="h-2 bg-indigo-800 rounded-full">
                        <div
                          className={`h-full rounded-full ${
                            gift === results.primaryGift
                              ? "bg-purple-500"
                              : gift === results.secondaryGift
                                ? "bg-blue-500"
                                : "bg-indigo-600"
                          }`}
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-medium text-purple-300 mb-2">Recommended Practices</h3>
                <div className="space-y-2 text-left">
                  {results.giftPractices[results.primaryGift].map((practice, index) => (
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

export default GiftsAssessmentQuiz
