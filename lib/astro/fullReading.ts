/**
 * The full AstroPsychology reading — the paid product.
 *
 * Sits on top of the computed chart (lib/astro/ephemeris) and turns it into
 * ordered prose sections. Hand-written and deterministic: the same birth data
 * always produces the same reading, and the words never drift from the chart
 * that was actually computed. No LLM call.
 *
 * Framework: AstroPsychology in the Jung / Rudhyar lineage — the chart as a map
 * of temperament and individuation, not of events. Reflection, not prediction.
 *
 * NOTE: this library is kept in step with the standalone portal page
 * (ND-cognitive-OS/indigos-cosmic/reading.html). If you change one, change both.
 */
import type { Chart, ChartPoint, Sign } from "./ephemeris"

export interface ReadingSection {
  title: string
  /** Small caps line under the title: positions, orbs, house names. */
  meta?: string
  paragraphs: string[]
}

/* ---------------- text library ---------------- */

const HOUSES: Record<number, [string, string]> = {
  1: ["Identity", "the arena of who you are on the front line — appearance, presence, first moves, and the body you have to work in."],
  2: ["Resources", "the arena of what you can hold onto — money, possessions, skills, and the deeper question of what you consider valuable."],
  3: ["Communication", "the arena of nearby minds — speaking, writing, learning, siblings, neighbours, and how you build a bridge between two points."],
  4: ["Roots", "the arena of origin and return — home, family, ancestry, privacy, and what you build when you need to feel safe."],
  5: ["Creativity", "the arena of play and expression — pleasure, romance, art, children, and anything you make purely because making it feels good."],
  6: ["Craft", "the arena of daily practice — work, routine, health, the body's maintenance, and the problems that need sorting rather than solving."],
  7: ["Partnership", "the arena of the other — contracts, marriage, open enemies, and every relationship that asks you to compromise your own position."],
  8: ["Depth", "the arena of shared resources and transformation — inheritance, debt, intimacy, death, rebirth, and everything you do not say out loud."],
  9: ["Meaning", "the arena of the wider frame — study, travel, philosophy, belief, and the long version of your story."],
  10: ["Vocation", "the arena of public standing — work, reputation, authority, and what you want to be accountable for."],
  11: ["Community", "the arena of the collective — friends, networks, hopes, causes, and the future you are building with other people."],
  12: ["Interior", "the arena behind the curtain — solitude, dreams, the unconscious, endings, and what you can only meet when nothing is required of you."],
}

const PLANET_FUNC: Record<string, string> = {
  sun: "Your identity",
  moon: "Your emotional nature",
  mercury: "Your mind",
  venus: "Your capacity for love and pleasure",
  mars: "Your aggressive drive",
  jupiter: "Your expansion",
  saturn: "Your discipline",
}

const ASPECT_TEXT: Record<string, string> = {
  conjunction:
    "Two parts of you are fused: they operate as a single function, which makes them powerful and slightly blind — you cannot easily see this combination from the outside, because you experience it as simply the way things are.",
  sextile:
    "A working agreement between two parts of you — not automatic, but available. This is an asset you can actually use on purpose, usually by doing something small and practical rather than waiting for inspiration.",
  square:
    "A productive argument between two parts of you: the tension is real, it recurs on schedule, and it is also where most of your momentum comes from. Squares do not resolve, they get put to work — the cost of ignoring one is that it runs the show quietly.",
  trine:
    "Easy flow between two parts of you — a gift that is often invisible precisely because it never causes trouble. The risk with a trine is taking it for granted and never building anything on it, because it works without effort.",
  opposition:
    "A seesaw between two parts of you: one gets lived, the other gets projected onto other people, and the argument then appears to be external. The work is to take back the second half — which usually means admitting you want the thing you keep finding in others.",
}

