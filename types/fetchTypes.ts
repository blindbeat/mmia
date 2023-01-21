import { Project } from "types"

export interface HomeFetch {
  building_title: string
  building_description: string
  projects_title: string
  projects_description: string
  projects: Omit<Project, "next" | "content">[]
}
