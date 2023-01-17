import { IntersectionOptions } from "react-intersection-observer"
import { ImageWithDimensions, Project, ProjectBrief } from "misc/types"
import { constructImageUrl } from "api"
import probe from "probe-image-size"

export const triggerDelay = 300
export const triggerThreshold = 0.25

export const inViewOptions: IntersectionOptions = {
  threshold: triggerThreshold,
  delay: triggerDelay,
  fallbackInView: true,
  triggerOnce: true,
}

export const calcPathLength = (path: SVGPathElement): number => {
  const scale = path.getBoundingClientRect().width / path.getBBox().width
  return path.getTotalLength() * scale
}

export const formIndexString = (index: number) => `0${index + 1}`

export const saturateImageSrcs = <K extends Project | ProjectBrief>(
  project: K
): K => {
  const image = constructImageUrl(project.image)
  const content =
    project.content?.map((content) => {
      switch (content.layout) {
        case "horizontal_photo": {
          return {
            ...content,
            attributes: {
              image: constructImageUrl(content.attributes.image),
            },
          }
        }
        case "vertical_photo": {
          return {
            ...content,
            attributes: {
              image1: constructImageUrl(content.attributes.image1),
              image2:
                content.attributes.image2 !== null
                  ? constructImageUrl(content.attributes.image2)
                  : null,
            },
          }
        }
        case "photo_architecture": {
          return {
            ...content,
            attributes: {
              images: content.attributes.images.map((src) =>
                constructImageUrl(src)
              ),
            },
          }
        }
        case "block2": {
          return {
            ...content,
            attributes: {
              ...content.attributes,
              image: content.attributes.image.map((src) =>
                constructImageUrl(src)
              ),
            },
          }
        }
        case "text_block":
          return content
        default: {
          throw new Error("unknown content type")
        }
      }
    }) || []

  return {
    ...project,
    image,
    content,
  }
}

export const populateImageWithDimensions = async (
  src: string
): Promise<ImageWithDimensions> => {
  const result = await probe(src)
  return {
    src,
    width: result.width,
    height: result.height,
  }
}
