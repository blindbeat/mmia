import baseUrl from "api/baseUrl"
import { InfoData, InfoFetch } from "types"

export const fetchInfo = async (
  path: string,
  locale: string
): Promise<InfoData> => {
  const url = new URL(`api/${path}`, baseUrl)

  const response = await fetch(url, {
    headers: {
      "Accept-Language": locale,
    },
  })
  if (!response.ok) throw new Error()
  const { title, description, content } = (await response.json()) as InfoFetch
  console.log(title, description, content)
  return {
    title,
    description,
    blocks: content.map(({ attributes }) => attributes),
  }
}
