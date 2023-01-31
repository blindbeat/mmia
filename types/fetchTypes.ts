import {
  ArrayEntry,
  ArrayEntrySanitized,
  ImageWithDimensions,
  Project,
  Vacancy,
} from "types"

export interface HomeFetch {
  building_title: string
  building_description: string
  projects_title: string
  projects_description: string
  projects: Omit<Project, "next" | "content">[]
}

interface VacancyFetched {
  id: number
  title: string
  image: string
  description: string
  place: string
  state: string
  type: string
}

export interface AboutFetch {
  id: number
  title: string
  text: string
  image1: string
  image2: string
  quote: string
  quote_name: string
  after_quote_title: string
  description: string
  image: string
  before_running_text: string
  running_title1: string
  running_title2: string
  running_sub_title: string
  vacancies: VacancyFetched[]
}

export interface AboutFetchSanitized
  extends Omit<AboutFetch, "image" | "image1" | "image2" | "vacancies"> {
  image: ImageWithDimensions
  image1: ImageWithDimensions
  image2: ImageWithDimensions
  vacancies: Vacancy[]
}

export interface BuildingFetch {
  id: number
  title: string
  image: string
  block1_title: string
  block1_description: string
  block2_sub_blocks: ArrayEntry[]
  block3_title: string
  block3_description: string
  block3_sub_blocks: ArrayEntry[]
  medium_block_title: string
  medium_sub_blocks: ArrayEntry[]
  gallery: string[]
}

export interface BuildingFetchSanitized extends Pick<BuildingFetch, "title"> {
  home: {
    title: string
    description: string
  }
  image: ImageWithDimensions
  points: ArrayEntrySanitized[]
  benefits: {
    title: string
    description: string
    circles: ArrayEntrySanitized[]
  }
  preparation: {
    heading: string
    blocks: ArrayEntrySanitized[]
  }
  gallery: ImageWithDimensions[]
}
