import baseUrl from "api/baseUrl"
import {
  Project,
  ProjectContentTypeWithDimensions,
  ProjectWithImageDimensions,
} from "types"
import { populateImageWithDimensions, saturateImageSrcs } from "misc/utils"

export const fetchProject = async (
  slug: string
): Promise<ProjectWithImageDimensions> => {
  const url = new URL(`api/project/${slug}`, baseUrl)
  const response = await fetch(url, {
    headers: {
      "Accept-Language": "en",
    },
  })
  if (!response.ok) throw new Error()
  const fetchedProject = (await response.json()) as Project
  const sanitizedProject = saturateImageSrcs(fetchedProject)

  const contentWithDimensions: ProjectContentTypeWithDimensions[] =
    await Promise.all(
      sanitizedProject.content.map(async (content) => {
        switch (content.layout) {
          case "horizontal_photo":
            return {
              ...content,
              attributes: {
                image: await populateImageWithDimensions(
                  content.attributes.image
                ),
              },
            }
          case "vertical_photo":
            return {
              ...content,
              attributes: {
                image1: await populateImageWithDimensions(
                  content.attributes.image1
                ),
                image2:
                  content.attributes.image2 === null
                    ? null
                    : await populateImageWithDimensions(
                        content.attributes.image2
                      ),
              },
            }
          case "photo_architecture": {
            return {
              ...content,
              attributes: {
                images: await Promise.all(
                  content.attributes.images.map((src) =>
                    populateImageWithDimensions(src)
                  )
                ),
              },
            }
          }
          default: {
            return content
          }
        }
      })
    )
  return {
    ...sanitizedProject,
    content: contentWithDimensions,
    image: await populateImageWithDimensions(sanitizedProject.image),
  }
}
