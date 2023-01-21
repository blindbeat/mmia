import styles from "modules/project/ProjectHeaderBlock/ProjectHeaderBlock.module.css"
import { Heading, Paragraph, TagList } from "components"
import Image from "next/image"
import Calendar from "./assets/calendar.svg"
import Tape from "./assets/tape.svg"
import Geomarker from "./assets/geoMarker.svg"
import { ProjectWithImageDimensions } from "types"

interface Props {
  project: ProjectWithImageDimensions
}
export default function ProjectHeaderBlock({ project }: Props) {
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
        alt=""
        className={styles.image}
        sizes="100vw"
      />
      <div className={styles.info}>
        <div className={styles.metadata}>
          <Calendar className={styles.icon} />
          <span>
            <span className={styles.metaTitle}>year: </span>
            {project.year}
          </span>
          <Tape className={styles.icon} />
          <span>
            <span className={styles.metaTitle}>square meters:</span>
            {project.area}
          </span>
          <Geomarker className={styles.icon} />
          <span>
            <span className={styles.metaTitle}>place:</span>
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
