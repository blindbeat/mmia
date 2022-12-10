import styles from "modules/blocks/Outro/Outro.module.css"
import WordsSwiper from "modules/blocks/Outro/WordsSwiper"
import ImagesSwiper from "modules/blocks/Outro/ImagesSwiper"
import { dummyParagraph } from "assets/dummyText"
import { LinkWithLine, Paragraph } from "components"
import BackgroundImage from "modules/blocks/Outro/assets/backgroundLine.svg"
import { useAnimateLine } from "hooks"

const title = "Did you like this project?"
export default function Outro() {
  const { ref, style } = useAnimateLine()
  return (
    <div className={styles.content}>
      <h3 className={styles.header}>{title}</h3>
      <WordsSwiper />
      <ImagesSwiper />
      <div className={styles.paragraphWrapper}>
        <Paragraph className={styles.paragraph}>{dummyParagraph}</Paragraph>
      </div>
      <LinkWithLine color="black" className={styles.link}>
        drop request
      </LinkWithLine>
      <BackgroundImage
        ref={ref}
        style={style}
        className={styles.backgroundImage}
      />
    </div>
  )
}
