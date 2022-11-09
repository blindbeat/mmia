import { useRouter } from "next/router"
import ProjectHeader from "modules/project/ProjectHeader"
import ProjectTopNavigation from "modules/project/ProjectTopNavigation"
import styles from "./Project.module.css"
import ProjectPhotosBlock from "modules/project/ProjectPhotosBlock"
import blockPhoto1 from "assets/dummyPics/ProjectPhotos/blockPhotos/1.jpg"
import blockPhoto2 from "assets/dummyPics/instagramPhotos/2.jpg"

export default function Project() {
  const {
    query: { path },
  } = useRouter()

  return (
    <div className={styles.content}>
      <ProjectTopNavigation />
      <ProjectHeader />
      <ProjectPhotosBlock photos={[blockPhoto1, blockPhoto2]} />.
    </div>
  )
}

Project.layoutConfig = {
  adaptiveHeaderTransparency: false,
  showFooter: false,
}
