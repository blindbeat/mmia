import { useRouter } from "next/router"
import ProjectHeaderBlock from "modules/project/ProjectHeaderBlock"
import ProjectTopNavigation from "modules/project/ProjectTopNavigation"
import styles from "./Project.module.css"
import ProjectPhotosBlock from "modules/project/ProjectPhotosBlock"
import blockPhoto1 from "assets/dummyPics/ProjectPhotos/blockPhotos/1.jpg"
import blockPhoto2 from "assets/dummyPics/instagramPhotos/2.jpg"
import ProjectSchemasBlock from "modules/project/ProjectSchemasBlock/ProjectSchemasBlock"
import schemaPhoto from "assets/dummyPics/SchemaPhotos/1.jpg"

export default function Project() {
  const {
    query: { path },
  } = useRouter()

  return (
    <div className={styles.content}>
      <ProjectTopNavigation />
      <ProjectHeaderBlock />
      <ProjectPhotosBlock photos={[blockPhoto1, blockPhoto2]} />
      <ProjectSchemasBlock schemas={[schemaPhoto, schemaPhoto]} />
    </div>
  )
}

Project.layoutConfig = {
  adaptiveHeaderTransparency: false,
  showFooter: false,
}