const PHASE_TEXT: Record<string, string> = {
  New: "You sit at the very start of the cycle — the seed stage. Your task is not performance but orientation: finding out what you actually want before anyone tells you what to want. You restart often, and each restart is legitimate, not a failure of follow-through. You are the kind of chart things begin with.",
  Crescent: "You are in the phase of first impulse against old form — the spark has arrived but the structure has not. Confusion at the start is normal for you and passes quickly once you act. You are developing capacity before you have evidence, which takes a particular kind of courage you should learn to name.",
  "First Quarter": "You are a crisis-and-action type: the stage where a decision must turn into a move or be lost. You meet resistance as a matter of course, and you are built for exactly that — pressure clarifies you instead of paralysing you. Your task is to pick your battles honestly rather than reflexively.",
  Gibbous: "You sit in the phase of refinement — most of the shape exists, and your work is adjustment, not invention. That is a harder assignment than it sounds: it asks for patience and precision rather than a new beginning. You are here to make something already good actually true.",
  Full: "You are a full-cycle type: illumination and its consequences. What you have built becomes visible, and then has to be held in daylight — including the parts that were designed in the dark. Your task is integration under the spotlight rather than growth in private, which is why you know how to share what you have learned.",
  Disseminating: "You sit in the phase of the teacher — the light is now handed out rather than accumulated. You know things by having been through them, and you are driven to pass it on, sometimes whether or not anyone asked. Your work is to find real audiences instead of everyone.",
  Ascent: "You are in the phase of letting go in order to rise — the harvest is done and what remains is essence. You are drawn to the frontier and to release, and life keeps asking you to prove your freedom by not clinging. The work is to learn what is actually yours.",
  Balsamic: "You sit at the close of the cycle: the stage of completion, transparency and endings. You are here to finish things and to make room, which can feel out of step with a culture that is addicted to beginnings. Your task is to let each cycle close fully, with nothing owed.",
}

const PHASE_TASK: Record<string, string> = {
  New: "orientation before performance",
  Crescent: "acting before the evidence arrives",
  "First Quarter": "turning decision into movement",
  Gibbous: "refining rather than restarting",
  Full: "holding what is visible rather than finding what is hidden",
  Disseminating: "teaching what you have lived",
  Ascent: "releasing what is finished",
  Balsamic: "closing cycles properly",
}

const ELEMENT_LEAD: Record<string, string> = {
  fire: "Your system runs on ignition: momentum, stakes, visible progress. A week without a spark is a week you go flat, so you need to engineer kindling rather than wait for lightning.",
  earth: "Your system runs on traction: what is finished, tangible, paid, built. You pace slow and deep, and other people mistake the pace for caution. It is not caution, it is commitment.",
  air: "Your system runs on exchange: ideas in, ideas out, connections made. Isolation is your slow poison, and conversation is not a distraction for you — it is how your thinking works.",
  water: "Your system runs on depth: meaning, connection, memory. Surface life drains you; a few real things done fully beat ten done politely.",
}

const MODALITY_TEXT: Record<string, string> = {
  cardinal: "You are a cardinal type, which means your native move is initiation — you start the wave, then often leave others to ride it. The growth edge is following through past the point where the novelty ran out, or handing the thread over deliberately rather than by accident.",
  fixed: "You are a fixed type, which means your native move is persistence — once committed, you are implacable, and the world experiences you as immovable. The growth edge is the opposite trap: staying with what you have already built long enough to see it mature.",
  mutable: "You are a mutable type, which means your native move is adaptation — you bend, translate, and survive changes that would break other systems. The growth edge is learning to prefer something rather than merely adjust to everything.",
}

const FLAVOUR: Record<Sign, string> = {
  Aries: "pushes, starts, wants it now",
  Taurus: "builds, keeps, will not be hurried",
  Gemini: "asks, connects, changes shape",
  Cancer: "protects, remembers, needs safety",
  Leo: "expresses, commits, wants it seen",
  Virgo: "refines, serves, checks the details",
  Libra: "weighs, relates, wants it fair",
  Scorpio: "goes deep, holds, will not skim",
  Sagittarius: "expands, questions, needs room",
  Capricorn: "structures, endures, plays the long game",
  Aquarius: "detaches, reinvents, needs difference",
  Pisces: "absorbs, imagines, needs meaning",
}

const FRAME =
  "In the AstroPsychology tradition — Jung, and Rudhyar before him who put the zodiac in order of development rather than decoration — a birth chart is not a fate. It is a symbolic description of the temperament you were born into: the set of tendencies you have to work with, and the order in which they tend to appear. Read this the way you would read a map of a country you are going to live in — it tells you about the terrain, not about what will happen to you."

/* ---------------- helpers ---------------- */

