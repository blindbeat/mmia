import ProjectHeaderBlock from "modules/project/ProjectHeaderBlock"
import ProjectTopNavigation from "modules/project/ProjectTopNavigation"
import ProjectPhotosBlock from "modules/project/ProjectPhotosBlock"
import blockPhoto1 from "assets/dummyPics/project/projectBlock/1.jpg"
import blockPhoto2 from "assets/dummyPics/project/projectBlock/2.jpg"
import blockPhoto3 from "assets/dummyPics/project/projectBlock/3.jpg"
import ProjectSchemasBlock from "modules/project/ProjectSchemasBlock/ProjectSchemasBlock"
import schemaPhoto from "assets/dummyPics/project/projectSchema/1.jpg"
import ProjectMaterialsBlock from "modules/project/ProjectMaterialsBlock/ProjectMaterialsBlock"
import ProjectParagraphBlock from "modules/project/ProjectParagraphBlock"
import { dummyParagraph, dummyParagraphLong } from "assets/dummyText"
import ProjectSocialsBlock from "modules/project/ProjectSocialsBlock"
import Outro from "modules/blocks/Outro/Outro"
import ProjectNextPreviewBlock from "modules/project/ProjectNextPreviewBlock"
import material1 from "assets/dummyPics/project/projectMaterial/1.jpg"
import material2 from "assets/dummyPics/project/projectMaterial/2.jpg"
import { NextPageWithLayoutConfig } from "../../_app"
import { GetServerSideProps } from "next"
import { fetchProject } from "api/fetchProject"
import { ProjectWithImageDimensions } from "misc/types"

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

interface Props {
  project: ProjectWithImageDimensions
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const project = await fetchProject(context.params!.slug as string)
  return {
    props: {
      project,
    },
  }
}
const Project: NextPageWithLayoutConfig<Props> = ({ project }) => {
  return (
    <div>
      <ProjectTopNavigation />
      <ProjectHeaderBlock project={project} />
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
      <Outro />
      <ProjectNextPreviewBlock />
    </div>
  )
}

Project.layoutConfig = {
  HeaderAdaptiveTransparency: false,
  showFooter: false,
  headerMargin: `var(--2xl)`,
}
export default Project
