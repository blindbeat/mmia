import styles from "./Error.module.css"
import { ComponentWithLineAdornment } from "components"
import { dummyParagraph } from "assets/dummyText"
import { BackgroundLine } from "./BackgroundLine"
import backgroundImage from "assets/dummyPics/home/homeLanding/1.jpg"
import { PhotoWithEyes } from "modules/blocks/PhotoWithEyes"

interface Props {
  children: string
}
const Error = ({ children }: Props) => {
  return (
    <PhotoWithEyes image={backgroundImage} className={styles.content}>
      <h1 className={styles.header}>{children}</h1>
      <ComponentWithLineAdornment href="/" className={styles.link}>
        back to home
      </ComponentWithLineAdornment>
      <p className={styles.paragraph}>{dummyParagraph}</p>
      <BackgroundLine />
      <div className={styles.backgroundBlackScreen} />
    </PhotoWithEyes>
  )
}

export default Error
