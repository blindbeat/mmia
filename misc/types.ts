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

interface ProjectHorizontalPhoto {
  layout: "horizontal_photo"
  key: string
  attributes: {
    image: string
  }
}

interface ProjectHorizontalPhotoWithDimensions
  extends Omit<ProjectHorizontalPhoto, "attributes"> {
  attributes: {
    image: ImageWithDimensions
  }
}

interface ProjectVerticalPhotos {
  layout: "vertical_photo"
  key: string

  attributes: {
    image1: string
    image2: string | null
  }
}

interface ProjectVerticalPhotosWithDimensions
  extends Omit<ProjectVerticalPhotos, "attributes"> {
  attributes: {
    image1: ImageWithDimensions
    image2: ImageWithDimensions | null
  }
}

interface ProjectArchitecture {
  layout: "photo_architecture"
  key: string

  attributes: {
    images: string[]
  }
}

interface ProjectArchitectureWithDimensions
  extends Omit<ProjectArchitecture, "attributes"> {
  attributes: {
    images: ImageWithDimensions[]
  }
}

interface ProjectMaterials {
  layout: "block2"
  key: string

  attributes: {
    heading: string
    sub_block: {
      heading: string
      description: string
    }[]
    description: string
    image: string[]
  }
}

interface ProjectText {
  layout: "text_block"
  key: string

  attributes: {
    text: string
  }
}

export type ProjectContentType =
  | ProjectHorizontalPhoto
  | ProjectVerticalPhotos
  | ProjectArchitecture
  | ProjectMaterials
  | ProjectText
export type ProjectContentTypeWithDimensions =
  | ProjectHorizontalPhotoWithDimensions
  | ProjectVerticalPhotosWithDimensions
  | ProjectArchitectureWithDimensions
  | ProjectMaterials
  | ProjectText

export interface Project {
  area: string
  city: string
  categories: Tag[]
  content: ProjectContentType[]
  description: string
  heading: string
  id: number
  image: string
  slug: string
  status: number
  year: string
  next: {
    slug: string
  }
}

export type ProjectBrief = Omit<Project, "next">

export interface ProjectWithImageDimensions
  extends Omit<Project, "image" | "content"> {
  image: ImageWithDimensions
  content: ProjectContentTypeWithDimensions[]
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
