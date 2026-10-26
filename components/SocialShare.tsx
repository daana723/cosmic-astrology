"use client"

import { Button } from "@/components/ui/button"
import { Share2, Twitter, Facebook, LinkIcon, MessageCircle } from "lucide-react"
import { useState } from "react"

interface SocialShareProps {
  title: string
  text: string
  url?: string
}

export default function SocialShare({ title, text, url }: SocialShareProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")

  const handleShare = async (platform: string) => {
    const encodedText = encodeURIComponent(text)
    const encodedUrl = encodeURIComponent(shareUrl)

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      native: "",
    }

    if (platform === "native" && navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        })
      } catch (error) {
        console.log("Share cancelled or failed")
      }
    } else if (platform === "copy") {
      try {
        await navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error("Failed to copy:", error)
      }
    } else {
      window.open(urls[platform], "_blank", "width=600,height=400")
    }

    setShowMenu(false)
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setShowMenu(!showMenu)}
        variant="outline"
        size="sm"
        className="border-purple-300 text-purple-600 hover:bg-purple-50"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>

      {showMenu && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10 min-w-48">
          {navigator.share && (
            <button
              onClick={() => handleShare("native")}
              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md text-sm text-gray-700"
            >
              <Share2 className="w-4 h-4" />
              Share...
            </button>
          )}
          <button
            onClick={() => handleShare("twitter")}
            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md text-sm text-gray-700"
          >
            <Twitter className="w-4 h-4" />
            Twitter
          </button>
          <button
            onClick={() => handleShare("facebook")}
            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md text-sm text-gray-700"
          >
            <Facebook className="w-4 h-4" />
            Facebook
          </button>
          <button
            onClick={() => handleShare("whatsapp")}
            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md text-sm text-gray-700"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </button>
          <button
            onClick={() => handleShare("copy")}
            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md text-sm text-gray-700"
          >
            <LinkIcon className="w-4 h-4" />
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      )}
    </div>
  )
}
