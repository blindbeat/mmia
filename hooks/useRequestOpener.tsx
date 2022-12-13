import { RequestOpenerContext } from "contexts"
import { useContext } from "react"

export const useRequestOpener = () => {
  const setIsRequestModalOpen = useContext(RequestOpenerContext)

  if (setIsRequestModalOpen === null) throw new Error("context not found")
  return () => setIsRequestModalOpen(true)
}
