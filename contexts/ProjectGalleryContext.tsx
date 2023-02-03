import { createContext, Dispatch, SetStateAction, useContext } from "react"

type AllowedValue = string | null
type ContextProps = [
  value: AllowedValue,
  setter: Dispatch<SetStateAction<AllowedValue>> | null
]
const ProjectGalleryContext = createContext<ContextProps>([null, null])

export const useProjectGallery = () => {
  const [galleryState, setGalleryState] = useContext(ProjectGalleryContext)
  if (setGalleryState === null) throw new Error("used outside of context")

  const selectImage = (src: string) => setGalleryState(src)

  const closeGallery = () => setGalleryState(null)

  return {
    state: galleryState,
    selectImage,
    closeGallery,
  }
}

export default ProjectGalleryContext
