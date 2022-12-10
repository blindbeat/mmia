import styles from "modules/project/ProjectHeaderBlock/ProjectHeaderBlock.module.css"
import { Heading, Paragraph, TagList } from "components"
import { metadata, projectDescription, tags, title } from "assets/dummyText"
import Image from "next/image"
import headerPhoto from "assets/dummyPics/project/projectHeader.jpg"
import Calendar from "./assets/calendar.svg"
import Tape from "./assets/tape.svg"
import Geomarker from "./assets/geoMarker.svg"

export default function ProjectHeaderBlock() {
  return (
    <div className={styles.content}>
      <div className={styles.titleWrapper}>
        <Heading as="h1" className={styles.title}>
          {title}
        </Heading>
        <TagList tags={tags} className={styles.tags} />
      </div>
      <Image src={headerPhoto} alt="" className={styles.image} sizes="100vw" />
      <div className={styles.info}>
        <div className={styles.metadata}>
          <Calendar className={styles.icon} />
          <span>
            <span className={styles.metaTitle}>year: </span>
            {metadata.year}
          </span>
          <Tape className={styles.icon} />
          <span>
            <span className={styles.metaTitle}>square meters:</span>
            {metadata.area}
          </span>
          <Geomarker className={styles.icon} />
          <span>
            <span className={styles.metaTitle}>place:</span>
            {metadata.position}
          </span>
        </div>
        <Paragraph className={styles.description}>
          {projectDescription}
        </Paragraph>
      </div>
    </div>
  )
}
