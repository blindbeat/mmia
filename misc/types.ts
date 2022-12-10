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
  description: string
}

export interface Contact {
  city: string
  address: string
  phone: number
}

export interface Media {
  logo: NextImageSrc
  hoverImage: NextImageSrc
  link: string
}
