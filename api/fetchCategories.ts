import baseUrl from "api/baseUrl"

const url = new URL(`api/categories`, baseUrl)

export const fetchCategories = async (locale: string) => {
  const response = await fetch(url, {
    headers: {
      "Accept-Language": locale,
    },
  })
  if (!response.ok) throw new Error()
  return response.json()
}
