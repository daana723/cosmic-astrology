"use client"

import { useState } from "react"
import { useUser } from "@/context/UserContext"

const ShadowWorkQuiz = ({ onComplete }) => {
  const { updateUser } = useUser()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState(null)

  const questions = [
    {
      id: "s1",
      text: "Which of these emotions do you find most difficult to express or acknowledge?",
      options: ["Anger", "Sadness", "Fear", "Desire", "Pride"],
    },
    {
      id: "s2",
      text: "When you feel criticized, your most common reaction is to:",
      options: [
        "Defend yourself immediately",
        "Withdraw and feel hurt",
        "Criticize back",
        "Overanalyze what was said",
        "Pretend it doesn't bother you",
      ],
    },
    {
      id: "s3",
      text: "Which of these traits do you most often judge in others?",
      options: ["Selfishness", "Neediness", "Arrogance", "Dishonesty", "Irresponsibility"],
    },
    {
      id: "s4",
      text: "In your spiritual journey, which aspect have you most avoided exploring?",
      options: [
        "Your capacity for darkness",
        "Your deepest fears",
        "Your true desires",
        "Your past wounds",
        "Your personal power",
      ],
    },
    {
      id: "s5",
      text: "Which pattern tends to repeat most often in your life?",
      options: [
        "Feeling abandoned or rejected",
        "Taking on too much responsibility",
        "Difficulty setting boundaries",
        "Perfectionism and self-criticism",
        "Avoiding conflict at all costs",
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
    // Analyze responses to identify shadow aspects
    const shadowAreas = []
    const insights = []
    const recommendations = []

    // Process responses to determine shadow areas
    if (responses.s1 === 0) {
      shadowAreas.push("Suppressed Anger")
      insights.push("You may have difficulty acknowledging and expressing anger in healthy ways.")
      recommendations.push("Practice expressing anger constructively through journaling or physical activity.")
    } else if (responses.s1 === 1) {
      shadowAreas.push("Unprocessed Grief")
      insights.push("You may have difficulty allowing yourself to fully experience and express sadness.")
      recommendations.push("Create safe spaces to feel and release sadness through art, music, or trusted connections.")
    } else if (responses.s1 === 2) {
      shadowAreas.push("Fear Avoidance")
      insights.push("You may avoid acknowledging fears, which can limit growth and authenticity.")
      recommendations.push("Practice naming your fears specifically and exploring their origins with compassion.")
    }

    if (responses.s3 === 0) {
      shadowAreas.push("Projection of Selfishness")
      insights.push("Your judgment of selfishness in others may reflect disowned needs for self-care.")
      recommendations.push("Explore healthy selfishness and practice setting boundaries around your own needs.")
    } else if (responses.s3 === 2) {
      shadowAreas.push("Disowned Confidence")
      insights.push("Your judgment of arrogance may reflect disowned aspects of your own power and confidence.")
      recommendations.push("Practice owning your achievements and expressing confidence without apology.")
    }

    if (responses.s5 === 0) {
      shadowAreas.push("Abandonment Wound")
      insights.push("Recurring feelings of abandonment may connect to early experiences of rejection or loss.")
      recommendations.push("Work with inner child healing practices to nurture the wounded parts of yourself.")
    } else if (responses.s5 === 3) {
      shadowAreas.push("Inner Critic")
      insights.push("Your perfectionism may be driven by a harsh inner critic that needs integration.")
      recommendations.push("Practice self-compassion meditation and challenge perfectionistic thoughts.")
    }

    // Ensure we have at least some results even if specific patterns weren't matched
    if (shadowAreas.length === 0) {
      shadowAreas.push("General Shadow Work")
      insights.push("Your responses indicate several areas for potential shadow integration.")
      recommendations.push("Begin with a regular shadow journaling practice to explore hidden aspects of yourself.")
    }

    // Add general recommendations
    recommendations.push("Practice radical self-acceptance of all aspects of yourself, including those you judge.")
    recommendations.push("Consider working with a spiritual mentor or therapist on shadow integration.")

    const results = {
      shadowAreas,
      insights,
      recommendations,
      timestamp: new Date().toISOString(),
    }

    setResults(results)
    setShowResults(true)

    // Update user context with results
    updateUser({
      spiritualProfile: {
        shadowWorkResults: results,
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
                <h2 className="text-xl font-bold text-purple-300">Shadow Integration Assessment</h2>
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
              <h2 className="text-2xl font-bold text-purple-300 mb-2">Shadow Integration Insights</h2>
              <p className="text-blue-200">Illuminating the hidden aspects of your consciousness</p>
            </div>

            <div className="bg-indigo-900 p-6 rounded-lg border border-indigo-700 mb-6">
              <div className="mb-4">
                <div className="h-24 w-24 rounded-full bg-indigo-800 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🔮</span>
                </div>
                <h3 className="text-xl font-medium text-purple-300 mb-4">Shadow Areas to Explore</h3>
                <div className="space-y-2 mb-6">
                  {results.shadowAreas.map((area, index) => (
                    <div
                      key={index}
                      className="bg-indigo-800/50 p-2 rounded-lg border border-indigo-700 text-blue-200 text-left"
                    >
                      {area}
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-medium text-purple-300 mb-2">Insights</h3>
                <div className="space-y-3 mb-6 text-left">
                  {results.insights.map((insight, index) => (
                    <p key={index} className="text-blue-200">
                      • {insight}
                    </p>
                  ))}
                </div>

                <h3 className="text-xl font-medium text-purple-300 mb-2">Integration Practices</h3>
                <div className="space-y-3 text-left">
                  {results.recommendations.map((recommendation, index) => (
                    <p key={index} className="text-blue-200">
                      • {recommendation}
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

export default ShadowWorkQuiz
