"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// ============= USER CONTEXT =============
type UserData = {
  name: string
  email: string
  quizResults: {
    archetype?: {
      primaryArchetype: string
      scores: Record<string, number>
      completedAt: string
    }
    shadowWork?: {
      primaryShadow: string
      scores: Record<string, number>
      completedAt: string
    }
    spiritualGifts?: {
      primaryGift: string
      scores: Record<string, number>
      completedAt: string
    }
    purposeFinder?: {
      purpose: string
      values: string[]
      strengths: string[]
      completedAt: string
    }
  }
}

const defaultUserData: UserData = {
  name: "Guest User",
  email: "guest@example.com",
  quizResults: {},
}

const UserContext = createContext<{
  userData: UserData
  updateUserData: (data: Partial<UserData>) => void
  updateQuizResult: (quizName: string, result: any) => void
}>({
  userData: defaultUserData,
  updateUserData: () => {},
  updateQuizResult: () => {},
})

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData>(defaultUserData)

  useEffect(() => {
    // Load user data from localStorage on mount
    const savedData = localStorage.getItem("cosmicUserData")
    if (savedData) {
      try {
        setUserData(JSON.parse(savedData))
      } catch (e) {
        console.error("Failed to parse user data from localStorage")
      }
    }
  }, [])

  const updateUserData = (data: Partial<UserData>) => {
    const newData = { ...userData, ...data }
    setUserData(newData)
    localStorage.setItem("cosmicUserData", JSON.stringify(newData))
  }

  const updateQuizResult = (quizName: string, result: any) => {
    const newData = {
      ...userData,
      quizResults: {
        ...userData.quizResults,
        [quizName]: {
          ...result,
          completedAt: new Date().toISOString(),
        },
      },
    }
    setUserData(newData)
    localStorage.setItem("cosmicUserData", JSON.stringify(newData))
  }

  return <UserContext.Provider value={{ userData, updateUserData, updateQuizResult }}>{children}</UserContext.Provider>
}

const useUser = () => useContext(UserContext)

// ============= QUIZ DATA =============

// Archetype Quiz Data
const archetypeQuizData = {
  title: "Discover Your Cosmic Archetype",
  description:
    "This quiz will help you discover your primary cosmic archetype, revealing your spiritual strengths and growth areas.",
  questions: [
    {
      id: 1,
      text: "When faced with a difficult decision, I typically:",
      options: [
        { id: "a", text: "Follow my intuition and inner guidance", archetypes: { mystic: 2, healer: 1 } },
        { id: "b", text: "Analyze all possible outcomes logically", archetypes: { sage: 2, warrior: 1 } },
        { id: "c", text: "Seek advice from trusted friends or mentors", archetypes: { teacher: 2, explorer: 1 } },
        { id: "d", text: "Go with what feels right in my heart", archetypes: { lover: 2, creator: 1 } },
      ],
    },
    {
      id: 2,
      text: "I feel most energized when I am:",
      options: [
        { id: "a", text: "Creating something new or expressing myself", archetypes: { creator: 2, mystic: 1 } },
        { id: "b", text: "Learning or discovering new information", archetypes: { sage: 2, explorer: 1 } },
        { id: "c", text: "Helping others overcome their challenges", archetypes: { healer: 2, teacher: 1 } },
        { id: "d", text: "Overcoming obstacles and achieving goals", archetypes: { warrior: 2, lover: 1 } },
      ],
    },
    {
      id: 3,
      text: "My friends would describe me as:",
      options: [
        { id: "a", text: "Compassionate and nurturing", archetypes: { healer: 2, lover: 1 } },
        { id: "b", text: "Wise and insightful", archetypes: { sage: 2, teacher: 1 } },
        { id: "c", text: "Adventurous and free-spirited", archetypes: { explorer: 2, creator: 1 } },
        { id: "d", text: "Strong and determined", archetypes: { warrior: 2, mystic: 1 } },
      ],
    },
    {
      id: 4,
      text: "When I'm feeling stressed, I tend to:",
      options: [
        { id: "a", text: "Meditate or seek spiritual connection", archetypes: { mystic: 2, sage: 1 } },
        { id: "b", text: "Express myself through art or creativity", archetypes: { creator: 2, lover: 1 } },
        { id: "c", text: "Take action to solve the problem", archetypes: { warrior: 2, explorer: 1 } },
        { id: "d", text: "Talk it through with someone I trust", archetypes: { teacher: 2, healer: 1 } },
      ],
    },
    {
      id: 5,
      text: "I believe my life purpose involves:",
      options: [
        { id: "a", text: "Bringing beauty and harmony to the world", archetypes: { lover: 2, creator: 1 } },
        { id: "b", text: "Discovering truth and gaining wisdom", archetypes: { sage: 2, mystic: 1 } },
        { id: "c", text: "Helping others heal and grow", archetypes: { healer: 2, teacher: 1 } },
        { id: "d", text: "Exploring new frontiers and possibilities", archetypes: { explorer: 2, warrior: 1 } },
      ],
    },
  ],
  archetypes: {
    mystic: {
      name: "The Mystic",
      description:
        "You have a deep connection to the spiritual realm and often receive intuitive insights. Your strength lies in your ability to access higher wisdom and see beyond the material world.",
      strengths: ["Intuitive", "Spiritually connected", "Visionary", "Insightful"],
      growthAreas: ["Staying grounded", "Practical application", "Clear communication"],
    },
    sage: {
      name: "The Sage",
      description:
        "You seek truth and understanding above all else. Your strength lies in your wisdom, critical thinking, and ability to see the bigger picture in any situation.",
      strengths: ["Analytical", "Wise", "Objective", "Knowledgeable"],
      growthAreas: ["Emotional expression", "Taking action", "Accepting uncertainty"],
    },
    warrior: {
      name: "The Warrior",
      description:
        "You have a strong sense of purpose and the courage to overcome any obstacle. Your strength lies in your determination, discipline, and ability to protect what you value.",
      strengths: ["Courageous", "Disciplined", "Protective", "Focused"],
      growthAreas: ["Vulnerability", "Patience", "Flexibility"],
    },
    lover: {
      name: "The Lover",
      description:
        "You experience life through your heart and emotions. Your strength lies in your capacity for deep connection, appreciation of beauty, and ability to inspire others.",
      strengths: ["Passionate", "Empathetic", "Appreciative", "Inspiring"],
      growthAreas: ["Setting boundaries", "Logical decision-making", "Self-sufficiency"],
    },
    explorer: {
      name: "The Explorer",
      description:
        "You are drawn to new experiences and discoveries. Your strength lies in your adaptability, curiosity, and ability to navigate uncharted territory.",
      strengths: ["Adventurous", "Adaptable", "Curious", "Independent"],
      growthAreas: ["Commitment", "Routine", "Deep relationships"],
    },
    creator: {
      name: "The Creator",
      description:
        "You bring new ideas and expressions into the world. Your strength lies in your imagination, innovation, and ability to transform inspiration into reality.",
      strengths: ["Imaginative", "Innovative", "Expressive", "Original"],
      growthAreas: ["Structure", "Completion", "Practicality"],
    },
    healer: {
      name: "The Healer",
      description:
        "You have a natural ability to help others restore balance and wholeness. Your strength lies in your compassion, intuition, and ability to nurture growth.",
      strengths: ["Compassionate", "Nurturing", "Intuitive", "Supportive"],
      growthAreas: ["Self-care", "Setting boundaries", "Accepting limitations"],
    },
    teacher: {
      name: "The Teacher",
      description:
        "You illuminate the path for others through sharing knowledge and wisdom. Your strength lies in your clarity, guidance, and ability to inspire learning.",
      strengths: ["Articulate", "Inspiring", "Supportive", "Insightful"],
      growthAreas: ["Continuing to learn", "Adapting to different learning styles", "Patience"],
    },
  },
}

