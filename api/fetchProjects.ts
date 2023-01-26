import baseUrl from "api/baseUrl"
import { ProjectBrief } from "types"
import { saturateImageSrcs } from "misc/utils"

const createPath = () => {
  return new URL(`api/projects`, baseUrl)
}

export const fetchProjects = async (locale: string) => {
  const response = await fetch(createPath(), {
    headers: {
      "Accept-Language": locale,
    },
  })
  if (!response.ok) throw new Error()
  const responseData = await response.json()
  return {
    data: responseData.map(saturateImageSrcs) as ProjectBrief[],
  }
}
