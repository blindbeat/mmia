import { IntersectionOptions } from "react-intersection-observer"
import { ImageWithDimensions, Project, ProjectFetched } from "misc/types"
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

export const sanitizeProject = (project: ProjectFetched): Project => {
  return {
    ...project,
    year: parseInt(project.year),
    image: constructImageUrl(project.image),
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
