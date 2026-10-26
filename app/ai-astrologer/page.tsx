"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send, Loader2, Star, Zap, Brain, Telescope } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AIAstrologerPage() {
  const router = useRouter()
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState<{ type: "user" | "ai"; content: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const quickQuestions = [
    {
      icon: Star,
      title: "Birth Chart Analysis",
      question:
        "Can you analyze my complete birth chart and tell me about my core personality traits, strengths, and life purpose?",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Telescope,
      title: "Current Transits",
      question: "What are the major planetary transits affecting me right now, and how should I navigate them?",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: Zap,
      title: "Career Guidance",
      question:
        "Based on my astrological chart, what career paths and opportunities are most aligned with my cosmic blueprint?",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Brain,
      title: "Relationship Synastry",
      question: "Can you provide a synastry analysis for compatibility with someone born on [date]?",
      gradient: "from-pink-500 to-rose-500",
    },
  ]

  const handleSendMessage = async () => {
    if (!question.trim()) return

    const userMessage = question
    setMessages((prev) => [...prev, { type: "user", content: userMessage }])
    setQuestion("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/astrologer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from AI")
      }

      const data = await response.json()
      const aiResponse = data.response

      setMessages((prev) => [...prev, { type: "ai", content: aiResponse }])
    } catch (error) {
      console.error("Error calling AI:", error)
      // Fallback response
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content:
            "I apologize, but I'm currently unable to connect to the AI service. This deep astrological analysis requires advanced processing. Please try again in a moment, or feel free to explore the standard horoscope features in the main app.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickQuestion = (quickQuestion: string) => {
    setQuestion(quickQuestion)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button onClick={() => router.back()} variant="ghost" className="text-white hover:bg-white/20 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Horoscope
          </Button>

          <div className="text-center space-y-4 p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full">
              <Star className="w-6 h-6 text-yellow-300 animate-pulse" />
              <span className="font-bold text-white text-lg">Quantum Astrologer AI</span>
              <Star className="w-6 h-6 text-yellow-300 animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Deep Astrological Intelligence</h1>
            <p className="text-white/90 text-lg max-w-3xl mx-auto leading-relaxed">
              Explore your cosmic blueprint with unprecedented depth. Get personalized birth chart analysis, transit
              forecasts, relationship synastry, and quantum-level astrological insights powered by advanced AI.
            </p>
          </div>
        </div>

        {/* Quick Question Cards */}
        {messages.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {quickQuestions.map((item, index) => {
              const Icon = item.icon
              return (
                <Card
                  key={index}
                  className="p-6 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                  onClick={() => handleQuickQuestion(item.question)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed">{item.question}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {/* Chat Messages */}
        {messages.length > 0 && (
          <Card className="mb-6 bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-white/20 backdrop-blur-sm text-white border border-white/30"
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/30">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                      <span className="text-white">Consulting the cosmos...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Input Area */}
        <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20">
          <div className="space-y-4">
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about your birth chart, transits, compatibility, life purpose, or any astrological question..."
              className="min-h-[120px] bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-white/50 resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <div className="flex justify-between items-center">
              <p className="text-white/60 text-sm">
                Tip: Include your birth date, time, and location for the most accurate readings
              </p>
              <Button
                onClick={handleSendMessage}
                disabled={!question.trim() || isLoading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Consulting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Ask AI
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Features Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <Telescope className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Deep Analysis</h3>
            <p className="text-white/70 text-sm">Complete birth chart interpretation with all planetary aspects</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <Zap className="w-8 h-8 text-pink-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Real-Time Transits</h3>
            <p className="text-white/70 text-sm">Current planetary movements and their personal impact</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <Brain className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Quantum Insights</h3>
            <p className="text-white/70 text-sm">Advanced pattern recognition beyond traditional astrology</p>
          </div>
        </div>
      </div>
    </div>
  )
}
