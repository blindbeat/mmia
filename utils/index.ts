import { IntersectionOptions } from "react-intersection-observer"

export const triggerDelay = 300
export const triggerThreshold = 0.25

export const inViewOptions: IntersectionOptions = {
  threshold: triggerThreshold,
  delay: triggerDelay,
  fallbackInView: true,
  triggerOnce: true,
}