const elementOf = (sign: Sign) =>
  ["Aries", "Leo", "Sagittarius"].includes(sign)
    ? "fire"
    : ["Taurus", "Virgo", "Capricorn"].includes(sign)
      ? "earth"
      : ["Gemini", "Libra", "Aquarius"].includes(sign)
        ? "air"
        : "water"

const modalityOf = (sign: Sign) =>
  ["Aries", "Cancer", "Libra", "Capricorn"].includes(sign)
    ? "cardinal"
    : ["Taurus", "Leo", "Scorpio", "Aquarius"].includes(sign)
      ? "fixed"
      : "mutable"

const pos = (p: ChartPoint) => `${p.sign} ${Math.floor(p.degreeExact)}°${String(Math.round((p.degreeExact % 1) * 60)).padStart(2, "0")}`

const ord = (n: number) => `${n}${["th", "st", "nd", "rd"][((n % 100) - 20) % 10] || ["th", "st", "nd", "rd"][n % 100] || "th"}`

const article = (word: string) => (/^[aeiou]/i.test(word) ? "an" : "a")

/* ---------------- the reading ---------------- */

/**
 * Build the paid reading as ordered sections. Everything after the Sun text is
 * paid content, so this is what must stay off the page until an order is paid.
 */
export function buildSections(chart: Chart): ReadingSection[] {
  const point = (key: string) => chart.points.find((p) => p.key === key)!
  const sun = point("sun")
  const moon = point("moon")
  const asc = point("ascendant")
  const mc = point("midheaven")
  const sections: ReadingSection[] = []

  sections.push({
    title: `Your Moon in ${moon.sign}`,
    meta: `${pos(moon)} · your ${ord(moon.house)} house (${HOUSES[moon.house][0]})`,
    paragraphs: [
      moonParagraph(moon),
      `Because this is your ${ord(moon.house)} house placement, that emotional nature does most of its work in ${HOUSES[moon.house][1]} This is where you need it to be handled, and where you are least able to fake being fine.`,
    ],
  })

  sections.push({
    title: `Your Rising in ${asc.sign} — and the axis it defines`,
    meta: `ASC ${pos(asc)} · MC ${pos(mc)}`,
    paragraphs: [
      risingParagraph(asc),
      `The Rising sets the zero point of the whole chart: every house in your chart is measured from it. Your midheaven falls in ${mc.sign}, which is the AstroPsychology way of asking what you are building toward in public — the direction the individuation process keeps pushing you, whether or not you have agreed to it. With your Sun in ${sun.sign}, that development is happening through ${HOUSES[mc.house][1]}`,
    ],
  })

  for (const p of chart.points.filter((x) => x.key !== "moon" && x.key !== "ascendant" && x.key !== "midheaven")) {
    sections.push({
      title: `${p.label} in ${p.sign} · ${ord(p.house)} house (${HOUSES[p.house][0]})`,
      meta: pos(p),
      paragraphs: [
        `${PLANET_FUNC[p.key] ?? p.label} sits in ${HOUSES[p.house][1]} The sign it is in — ${p.sign} — colours how it goes about that: ${FLAVOUR[p.sign]}.`,
      ],
    })
  }

  const aspects = chart.aspects.slice(0, 11)
  sections.push({
    title: "The aspects — how your parts relate",
    paragraphs: [
      `Positions describe what you have; aspects describe how the parts of you talk to each other. This is the part most horoscopes skip, and it is where a chart stops being a list of personality traits. ${aspects.length} of the angles in your chart are tight enough to read as active.`,
      ...(aspects.length
        ? aspects.map(
            (a) =>
              `${a.a.label} ${a.name} ${a.b.label} (exact within ${a.orb.toFixed(1)}°) — ${ASPECT_TEXT[a.name]}`,
          )
        : [
            "Nothing tight enough to call dominant — your placements are working largely independently, which is rarer than it sounds and usually means you experience yourself as several quite separate systems rather than one argument.",
          ]),
    ],
  })

  const phaseName = chart.lunarPhase.name
  const illumination = (((1 - Math.cos(chart.lunarPhase.elongation * (Math.PI / 180))) / 2) * 100).toFixed(0)
  sections.push({
    title: `Your lunar phase: ${phaseName} Moon`,
    meta: `Sun–Moon elongation ${chart.lunarPhase.elongation.toFixed(1)}° · ${illumination}% of the cycle completed`,
    paragraphs: [
      PHASE_TEXT[phaseName],
      "Rudhyar placed the phases of the lunation cycle at the centre of his psychological astrology precisely because the same Sun and Moon mean something different depending on where they stand in the cycle. Two people with a Cancer Sun and Cancer Moon are nothing alike if one was born a New Moon and the other a Full one — you were born " +
        phaseName.toLowerCase() +
        ", and it colours the whole chart.",
    ],
  })

  const signs = chart.points.map((p) => p.sign)
  const eCount = (k: string) => signs.filter((s) => elementOf(s) === k).length
  const mCount = (k: string) => signs.filter((s) => modalityOf(s) === k).length
  const elements = (["fire", "earth", "air", "water"] as const).map((k) => [k, eCount(k)] as const)
  const modalities = (["cardinal", "fixed", "mutable"] as const).map((k) => [k, mCount(k)] as const)
  const dominantElement = [...elements].sort((a, b) => b[1] - a[1])[0][0]
  const dominantModality = [...modalities].sort((a, b) => b[1] - a[1])[0][0]
  const missing = elements.filter(([, n]) => n === 0).map(([k]) => k)

  sections.push({
    title: "Element and modality balance",
    meta: `Counted across ${signs.length} chart points`,
    paragraphs: [
      `Fire ${eCount("fire")} · Earth ${eCount("earth")} · Air ${eCount("air")} · Water ${eCount("water")}`,
      ELEMENT_LEAD[dominantElement],
      missing.length
        ? `The quieter territory in your chart is ${missing.join(" and ")} — ${missing.length === 1 ? "where you have no placements at all" : "where you have almost none"}. In this framework that is not a weakness but an unfamiliar language: you can speak it, but you have to choose to, and you will tire faster there than anywhere else in your life.`
        : "You have at least one placement in every element, which means no part of your emotional climate is a blind spot — but you also never get to be a pure type, and other people can find that hard to pin down.",
      `Cardinal ${mCount("cardinal")} · Fixed ${mCount("fixed")} · Mutable ${mCount("mutable")}`,
      MODALITY_TEXT[dominantModality],
    ],
  })

  sections.push({
    title: "The integration practice",
    paragraphs: [practice(missing, aspects, phaseName, dominantElement), FRAME],
  })

  return sections
}

