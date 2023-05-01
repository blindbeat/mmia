import styles from "modules/project/ProjectHeaderBlock/ProjectHeaderBlock.module.css"
import { Heading, Paragraph, TagList } from "components"
import Image from "next/image"
import Calendar from "./assets/calendar.svg"
import Tape from "./assets/tape.svg"
import Geomarker from "./assets/geoMarker.svg"
import { ProjectWithImageDimensions } from "types"
import { useProjectGallery } from "contexts/ProjectGalleryContext"
import { useTranslation } from "next-i18next"

interface Props {
  project: ProjectWithImageDimensions
}
export default function ProjectHeaderBlock({ project }: Props) {
  const { t } = useTranslation(["project"])

  const { selectImage } = useProjectGallery()
  return (
    <div className={styles.content}>
      <div className={styles.titleWrapper}>
        <Heading as="h1" className={styles.title}>
          {project.heading}
        </Heading>
        <TagList tags={project.categories} className={styles.tags} />
      </div>
      <Image
        src={project.image.src}
        width={project.image.width}
        height={project.image.height}
        onClick={() => selectImage(project.image.src)}
        alt=""
        className={styles.image}
        sizes="100vw"
      />
      <div className={styles.info}>
        <div className={styles.metadata}>
          <Calendar className={styles.icon} />
          <span>
            <span className={styles.metaTitle}>{t("year")}</span>
            {project.year}
          </span>
          <Tape className={styles.icon} />
          <span>
            <span className={styles.metaTitle}>{t("size")}</span>
            {project.area}
          </span>
          <Geomarker className={styles.icon} />
          <span>
            <span className={styles.metaTitle}>{t("place")}</span>
            {project.city}
          </span>
        </div>
        <Paragraph className={styles.description}>
          {project.description}
        </Paragraph>
      </div>
    </div>
  )
}
