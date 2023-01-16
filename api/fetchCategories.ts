import baseUrl from "api/baseUrl"

const url = new URL(`api/categories`, baseUrl)

export const fetchCategories = async () => {
  const response = await fetch(url, {
    headers: {
      "Accept-Language": "en",
    },
  })
  if (!response.ok) throw new Error()
  return response.json()
}