/**
 * Moon and Rising prose lives in reading.ts (shared with the free preview);
 * re-exported through the section builder so the page only imports one thing.
 */
import { MOON_TEXT, RISING_TEXT } from "./reading"
const moonParagraph = (p: ChartPoint) => (MOON_TEXT as Record<string, string>)[p.sign]
const risingParagraph = (p: ChartPoint) => (RISING_TEXT as Record<string, string>)[p.sign]

function practice(
  missing: string[],
  aspects: Chart["aspects"],
  phase: string,
  dominant: string,
): string {
  const hard = aspects.find((a) => a.name === "square" || a.name === "opposition")
  const bits = [
    `With ${dominant} dominant and ${missing.length ? `the ${missing.join("-and-")} side of the chart unoccupied` : "a balanced climate"}, the practical question is never "how do I fix myself" — it is what you do on the days the map is inconvenient.`,
  ]
  bits.push(
    hard
      ? `Start with the ${hard.a.label} ${hard.name} ${hard.b.label}: it is the tightest tension you carry, and it will be running whether or not you look at it. The useful move is boring and it works — when you notice it happening, name both sides out loud before you act, because the whole point of ${article(hard.name)} ${hard.name} is that one half gets lived and the other gets projected.`
      : "You are carrying no tight squares or oppositions, which means your growth will not arrive as crisis. That is a genuine gift and also a trap: without friction you need to manufacture stakes deliberately, or you will spend years perfectly settled in a life smaller than the one you are capable of.",
  )
  bits.push(
    `And because you were born under a ${phase} Moon — where the task is ${PHASE_TASK[phase] ?? phase.toLowerCase()} — the practice is one thing, not five: keep a written log of the pattern for three months. A chart is only useful if it turns out to be checkable — something you can catch yourself doing.`,
  )
  return bits.join(" ")
}
