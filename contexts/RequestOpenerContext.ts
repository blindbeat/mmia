import { createContext, Dispatch, SetStateAction } from "react"

export const RequestOpenerContext = createContext<Dispatch<
  SetStateAction<boolean>
> | null>(null)
