import { AboutFetchSanitized } from "types"

export type HomeAboutContent = Pick<
  AboutFetchSanitized,
  "title" | "image1" | "image2" | "text"
>