// Shadow Work Quiz Data
const shadowWorkQuizData = {
  title: "Shadow Work Assessment",
  description: "Discover the hidden aspects of your psyche that may be influencing your life in unseen ways.",
  questions: [
    {
      id: 1,
      text: "Which of these traits do you find most difficult to accept in others?",
      options: [
        { id: "a", text: "Neediness or dependency", shadows: { abandonment: 2, rejection: 1 } },
        { id: "b", text: "Dishonesty or manipulation", shadows: { betrayal: 2, unworthiness: 1 } },
        { id: "c", text: "Arrogance or superiority", shadows: { inadequacy: 2, invisibility: 1 } },
        { id: "d", text: "Aggression or domination", shadows: { powerlessness: 2, shame: 1 } },
      ],
    },
    {
      id: 2,
      text: "In your relationships, what pattern tends to repeat?",
      options: [
        { id: "a", text: "People leave or become distant", shadows: { abandonment: 2, invisibility: 1 } },
        { id: "b", text: "You give more than you receive", shadows: { unworthiness: 2, powerlessness: 1 } },
        { id: "c", text: "You struggle to fully trust others", shadows: { betrayal: 2, rejection: 1 } },
        { id: "d", text: "You hide parts of yourself", shadows: { shame: 2, inadequacy: 1 } },
      ],
    },
    {
      id: 3,
      text: "What emotion do you find most difficult to express?",
      options: [
        { id: "a", text: "Anger", shadows: { powerlessness: 2, betrayal: 1 } },
        { id: "b", text: "Sadness or grief", shadows: { abandonment: 2, shame: 1 } },
        { id: "c", text: "Fear or vulnerability", shadows: { inadequacy: 2, unworthiness: 1 } },
        { id: "d", text: "Need or desire", shadows: { rejection: 2, invisibility: 1 } },
      ],
    },
    {
      id: 4,
      text: "What triggers strong emotional reactions in you?",
      options: [
        { id: "a", text: "Being ignored or overlooked", shadows: { invisibility: 2, rejection: 1 } },
        { id: "b", text: "Being criticized or judged", shadows: { shame: 2, inadequacy: 1 } },
        { id: "c", text: "Having your trust broken", shadows: { betrayal: 2, abandonment: 1 } },
        { id: "d", text: "Feeling controlled or powerless", shadows: { powerlessness: 2, unworthiness: 1 } },
      ],
    },
    {
      id: 5,
      text: "What do you fear most in life?",
      options: [
        { id: "a", text: "Being alone or abandoned", shadows: { abandonment: 2, invisibility: 1 } },
        { id: "b", text: "Being inadequate or failing", shadows: { inadequacy: 2, shame: 1 } },
        { id: "c", text: "Being rejected or unloved", shadows: { rejection: 2, unworthiness: 1 } },
        { id: "d", text: "Being controlled or powerless", shadows: { powerlessness: 2, betrayal: 1 } },
      ],
    },
  ],
  shadows: {
    abandonment: {
      name: "The Abandonment Shadow",
      description:
        "This shadow stems from early experiences of being left or neglected. It manifests as fear of being alone, clingy behavior, or paradoxically, pushing others away before they can leave you.",
      healingPath:
        "Developing self-reliance and inner security while allowing healthy interdependence in relationships.",
      affirmation: "I am complete within myself, and I attract relationships that honor my wholeness.",
    },
    betrayal: {
      name: "The Betrayal Shadow",
      description:
        "This shadow forms when trust has been broken in significant relationships. It manifests as suspicion, difficulty trusting others, or testing people's loyalty.",
      healingPath: "Learning to trust wisely, developing discernment, and healing past wounds of betrayal.",
      affirmation: "I trust my ability to discern truth and to create relationships based on mutual respect.",
    },
    inadequacy: {
      name: "The Inadequacy Shadow",
      description:
        "This shadow develops from messages that you're not good enough. It manifests as perfectionism, overachievement, or avoiding challenges for fear of failure.",
      healingPath:
        "Embracing your inherent worthiness and recognizing that your value isn't determined by performance.",
      affirmation: "I am enough exactly as I am, and my worth is not determined by my achievements.",
    },
    invisibility: {
      name: "The Invisibility Shadow",
      description:
        "This shadow forms when your presence, needs, or contributions have been overlooked. It manifests as either withdrawing or demanding attention in unhealthy ways.",
      healingPath:
        "Learning to value your own presence and express yourself authentically without requiring external validation.",
      affirmation: "I am seen, heard, and valued for my authentic self.",
    },
    powerlessness: {
      name: "The Powerlessness Shadow",
      description:
        "This shadow develops from situations where you had no control or agency. It manifests as either excessive control-seeking or giving your power away too easily.",
      healingPath: "Reclaiming your personal power and agency while accepting what truly is beyond your control.",
      affirmation: "I am powerful in creating my experience, and I choose how to respond to life's circumstances.",
    },
    rejection: {
      name: "The Rejection Shadow",
      description:
        "This shadow stems from experiences of being dismissed or excluded. It manifests as fear of putting yourself out there or seeking approval at any cost.",
      healingPath: "Building self-acceptance and recognizing that not everyone will resonate with you—and that's okay.",
      affirmation: "I accept myself fully, and I attract those who appreciate my authentic nature.",
    },
    shame: {
      name: "The Shame Shadow",
      description:
        "This shadow forms from experiences of being made to feel fundamentally flawed. It manifests as hiding your true self, perfectionism, or self-sabotage.",
      healingPath:
        "Developing self-compassion and recognizing the difference between your actions and your inherent worth.",
      affirmation: "I embrace all aspects of myself with compassion and understanding.",
    },
    unworthiness: {
      name: "The Unworthiness Shadow",
      description:
        "This shadow develops from messages that you don't deserve love, success, or good things. It manifests as self-sacrifice, settling for less, or self-sabotage.",
      healingPath: "Recognizing your inherent worthiness and allowing yourself to receive without guilt.",
      affirmation: "I am worthy of love, abundance, and all good things simply because I exist.",
    },
  },
}

