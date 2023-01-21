import { ImageWithDimensions, Tag } from "."

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
    image: string
    slug: string
  }
}

export type ProjectBrief = Omit<Project, "next">

export interface ProjectWithImageDimensions
  extends Omit<Project, "image" | "content"> {
  image: ImageWithDimensions
  content: ProjectContentTypeWithDimensions[]
}
