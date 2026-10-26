"use client"

import { useState } from "react"
import { useUser } from "@/context/UserContext"

const ArchetypeQuiz = ({ onComplete }) => {
  const { updateUser, user } = useUser()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState(null)

  const questions = [
    {
      id: "q1",
      text: "When connecting with cosmic energies, I most naturally:",
      options: [
        "Visualize future possibilities and transformations",
        "Feel the emotional resonance and healing potential",
        "Challenge existing paradigms and seek new truths",
        "Explore diverse perspectives and integrate wisdom",
      ],
    },
    {
      id: "q2",
      text: "My spiritual gifts are most activated when I am:",
      options: [
        "Creating positive change for the future",
        "Helping others heal and grow",
        "Breaking free from limitations",
        "Discovering new insights and experiences",
      ],
    },
    {
      id: "q3",
      text: "Others often seek me out for:",
      options: [
        "My ability to see future possibilities",
        "Emotional support and understanding",
        "My unique perspective and honesty",
        "Guidance on personal growth and discovery",
      ],
    },
    {
      id: "q4",
      text: "I feel most aligned with my cosmic purpose when:",
      options: [
        "Imagining what could be possible",
        "Creating deep connections with others",
        "Challenging the status quo",
        "Expanding my consciousness through new experiences",
      ],
    },
    {
      id: "q5",
      text: "When making decisions about my spiritual path, I prioritize:",
      options: [
        "Long-term vision and potential",
        "How it will affect everyone involved",
        "Authenticity and independence",
        "What will lead to the most growth",
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
    // Simple scoring system based on responses
    const scores = {
      visionary: 0,
      healer: 0,
      maverick: 0,
      explorer: 0,
    }

    // Count responses for each archetype
    Object.values(responses).forEach((optionIndex) => {
      if (optionIndex === 0) scores.visionary += 1
      if (optionIndex === 1) scores.healer += 1
      if (optionIndex === 2) scores.maverick += 1
      if (optionIndex === 3) scores.explorer += 1
    })

    // Determine primary and secondary archetypes
    const sortedArchetypes = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .map((entry) => entry[0])

    const results = {
      primary: sortedArchetypes[0],
      secondary: sortedArchetypes[1],
      scores: {
        visionary: Math.round((scores.visionary / questions.length) * 100),
        healer: Math.round((scores.healer / questions.length) * 100),
        maverick: Math.round((scores.maverick / questions.length) * 100),
        explorer: Math.round((scores.explorer / questions.length) * 100),
      },
      timestamp: new Date().toISOString(),
    }

    setResults(results)
    setShowResults(true)

    // Save to local storage via user context
    const quizResult = {
      id: Date.now().toString(),
      quizType: "archetype",
      completedAt: new Date().toISOString(),
      results: results,
    }

    const updatedQuizResults = [...(user?.quizResults || []), quizResult]

    // Update user context with results
    updateUser({
      spiritualProfile: {
        archetypeResults: results,
      },
      quizResults: updatedQuizResults,
    })
  }

  const getArchetypeDescription = (archetype) => {
    switch (archetype) {
      case "visionary":
        return "Visionaries are focused on future possibilities and transformation. They have a natural ability to see what could be and inspire others with their vision."
      case "healer":
        return "Healers are centered on compassion, empathy, and helping others. They have a natural ability to understand emotions and provide support."
      case "maverick":
        return "Mavericks are driven by challenging norms and creating new paradigms. They have a natural ability to see beyond limitations and conventional thinking."
      case "explorer":
        return "Explorers are motivated by spiritual discovery and personal growth. They have a natural curiosity and desire to experience diverse perspectives."
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-indigo-900 bg-opacity-70 border border-indigo-700 rounded-lg p-8">
        {!showResults ? (
          <>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-purple-300">Cosmic Archetype Assessment</h2>
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
              <h2 className="text-2xl font-bold text-purple-300 mb-2">Your Cosmic Archetype</h2>
              <p className="text-blue-200">Discover your unique spiritual blueprint</p>
            </div>

            <div className="bg-indigo-900 p-6 rounded-lg border border-indigo-700 mb-6">
              <div className="mb-4">
                <div className="h-24 w-24 rounded-full bg-purple-600 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-xl font-medium text-purple-300 mb-2">
                  Primary Archetype: {results.primary.charAt(0).toUpperCase() + results.primary.slice(1)}
                </h3>
                <p className="text-blue-200 mb-4">{getArchetypeDescription(results.primary)}</p>
              </div>

              <h4 className="text-lg font-medium text-orange-400 mb-2">
                Secondary Archetype: {results.secondary.charAt(0).toUpperCase() + results.secondary.slice(1)}
              </h4>
              <p className="text-blue-200">{getArchetypeDescription(results.secondary)}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-purple-300 mb-3">Your Cosmic Energy Distribution</h3>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-blue-300">Visionary</span>
                    <span className="text-blue-200">{results.scores.visionary}%</span>
                  </div>
                  <div className="h-2 bg-indigo-800 rounded-full">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${results.scores.visionary}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-purple-300">Healer</span>
                    <span className="text-blue-200">{results.scores.healer}%</span>
                  </div>
                  <div className="h-2 bg-indigo-800 rounded-full">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${results.scores.healer}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-orange-300">Maverick</span>
                    <span className="text-blue-200">{results.scores.maverick}%</span>
                  </div>
                  <div className="h-2 bg-indigo-800 rounded-full">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${results.scores.maverick}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-green-300">Explorer</span>
                    <span className="text-blue-200">{results.scores.explorer}%</span>
                  </div>
                  <div className="h-2 bg-indigo-800 rounded-full">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${results.scores.explorer}%` }}
                    ></div>
                  </div>
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

export default ArchetypeQuiz
