import { StaticImageData } from "next/image"

export type ProjectBrief = {
  title: string
  image: NextImageSrc
  tags: string[]
}

export type NextImageSrc = string | StaticImageData

export interface Vacancy {
  name: string
  country: string
  city: string
  employmentTime: "Full-Time" | "Part-Time"
}
