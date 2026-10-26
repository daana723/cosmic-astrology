import { supabase } from "./supabase"
import type { JournalEntry, SpiritualProfile } from "@/types"

// User profile functions
export async function getProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}

export async function updateProfile(userId: string, updates: any) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()

  if (error) throw error
  return data
}

// Spiritual profile functions
export async function getSpiritualProfile(userId: string) {
  const { data, error } = await supabase.from("spiritual_profiles").select("*").eq("user_id", userId).single()

  if (error && error.code !== "PGRST116") throw error // PGRST116 is "no rows returned"
  return data
}

export async function updateSpiritualProfile(userId: string, updates: Partial<SpiritualProfile>) {
  // Check if profile exists
  const existingProfile = await getSpiritualProfile(userId)

  if (existingProfile) {
    // Update existing profile
    const { data, error } = await supabase
      .from("spiritual_profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .select()

    if (error) throw error
    return data
  } else {
    // Create new profile
    const { data, error } = await supabase
      .from("spiritual_profiles")
      .insert({
        id: crypto.randomUUID(),
        user_id: userId,
        ...updates,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()

    if (error) throw error
    return data
  }
}

// Journal entry functions
export async function getJournalEntries(userId: string) {
  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

export async function createJournalEntry(
  userId: string,
  entry: Omit<JournalEntry, "id" | "user_id" | "created_at" | "updated_at">,
) {
  const { data, error } = await supabase
    .from("journal_entries")
    .insert({
      user_id: userId,
      ...entry,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()

  if (error) throw error
  return data[0]
}

export async function updateJournalEntry(entryId: string, userId: string, updates: Partial<JournalEntry>) {
  const { data, error } = await supabase
    .from("journal_entries")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", entryId)
    .eq("user_id", userId) // Security check
    .select()

  if (error) throw error
  return data[0]
}

export async function deleteJournalEntry(entryId: string, userId: string) {
  const { error } = await supabase.from("journal_entries").delete().eq("id", entryId).eq("user_id", userId) // Security check

  if (error) throw error
  return true
}

// Quiz results functions
export async function saveQuizResult(userId: string, quizType: string, results: any) {
  const { data, error } = await supabase
    .from("quiz_results")
    .insert({
      user_id: userId,
      quiz_type: quizType,
      results,
      completed_at: new Date().toISOString(),
    })
    .select()

  if (error) throw error
  return data[0]
}

export async function getQuizResults(userId: string, quizType?: string) {
  let query = supabase.from("quiz_results").select("*").eq("user_id", userId)

  if (quizType) {
    query = query.eq("quiz_type", quizType)
  }

  const { data, error } = await query.order("completed_at", { ascending: false })

  if (error) throw error
  return data || []
}
