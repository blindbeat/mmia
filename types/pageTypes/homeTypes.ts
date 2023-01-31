import { ProjectWithoutCoords } from "types"

export interface HomeLandingContent {
  projects: Pick<
    ProjectWithoutCoords,
    "heading" | "description" | "image" | "slug"
  >[]
}

type HomeProjectsProject = Pick<
  ProjectWithoutCoords,
  "heading" | "image" | "slug" | "id" | "categories"
>
export interface HomeProjectsSwiperContent {
  projects: HomeProjectsProject[]
}
export interface HomeProjectsContent {
  projects: HomeProjectsProject[]
  title: string
  description: string
}
