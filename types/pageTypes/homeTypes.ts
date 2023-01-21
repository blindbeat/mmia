import { Project } from "types"

export interface HomeLandingContent {
  projects: Pick<Project, "heading" | "description" | "image" | "slug">[]
}

type HomeProjectsProject = Pick<
  Project,
  "heading" | "image" | "slug" | "id" | "categories"
>
export interface HomeProjectsSwiperContent {
  projects: HomeProjectsProject[]
}
export interface HomeProjectsContent {
  projects: HomeProjectsProject[]
}
