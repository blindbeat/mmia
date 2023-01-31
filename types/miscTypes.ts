import { StaticImageData } from "next/image"

export type NextImageSrc = string | StaticImageData

export interface Vacancy {
  name: string
  country: string
  city: string
  employmentTime: string
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

export interface ArrayEntry {
  layout: string
  key: string
  attributes: {
    name: string
    description: string
  }
}
export interface ArrayEntrySanitized {
  key: string
  title: string
  description: string
}
