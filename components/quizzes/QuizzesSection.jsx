"use client"

import { useState } from "react"
import { useUser } from "@/context/UserContext"
import ArchetypeQuiz from "./ArchetypeQuiz"
import ShadowWorkQuiz from "./ShadowWorkQuiz"
import GiftsAssessmentQuiz from "./GiftsAssessmentQuiz"
import PurposeFinderQuiz from "./PurposeFinderQuiz"

const QuizzesSection = () => {
  const { user } = useUser()
  const [activeQuiz, setActiveQuiz] = useState(null)

  const quizzes = [
    {
      id: "archetype",
      title: "Cosmic Archetype Assessment",
      description: "Discover your unique spiritual blueprint and cosmic role",
      icon: "✨",
      component: ArchetypeQuiz,
      completed: user?.spiritualProfile?.archetypeResults !== null,
    },
    {
      id: "shadow",
      title: "Shadow Integration Assessment",
      description: "Illuminate and integrate the hidden aspects of your consciousness",
      icon: "🔮",
      component: ShadowWorkQuiz,
      completed: user?.spiritualProfile?.shadowWorkResults !== null,
    },
    {
      id: "gifts",
      title: "Quantum Gifts Assessment",
      description: "Identify and develop your innate spiritual abilities",
      icon: "🌟",
      component: GiftsAssessmentQuiz,
      completed: user?.spiritualProfile?.spiritualGifts !== null,
    },
    {
      id: "purpose",
      title: "Cosmic Purpose Finder",
      description: "Clarify your unique contribution to the universe",
      icon: "⭐",
      component: PurposeFinderQuiz,
      completed: user?.spiritualProfile?.purposeResults !== null,
    },
  ]

  const handleQuizComplete = () => {
    setActiveQuiz(null)
  }

  if (activeQuiz) {
    const QuizComponent = quizzes.find((quiz) => quiz.id === activeQuiz)?.component
    return <QuizComponent onComplete={handleQuizComplete} />
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-purple-300 mb-2">Spiritual Assessments</h1>
          <p className="text-blue-200">Discover your unique cosmic blueprint through these transformative quizzes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-indigo-900 bg-opacity-70 border border-indigo-700 rounded-lg p-6 hover:border-purple-500 transition-colors"
            >
              <div className="flex items-start mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-800 flex items-center justify-center mr-4">
                  <span className="text-2xl">{quiz.icon}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-purple-300 mb-1">{quiz.title}</h2>
                  <p className="text-blue-200 text-sm">{quiz.description}</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-blue-300">
                  {quiz.completed ? "Completed" : "Estimated time: 5-10 minutes"}
                </span>
                <button
                  onClick={() => setActiveQuiz(quiz.id)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm"
                >
                  {quiz.completed ? "Retake Quiz" : "Start Quiz"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuizzesSection
