/**
 * Reading text for the £5.99 Cosmic Clarity mini reading.
 *
 * Hand-written templates selected by sign and element — deliberately NOT an LLM
 * call, so the words never drift from the chart that was actually computed.
 * Voice: warm, blunt, no mysticism, no fear, ND-friendly.
 */
import type { Sign } from "./ephemeris"

export type Element = "fire" | "earth" | "air" | "water"

export const SUN_TEXT: Record<Sign, string> = {
  Aries:
    "You start before you feel ready — that is the engine, not a flaw. Your friction is finishing: the spark is cheap, the second hour is not. Work in bursts with a visible end, and protect one small daily thing that only you do.",
  Taurus:
    "You build slowly and it lasts. Your friction is switching: forced pivots cost you more than most, and “just be flexible” is bad advice for your wiring. Give yourself permission to finish the thing you started, and change one variable at a time.",
  Gemini:
    "You think in many voices, which is a research superpower and an attention tax. Your friction is the flat afterwards — you read fast, feel fine, then crash. Pair novelty with one boring anchor: same time, same desk, same first task.",
  Cancer:
    "You remember everything, including the tone of voice from 2019. That depth is the gift and the cost. Your friction is absorbing rooms that were never yours to carry; decide in advance what counts as yours, and put the rest down at the door.",
  Leo:
    "You do your best work seen — not for applause, for feedback loops: visible progress is literally your fuel. Your friction is the invisible grind, so stage your work in public in small safe pieces and let the audience pull you forward.",
  Virgo:
    "Your eye finds the flaw because it genuinely sees systems others miss. The trap is that “fixed” is a feeling you rarely get, so you polish past the point of return. Define “good enough” before you start, in writing, and ship at that line.",
  Libra:
    "You see both sides instantly, which makes starting slow and deciding expensive. Your friction is not inability, it is cost: every choice feels like losing the other one. Shrink decisions with defaults, deadlines and “reversible” labels — reversible means pick fast.",
  Scorpio:
    "You go all the way in or not at all, and half-measures drain you. Your friction is trust — with people, and with your own plans you have abandoned before. Bet small first: tiny commitments you keep are how you rebuild faith in your own word.",
  Sagittarius:
    "You need horizon — the next idea, the next map — or the present task feels like a cage. Your friction is the middle of anything, which is exactly where the value hides. Contract the middle: fewer, bigger bets; make the horizon a reward, not an escape.",
  Capricorn:
    "You carry responsibility easily and rest hard to earn. Your friction is the inner boss that moves the finish line; you are likely working for an audience of one very demanding person. Schedule rest like a board meeting — non-negotiable, booked first.",
  Aquarius:
    "You see the system from outside it, which makes your ideas original and belonging complicated. Your friction is translating: people experience your clarity as coldness or distance, when it is just altitude. Find your two, not the crowd — odd ideas need witnesses.",
  Pisces:
    "You absorb the room, make meaning from it, and forget where you end and it begins. Your friction is surface tension — starting feels like wading. Keep edges: fixed hours, tidy rituals, one shallow end you always return to.",
}

export const MOON_TEXT: Record<Sign, string> = {
  Aries:
    "Your inner weather is fast and honest: frustrated, done, hungry, fine — all within the hour. You need an outlet before the fuse shorts: movement, hitting something soft, one blunt sentence said early. Suppress it and it leaks out as irritability for days.",
  Taurus:
    "You self-soothe with comfort and routine: food, sleep, familiar things, unhurried mornings. When you are unwell it is usually a body-need list — hungry, tired, over-scheduled — run it top to bottom before assuming it is emotional.",
  Gemini:
    "You settle by talking or typing it out — not because you need advice, because thinking aloud is how your feelings become legible to you. Silence is what actually destabilises you; one good conversation can reset a whole day.",
  Cancer:
    "You need a safe harbor you can be soft in — one person, one place, one blanket with zero performance required. After that, you come back sharper. The risk is hiding the need because asking felt once like danger. It is not.",
  Leo:
    "You need warmth and acknowledgment like a plant needs light — not vanity, fuel. Say the nice thing to yourself if nobody else will; write down the win, small as it is, and the grey afternoon lifts faster than you expect.",
  Virgo:
    "Your nervous system calms through order: a cleared surface, a checked list, a fixed thing. “Relax” will not work; tidy for ten minutes and observe what happens instead. When chaos is unavoidable, shrink your world to one drawer until it passes.",
  Libra:
    "You regulate through beauty and balance — a good playlist, a nice room, an even conversation. Ugly environments tax you invisibly, so choose them on purpose: the café, the wallpaper, the desk. Aesthetic calm is not a luxury for you, it is maintenance.",
  Scorpio:
    "You feel everything at full depth but show almost none of it, which is private, not broken. What you need is one trusted recipient; without one, feelings become suspicion. Find or name the one — even a journal counts.",
  Sagittarius:
    "You recharge by widening the frame: a walk, a map, a documentary, a plan. Confinement is your fast track to bad mood, so dose freedom on purpose rather than using it as escape when things get hard.",
  Capricorn:
    "You feel safest when competent: when the problem is handled, the body relaxes. Unstructured rest feels like failing, so give downtime a job — repair, cooking, walking distance. Earned calm is yours, so just shrink the earning.",
  Aquarius:
    "You decompress alone, at a distance, on your own schedule — and this is legitimate, not coldness. Your trap is delaying it until you snap; take the solitude before you “need” it and let people know it refills you.",
  Pisces:
    "You need a shoreline after heavy water: routine, movement, an early night — you absorb more than you notice. Unprocessed days surface later as fog; the fix is boring and works — write three lines before bed, sleep, check again.",
}

