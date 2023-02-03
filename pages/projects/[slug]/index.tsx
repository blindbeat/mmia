import ProjectHeaderBlock from "modules/project/ProjectHeaderBlock"
import ProjectTopNavigation from "modules/project/ProjectTopNavigation"
import ProjectPhotosBlock from "modules/project/ProjectPhotosBlock"
import ProjectSchemasBlock from "modules/project/ProjectSchemasBlock/ProjectSchemasBlock"
import ProjectMaterialsBlock from "modules/project/ProjectMaterialsBlock/ProjectMaterialsBlock"
import ProjectParagraphBlock from "modules/project/ProjectParagraphBlock"
import ProjectSocialsBlock from "modules/project/ProjectSocialsBlock"
import Outro from "modules/blocks/Outro/Outro"
import ProjectNextPreviewBlock from "modules/project/ProjectNextPreviewBlock"
import { NextPageWithLayoutConfig } from "../../_app"
import { GetServerSideProps } from "next"
import { fetchProject } from "api/fetchProject"
import { ImageWithDimensions, ProjectWithImageDimensions } from "types"
import ProjectGallery from "modules/project/ProjectGallery"
import { useProjectGallery } from "contexts/ProjectGalleryContext"
import React from "react"
import { AnimatePresence } from "framer-motion"

interface Props {
  project: ProjectWithImageDimensions
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  locale,
}) => {
  locale ||= "en"
  try {
    const project = await fetchProject(params!.slug as string, locale)
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
  const { state: initialGalleryImage } = useProjectGallery()

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

  const images: ImageWithDimensions[] = [project.image]
  project.content.forEach((content) => {
    switch (content.layout) {
      case "horizontal_photo": {
        images.push(content.attributes.image)
        return
      }
      case "vertical_photo": {
        const photos = [content.attributes.image1]
        if (content.attributes.image2) photos.push(content.attributes.image2)
        images.push(...photos)
        return
      }
      case "photo_architecture": {
        images.push(...content.attributes.images)
        return
      }
      default: {
        return
      }
    }
  })

  return (
    <div>
      <AnimatePresence>
        {initialGalleryImage && (
          <ProjectGallery
            images={images}
            initialImageSrc={initialGalleryImage}
          />
        )}
      </AnimatePresence>
      <ProjectTopNavigation nextLink={project.next.slug} />
      <ProjectHeaderBlock project={project} />
      {contentNodes}
      <ProjectSocialsBlock />
      <Outro />
      <ProjectNextPreviewBlock
        slug={project.next.slug}
        image={project.next.image}
      />
    </div>
  )
}

Project.layoutConfig = {
  HeaderAdaptiveTransparency: false,
  showFooter: false,
  headerMargin: `var(--2xl)`,
}
export default Project
