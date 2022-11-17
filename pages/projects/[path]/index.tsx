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
import { dummyParagraph, dummyParagraphLong } from "assets/dummyText"
import ProjectSocialsBlock from "modules/project/ProjectSocialsBlock"
import ProjectOutroBlock from "modules/project/ProjectOutroBlock/ProjectOutroBlock"
import ProjectNextPreviewBlock from "modules/project/ProjectNextPreviewBlock"
import material1 from "assets/dummyPics/project/materialPhotos/1.jpg"
import material2 from "assets/dummyPics/project/materialPhotos/2.jpg"

const materials = [
  {
    title: "black marble",
    paragraph: dummyParagraph,
    image: material1,
  },
  {
    title: "polished wood",
    paragraph: dummyParagraph,
    image: material2,
  },
]
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
      <ProjectMaterialsBlock materials={materials} />
      <ProjectPhotosBlock
        photoOrientation="vertical"
        photos={[blockPhoto1, blockPhoto2]}
      />
      <ProjectMaterialsBlock materials={[materials[0]]} />
      <ProjectPhotosBlock photoOrientation="vertical" photos={[blockPhoto1]} />
      <ProjectParagraphBlock>{dummyParagraphLong}</ProjectParagraphBlock>
      <ProjectPhotosBlock
        photoOrientation="horizontal"
        photos={[blockPhoto3]}
      />
      <ProjectSocialsBlock />
      <ProjectOutroBlock />
      <ProjectNextPreviewBlock />
    </div>
  )
}

Project.layoutConfig = {
  adaptiveHeaderTransparency: false,
  showFooter: false,
}