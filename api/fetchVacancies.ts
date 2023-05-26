import baseUrl from "api/baseUrl"
import { Vacancy } from "types"
import { constructImageUrl } from "api/constructImageUrl"
import { populateImageWithDimensions } from "misc/utils"

interface VacanciesFetch {
  current_page: number
  data: VacanciesData[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: string
  to: number
  total: number
}

interface VacanciesData {
  id: number
  title: string
  image: string
  description: string
  place: string
  state: string
  type: string
}

interface Link {
  url?: string
  label: string
  active: boolean
}

const url = new URL(`api/vacancies`, baseUrl)

export const fetchVacancies = async (locale: string): Promise<Vacancy[]> => {
  const response = await fetch(url, {
    headers: {
      "Accept-Language": locale,
    },
  })
  if (!response.ok) throw new Error()
  const { data } = (await response.json()) as VacanciesFetch
  return Promise.all(
    data.map(async ({ title, place, state, type, description, image }) => ({
      name: title,
      country: place,
      city: state,
      employmentTime: type,
      image: await populateImageWithDimensions(constructImageUrl(image)),
      description,
    }))
  )
}
