import {
  AboutVacancy,
  ArrayEntry,
  ArrayEntrySanitized,
  ImageWithDimensions,
  Project,
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
  vacancies: AboutVacancy[]
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

export interface ContactsFetch {
  id: number
  content: {
    layout: string
    key: string
    attributes: {
      city: string
      address: string
      phone: string
      email: string
    }
  }[]
}

export interface Contact {
  key: string
  city: string
  address: string
  phone: string
  email: string
}
export interface ContactsFetchSanitized {
  contacts: Contact[]
}

export interface StaticFetch {
  id: number
  gallery: string[]
  description: string
  title: string
  token: string
  block2_description: string
  socials: {
    layout: string
    key: string
    attributes: {
      name: string
      link: string
    }
  }[]
}

export interface StaticFetchSanitized extends Omit<StaticFetch, "socials"> {
  socials: {
    key: string
    name: string
    link: string
  }[]
}

export interface Content {
  layout: string
  key: string
  attributes: {
    name: string
    description: string
  }
}
export interface InfoFetch {
  id: number
  title: string
  description: string
  content: Content[]
}