// Spiritual Gifts Assessment Data
const spiritualGiftsQuizData = {
  title: "Spiritual Gifts Assessment",
  description: "Discover your unique spiritual gifts and how they can be used to fulfill your purpose.",
  questions: [
    {
      id: 1,
      text: "Which of these activities brings you the most joy?",
      options: [
        { id: "a", text: "Helping others understand complex spiritual concepts", gifts: { teaching: 2, wisdom: 1 } },
        {
          id: "b",
          text: "Sensing what others are feeling and responding with compassion",
          gifts: { empathy: 2, healing: 1 },
        },
        { id: "c", text: "Receiving insights or visions about future events", gifts: { prophecy: 2, discernment: 1 } },
        {
          id: "d",
          text: "Creating harmony and connection between different people",
          gifts: { peacemaking: 2, leadership: 1 },
        },
      ],
    },
    {
      id: 2,
      text: "People often come to you when they need:",
      options: [
        { id: "a", text: "Emotional support and understanding", gifts: { empathy: 2, healing: 1 } },
        { id: "b", text: "Guidance for making important decisions", gifts: { wisdom: 2, discernment: 1 } },
        { id: "c", text: "Inspiration and motivation", gifts: { leadership: 2, prophecy: 1 } },
        { id: "d", text: "Help resolving conflicts", gifts: { peacemaking: 2, teaching: 1 } },
      ],
    },
    {
      id: 3,
      text: "You feel most fulfilled when you are:",
      options: [
        { id: "a", text: "Helping someone through a healing process", gifts: { healing: 2, empathy: 1 } },
        { id: "b", text: "Sharing insights that help others grow", gifts: { teaching: 2, wisdom: 1 } },
        { id: "c", text: "Bringing people together who were in conflict", gifts: { peacemaking: 2, leadership: 1 } },
        {
          id: "d",
          text: "Helping someone understand their life purpose or direction",
          gifts: { prophecy: 2, discernment: 1 },
        },
      ],
    },
    {
      id: 4,
      text: "Which statement resonates with you most strongly?",
      options: [
        { id: "a", text: "I can often sense the root cause of problems", gifts: { discernment: 2, wisdom: 1 } },
        { id: "b", text: "I naturally take charge in group situations", gifts: { leadership: 2, teaching: 1 } },
        {
          id: "c",
          text: "I can feel what others are feeling, sometimes before they do",
          gifts: { empathy: 2, healing: 1 },
        },
        {
          id: "d",
          text: "I often have insights about the future that turn out to be accurate",
          gifts: { prophecy: 2, peacemaking: 1 },
        },
      ],
    },
    {
      id: 5,
      text: "When facing a challenge, your first instinct is to:",
      options: [
        { id: "a", text: "Analyze the situation and find the wisest solution", gifts: { wisdom: 2, discernment: 1 } },
        { id: "b", text: "Rally people together and create a plan", gifts: { leadership: 2, teaching: 1 } },
        { id: "c", text: "Listen to your intuition about what will happen", gifts: { prophecy: 2, empathy: 1 } },
        { id: "d", text: "Find common ground between opposing viewpoints", gifts: { peacemaking: 2, healing: 1 } },
      ],
    },
  ],
  gifts: {
    teaching: {
      name: "Teaching",
      description:
        "You have a gift for making complex spiritual concepts understandable and applicable. You naturally break down information in ways that help others learn and grow.",
      howToUse:
        "Share your knowledge through teaching, writing, or mentoring. Focus on practical application rather than just theory.",
      growthAreas:
        "Continue to deepen your own knowledge. Learn to adapt your teaching style to different learning types.",
    },
    empathy: {
      name: "Empathy",
      description:
        "You have a heightened ability to sense and understand the emotions of others. You can often feel what others are feeling and provide comfort and understanding.",
      howToUse:
        "Create safe spaces for emotional healing. Listen deeply to others. Help people feel truly seen and understood.",
      growthAreas:
        "Develop strong boundaries to avoid emotional overwhelm. Learn to distinguish between your emotions and those you're picking up from others.",
    },
    prophecy: {
      name: "Prophecy",
      description:
        "You receive insights about future possibilities or hidden truths. You often have a clear sense of direction or purpose that guides both you and others.",
      howToUse:
        "Share your insights with humility and compassion. Help others understand the deeper meaning or purpose behind their experiences.",
      growthAreas:
        "Discern when to share insights and when to hold them. Learn to deliver difficult messages with compassion.",
    },
    wisdom: {
      name: "Wisdom",
      description:
        "You have a deep understanding of spiritual principles and how to apply them to real-life situations. You see beyond the surface to the heart of matters.",
      howToUse:
        "Offer guidance for complex decisions. Help others see situations from a higher perspective. Share your insights in ways that empower rather than create dependency.",
      growthAreas:
        "Remember that wisdom continues to deepen with experience. Stay humble and open to learning from all sources.",
    },
    healing: {
      name: "Healing",
      description:
        "You have a natural ability to facilitate healing on physical, emotional, or spiritual levels. Your presence often brings comfort and restoration to others.",
      howToUse:
        "Create spaces for healing work. Learn healing modalities that resonate with you. Remember that you facilitate healing—the person heals themselves.",
      growthAreas:
        "Accept that not all healing looks the same. Honor each person's unique healing journey. Practice self-care to maintain your own wellbeing.",
    },
    discernment: {
      name: "Discernment",
      description:
        "You can perceive the truth beneath the surface. You naturally sense the difference between authentic and inauthentic energies, messages, or motivations.",
      howToUse:
        "Help others navigate complex situations by identifying what's really going on. Trust your intuitive hits about people or situations.",
      growthAreas:
        "Learn to deliver your insights with compassion. Recognize that discernment is not judgment but clarity.",
    },
    leadership: {
      name: "Leadership",
      description:
        "You naturally inspire and motivate others toward a common goal. People trust your guidance and feel empowered in your presence.",
      howToUse:
        "Create initiatives that serve the greater good. Empower others to discover and use their own gifts. Lead by example rather than authority.",
      growthAreas: "Develop collaborative leadership skills. Learn to step back and let others lead when appropriate.",
    },
    peacemaking: {
      name: "Peacemaking",
      description:
        "You have a gift for creating harmony and resolving conflicts. You can see multiple perspectives and help find common ground between opposing viewpoints.",
      howToUse:
        "Mediate conflicts. Create spaces for difficult but necessary conversations. Help translate between different communication styles or perspectives.",
      growthAreas:
        "Learn to distinguish between true peace and temporary harmony that avoids necessary conflict. Develop skills for facilitating challenging conversations.",
    },
  },
}

