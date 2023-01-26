import baseUrl from "api/baseUrl"
import { HomeFetch } from "types"
import { constructImageUrl } from "api/constructImageUrl"

const url = new URL(`api/main_page`, baseUrl)

export const fetchHome = async (locale: string): Promise<HomeFetch> => {
  const response = await fetch(url, {
    headers: {
      "Accept-Language": locale,
    },
  })
  if (!response.ok) throw new Error()
  const result = (await response.json()) as HomeFetch
  result.projects.forEach(
    (project) => (project.image = constructImageUrl(project.image))
  )
  return result as HomeFetch
}
