import { StaticImageData } from "next/image"
import { InfoFetch } from "types/fetchTypes"
import { MediaFetch } from "api/fetchMedia"

export type NextImageSrc = string | StaticImageData

export interface Vacancy {
  name: string
  country: string
  city: string
  employmentTime: string
  description: string
  image: ImageWithDimensions
}

export interface MediaEntry {
  logo: NextImageSrc
  hoverImage: NextImageSrc
  link: string
}

export interface Media extends Pick<MediaFetch, "title" | "description"> {
  media: MediaEntry[]
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

export interface InfoData extends Pick<InfoFetch, "title" | "description"> {
  blocks: {
    name: string
    description: string
  }[]
}
