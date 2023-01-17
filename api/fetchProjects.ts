import baseUrl from "api/baseUrl"
import { ProjectBrief } from "misc/types"
import { saturateImageSrcs } from "misc/utils"

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
    data: responseData.map(saturateImageSrcs) as ProjectBrief[],
    lastPage: params
      ? params.page === parseInt(responseData.last_page)
      : undefined,
  }
}
