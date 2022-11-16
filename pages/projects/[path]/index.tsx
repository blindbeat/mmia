import { useRouter } from "next/router"
import ProjectHeaderBlock from "modules/project/ProjectHeaderBlock"
import ProjectTopNavigation from "modules/project/ProjectTopNavigation"
import styles from "./Project.module.css"
import ProjectPhotosBlock from "modules/project/ProjectPhotosBlock"
import blockPhoto1 from "assets/dummyPics/project/blockPhotos/1.jpg"
import blockPhoto2 from "assets/dummyPics/project/blockPhotos/2.jpg"
import blockPhoto3 from "assets/dummyPics/project/blockPhotos/3.jpg"
import ProjectSchemasBlock from "modules/project/ProjectSchemasBlock/ProjectSchemasBlock"
import schemaPhoto from "assets/dummyPics/SchemaPhotos/1.jpg"
import ProjectMaterialsBlock from "modules/project/ProjectMaterialsBlock/ProjectMaterialsBlock"
import ProjectParagraphBlock from "modules/project/ProjectParagraphBlock"
import { dummyParagraphLong } from "assets/dummyText"
import ProjectSocialsBlock from "modules/project/ProjectSocialsBlock"
import ProjectOutroBlock from "modules/project/ProjectOutroBlock/ProjectOutroBlock"

export default function Project() {
  const {
    query: { path },
  } = useRouter()

  return (
    <div className={styles.content}>
      <ProjectTopNavigation />
      <ProjectHeaderBlock />
      <ProjectPhotosBlock
        photoOrientation="vertical"
        photos={[blockPhoto1, blockPhoto2]}
      />
      <ProjectSchemasBlock schemas={[schemaPhoto, schemaPhoto]} />
      <ProjectPhotosBlock
        photoOrientation="horizontal"
        photos={[blockPhoto3]}
      />
      <ProjectMaterialsBlock />
      <ProjectPhotosBlock
        photoOrientation="vertical"
        photos={[blockPhoto1, blockPhoto2]}
      />
      <ProjectParagraphBlock>{dummyParagraphLong}</ProjectParagraphBlock>
      <ProjectPhotosBlock
        photoOrientation="horizontal"
        photos={[blockPhoto3]}
      />
      <ProjectSocialsBlock />
      <ProjectOutroBlock />
    </div>
  )
}

Project.layoutConfig = {
  adaptiveHeaderTransparency: false,
  showFooter: false,
}
