import baseUrl from "api/baseUrl"

type AbsolutePath = string
export const constructImageUrl = (path: string): AbsolutePath => {
  return `${baseUrl}/${path}`
}
