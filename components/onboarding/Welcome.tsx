"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface WelcomeProps {
  onContinue: () => void
}

const Welcome: React.FC<WelcomeProps> = ({ onContinue }) => {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; speed: number }>>([])

  useEffect(() => {
    // Create particles
    const newParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1,
    }))
    setParticles(newParticles)

    // Animation loop for particles
    const interval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          y: particle.y - particle.speed,
          x: particle.x + Math.sin(particle.y * 0.01) * 0.5,
          // Reset particles that go off screen
          ...(particle.y < -10 ? { y: window.innerHeight + 10 } : {}),
        })),
      )
    }, 30)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Particles */}
      {particles.map((particle, index) => (
        <div
          key={index}
          className="particle absolute"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.size / 4,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full cosmic-card p-8 space-y-8 relative z-10"
      >
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24 float">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-turquoise/30 to-orange-500/30 flex items-center justify-center">
                <span className="text-4xl">✨</span>
              </div>
            </div>
          </div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl font-bold text-white mb-2 glow-text"
          >
            Quantum Astrology
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lavender mb-6"
          >
            Discover Your Cosmic Blueprint
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="space-y-6"
        >
          <div className="bg-indigo-900/40 p-4 rounded-lg border border-indigo-700/50">
            <h2 className="text-lg font-medium text-turquoise mb-2">Beyond Traditional Star Reading</h2>
            <p className="text-lavender text-sm">
              Quantum Astrology integrates ancient wisdom with quantum physics principles, helping indigo souls navigate
              their unique spiritual path.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-turquoise/80 to-turquoise/40 rounded-full p-2 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-indigo-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-turquoise font-medium">Multidimensional Analysis</h3>
                <p className="text-lavender text-sm">Explore beyond traditional birth charts</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-gradient-to-br from-orange-500/80 to-orange-500/40 rounded-full p-2 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-indigo-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-orange font-medium">Quantum Consciousness</h3>
                <p className="text-lavender text-sm">Activate your higher dimensional awareness</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-gradient-to-br from-purple-500/80 to-purple-500/40 rounded-full p-2 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-purple-300 font-medium">Indigo Soul Alignment</h3>
                <p className="text-lavender text-sm">Guidance tailored for your unique spiritual journey</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="pt-4"
        >
          <Button onClick={onContinue} className="w-full btn-primary">
            Begin Your Cosmic Journey
          </Button>

          <p className="text-center text-lavender text-xs mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Welcome
