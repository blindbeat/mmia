import { StaticImageData } from "next/image"

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

export interface ProjectFetched {
  area: string
  city: string
  categories: Tag[]
  content: []
  description: string
  heading: string
  id: number
  image: string
  slug: string
  status: number
  year: string
}

export interface Project
  extends Omit<ProjectFetched, `year` | "description" | "heading"> {
  description: string
  heading: string
  year: number
}

export interface ProjectWithImageDimensions extends Omit<Project, "image"> {
  image: ImageWithDimensions
}

export interface Tag {
  id: number
  name: string
}

export interface TagWithCount extends Tag {
  projects_count: number
}

export interface ImageWithDimensions {
  src: string
  width: number
  height: number
}
