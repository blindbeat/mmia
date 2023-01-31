import baseUrl from "api/baseUrl"
import {
  ArrayEntry,
  ArrayEntrySanitized,
  BuildingFetch,
  BuildingFetchSanitized,
} from "types"
import { constructImageUrl } from "api/constructImageUrl"
import { populateImageWithDimensions } from "misc/utils"

const url = new URL(`api/buildings`, baseUrl)

const transformArrayEntry = ({
  attributes: { name, description },
  key,
}: ArrayEntry): ArrayEntrySanitized => ({
  title: name,
  description,
  key,
})
export const fetchBuilding = async (
  locale: string
): Promise<BuildingFetchSanitized> => {
  const response = await fetch(url, {
    headers: {
      "Accept-Language": locale,
    },
  })
  if (!response.ok) throw new Error()

  const {
    block1_title,
    block1_description,
    image,
    medium_sub_blocks,
    block2_sub_blocks,
    block3_title,
    block3_description,
    block3_sub_blocks,
    medium_block_title,
    gallery,
    ...rest
  } = (await response.json()) as BuildingFetch
  return {
    ...rest,
    home: {
      title: block1_title,
      description: block1_description,
    },
    image: await populateImageWithDimensions(constructImageUrl(image)),
    points: block2_sub_blocks.map(transformArrayEntry),
    benefits: {
      title: block3_title,
      description: block3_description,
      circles: block3_sub_blocks.map(transformArrayEntry),
    },
    preparation: {
      heading: medium_block_title,
      blocks: medium_sub_blocks.map(transformArrayEntry),
    },
    gallery: await Promise.all(
      gallery.map(constructImageUrl).map(populateImageWithDimensions)
    ),
  }
}
