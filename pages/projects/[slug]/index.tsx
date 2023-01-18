import ProjectHeaderBlock from "modules/project/ProjectHeaderBlock"
import ProjectTopNavigation from "modules/project/ProjectTopNavigation"
import ProjectPhotosBlock from "modules/project/ProjectPhotosBlock"
import ProjectSchemasBlock from "modules/project/ProjectSchemasBlock/ProjectSchemasBlock"
import ProjectMaterialsBlock from "modules/project/ProjectMaterialsBlock/ProjectMaterialsBlock"
import ProjectParagraphBlock from "modules/project/ProjectParagraphBlock"
import { dummyParagraph } from "assets/dummyText"
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
  try {
    const project = await fetchProject(context.params!.slug as string)
    return {
      props: {
        project,
      },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}
const Project: NextPageWithLayoutConfig<Props> = ({ project }) => {
  const contentNodes = project.content.map((content) => {
    switch (content.layout) {
      case "horizontal_photo": {
        return (
          <ProjectPhotosBlock
            key={content.key}
            photoOrientation="horizontal"
            photos={[content.attributes.image]}
          />
        )
      }
      case "vertical_photo": {
        const photos = [content.attributes.image1]
        if (content.attributes.image2) photos.push(content.attributes.image2)
        return (
          <ProjectPhotosBlock
            photoOrientation="vertical"
            key={content.key}
            photos={photos}
          />
        )
      }
      case "text_block": {
        return (
          <ProjectParagraphBlock key={content.key}>
            {content.attributes.text}
          </ProjectParagraphBlock>
        )
      }
      case "photo_architecture": {
        return (
          <ProjectSchemasBlock
            key={content.key}
            schemas={content.attributes.images}
          />
        )
      }
      case "block2": {
        const materials = content.attributes.sub_block.map(
          (material, index) => ({
            ...material,
            image: content.attributes.image[index],
          })
        )
        return (
          <ProjectMaterialsBlock
            key={content.key}
            heading={content.attributes.heading}
            materials={materials}
          />
        )
      }
      default: {
        return null
      }
    }
  })
  return (
    <div>
      <ProjectTopNavigation nextLink={project.next.slug} />
      <ProjectHeaderBlock project={project} />
      {contentNodes}
      <ProjectSocialsBlock />
      <Outro />
      <ProjectNextPreviewBlock image={project.next.image} />
    </div>
  )
}

Project.layoutConfig = {
  HeaderAdaptiveTransparency: false,
  showFooter: false,
  headerMargin: `var(--2xl)`,
}
export default Project
