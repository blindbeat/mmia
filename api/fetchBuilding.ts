import baseUrl from "api/baseUrl"
import { BuildingFetch, BuildingFetchSanitized } from "types"
import { constructImageUrl } from "api/constructImageUrl"

const url = new URL(`api/buildings`, baseUrl)

export const fetchBuilding = async (
  locale: string
): Promise<BuildingFetchSanitized> => {
  const response = await fetch(url, {
    headers: {
      "Accept-Language": locale,
    },
  })
  if (!response.ok) throw new Error()

  const result = (await response.json()) as BuildingFetch
  const { block1_title, block1_description, image, ...rest } = result
  return {
    ...rest,
    homeTitle: block1_title,
    homeDescription: block1_description,
    image: constructImageUrl(image),
    homeContent: result.medium_sub_blocks.map(
      ({ attributes: { name, description }, key }) => ({
        title: name,
        description,
        key,
      })
    ),
  }
}
