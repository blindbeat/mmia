import baseUrl from "api/baseUrl"
import { Media } from "types"
import { constructImageUrl } from "api/constructImageUrl"

const url = new URL(`api/media`, baseUrl)

export interface MediaFetch {
  id: number
  title: string
  description: string
  content: Content[]
}

interface Content {
  layout: string
  key: string
  attributes: {
    image: string
    link: string
    image_hover: string
  }
}

export const fetchMedia = async (locale: string): Promise<Media> => {
  const response = await fetch(url, {
    headers: {
      "Accept-Language": locale,
    },
  })
  if (!response.ok) throw new Error()
  const { title, description, content } = (await response.json()) as MediaFetch
  return {
    title,
    description,
    media: content.map(({ attributes }) => ({
      logo: constructImageUrl(attributes.image),
      hoverImage: constructImageUrl(attributes.image_hover),
      link: attributes.link,
    })),
  }
}
