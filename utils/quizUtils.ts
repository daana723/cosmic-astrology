import type { ArchetypeScores } from "@/types"

// Archetype scoring algorithm function
export function calculateArchetypeScores(responses: any[]): ArchetypeScores {
  let scores = {
    visionary: 0,
    healer: 0,
    maverick: 0,
    explorer: 0,
  }

  // Process each question response
  responses.forEach((response) => {
    // Add weighted values to appropriate archetype scores
    scores.visionary += response.visionaryWeight * response.value
    scores.healer += response.healerWeight * response.value
    scores.maverick += response.maverickWeight * response.value
    scores.explorer += response.explorerWeight * response.value
  })

  // Normalize scores to percentages
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0)

  if (total > 0) {
    Object.keys(scores).forEach((key) => {
      scores[key as keyof ArchetypeScores] = Math.round((scores[key as keyof ArchetypeScores] / total) * 100)
    })
  } else {
    // Default even distribution if no scores
    scores = {
      visionary: 25,
      healer: 25,
      maverick: 25,
      explorer: 25,
    }
  }

  return scores
}

// Determine primary and secondary archetypes
export function determineArchetypes(scores: ArchetypeScores) {
  const sortedArchetypes = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0])

  return {
    primary: sortedArchetypes[0] as "visionary" | "healer" | "maverick" | "explorer",
    secondary: sortedArchetypes[1] as "visionary" | "healer" | "maverick" | "explorer",
    scores: scores,
  }
}

// Generate recommendations based on archetype results
export function generateRecommendations(archetypeResults: any) {
  const recommendations = {
    practices: [] as string[],
    resources: [] as string[],
    journalPrompts: [] as string[],
    communityGroups: [] as string[],
  }

  // Add recommendations based on primary archetype
  switch (archetypeResults.primary) {
    case "visionary":
      recommendations.practices.push("Future visualization meditation", "Intuitive drawing", "Dream journaling")
      recommendations.resources.push("Visionary archetype guide", "Future-casting techniques")
      recommendations.journalPrompts.push(
        "What future do you sense is possible?",
        "How can you bring your vision into reality?",
      )
      recommendations.communityGroups.push("Visionaries Circle")
      break
    case "healer":
      recommendations.practices.push("Energy healing techniques", "Compassion meditation", "Nature connection rituals")
      recommendations.resources.push("Healer archetype guide", "Emotional intelligence resources")
      recommendations.journalPrompts.push(
        "How can you better care for yourself while caring for others?",
        "What healing modality resonates most with you?",
      )
      recommendations.communityGroups.push("Healers Haven")
      break
    case "maverick":
      recommendations.practices.push("Boundary-setting exercises", "Creative expression", "Systems thinking")
      recommendations.resources.push("Maverick archetype guide", "Revolutionary thinkers biography collection")
      recommendations.journalPrompts.push(
        "What conventional wisdom do you question?",
        "How can you create positive change through disruption?",
      )
      recommendations.communityGroups.push("Paradigm Shifters")
      break
    case "explorer":
      recommendations.practices.push(
        "Mindfulness meditation",
        "Consciousness exploration",
        "Diverse spiritual practices study",
      )
      recommendations.resources.push("Explorer archetype guide", "Comparative spirituality resources")
      recommendations.journalPrompts.push(
        "What new spiritual territory calls to you?",
        "How can you integrate diverse wisdom traditions?",
      )
      recommendations.communityGroups.push("Spiritual Explorers Guild")
      break
  }

  return recommendations
}