export const RISING_TEXT: Record<Sign, string> = {
  Aries:
    "First impression: quick, direct, a little breathless with intent. People meet the accelerator, and it takes them a while to find the careful you underneath. Decisions arrive before the information does, then you reverse-engineer the information.",
  Taurus:
    "You give rooms gravity: steady, unhurried, unshakeable. People assume you are unbothered long after you have stopped being unbothered. The inner weather is much more tender than the outer stone.",
  Gemini:
    "First impression: bright, curious, ten conversations at once — people sense the antennae immediately. What hides behind the quickness is how carefully you actually weigh things. The playful surface is a door, not the house.",
  Cancer:
    "First impression: warm, polite, slightly guarded — you extend comfort but check the exits. People feel welcomed before they feel seen, and that gap is by design. Once the gate opens, loyalty is enormous.",
  Leo:
    "First impression: presence — you walk in and the room notices, whether or not you want it to. The confidence people assume is often performance for the nervous kid inside. The warmth behind it, though, is entirely real.",
  Virgo:
    "First impression: calm, competent, observant — you clock the details and say half of them. People expect a machine and find a worrier with a heart of gold; the worry is the price of the care.",
  Libra:
    "First impression: easy, agreeable, hard to dislike — social grace as architecture. People never see the decision tax underneath the pleasant surface. “I don’t mind” has cost you more than anyone knows.",
  Scorpio:
    "First impression: intense, private, a little unreadable — you are assessing and know that you are. Small talk feels like an intrusion to you and people sense it. Under the vault, though, is some of the deepest loyalty there is.",
  Sagittarius:
    "First impression: open, funny, already halfway somewhere else — freedom radiates off you. People mistake the cheer for a lack of depth; it is the other way around — optimism is your hard-won philosophy.",
  Capricorn:
    "First impression: capable and serious — people hand you responsibility before you have earned the right to refuse it. The playful person exists; they just need explicit permission from someone they trust.",
  Aquarius:
    "First impression: distinct — you do not blend in, on purpose or by physics. People read you detached, and are usually wrong: you care about the big picture and the individual, just not conventionally. Belonging on your own terms, always.",
  Pisces:
    "First impression: soft, absorbent, slightly dreamlike — people tell you things they tell no one. The empathy is real; the steel underneath it is what survives rooms that would flatten others. Don’t let the mist fool anyone, least of all you.",
}

export function elementOf(sign: Sign): Element {
  const table: Record<Element, Sign[]> = {
    fire: ["Aries", "Leo", "Sagittarius"],
    earth: ["Taurus", "Virgo", "Capricorn"],
    air: ["Gemini", "Libra", "Aquarius"],
    water: ["Cancer", "Scorpio", "Pisces"],
  }
  return (Object.keys(table) as Element[]).find((k) => table[k].includes(sign))!
}

const ELEMENT_LEAD: Record<Element, string> = {
  fire: "Your system runs on ignition: momentum, stakes, visible progress. A week without a spark is a week you go flat — so you need to engineer kindling, not wait for lightning.",
  earth: "Your system runs on traction: what is finished, tangible, paid, built. You pace slow and deep and other people mistake the pace for caution — it is commitment.",
  air: "Your system runs on exchange: ideas in, ideas out, connections made. Isolation is your slow poison; conversation is not distraction for you, it is how thinking works.",
  water: "Your system runs on depth: meaning, connection, memory. Surface life drains you; a few real things done fully beat ten done politely.",
}

export function synthesise(sun: Sign, moon: Sign, rising: Sign): string {
  const els = [elementOf(sun), elementOf(moon), elementOf(rising)]
  const counts = (["fire", "earth", "air", "water"] as Element[]).map((k) => ({
    k,
    n: els.filter((x) => x === k).length,
  }))
  const dominant = [...counts].sort((a, b) => b.n - a.n)[0]
  const missing = counts.filter((c) => c.n === 0).map((c) => c.k)

  const lead = ELEMENT_LEAD[dominant.k]
  const gap = missing.length
    ? ` The quieter territory in your chart is ${missing.join(" and ")} — not a weakness, just a place you visit by intention rather than instinct.`
    : " Your three parts speak the same element, which means there is little internal argument here — you simply are what you look like, and that is rarer than you think."
  return lead + gap
}

export interface Reading {
  sun: { sign: Sign; text: string }
  moon: { sign: Sign; text: string; phase: string }
  rising: { sign: Sign; text: string }
  synthesis: string
}

export function buildReading(input: {
  sun: Sign
  moon: Sign
  rising: Sign
  moonPhaseName: string
}): Reading {
  return {
    sun: { sign: input.sun, text: SUN_TEXT[input.sun] },
    moon: { sign: input.moon, text: MOON_TEXT[input.moon], phase: input.moonPhaseName },
    rising: { sign: input.rising, text: RISING_TEXT[input.rising] },
    synthesis: synthesise(input.sun, input.moon, input.rising),
  }
}
