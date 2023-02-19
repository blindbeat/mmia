import { Heading } from "components"
import { dummyParagraph } from "assets/dummyText"
import styles from "./MediaHeading.module.css"

export const MediaHeading = () => {
  return (
    <div className={styles.content}>
      <Heading as="h1" className={styles.heading}>
        The media is talking about{"\u00A0"}us
      </Heading>
      <p className={styles.paragraph}>{dummyParagraph}</p>
    </div>
  )
}
