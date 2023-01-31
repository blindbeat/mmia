import baseUrl from "api/baseUrl"
import { StaticFetch, StaticFetchSanitized } from "types"

const url = new URL(`api/statics`, baseUrl)

export const fetchStatic = async (
  locale: string
): Promise<StaticFetchSanitized> => {
  const response = await fetch(url, {
    headers: {
      "Accept-Language": locale,
    },
  })
  if (!response.ok) throw new Error()
  const result = (await response.json()) as StaticFetch
  return {
    ...result,
    socials: result.socials.map(({ key, attributes: { name, link } }) => ({
      key,
      name,
      link,
    })),
  }
}
