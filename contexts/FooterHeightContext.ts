import { createContext, Dispatch, SetStateAction } from "react"

export const FooterHeightContext = createContext<Dispatch<
  SetStateAction<number | null>
> | null>(null)
