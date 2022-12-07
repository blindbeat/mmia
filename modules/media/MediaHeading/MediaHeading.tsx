import Heading from "components/Heading"
import { dummyParagraph } from "assets/dummyText"
import styles from "./MediaHeading.module.css"

export const MediaHeading = () => {
  return (
    <div className={styles.content}>
      <Heading as="h1" className={styles.heading}>
        The media is talking about us
      </Heading>
      <p className={styles.paragraph}>{dummyParagraph}</p>
    </div>
  )
}
