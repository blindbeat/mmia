import { ArrayEntrySanitized, Vacancy } from "types"

export const title = "Cardiovascular Hospital in Briukhovychi"
export const tags = ["interior", "Architecture"]

export const metadata = {
  year: 2017,
  area: 120,
  position: "Odesa, ukraine",
}

export const projectDescription =
  "Only low tide previously released the footpath, phone der small lighthouse island tossed in the North Sea over to the village. The further way led through the dreaded high moor. Over swaying oak planks blackened by heavy storm surges. The wave-washed boardwalk, sea-picked countless times. Likewise  carpenter's hands repaired, saved and, eventually, abandoned."

export const dummyParagraphShort = "AIMM is the team that implements"
export const dummyParagraph =
  "AIMM is the team that implements project ideas into reality. We see architecture as a unique product, created at the intersection of the zeitgeist, and the development of engineering. We see"

export const dummyPhilosophy =
  "Only low tide previously released the footpath, phone der small lighthouse island tossed in the North Sea over to the village. The further way led through the dreaded high moor. Over swaying oak planks blackened by heavy storm surges. The wave-washed boardwalk, sea-picked countless times. Likewise  carpenter's hands repaired, saved and, eventually, abandoned."

export const dummyParagraphLong =
  "Only low tide previously released the footpath, phone der small lighthouse island tossed in the North Sea over to the village. The further way led through the dreaded high moor. Over swaying oak planks blackened by heavy storm surges. The wave-washed boardwalk, sea-picked countless times. Likewise  carpenter's hands repaired, saved and, eventually, abandoned. Over swaying oak planks blackened by heavy storm surges. The wave-washed boardwalk, sea-picked countless times. Likewise  carpenter's hands repaired, saved and, eventually, abandoned."

export const dummyParagraphLong2 =
  "AIMM is the team that implements project ideas into reality. We see architecture as a unique product, created at the intersection of the zeitgeist, and the development of engineering. We design spectacular objects, creating AIMM is the team that implements project ideas into reality. We see architecture as a unique product, "
export const dummyTitleLong = `The method of major overhaul is more than renewal of the resource with a partial replacement for the necessary structural elements`

const bubbleTitle = "Climate"
const bubbleText =
  "Your work will be intensive, but the tasks will be interesting. You will independently "

export const bubbles: ArrayEntrySanitized[] = [...new Array(4)].map(
  (_, index) => ({
    key: String(index),
    title: bubbleTitle,
    description: bubbleText,
  })
)

export const dummyVacancies: Vacancy[] = [...new Array(6)].fill({
  name: "project manager",
  country: "Ukraine",
  city: "Kyiv",
  employmentTime: "Full-Time",
  description: dummyParagraphLong.repeat(4),
})
