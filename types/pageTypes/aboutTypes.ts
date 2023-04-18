import { AboutFetchSanitized, ImageWithDimensions, Vacancy } from "types"

export type HomeAboutContent = Pick<
  AboutFetchSanitized,
  "title" | "image1" | "image2" | "text"
>

export type AboutVacancy = Pick<
  Vacancy,
  "name" | "employmentTime" | "country" | "city"
>

export interface AboutPage {
  title: string
  collageText: string
  collagePhotos: {
    founder: ImageWithDimensions
    office: ImageWithDimensions
  }
  quote: {
    text: string
    author: string
  }
  parallaxImage: ImageWithDimensions
  tapes: [string, string]
  tapesAfterword: string
  philosophy: string
  vacancies: AboutVacancy[]
}
