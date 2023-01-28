import baseUrl from "api/baseUrl"
import { AboutFetch, AboutFetchSanitized } from "types"
import { constructImageUrl } from "api/constructImageUrl"
import { populateImageWithDimensions } from "misc/utils"

const url = new URL(`api/about`, baseUrl)

export const fetchAbout = async (
  locale: string
): Promise<AboutFetchSanitized> => {
  const response = await fetch(url, {
    headers: {
      "Accept-Language": locale,
    },
  })
  if (!response.ok) throw new Error()
  const about = (await response.json()) as AboutFetch
  return {
    ...about,
    image1: await populateImageWithDimensions(constructImageUrl(about.image1)),
    image2: await populateImageWithDimensions(constructImageUrl(about.image2)),
    image: await populateImageWithDimensions(constructImageUrl(about.image)),
    vacancies: about.vacancies.map(
      ({ title, place, state, type, description }) => ({
        name: title,
        country: place,
        city: state,
        employmentTime: type,
        description,
      })
    ),
  }
}