// Purpose Finder Quiz Data
const purposeFinderQuizData = {
  title: "Purpose Finder Assessment",
  description: "Discover your unique life purpose and how to align with it more fully.",
  questions: [
    {
      id: 1,
      text: "What activities make you lose track of time?",
      options: [
        {
          id: "a",
          text: "Creative expression (art, writing, music, etc.)",
          values: ["creativity", "expression"],
          strengths: ["artistic", "innovative"],
        },
        {
          id: "b",
          text: "Learning and intellectual pursuits",
          values: ["knowledge", "growth"],
          strengths: ["analytical", "curious"],
        },
        {
          id: "c",
          text: "Helping and connecting with others",
          values: ["service", "connection"],
          strengths: ["empathetic", "supportive"],
        },
        {
          id: "d",
          text: "Building, organizing, or improving systems",
          values: ["structure", "efficiency"],
          strengths: ["methodical", "practical"],
        },
      ],
    },
    {
      id: 2,
      text: "What injustice or problem in the world most moves you to action?",
      options: [
        {
          id: "a",
          text: "Environmental degradation and climate change",
          values: ["sustainability", "harmony"],
          strengths: ["visionary", "persistent"],
        },
        {
          id: "b",
          text: "Social inequality and lack of opportunity",
          values: ["equality", "justice"],
          strengths: ["advocate", "compassionate"],
        },
        {
          id: "c",
          text: "Spiritual disconnection and lack of meaning",
          values: ["spirituality", "wisdom"],
          strengths: ["intuitive", "insightful"],
        },
        {
          id: "d",
          text: "Physical or mental suffering and illness",
          values: ["wellbeing", "healing"],
          strengths: ["nurturing", "resilient"],
        },
      ],
    },
    {
      id: 3,
      text: "What compliment would mean the most to you?",
      options: [
        {
          id: "a",
          text: "You've made a real difference in people's lives",
          values: ["impact", "service"],
          strengths: ["dedicated", "influential"],
        },
        {
          id: "b",
          text: "Your work is truly original and inspiring",
          values: ["creativity", "innovation"],
          strengths: ["original", "expressive"],
        },
        {
          id: "c",
          text: "You've overcome so much and grown tremendously",
          values: ["growth", "resilience"],
          strengths: ["adaptable", "courageous"],
        },
        {
          id: "d",
          text: "You bring people together and create harmony",
          values: ["connection", "harmony"],
          strengths: ["unifying", "diplomatic"],
        },
      ],
    },
    {
      id: 4,
      text: "What legacy would you most like to leave?",
      options: [
        {
          id: "a",
          text: "Innovations or creations that inspire others",
          values: ["creativity", "impact"],
          strengths: ["innovative", "visionary"],
        },
        {
          id: "b",
          text: "Wisdom or knowledge that helps future generations",
          values: ["wisdom", "legacy"],
          strengths: ["insightful", "thoughtful"],
        },
        {
          id: "c",
          text: "Healing or positive change in individuals or communities",
          values: ["healing", "transformation"],
          strengths: ["compassionate", "catalytic"],
        },
        {
          id: "d",
          text: "Structures or systems that improve people's lives",
          values: ["structure", "service"],
          strengths: ["organized", "practical"],
        },
      ],
    },
    {
      id: 5,
      text: "What gives you the greatest sense of fulfillment?",
      options: [
        {
          id: "a",
          text: "Mastering a skill or area of knowledge",
          values: ["mastery", "growth"],
          strengths: ["dedicated", "focused"],
        },
        {
          id: "b",
          text: "Connecting deeply with others",
          values: ["connection", "intimacy"],
          strengths: ["empathetic", "present"],
        },
        {
          id: "c",
          text: "Creating something meaningful",
          values: ["creativity", "meaning"],
          strengths: ["expressive", "imaginative"],
        },
        {
          id: "d",
          text: "Contributing to something larger than yourself",
          values: ["contribution", "transcendence"],
          strengths: ["selfless", "committed"],
        },
      ],
    },
  ],
  purposeTemplates: [
    {
      id: "creative-innovator",
      title: "Creative Innovator",
      description:
        "Your purpose centers around bringing new ideas, art, or solutions into the world. You thrive when you can express your unique vision and create things that didn't exist before.",
      values: ["creativity", "expression", "innovation", "originality"],
      strengths: ["artistic", "innovative", "original", "expressive", "imaginative"],
      fulfillment:
        "You find fulfillment through creative expression, innovation, and bringing your unique vision into reality.",
    },
    {
      id: "compassionate-healer",
      title: "Compassionate Healer",
      description:
        "Your purpose revolves around alleviating suffering and promoting wellbeing in others. You're naturally drawn to helping, healing, and supporting those in need.",
      values: ["healing", "wellbeing", "compassion", "service"],
      strengths: ["empathetic", "nurturing", "supportive", "compassionate", "resilient"],
      fulfillment: "You find fulfillment through helping others heal, grow, and thrive.",
    },
    {
      id: "wisdom-seeker",
      title: "Wisdom Seeker",
      description:
        "Your purpose involves the pursuit and sharing of knowledge, wisdom, and truth. You're driven to understand deeply and help others gain insight and clarity.",
      values: ["knowledge", "wisdom", "growth", "truth"],
      strengths: ["analytical", "curious", "insightful", "thoughtful", "focused"],
      fulfillment:
        "You find fulfillment through continuous learning, understanding complex truths, and sharing wisdom with others.",
    },
    {
      id: "community-builder",
      title: "Community Builder",
      description:
        "Your purpose centers around creating connection, harmony, and belonging among people. You naturally bring people together and foster meaningful relationships.",
      values: ["connection", "harmony", "community", "belonging"],
      strengths: ["unifying", "diplomatic", "empathetic", "present", "supportive"],
      fulfillment:
        "You find fulfillment through creating meaningful connections and building communities where people feel they truly belong.",
    },
    {
      id: "change-catalyst",
      title: "Change Catalyst",
      description:
        "Your purpose involves creating positive transformation in systems, societies, or individuals. You're driven to address injustice and create meaningful change.",
      values: ["justice", "equality", "transformation", "impact"],
      strengths: ["advocate", "persistent", "influential", "catalytic", "courageous"],
      fulfillment:
        "You find fulfillment through creating positive change and addressing systemic problems in the world.",
    },
    {
      id: "visionary-guide",
      title: "Visionary Guide",
      description:
        "Your purpose revolves around helping others see new possibilities and navigate toward their highest potential. You inspire others with your vision of what could be.",
      values: ["vision", "potential", "inspiration", "growth"],
      strengths: ["visionary", "intuitive", "insightful", "inspiring", "perceptive"],
      fulfillment:
        "You find fulfillment through inspiring others with new possibilities and helping them navigate toward their highest potential.",
    },
    {
      id: "practical-builder",
      title: "Practical Builder",
      description:
        "Your purpose centers around creating structures, systems, or solutions that have practical benefit. You excel at turning ideas into reality and creating order from chaos.",
      values: ["structure", "efficiency", "practicality", "reliability"],
      strengths: ["methodical", "practical", "organized", "reliable", "resourceful"],
      fulfillment:
        "You find fulfillment through building practical systems and structures that improve people's lives in tangible ways.",
    },
    {
      id: "spiritual-illuminator",
      title: "Spiritual Illuminator",
      description:
        "Your purpose involves bringing greater spiritual awareness, meaning, and connection to the sacred. You help others connect with something larger than themselves.",
      values: ["spirituality", "meaning", "transcendence", "connection"],
      strengths: ["intuitive", "insightful", "present", "selfless", "committed"],
      fulfillment:
        "You find fulfillment through deepening spiritual connection and helping others find greater meaning and purpose.",
    },
  ],
}

