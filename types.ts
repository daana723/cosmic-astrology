// User Types
export interface User {
  id: string
  name: string
  email: string
  profileImage?: string
  createdAt: string
  spiritualProfile: SpiritualProfile
  preferences: UserPreferences
  journalEntries: JournalEntry[]
  quizResults: QuizResult[]
}

export interface SpiritualProfile {
  archetypeResults?: ArchetypeResults
  birthData?: BirthData
  spiritualGifts?: SpiritualGifts
  shadowWorkResults?: ShadowWorkResults
  purposeStatement?: string
  interests?: string[]
}

export interface BirthData {
  birthDate: string
  birthTime: string
  birthLocation: string
}

export interface UserPreferences {
  theme: "light" | "dark" | "cosmic"
  notificationsEnabled: boolean
  privacySettings: PrivacySettings
}

export interface PrivacySettings {
  shareJournalEntries: boolean
  shareQuizResults: boolean
  publicProfile: boolean
}

// Quiz Types
export interface QuizResult {
  id: string
  quizType: QuizType
  completedAt: string
  results: any
}

export type QuizType = "archetype" | "spiritualGifts" | "shadowWork" | "purpose"

export interface ArchetypeResults {
  primary: Archetype
  secondary: Archetype
  scores: ArchetypeScores
  timestamp: string
}

export type Archetype = "visionary" | "healer" | "maverick" | "explorer"

export interface ArchetypeScores {
  visionary: number
  healer: number
  maverick: number
  explorer: number
}

export interface SpiritualGifts {
  intuition: number
  empathy: number
  healing: number
  manifestation: number
  communication: number
}

export interface ShadowWorkResults {
  areas: string[]
  insights: string[]
  recommendations: string[]
}

export interface QuizQuestion {
  id: string
  text: string
  type: "scale" | "multiple-choice" | "open-ended"
  options?: string[]
  weights?: {
    visionary: number
    healer: number
    maverick: number
    explorer: number
  }
}

// Journal Types
export interface JournalEntry {
  id: string
  type: JournalType
  title: string
  content: string
  createdAt: string
  updatedAt: string
  tags: string[]
  mood?: string
  isPrivate: boolean
}

export type JournalType = "guided" | "dream" | "synchronicity" | "intuition" | "free"

// Onboarding Types
export type OnboardingStage = "welcome" | "profile" | "archetype"

export interface AstrologyData {
  sunSign: string
  moonSign: string
}
