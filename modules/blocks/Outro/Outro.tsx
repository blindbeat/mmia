import styles from "./Outro.module.css"
import WordsSwiper from "./WordsSwiper"
import ImagesSwiper from "./ImagesSwiper"
import { dummyParagraph } from "assets/dummyText"
import { ComponentWithLineAdornment, Paragraph } from "components"
import BackgroundImage from "./assets/backgroundLine.svg"
import { useAnimateLine } from "hooks"

const title = "Did you like this project?"
const Outro = () => {
  const { ref, style } = useAnimateLine()
  return (
    <div className={styles.content}>
      <h3 className={styles.header}>{title}</h3>
      <WordsSwiper />
      <ImagesSwiper />
      <div className={styles.paragraphWrapper}>
        <Paragraph className={styles.paragraph}>{dummyParagraph}</Paragraph>
      </div>
      <ComponentWithLineAdornment
        as="button"
        color="black"
        className={styles.CTA}
      >
        drop request
      </ComponentWithLineAdornment>
      <BackgroundImage
        ref={ref}
        style={style}
        className={styles.backgroundImage}
      />
    </div>
  )
}

export default Outro