// ============= QUIZ COMPONENTS =============

// Generic Quiz Component
const Quiz = ({ quizData, quizName, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState(null)

  const handleAnswer = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option,
    })

    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResults()
    }
  }

  const calculateResults = () => {
    if (quizName === "archetype" || quizName === "shadowWork" || quizName === "spiritualGifts") {
      // For archetype, shadow work, and spiritual gifts quizzes
      const scores = {}

      // Initialize scores
      if (quizName === "archetype") {
        Object.keys(quizData.archetypes).forEach((key) => {
          scores[key] = 0
        })
      } else if (quizName === "shadowWork") {
        Object.keys(quizData.shadows).forEach((key) => {
          scores[key] = 0
        })
      } else if (quizName === "spiritualGifts") {
        Object.keys(quizData.gifts).forEach((key) => {
          scores[key] = 0
        })
      }

      // Calculate scores
      Object.entries(answers).forEach(([questionId, answer]) => {
        const question = quizData.questions.find((q) => q.id === Number.parseInt(questionId))
        if (!question) return

        const selectedOption = question.options.find((o) => o.id === answer)
        if (!selectedOption) return

        if (quizName === "archetype" && selectedOption.archetypes) {
          Object.entries(selectedOption.archetypes).forEach(([archetype, points]) => {
            scores[archetype] = (scores[archetype] || 0) + points
          })
        } else if (quizName === "shadowWork" && selectedOption.shadows) {
          Object.entries(selectedOption.shadows).forEach(([shadow, points]) => {
            scores[shadow] = (scores[shadow] || 0) + points
          })
        } else if (quizName === "spiritualGifts" && selectedOption.gifts) {
          Object.entries(selectedOption.gifts).forEach(([gift, points]) => {
            scores[gift] = (scores[gift] || 0) + points
          })
        }
      })

      // Find highest score
      let highestScore = 0
      let primaryType = ""

      Object.entries(scores).forEach(([type, score]) => {
        if (score > highestScore) {
          highestScore = score
          primaryType = type
        }
      })

      let result
      if (quizName === "archetype") {
        result = {
          primaryArchetype: primaryType,
          archetypeDetails: quizData.archetypes[primaryType],
          scores,
        }
      } else if (quizName === "shadowWork") {
        result = {
          primaryShadow: primaryType,
          shadowDetails: quizData.shadows[primaryType],
          scores,
        }
      } else if (quizName === "spiritualGifts") {
        result = {
          primaryGift: primaryType,
          giftDetails: quizData.gifts[primaryType],
          scores,
        }
      }

      setResults(result)
      onComplete(result)
      setShowResults(true)
    } else if (quizName === "purposeFinder") {
      // For purpose finder quiz
      const values = []
      const strengths = []

      // Collect values and strengths
      Object.entries(answers).forEach(([questionId, answer]) => {
        const question = quizData.questions.find((q) => q.id === Number.parseInt(questionId))
        if (!question) return

        const selectedOption = question.options.find((o) => o.id === answer)
        if (!selectedOption) return

        if (selectedOption.values) {
          selectedOption.values.forEach((value) => {
            if (!values.includes(value)) {
              values.push(value)
            }
          })
        }

        if (selectedOption.strengths) {
          selectedOption.strengths.forEach((strength) => {
            if (!strengths.includes(strength)) {
              strengths.push(strength)
            }
          })
        }
      })

      // Find best matching purpose template
      let bestMatch = null
      let highestMatchScore = 0

      quizData.purposeTemplates.forEach((template) => {
        let matchScore = 0

        // Count matching values
        template.values.forEach((value) => {
          if (values.includes(value)) {
            matchScore += 2
          }
        })

        // Count matching strengths
        template.strengths.forEach((strength) => {
          if (strengths.includes(strength)) {
            matchScore += 1
          }
        })

        if (matchScore > highestMatchScore) {
          highestMatchScore = matchScore
          bestMatch = template
        }
      })

      const result = {
        purpose: bestMatch.title,
        purposeDetails: bestMatch,
        values,
        strengths,
      }

      setResults(result)
      onComplete(result)
      setShowResults(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setResults(null)
  }

  if (showResults) {
    if (quizName === "archetype") {
      return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-purple-800">
            Your Primary Archetype: {results.archetypeDetails.name}
          </h2>
          <p className="mb-4 text-gray-700">{results.archetypeDetails.description}</p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-purple-700">Your Strengths</h3>
            <ul className="list-disc pl-5 mb-4">
              {results.archetypeDetails.strengths.map((strength, index) => (
                <li key={index} className="text-gray-700">
                  {strength}
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mb-2 text-purple-700">Growth Areas</h3>
            <ul className="list-disc pl-5">
              {results.archetypeDetails.growthAreas.map((area, index) => (
                <li key={index} className="text-gray-700">
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-purple-700">Your Archetype Profile</h3>
            <div className="space-y-2">
              {Object.entries(results.scores).map(([archetype, score]) => (
                <div key={archetype} className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 capitalize">{archetype}</span>
                    <span className="text-sm font-medium text-gray-700">{score}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${(score / 10) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      )
    } else if (quizName === "shadowWork") {
      return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-indigo-800">Your Primary Shadow: {results.shadowDetails.name}</h2>
          <p className="mb-4 text-gray-700">{results.shadowDetails.description}</p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">Healing Path</h3>
            <p className="text-gray-700 mb-4">{results.shadowDetails.healingPath}</p>

            <h3 className="text-xl font-semibold mb-2 text-indigo-700">Affirmation</h3>
            <p className="italic text-gray-700">"{results.shadowDetails.affirmation}"</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">Your Shadow Profile</h3>
            <div className="space-y-2">
              {Object.entries(results.scores).map(([shadow, score]) => (
                <div key={shadow} className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 capitalize">{shadow}</span>
                    <span className="text-sm font-medium text-gray-700">{score}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${(score / 10) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      )
    } else if (quizName === "spiritualGifts") {
      return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-teal-800">
            Your Primary Spiritual Gift: {results.giftDetails.name}
          </h2>
          <p className="mb-4 text-gray-700">{results.giftDetails.description}</p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-teal-700">How to Use Your Gift</h3>
            <p className="text-gray-700 mb-4">{results.giftDetails.howToUse}</p>

            <h3 className="text-xl font-semibold mb-2 text-teal-700">Areas for Growth</h3>
            <p className="text-gray-700">{results.giftDetails.growthAreas}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-teal-700">Your Spiritual Gifts Profile</h3>
            <div className="space-y-2">
              {Object.entries(results.scores).map(([gift, score]) => (
                <div key={gift} className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 capitalize">{gift}</span>
                    <span className="text-sm font-medium text-gray-700">{score}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: `${(score / 10) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      )
    } else if (quizName === "purposeFinder") {
      return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-amber-800">Your Life Purpose: {results.purpose}</h2>
          <p className="mb-4 text-gray-700">{results.purposeDetails.description}</p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-amber-700">Your Core Values</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {results.values.map((value, index) => (
                <span key={index} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm capitalize">
                  {value}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-2 text-amber-700">Your Key Strengths</h3>
            <div className="flex flex-wrap gap-2">
              {results.strengths.map((strength, index) => (
                <span key={index} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm capitalize">
                  {strength}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-amber-700">Fulfillment Path</h3>
            <p className="text-gray-700">{results.purposeDetails.fulfillment}</p>
          </div>

          <button
            onClick={resetQuiz}
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      )
    }
  }

  const question = quizData.questions[currentQuestion]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{quizData.title}</h2>
        <p className="text-gray-600">{quizData.description}</p>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-500 text-right">
          Question {currentQuestion + 1} of {quizData.questions.length}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">{question.text}</h3>
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(question.id, option.id)}
              className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Archetype Quiz Component
const ArchetypeQuiz = () => {
  const { updateQuizResult } = useUser()

  const handleComplete = (result) => {
    updateQuizResult("archetype", result)
  }

  return <Quiz quizData={archetypeQuizData} quizName="archetype" onComplete={handleComplete} />
}

// Shadow Work Quiz Component
const ShadowWorkQuiz = () => {
  const { updateQuizResult } = useUser()

  const handleComplete = (result) => {
    updateQuizResult("shadowWork", result)
  }

  return <Quiz quizData={shadowWorkQuizData} quizName="shadowWork" onComplete={handleComplete} />
}

// Spiritual Gifts Quiz Component
const SpiritualGiftsQuiz = () => {
  const { updateQuizResult } = useUser()

  const handleComplete = (result) => {
    updateQuizResult("spiritualGifts", result)
  }

  return <Quiz quizData={spiritualGiftsQuizData} quizName="spiritualGifts" onComplete={handleComplete} />
}

// Purpose Finder Quiz Component
const PurposeFinderQuiz = () => {
  const { updateQuizResult } = useUser()

  const handleComplete = (result) => {
    updateQuizResult("purposeFinder", result)
  }

  return <Quiz quizData={purposeFinderQuizData} quizName="purposeFinder" onComplete={handleComplete} />
}

// Quizzes Section Component
const QuizzesSection = () => {
  const [activeQuiz, setActiveQuiz] = useState(null)
  const { userData } = useUser()

  const quizzes = [
    {
      id: "archetype",
      name: "Cosmic Archetype Quiz",
      description: "Discover your primary cosmic archetype and how it shapes your spiritual journey.",
      component: <ArchetypeQuiz />,
      completed: !!userData.quizResults.archetype,
      color: "purple",
    },
    {
      id: "shadowWork",
      name: "Shadow Work Assessment",
      description: "Uncover the hidden aspects of your psyche that may be influencing your life.",
      component: <ShadowWorkQuiz />,
      completed: !!userData.quizResults.shadowWork,
      color: "indigo",
    },
    {
      id: "spiritualGifts",
      name: "Spiritual Gifts Assessment",
      description: "Identify your unique spiritual gifts and how to use them in your life.",
      component: <SpiritualGiftsQuiz />,
      completed: !!userData.quizResults.spiritualGifts,
      color: "teal",
    },
    {
      id: "purposeFinder",
      name: "Purpose Finder Quiz",
      description: "Discover your unique life purpose and how to align with it more fully.",
      component: <PurposeFinderQuiz />,
      completed: !!userData.quizResults.purposeFinder,
      color: "amber",
    },
  ]

  if (activeQuiz) {
    const quiz = quizzes.find((q) => q.id === activeQuiz)
    return (
      <div className="p-4">
        <button
          onClick={() => setActiveQuiz(null)}
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Quizzes
        </button>
        {quiz.component}
      </div>
    )
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Self-Discovery Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-${quiz.color}-500`}
          >
            <div className="p-5">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold mb-2">{quiz.name}</h3>
                {quiz.completed && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Completed
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-4">{quiz.description}</p>
              <button
                onClick={() => setActiveQuiz(quiz.id)}
                className={`px-4 py-2 bg-${quiz.color}-600 text-white rounded-md hover:bg-${quiz.color}-700 transition-colors`}
              >
                {quiz.completed ? "Retake Quiz" : "Start Quiz"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Results Dashboard Component
const ResultsDashboard = () => {
  const { userData } = useUser()
  const { quizResults } = userData

  const hasResults = Object.keys(quizResults).length > 0

  if (!hasResults) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Your Results Dashboard</h2>
        <p className="text-gray-600">You haven't completed any quizzes yet. Take a quiz to see your results here!</p>
      </div>
    )
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Your Results Dashboard</h2>

      <div className="space-y-8">
        {quizResults.archetype && (
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="text-xl font-semibold mb-2">
              Your Cosmic Archetype: {quizResults.archetype.primaryArchetype}
            </h3>
            <p className="text-gray-600 mb-2">
              Completed on {new Date(quizResults.archetype.completedAt).toLocaleDateString()}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {Object.entries(quizResults.archetype.scores).map(([archetype, score]) => (
                <div key={archetype} className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 capitalize mr-1">{archetype}:</span>
                  <span className="text-sm font-bold text-purple-700">{score}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {quizResults.shadowWork && (
          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="text-xl font-semibold mb-2">Your Primary Shadow: {quizResults.shadowWork.primaryShadow}</h3>
            <p className="text-gray-600 mb-2">
              Completed on {new Date(quizResults.shadowWork.completedAt).toLocaleDateString()}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {Object.entries(quizResults.shadowWork.scores).map(([shadow, score]) => (
                <div key={shadow} className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 capitalize mr-1">{shadow}:</span>
                  <span className="text-sm font-bold text-indigo-700">{score}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {quizResults.spiritualGifts && (
          <div className="border-l-4 border-teal-500 pl-4">
            <h3 className="text-xl font-semibold mb-2">
              Your Primary Spiritual Gift: {quizResults.spiritualGifts.primaryGift}
            </h3>
            <p className="text-gray-600 mb-2">
              Completed on {new Date(quizResults.spiritualGifts.completedAt).toLocaleDateString()}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {Object.entries(quizResults.spiritualGifts.scores).map(([gift, score]) => (
                <div key={gift} className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 capitalize mr-1">{gift}:</span>
                  <span className="text-sm font-bold text-teal-700">{score}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {quizResults.purposeFinder && (
          <div className="border-l-4 border-amber-500 pl-4">
            <h3 className="text-xl font-semibold mb-2">Your Life Purpose: {quizResults.purposeFinder.purpose}</h3>
            <p className="text-gray-600 mb-2">
              Completed on {new Date(quizResults.purposeFinder.completedAt).toLocaleDateString()}
            </p>
            <div className="mt-2">
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-700">Core Values:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {quizResults.purposeFinder.values.map((value, index) => (
                    <span key={index} className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs capitalize">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Key Strengths:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {quizResults.purposeFinder.strengths.map((strength, index) => (
                    <span key={index} className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs capitalize">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============= MAIN APP =============

// Profile Component
const Profile = () => {
  const { userData, updateUserData } = useUser()
  const [name, setName] = useState(userData.name)
  const [email, setEmail] = useState(userData.email)

  const handleSubmit = (e) => {
    e.preventDefault()
    updateUserData({ name, email })
    alert("Profile updated successfully!")
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </form>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Your Quiz Results</h3>
          <ResultsDashboard />
        </div>
      </div>
    </div>
  )
}

// Home Component
const Home = () => {
  const { userData } = useUser();
  const hasResults = Object.keys(userData.quizResults).length > 0;
  
  return (
    <div className="p-4">
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">Welcome to Cosmic Astrology</h1>
        <p className="text-lg">Your journey to self-discovery and spiritual growth</p>
      </div>
      
      {hasResults ? (
        <ResultsDashboard />
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Begin Your\
