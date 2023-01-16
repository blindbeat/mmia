import baseUrl from "api/baseUrl"
import { Project, ProjectFetched } from "misc/types"
import { constructImageUrl } from "api/constructImageUrl"

interface Params {
  page: number
  perPage: number
}
const createPath = (params?: Params) => {
  const url = new URL(`api/projects`, baseUrl)
  if (params) {
    url.searchParams.append("page", String(params.page))
    url.searchParams.append("per_page", String(params.perPage))
  }
  return url
}

const sanitizeProject = (projects: ProjectFetched[]): Project[] => {
  return projects.map((project) => ({
    ...project,
    year: parseInt(project.year),
    image: constructImageUrl(project.image),
  }))
}

export const fetchProjects = async (params?: Params) => {
  const response = await fetch(createPath(params), {
    headers: {
      "Accept-Language": "en",
    },
  })
  if (!response.ok) throw new Error()
  const responseData = await response.json()
  return {
    data: sanitizeProject(responseData),
    lastPage: params
      ? params.page === parseInt(responseData.last_page)
      : undefined,
  }
}
