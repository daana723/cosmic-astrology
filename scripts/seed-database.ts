import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"

// Initialize Supabase client with admin privileges
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedDatabase() {
  try {
    console.log("Starting database seeding...")

    // Sample user data
    const users = [
      {
        email: "luna@example.com",
        password: "password123", // In a real app, use a secure password
        userData: {
          name: "Luna Starlight",
          profile_image: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        spiritualProfile: {
          archetype_primary: "visionary",
          archetype_secondary: "healer",
          birth_date: "1988-04-12",
          birth_time: "03:45:00",
          birth_location: "Sedona, Arizona",
          interests: ["Quantum Consciousness", "Astral Projection", "Sacred Geometry"],
        },
      },
      {
        email: "orion@example.com",
        password: "password123",
        userData: {
          name: "Orion Phoenix",
          profile_image: "https://randomuser.me/api/portraits/men/22.jpg",
        },
        spiritualProfile: {
          archetype_primary: "maverick",
          archetype_secondary: "explorer",
          birth_date: "1992-11-23",
          birth_time: "22:17:00",
          birth_location: "Boulder, Colorado",
          interests: ["Energy Healing", "Manifestation", "Starseed Origins"],
        },
      },
    ]

    // Create users and their related data
    for (const user of users) {
      // 1. Create user in auth.users
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
        user_metadata: user.userData,
      })

      if (authError) {
        console.error(`Error creating user ${user.email}:`, authError)
        continue
      }

      const userId = authUser.user.id
      console.log(`Created user: ${user.email} with ID: ${userId}`)

      // 2. Create profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        name: user.userData.name,
        email: user.email,
        profile_image: user.userData.profile_image,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (profileError) {
        console.error(`Error creating profile for ${user.email}:`, profileError)
        continue
      }

      // 3. Create spiritual profile
      const { error: spiritualProfileError } = await supabase.from("spiritual_profiles").insert({
        id: uuidv4(),
        user_id: userId,
        ...user.spiritualProfile,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (spiritualProfileError) {
        console.error(`Error creating spiritual profile for ${user.email}:`, spiritualProfileError)
      }

      // 4. Add journal entries
      if (user.email === "luna@example.com") {
        const { error: journalError } = await supabase.from("journal_entries").insert([
          {
            id: uuidv4(),
            user_id: userId,
            title: "Powerful Dream Connection",
            content:
              "Last night I had an incredibly vivid dream where I was communicating with beings of light. They showed me symbols that seemed to be a language of sacred geometry. I woke up feeling energized and with a clear understanding of my next steps on my spiritual journey.",
            entry_type: "dream",
            mood: "Inspired",
            tags: ["dream-work", "higher-beings", "guidance"],
            is_private: true,
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: uuidv4(),
            user_id: userId,
            title: "Synchronicity with 1111",
            content:
              "I've been seeing 1111 everywhere for the past week. Today, I received an unexpected message from an old friend exactly at 11:11, and they mentioned they've been thinking about reaching out for exactly 11 days. The universe is clearly trying to tell me something about alignment and new beginnings.",
            entry_type: "synchronicity",
            mood: "Reflective",
            tags: ["number-patterns", "divine-timing", "alignment"],
            is_private: true,
            created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ])

        if (journalError) {
          console.error(`Error creating journal entries for ${user.email}:`, journalError)
        }

        // 5. Add quiz results
        const { error: quizError } = await supabase.from("quiz_results").insert({
          id: uuidv4(),
          user_id: userId,
          quiz_type: "archetype",
          results: {
            primary: "visionary",
            secondary: "healer",
            scores: {
              visionary: 65,
              healer: 20,
              maverick: 10,
              explorer: 5,
            },
            timestamp: "2023-04-15T14:22:33Z",
          },
          completed_at: "2023-04-15T14:22:33Z",
        })

        if (quizError) {
          console.error(`Error creating quiz results for ${user.email}:`, quizError)
        }

        // 6. Add meditation sessions
        const { error: meditationError } = await supabase.from("meditation_sessions").insert({
          id: uuidv4(),
          user_id: userId,
          duration: 600,
          completed: true,
          ambience: "Cosmic White Noise",
          created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        })

        if (meditationError) {
          console.error(`Error creating meditation session for ${user.email}:`, meditationError)
        }
      }
    }

    console.log("Database seeding completed successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}

// Run the seeding function
seedDatabase()
