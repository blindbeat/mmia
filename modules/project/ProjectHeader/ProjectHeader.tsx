import styles from "./ProjectHeader.module.css"
import H2 from "components/H2"
import TagList from "components/TagList/TagList"
import { metadata, projectDescription, tags, title } from "assets/dummyText"
import Image from "next/image"
import headerPhoto from "assets/dummyPics/ProjectPhotos/headerPhoto.jpg"
import Calendar from "./assets/calendar.svg"
import Tape from "./assets/tape.svg"
import Geomarker from "./assets/geoMarker.svg"
import P from "components/P"

export default function ProjectHeader() {
  return (
    <div>
      <div className={styles.titleWrapper}>
        <H2 className={styles.title}>{title}</H2>
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
        <P className={styles.description}>{projectDescription}</P>
      </div>
    </div>
  )
}
