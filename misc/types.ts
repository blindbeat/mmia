import { ImageProps } from "next/image"

export type ProjectBrief = {
  title: string
  image: Pick<ImageProps, "src">
  tags: string[]
}
