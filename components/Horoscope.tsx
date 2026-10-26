"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Calendar, TrendingUp, Heart, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import TextToSpeech from "@/components/TextToSpeech"
import SocialShare from "@/components/SocialShare"

interface HoroscopeProps {
  userData?: {
    name?: string
    sign?: string
    moonSign?: string
    risingSign?: string
    archetype?: string
  }
}

export function Horoscope({ userData }: HoroscopeProps) {
  const [period, setPeriod] = useState("today")
  const [activeTab, setActiveTab] = useState("general")
  const router = useRouter()

  const zodiacSign = userData?.sign || "Aries"

  const horoscopeData: Record<
    string,
    {
      general: string
      love: string
      career: string
      health: string
      lucky: { number: number; color: string; time: string }
    }
  > = {
    today: {
      general:
        "The cosmos aligns in your favor today. Your intuition is heightened, making it an excellent time for important decisions. Trust your inner guidance.",
      love: "Venus brings harmony to your relationships. Single? The universe might surprise you with an unexpected connection.",
      career:
        "Mercury enhances your communication skills. It's a perfect day for presentations, negotiations, or creative brainstorming.",
      health:
        "Your energy levels are balanced. Consider trying a new wellness practice or meditation technique to deepen your spiritual connection.",
      lucky: { number: 7, color: "Indigo", time: "3:33 PM" },
    },
    weekly: {
      general:
        "This week brings transformative energy. Jupiter's influence suggests expansion in areas you've been cultivating. Stay open to opportunities.",
      love: "The week starts with romantic energy. Mid-week may bring important conversations. Weekend promises deep emotional connections.",
      career:
        "Professional growth is highlighted. A project you've been working on may gain recognition. Collaboration leads to success.",
      health:
        "Focus on maintaining balance between work and rest. Your body needs extra care mid-week. Prioritize sleep and nutrition.",
      lucky: { number: 12, color: "Emerald Green", time: "Morning hours" },
    },
    monthly: {
      general:
        "A month of significant personal growth awaits. The lunar cycle supports your journey of self-discovery and manifestation. Set clear intentions.",
      love: "Relationships deepen as the month progresses. Communication becomes more authentic. Single individuals may meet someone significant.",
      career:
        "Career momentum builds steadily. New opportunities emerge in the second half of the month. Your unique talents gain recognition.",
      health:
        "Establish sustainable wellness routines this month. Your energy fluctuates with the lunar phases. Honor your body's natural rhythms.",
      lucky: { number: 21, color: "Royal Purple", time: "Full Moon nights" },
    },
  }

  const current = horoscopeData[period]
  const currentReading = current[activeTab as keyof typeof current]
  const readingText = typeof currentReading === "string" ? currentReading : JSON.stringify(currentReading)

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-3 p-6 rounded-2xl bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 border border-purple-200">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span className="font-semibold text-purple-900">Your Cosmic Forecast</span>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent capitalize">
          {zodiacSign} Horoscope
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          The universe has messages for you. Explore your personalized readings and cosmic insights.
        </p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <Star className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Quantum Astrologer AI
            </h3>
            <p className="text-gray-700">
              Get deeper, personalized astrological insights powered by advanced AI. Explore your birth chart, transits,
              and cosmic patterns with unprecedented depth and accuracy.
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-3">
              <span className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-medium">
                Birth Chart Analysis
              </span>
              <span className="px-3 py-1 bg-pink-200 text-pink-800 rounded-full text-sm font-medium">
                Transit Predictions
              </span>
              <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-medium">
                Synastry Reports
              </span>
            </div>
          </div>
          <Button
            onClick={() => router.push("/ai-astrologer")}
            className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Open AI Astrologer
          </Button>
        </div>
      </Card>

      {/* Period Selection */}
      <div className="flex justify-center gap-2 flex-wrap">
        <Button
          variant={period === "today" ? "default" : "outline"}
          onClick={() => setPeriod("today")}
          className={
            period === "today"
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              : "border-purple-300 hover:bg-purple-50"
          }
        >
          <Calendar className="w-4 h-4 mr-2" />
          Today
        </Button>
        <Button
          variant={period === "weekly" ? "default" : "outline"}
          onClick={() => setPeriod("weekly")}
          className={
            period === "weekly"
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              : "border-purple-300 hover:bg-purple-50"
          }
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          This Week
        </Button>
        <Button
          variant={period === "monthly" ? "default" : "outline"}
          onClick={() => setPeriod("monthly")}
          className={
            period === "monthly"
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              : "border-purple-300 hover:bg-purple-50"
          }
        >
          <Sparkles className="w-4 h-4 mr-2" />
          This Month
        </Button>
      </div>

      {/* Horoscope Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 bg-purple-100/50 p-2 rounded-lg">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="love"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
          >
            <Heart className="w-4 h-4 mr-1" />
            Love
          </TabsTrigger>
          <TabsTrigger
            value="career"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
          >
            Career
          </TabsTrigger>
          <TabsTrigger
            value="health"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
          >
            Health
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
            <div className="flex items-start justify-between mb-4">
              <p className="text-gray-800 leading-relaxed text-lg flex-1">{current.general}</p>
              <div className="flex gap-2 ml-4">
                <TextToSpeech text={current.general} />
                <SocialShare
                  title={`${zodiacSign} Horoscope`}
                  text={`My ${period} horoscope: ${current.general.substring(0, 100)}...`}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="love" className="mt-6">
          <Card className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
            <div className="flex items-start justify-between mb-4">
              <p className="text-gray-800 leading-relaxed text-lg flex-1">{current.love}</p>
              <div className="flex gap-2 ml-4">
                <TextToSpeech text={current.love} />
                <SocialShare
                  title={`${zodiacSign} Love Horoscope`}
                  text={`My ${period} love horoscope from Cosmic Astrology 💕`}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="career" className="mt-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-start justify-between mb-4">
              <p className="text-gray-800 leading-relaxed text-lg flex-1">{current.career}</p>
              <div className="flex gap-2 ml-4">
                <TextToSpeech text={current.career} />
                <SocialShare
                  title={`${zodiacSign} Career Horoscope`}
                  text={`My ${period} career horoscope from Cosmic Astrology 💼`}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="mt-6">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-start justify-between mb-4">
              <p className="text-gray-800 leading-relaxed text-lg flex-1">{current.health}</p>
              <div className="flex gap-2 ml-4">
                <TextToSpeech text={current.health} />
                <SocialShare
                  title={`${zodiacSign} Health Horoscope`}
                  text={`My ${period} health horoscope from Cosmic Astrology 🌿`}
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Lucky Elements */}
      <Card className="p-6 bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-amber-300">
        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          Your Lucky Elements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-lg">
            <div className="text-3xl font-bold text-purple-600">{current.lucky.number}</div>
            <div className="text-sm text-gray-600 mt-1">Lucky Number</div>
          </div>
          <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-lg">
            <div className="text-xl font-bold text-purple-600">{current.lucky.color}</div>
            <div className="text-sm text-gray-600 mt-1">Lucky Color</div>
          </div>
          <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-lg">
            <div className="text-xl font-bold text-purple-600">{current.lucky.time}</div>
            <div className="text-sm text-gray-600 mt-1">Lucky Time</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
