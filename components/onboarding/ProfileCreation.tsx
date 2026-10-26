"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "@/context/UserContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"

interface ProfileCreationProps {
  onContinue: () => void
}

const ProfileCreation: React.FC<ProfileCreationProps> = ({ onContinue }) => {
  const { user, updateUser } = useUser()
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [birthDate, setBirthDate] = useState("")
  const [birthTime, setBirthTime] = useState("")
  const [birthLocation, setBirthLocation] = useState("")
  const [interests, setInterests] = useState<string[]>([])
  const [step, setStep] = useState(1)

  const handleInterestToggle = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest))
    } else {
      setInterests([...interests, interest])
    }
  }

  const handleSubmit = () => {
    updateUser({
      name,
      email,
      spiritualProfile: {
        ...user?.spiritualProfile,
        birthData: {
          birthDate,
          birthTime,
          birthLocation,
        },
        interests,
      },
    })
    onContinue()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full cosmic-card p-8"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-turquoise">Create Your Cosmic Profile</h1>
          <p className="text-lavender">Tell us about your celestial journey</p>
        </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="text-turquoise">
                Your Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="cosmic-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-turquoise">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="cosmic-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-turquoise">
                Birth Date
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="cosmic-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthTime" className="text-turquoise">
                  Birth Time (if known)
                </Label>
                <Input
                  id="birthTime"
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="cosmic-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthLocation" className="text-turquoise">
                  Birth Location
                </Label>
                <Input
                  id="birthLocation"
                  value={birthLocation}
                  onChange={(e) => setBirthLocation(e.target.value)}
                  placeholder="City, Country"
                  className="cosmic-input"
                />
              </div>
            </div>

            <Button onClick={() => setStep(2)} className="w-full btn-primary">
              Continue
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-lg font-medium text-turquoise mb-3">Cosmic Interests</h2>
              <p className="text-lavender text-sm mb-4">Select the areas that resonate with your spiritual journey:</p>

              <div className="space-y-3">
                {[
                  "Quantum Consciousness",
                  "Astral Projection",
                  "Energy Healing",
                  "Sacred Geometry",
                  "Manifestation",
                  "Akashic Records",
                  "Chakra Alignment",
                  "Cosmic Frequencies",
                  "Multidimensional Awareness",
                  "Starseed Origins",
                ].map((interest) => (
                  <div key={interest} className="flex items-center">
                    <Checkbox
                      id={interest}
                      checked={interests.includes(interest)}
                      onCheckedChange={() => handleInterestToggle(interest)}
                      className="mr-2 border-turquoise data-[state=checked]:bg-turquoise data-[state=checked]:text-indigo-900"
                    />
                    <Label htmlFor={interest} className="text-lavender cursor-pointer">
                      {interest}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1 border-turquoise text-turquoise">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 btn-primary"
                disabled={name.trim() === "" || email.trim() === ""}
              >
                Continue to Assessment
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default ProfileCreation
