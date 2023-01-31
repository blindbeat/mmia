import baseUrl from "api/baseUrl"
import { ContactsFetch, ContactsFetchSanitized } from "types"

const url = new URL(`api/contacts`, baseUrl)

export const fetchContacts = async (
  locale: string
): Promise<ContactsFetchSanitized> => {
  const response = await fetch(url, {
    headers: {
      "Accept-Language": locale,
    },
  })
  if (!response.ok) throw new Error()
  const result = (await response.json()) as ContactsFetch

  return {
    contacts: result.content.map(({ attributes, key }) => ({
      ...attributes,
      key,
    })),
  }
}
