import baseUrl from "api/baseUrl"
import { ProjectFetched, ProjectWithImageDimensions } from "misc/types"
import { populateImageWithDimensions, sanitizeProject } from "misc/utils"

export const fetchProject = async (
  slug: string
): Promise<ProjectWithImageDimensions> => {
  const url = new URL(`api/project/${slug}`, baseUrl)
  const response = await fetch(url, {
    headers: {
      "Accept-Language": "en",
    },
  })
  if (!response.ok) throw new Error()
  const fetchedProject = (await response.json()) as ProjectFetched
  const sanitizedProject = sanitizeProject(fetchedProject)
  return {
    ...sanitizedProject,
    image: await populateImageWithDimensions(sanitizedProject.image),
  }
}
