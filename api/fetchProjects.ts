import baseUrl from "api/baseUrl"
import { Project } from "misc/types"
import { sanitizeProject } from "misc/utils"

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

export const fetchProjects = async (params?: Params) => {
  const response = await fetch(createPath(params), {
    headers: {
      "Accept-Language": "en",
    },
  })
  if (!response.ok) throw new Error()
  const responseData = await response.json()
  return {
    data: responseData.map(sanitizeProject) as Project[],
    lastPage: params
      ? params.page === parseInt(responseData.last_page)
      : undefined,
  }
}
