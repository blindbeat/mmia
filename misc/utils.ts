import { IntersectionOptions } from "react-intersection-observer"

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
