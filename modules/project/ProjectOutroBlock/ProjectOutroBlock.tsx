import styles from "./ProjectOutroBlock.module.css"
import WordsSwiper from "./WordsSwiper"
import ImagesSwiper from "modules/project/ProjectOutroBlock/ImagesSwiper"
import { dummyParagraph } from "assets/dummyText"
import P from "components/P"
import LinkWithLine from "components/LinkWithLine"

const title = "Did you like this project?"
export default function ProjectOutroBlock() {
  return (
    <div className={styles.content}>
      <h2 className={styles.header}>{title}</h2>
      <WordsSwiper />
      <ImagesSwiper />
      <div className={styles.paragraphWrapper}>
        <P className={styles.paragraph}>{dummyParagraph}</P>
      </div>
      <LinkWithLine color="black" className={styles.link}>
        drop request
      </LinkWithLine>
    </div>
  )
}
