"use client"

import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"
import { useState, useEffect } from "react"

interface TextToSpeechProps {
  text: string
  autoPlay?: boolean
}

export default function TextToSpeech({ text, autoPlay = false }: TextToSpeechProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    setIsSupported("speechSynthesis" in window)
  }, [])

  const stripMarkdown = (text: string): string => {
    return text
      .replace(/\*\*(.+?)\*\*/g, "$1") // Remove bold **text**
      .replace(/\*(.+?)\*/g, "$1") // Remove italic *text*
      .replace(/#{1,6}\s?/g, "") // Remove headings
      .replace(/\[(.+?)\]$$.+?$$/g, "$1") // Remove links [text](url)
      .replace(/`(.+?)`/g, "$1") // Remove inline code
      .replace(/[-*_]{3,}/g, "") // Remove horizontal rules
      .replace(/^\s*[-*+]\s/gm, "") // Remove list markers
      .replace(/^\s*\d+\.\s/gm, "") // Remove numbered list markers
      .replace(/🌙|✨|🔥|💫|⭐/g, "") // Remove emojis
      .trim()
  }

  const speak = () => {
    if (!isSupported) {
      alert("Text-to-speech is not supported in your browser")
      return
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    const cleanText = stripMarkdown(text)
    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onend = () => {
      setIsSpeaking(false)
      window.speechSynthesis.cancel() // Ensure cleanup
    }

    utterance.onerror = () => {
      setIsSpeaking(false)
      window.speechSynthesis.cancel()
    }

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
    setIsSpeaking(true)
  }

  if (!isSupported) return null

  return (
    <Button
      onClick={speak}
      variant="outline"
      size="sm"
      className="border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
    >
      {isSpeaking ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
      {isSpeaking ? "Stop" : "Listen"}
    </Button>
  )
}
