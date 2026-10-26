"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { TrendingUp, Heart, Brain, Sparkles, Calendar, BookOpen, Target } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const COLORS = ["#8b5cf6", "#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"]

export default function GrowthDashboard() {
  const [userData, setUserData] = useState<any>({})
  const [journalEntries, setJournalEntries] = useState<any[]>([])
  const [dreamEntries, setDreamEntries] = useState<any[]>([])
  const [quizResults, setQuizResults] = useState<any[]>([])
  const [activityData, setActivityData] = useState<any[]>([])

  useEffect(() => {
    // Load all user data
    const cosmic = JSON.parse(localStorage.getItem("cosmicUserData") || "{}")
    const dreams = JSON.parse(localStorage.getItem("dreamJournal") || "[]")
    const journal = JSON.parse(localStorage.getItem("journalEntries") || "[]")

    setUserData(cosmic)
    setDreamEntries(dreams)
    setJournalEntries(journal)

    // Generate activity chart data
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return {
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        dreams: Math.floor(Math.random() * 3),
        journal: Math.floor(Math.random() * 5),
        meditations: Math.floor(Math.random() * 2),
      }
    })
    setActivityData(last7Days)
  }, [])

  const stats = [
    {
      label: "Dream Entries",
      value: dreamEntries.length,
      icon: Brain,
      color: "purple",
      change: "+2 this week",
    },
    {
      label: "Journal Entries",
      value: journalEntries.length,
      icon: BookOpen,
      color: "blue",
      change: "+5 this week",
    },
    {
      label: "Days Active",
      value: activityData.length,
      icon: Calendar,
      color: "green",
      change: "7 day streak",
    },
    {
      label: "Growth Score",
      value: Math.min(100, (dreamEntries.length + journalEntries.length) * 5),
      icon: TrendingUp,
      color: "orange",
      change: "+15% this month",
    },
  ]

  const emotionalData = [
    { name: "Joy", value: 35 },
    { name: "Peace", value: 25 },
    { name: "Growth", value: 20 },
    { name: "Clarity", value: 15 },
    { name: "Wonder", value: 5 },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <TrendingUp className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Personal Growth Dashboard
        </h2>
        <p className="text-gray-800 font-medium">Track your spiritual journey and personal evolution</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-4 bg-gradient-to-br from-white to-purple-50 border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                <span className="text-xs text-green-600 font-medium">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-700 font-medium">{stat.label}</div>
            </Card>
          )
        })}
      </div>

      {/* Activity Chart */}
      <Card className="p-6 bg-white border-purple-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-600" />
          7-Day Activity Overview
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="dreams" fill="#8b5cf6" name="Dreams" />
            <Bar dataKey="journal" fill="#3b82f6" name="Journal" />
            <Bar dataKey="meditations" fill="#10b981" name="Meditations" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Emotional Patterns */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-pink-600" />
          Emotional Patterns
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={emotionalData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => entry.name}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {emotionalData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Insights */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-indigo-600" />
          AI-Powered Insights
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-white rounded-lg border border-purple-100">
            <p className="text-sm font-semibold text-gray-900 mb-1">🌟 Your Growth Pattern</p>
            <p className="text-sm text-gray-800">
              You're most active in self-reflection during evenings. Your dream recall has improved by 40% this month.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-purple-100">
            <p className="text-sm font-semibold text-gray-900 mb-1">🎯 Recommended Focus</p>
            <p className="text-sm text-gray-800">
              As a {userData.sign || "cosmic traveler"}, consider exploring shadow work during this{" "}
              {userData.moonPhase || "lunar phase"}. Your journey shows readiness for deeper transformation.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-purple-100">
            <p className="text-sm font-semibold text-gray-900 mb-1">💫 Next Milestone</p>
            <p className="text-sm text-gray-800">
              Complete 3 more journal entries to unlock your "Cosmic Chronicler" achievement and receive a personalized
              growth report.
            </p>
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      {(dreamEntries.length > 0 || journalEntries.length > 0) && (
        <Card className="p-6 bg-white border-purple-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-600" />
            Recent Activity
          </h3>
          <div className="space-y-2">
            {dreamEntries.slice(0, 3).map((dream) => (
              <div key={dream.id} className="flex items-start p-3 bg-purple-50 rounded-lg border border-purple-100">
                <Brain className="w-4 h-4 mr-2 mt-0.5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Dream Entry</p>
                  <p className="text-xs text-gray-700">{dream.date}</p>
                </div>
              </div>
            ))}
            {journalEntries.slice(0, 3).map((entry: any) => (
              <div key={entry.id} className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-100">
                <BookOpen className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Journal Entry</p>
                  <p className="text-xs text-gray-700">{entry.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
