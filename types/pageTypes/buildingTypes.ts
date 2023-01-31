import {
  ArrayEntrySanitized,
  BuildingFetchSanitized,
  ImageWithDimensions,
} from "types"

export interface HomeBuildingContent {
  title: string
  description: string
  image: ImageWithDimensions
  content: {
    key: string
    title: string
    description: string
  }[]
}

export interface BuildingPage
  extends Pick<
    BuildingFetchSanitized,
    "benefits" | "title" | "preparation" | "gallery"
  > {
  parallaxImage: ImageWithDimensions
  points: ArrayEntrySanitized[]
}
